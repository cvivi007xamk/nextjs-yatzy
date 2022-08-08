import GameScreen from "./components/GameScreen";
import * as React from "react";
import Container from "@mui/material/Container";
import { Button, Box } from "@mui/material";
import PlayerDialog from "./components/PlayerDialog";
import Chat from "./components/Chat";
import MultiPlayerDialog from "./components/MultiPlayerDialog";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:8999");

export default function Home() {
	const [isConnected, setIsConnected] = useState(socket.connected);

	const [players, setPlayers] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false); // Set this to true later
	const [multiPlayerDialogOpen, setMultiPlayerDialogOpen] = useState(true);

	useEffect(() => {
		socket.on("connect", () => {
			setIsConnected(true);
			console.log(socket.id);
		});

		socket.on("firstConnection", (playersFromServer) => {
			setPlayers(playersFromServer);
		});

		socket.on("disconnect", () => {
			setIsConnected(false);
			console.log(socket.id);
		});

		socket.on("dieThrow", (dieThrowData) => {
			setMessages([message, ...messages]);
		});

		socket.on("newPlayer", (newPlayer) => {
			setPlayers((prevState) => [...prevState, newPlayer]);
		});

		socket.on("user has joined", (user) => {
			console.log("user has joined", user);
		});

		return () => {
			socket.off("connect");
			socket.off("disconnect");
			socket.off("firstConnection");
			socket.off("playerSet");
			socket.off("dieThrow");
		};
	}, []);

	return (
		<div>
			<main>
				<Container maxWidth="md">
					<Box sx={{ my: 4, textAlign: "center" }}>
						<GameScreen players={players} />
						<PlayerDialog
							players={players}
							setPlayers={setPlayers}
							dialogOpen={dialogOpen}
							setDialogOpen={setDialogOpen}
						/>
						<MultiPlayerDialog
							players={players}
							setPlayers={setPlayers}
							dialogOpen={multiPlayerDialogOpen}
							setDialogOpen={setMultiPlayerDialogOpen}
						/>
						<Button
							onClick={() => setDialogOpen(true)}
							variant="outlined"
							color="primary"
							sx={{ margin: "1rem" }}
						>
							New game
						</Button>
					</Box>
					<Chat />
				</Container>
			</main>
		</div>
	);
}

import { Typography } from "@mui/material";

const Turn = ({ players, playerTurn, rounds }) => {
	return (
		<Typography gutterBottom variant="h5">
			Turn: {rounds > 0 ? players[playerTurn] : "No more turns"}
		</Typography>
	);
};

export default Turn;
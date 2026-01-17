import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Input,
} from "@mui/material";
import { useState } from "react";

export default function WordCard({ meaning, word }) {
	const [userAnswer, setUserAnswer] = useState("");
	const [isChecked, setIsChecked] = useState(false)

	const normalUserAnswer = userAnswer.trim().toLowerCase()
	const normalCorrectAnswer = word.trim().toLowerCase()
	const isCorrect = normalUserAnswer === normalCorrectAnswer

	function handleUserAnswer(e) {
		setUserAnswer(e.target.value)
		setIsChecked(false)
	}

	function handleKeyDown(e) {
		if (e.key === 'Enter' && !isChecked && userAnswer.trim() !== '') {
			setIsChecked(true)
		}
	}


	return (
		<Card
			sx={{
				width: { xs: "90%", sm: 800 },
				maxWidth: 1000,
				minHeight: 650,
				padding: 4,
				borderRadius: 8,
				boxShadow: 6,
				bgcolor:"#323261",
				color: "#f8f8f2",
				border:isChecked ? (isCorrect ? "20px solid #6bcf92" : "20px solid #e06a6a" ) : "20px solid #595d78",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<CardContent
				sx={{
					flexGrow: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100%",
					textAlign: "center",
					gap: 3
	
				}}
			>
				<Typography variant="h1">{meaning}</Typography>
				<TextField
					variant="filled"
					value={userAnswer}
					onChange={handleUserAnswer}
					onKeyDown={handleKeyDown}
					autoFocus
					autoComplete="off"
					InputProps= {{readOnly: isChecked, sx: {fontSize:'1.5rem', lineHeight: '1.4', textAlign: 'center'}}}
				/>
				<Button variant="contained" size="large">See Translate</Button>
			</CardContent>
		</Card>
  );
}

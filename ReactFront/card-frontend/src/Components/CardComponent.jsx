import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

export default function WordCard({ meaning, word }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const normalUserAnswer = userAnswer.trim().toLowerCase();
  const normalCorrectAnswer = word.trim().toLowerCase();
  const isCorrect = normalUserAnswer === normalCorrectAnswer;

  function handleUserAnswer(e) {
    setUserAnswer(e.target.value);
    setIsChecked(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !isChecked && userAnswer.trim() !== "") {
      setIsChecked(true);
    }
  }

  function handleFlip() {
    setFlipped((prev) => !prev);
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
	if (isChecked && isCorrect) {
		handleFlip()
	}
  }, [isChecked, isCorrect])

  return (
    <Card
      sx={{
        width: { xs: "90%", sm: 800 },
        maxWidth: 1000,
        minHeight: 650,
        borderRadius: 8,
        boxShadow: 6,
        bgcolor: "#323261",
        color: "#f8f8f2",
        perspective: "1000px",
        border: isChecked
          ? isCorrect
            ? "20px solid #6bcf92"
            : "20px solid #e06a6a"
          : "20px solid #595d78",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT SIDE */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
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
              InputProps={{
                readOnly: isCorrect,
                sx: {
                  fontSize: "1.5rem",
                  lineHeight: "1.4",
                  textAlign: "center",
                },
              }}
            />
            <Button variant="contained" size="large" onClick={handleFlip}>
              See Translate
            </Button>
          </Box>

          {/* BACK SIDE */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
			  flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
			  gap: 3
            }}
          >
			<Typography variant="h1">{word}</Typography>
			<Button variant="contained" size="large" onClick={handleFlip}>
              See Translate
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


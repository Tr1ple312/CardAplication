import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { mocks } from "../api/mokcs";
import DifficultyIndicator from "./DifficultyComponent";

export default function WordCard() {
  
  const [userAnswer, setUserAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const cardObj = mocks[currentIndex]

  const normalUserAnswer = userAnswer.trim().toLowerCase();
  const normalCorrectAnswer = cardObj.word.trim().toLowerCase();
  const isCorrect = normalUserAnswer === normalCorrectAnswer;

  function handleUserAnswer(e) {
    setUserAnswer(e.target.value);
    setIsChecked(false);
  }

  function handleFlip() {
    setFlipped((prev) => !prev);
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleNextCard() {
    setFlipped(false)
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % mocks.length)
      setUserAnswer("")
      setIsChecked(false)

      }, 250)
  }

  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (e.key === "Enter" ) {
        if(flipped === false) {
          if(!isChecked && userAnswer.trim() !== "") {
                setIsChecked(true) }
        } else {
          handleNextCard()
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () =>  document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [flipped, isChecked, userAnswer, handleNextCard])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isChecked && isCorrect) {
      setFlipped(true);
    }
  }, [isChecked, isCorrect]);

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
      }}
    >
      <DifficultyIndicator level={cardObj.difficulty} />
      <CardContent
        sx={{
          height: "100%",
          minHeight: 550,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          "&:last-child": {
            paddingBottom: 0,
          }
        }}
      >
        {/* FLIP CONTAINER */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT SIDE */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
              gap: 3
            }}
          >
            {/* CONTENT */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {cardObj.translate}
              </Typography>

              <TextField
                variant="filled"
                value={userAnswer}
                onChange={handleUserAnswer}
                autoFocus
                autoComplete="off"
                InputProps={{
                  readOnly: isCorrect,
                  sx: {
                    fontSize: "1.5rem",
                    textAlign: "center",
                  },
                }}
                sx={{
                  "& .MuiInputBase-input": {
                    textAlign: "center",
                  }
                }}
              />
            </Box>

            {/* ACTIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button variant="contained" size="large" onClick={handleFlip}>
                See Translate
              </Button>
            </Box>
          </Box>

          {/* BACK SIDE */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 4,
              gap: 3,
            }}
          >
            {/* CONTENT */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {cardObj.word}
              </Typography>
            </Box>

            {/* ACTIONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button variant="contained" size="large" onClick={handleFlip}>
                Back
              </Button>

              <Button variant="contained" size="large" onClick={handleNextCard}>
                Next Card
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


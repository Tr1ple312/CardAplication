import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import DifficultyIndicator from "./DifficultIndicator/DifficultyComponent";
import useCardAnswer from "./WordCard/useCardAnswer";
import { BOX_STYLES, COLORS, CARD_STYLES } from "./constans";
import useCardFlip from "./WordCard/useCardFlip";

export default function WordCard({ word, translate, difficulty, onNext }) {

  const {
    userAnswer,
    isChecked,
    isCorrect,
    handleChange,
    checkAnswer,
    resetAnswer
  } = useCardAnswer(word)
  const { flipped, handleFlip } = useCardFlip(isChecked, isCorrect, word, translate);  


  const getBorderColor = () => {
    if (!isChecked) return COLORS.borderDefault;
    return isCorrect ? COLORS.borderCorrect : COLORS.borderIncorrect;
  };


  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (e.key === "Enter" ) {
        if(flipped === false) {
          if(!isChecked && userAnswer.trim() !== "") {
                checkAnswer() }
        } else {
          onNext()
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () =>  document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [flipped, isChecked, userAnswer, onNext, checkAnswer])

useEffect(() => {
    resetAnswer();  // сбрасываем ответ при смене карточки
  }, [word, translate, resetAnswer]);



  return (
    <Card
      sx={{
        ...CARD_STYLES.card,
        bgcolor: COLORS.cardBackground,
        color: COLORS.cardText,
        border: `20px solid ${getBorderColor()}`
      }}
    >
      <DifficultyIndicator level={difficulty} />
      <CardContent
        sx={CARD_STYLES.cardContent}
      >
        {/* FLIP CONTAINER */}
        <Box
          sx={{
            ...BOX_STYLES.flipContainer,
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT SIDE */}
          <Box
            sx={BOX_STYLES.cardSide}
          >
            {/* CONTENT */}
            <Box
              sx={BOX_STYLES.content}
            >
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {translate}
              </Typography>

              <TextField
                variant="filled"
                value={userAnswer}
                onChange={handleChange}
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
              sx={BOX_STYLES.actions}
            >
              <Button variant="contained" size="large" onClick={handleFlip}>
                See Translate
              </Button>
            </Box>
          </Box>

          {/* BACK SIDE */}
          <Box
            sx={{
              ...BOX_STYLES.cardSide,
              transform: "rotateY(180deg)",
            }}
          >
            {/* CONTENT */}
            <Box
              sx={BOX_STYLES.content}
            >
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {translate}
              </Typography>
            </Box>

            {/* ACTIONS */}
            <Box
              sx={BOX_STYLES.actions}
            >
              <Button variant="contained" size="large" onClick={handleFlip}>
                Back
              </Button>

              <Button variant="contained" size="large" onClick={onNext}>
                Next Card
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}


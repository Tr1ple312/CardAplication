import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DifficultyIndicator from "./DifficultIndicator/DifficultyComponent";
import useCardAnswer from "./WordCard/useCardAnswer";
import { BOX_STYLES, CARD_STYLES } from "./constans";
import useCardFlip from "./WordCard/useCardFlip";
import { useTheme } from "@mui/material/styles";

export default function WordCard({ word, translate, difficulty, onNext }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [cardFlipped, setCardFlipped] = useState(false);

  const {
    userAnswer,
    isChecked,
    isCorrect,
    handleChange,
    checkAnswer,
    resetAnswer
  } = useCardAnswer(word);

  const { flipped, handleFlip } = useCardFlip(isChecked, isCorrect, word, translate);

  const getBorderColor = () => {
    if (!isChecked) return theme.palette.divider;
    return isCorrect
      ? theme.palette.success.main
      : theme.palette.error.main;
  };

  function handleNextWithAnimation() {
    setCardFlipped(true);
    setTimeout(() => {
      onNext();
      setCardFlipped(false);
    }, 380);
  }

  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (e.key === "Enter") {
        if (flipped === false) {
          if (!isChecked && userAnswer.trim() !== "") {
            checkAnswer();
          }
        } else {
          handleNextWithAnimation();
        }
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [flipped, isChecked, userAnswer, checkAnswer]);

  useEffect(() => {
    resetAnswer();
  }, [word, translate, resetAnswer]);

  return (
    <Card
      sx={{
        ...CARD_STYLES.card,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        border: `20px solid ${getBorderColor()}`,
        transform: cardFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
      }}
    >
      <DifficultyIndicator level={difficulty} />
      <CardContent sx={CARD_STYLES.cardContent}>
        <Box
          sx={{
            ...BOX_STYLES.flipContainer,
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT SIDE */}
          <Box sx={BOX_STYLES.cardSide}>
            <Box sx={BOX_STYLES.content}>
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

            <Box sx={BOX_STYLES.actions}>
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
            <Box sx={BOX_STYLES.content}>
              <Typography variant="h1" sx={{ textAlign: "center" }}>
                {translate}
              </Typography>
            </Box>

            <Box sx={BOX_STYLES.actions}>
              <Button variant="contained" size="large" onClick={handleFlip}>
                Back
              </Button>

              <Button variant="contained" size="large" onClick={handleNextWithAnimation}>
                Next Card
              </Button>
            </Box>
          </Box>
        </Box>

        {/* "SEE ALL DECKS" ВНЕ FLIP CONTAINER */}
        <Box
          sx={{
            position: "absolute",
            bottom: 5,
            left: 20,
            zIndex: 10,
          }}
        >
          <Button
            variant="text"
            onClick={() => navigate('/')}
          >
            See All Decks
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}


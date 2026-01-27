import { useState, useCallback } from "react";  // добавь useCallback

export default function useCardAnswer(correctAnswer) {
  const [userAnswer, setUserAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const normalUserAnswer = userAnswer.trim().toLowerCase();
  const normalCorrectAnswer = correctAnswer.trim().toLowerCase();  
  const isCorrect = normalUserAnswer === normalCorrectAnswer;
  
  const handleChange = useCallback((e) => {  // оберни в useCallback
    setUserAnswer(e.target.value);
    setIsChecked(false);
  }, []);

  const checkAnswer = useCallback(() => {  // оберни в useCallback
    if (userAnswer.trim() !== "") {
      setIsChecked(true);
    }
  }, [userAnswer]);

  const resetAnswer = useCallback(() => {  // оберни в useCallback
    setUserAnswer("");
    setIsChecked(false);
  }, []);

  return {
    userAnswer,
    isChecked,
    isCorrect,       
    handleChange,     
    checkAnswer,      
    resetAnswer,      
  };
}
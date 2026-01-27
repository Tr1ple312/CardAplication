import { useEffect, useState } from "react";

export default function useCardFlip(isChecked, isCorrect, word, translate) {
  const [flipped, setFlipped] = useState(false);
  
  function handleFlip() {
    setFlipped((prev) => !prev);
  }
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (isChecked && isCorrect) {
      setFlipped(true);
    }
  }, [isChecked, isCorrect]);


  useEffect(() => {
    setFlipped(false);  // сбрасываем только флип
  }, [word, translate]);  // ← убрали resetAnswer
  
  return {  // ← НЕ ЗАБУДЬ return!
    flipped,
    handleFlip
  };
}
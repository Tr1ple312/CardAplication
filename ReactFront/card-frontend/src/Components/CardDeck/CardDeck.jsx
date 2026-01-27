import { useState } from "react";
import { mocks } from "../../api/mokcs";
import WordCard from "../CardComponent";

export default function CardDeck() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentCard = mocks[currentIndex]

    function handleNextIndex() {
        setCurrentIndex(prev => (prev + 1) % mocks.length)
    }

    return (
        <WordCard 
            word={currentCard.word}
            translate={currentCard.translate}
            difficulty={currentCard.difficulty}
            onNext={handleNextIndex}
        />
    );
}

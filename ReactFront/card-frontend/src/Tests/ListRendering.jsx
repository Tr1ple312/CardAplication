import { useState } from "react"


const mocks = [
    {   
        id: 1,
        word: 'hello',
        translate: 'привет',
        difficulty: 1, 
        create_time: new Date(),
    },
    {   
        id: 2,
        word: 'bye',
        translate: 'пока',
        difficulty: 1, 
        create_time: new Date(),
    },
    {
        id: 3,
        word: 'eagle',
        translate: 'орел',
        difficulty: 3, 
        create_time: new Date(),
    },
    {
        id: 4,
        word: 'sand',
        translate: 'песок',
        difficulty: 2, 
        create_time: new Date(),
    },

]

export default function CardDeck() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentCard = mocks[currentIndex]

    function handleNextId() {
        setCurrentIndex(prev => (prev + 1) % mocks.length);
    }
    return(
        <div>
            <h3>{currentCard.word} = {currentCard.translate}</h3>
            <button onClick={handleNextId}>Next</button>
        </div>
    )
}


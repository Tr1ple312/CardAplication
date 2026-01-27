import { useState, useEffect } from "react";  
import api from "../../api/axiosConfig";  
import WordCard from "../CardComponent";


export default function CardDeck() {
    const [cards, setCards] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        api.get('/cards/')
            .then(response => {
                setCards(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Загрузка карточек...</div>
    }

    if (cards.length === 0) {
        return <div>Нет карточек для изучения</div>
    }

    const currentCard = cards[currentIndex];  

    function handleNextIndex() {
        setCurrentIndex(prev => (prev + 1) % cards.length)  
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
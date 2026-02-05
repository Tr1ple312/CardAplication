import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";
import WordCard from "../CardComponent";

export default function CardDeck() {
    const { deckId } = useParams();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        api.get(`/cards/?deck=${deckId}`)
            .then(response => {
                setCards(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setLoading(false);
            });
    }, [deckId]);

    if (loading) return <div>Загрузка карточек...</div>;
    if (cards.length === 0) return <div>Нет карточек для изучения</div>;

    const currentCard = cards[currentIndex];

    function handleNextIndex() {
        setCurrentIndex(prev => (prev + 1) % cards.length);
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

import { useEffect, useState } from 'react';
import api from '../api/axiosConfig'

export default function LightningTest(){

  const [card, setCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const Cardobj2 = card[currentIndex]

  function handleNextObj() {
    setCurrentIndex(prev => (prev + 1) % card.length)
  }
  
  useEffect(() => {
    api.get('/cards/')
      .then(response => {
        setCard(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log('Error:', error);
      })
  }, [])

  if (card.length === 0) {
  return <div>Загрузка карточек...</div>
  }

  return (
    <>
      <p>{Cardobj2.word} </p>
      <p>{Cardobj2.translate}</p>
      <p>{Cardobj2.difficulty} </p>

      <button onClick={handleNextObj}>Next word</button>
    </>
  );
}


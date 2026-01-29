import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import api from '../../api/axiosConfig';

export default function DeckView() {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [deckDetails, setDeckDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const navigate = useNavigate();

  // Загрузка списка колод при монтировании
  useEffect(() => {
    loadDecks();
  }, []);

  async function loadDecks() {
    try {
      const response = await api.get('/decks/');
      setDecks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading decks:', error);
      setLoading(false);
    }
  }

  // Загрузка деталей выбранной колоды
  async function loadDeckDetails(deckId) {
    setDetailsLoading(true);
    try {
      const response = await api.get(`/decks/${deckId}/`);
      setDeckDetails(response.data);
      setDetailsLoading(false);
    } catch (error) {
      console.error('Error loading deck details:', error);
      setDetailsLoading(false);
    }
  }

  function handleDeckClick(deck) {
    setSelectedDeck(deck);
    loadDeckDetails(deck.id);
  }

  function handleLearn() {
    if (selectedDeck) {
      navigate(`/decks/${selectedDeck.id}/learn`);
    }
  }

  function getDifficultyLabel(level) {
    const labels = {
      1: 'Very Easy',
      2: 'Easy',
      3: 'Medium',
      4: 'Hard',
      5: 'Very Hard'
    };
    return labels[level] || 'Unknown';
  }

  function getDifficultyColor(level) {
    const colors = {
      1: 'success',
      2: 'info',
      3: 'warning',
      4: 'error',
      5: 'error'
    };
    return colors[level] || 'default';
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      height: 'calc(100vh - 102px)',
      marginTop: '102px'
    }}>
      {/* ЛЕВАЯ ПАНЕЛЬ - Список колод */}
      <Box sx={{ 
        width: '350px',
        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
        overflowY: 'auto',
        padding: 2
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 2
        }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Мои колоды
          </Typography>
          <Button 
            variant="contained" 
            size="small"
            onClick={() => navigate('/decks/create')}
          >
            + Создать
          </Button>
        </Box>

        {decks.length === 0 ? (
          <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography color="text.secondary">
              У вас пока нет колод
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ marginTop: 2 }}
              onClick={() => navigate('/decks/create')}
            >
              Создать первую колоду
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {decks.map(deck => (
              <Card 
                key={deck.id}
                onClick={() => handleDeckClick(deck)}
                sx={{ 
                  cursor: 'pointer',
                  border: selectedDeck?.id === deck.id ? '2px solid #1976d2' : '1px solid rgba(255, 255, 255, 0.12)',
                  backgroundColor: selectedDeck?.id === deck.id ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  }
                }}
              >
                <CardContent sx={{ padding: 2, '&:last-child': { paddingBottom: 2 } }}>
                  <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {deck.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
                    {deck.cards_count} слов
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>

      {/* ПРАВАЯ ПАНЕЛЬ - Детали колоды */}
      <Box sx={{ 
        flex: 1,
        overflowY: 'auto',
        padding: 3
      }}>
        {!selectedDeck ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column'
          }}>
            <Typography variant="h5" color="text.secondary">
              Выберите колоду
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              Нажмите на колоду слева чтобы увидеть её содержимое
            </Typography>
          </Box>
        ) : detailsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : deckDetails ? (
          <Box>
            {/* Header с кнопкой */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 3
            }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {deckDetails.name}
                </Typography>
                {deckDetails.description && (
                  <Typography variant="body1" color="text.secondary" sx={{ marginTop: 1 }}>
                    {deckDetails.description}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  {deckDetails.cards?.length || 0} слов
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleLearn}
                disabled={!deckDetails.cards || deckDetails.cards.length === 0}
              >
                Учить
              </Button>
            </Box>

            {/* Список слов */}
            {!deckDetails.cards || deckDetails.cards.length === 0 ? (
              <Box sx={{ 
                textAlign: 'center', 
                padding: 4,
                border: '2px dashed rgba(255, 255, 255, 0.12)',
                borderRadius: 2
              }}>
                <Typography variant="h6" color="text.secondary">
                  В этой колоде пока нет слов
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ marginTop: 2 }}
                  onClick={() => navigate(`/decks/${selectedDeck.id}/edit`)}
                >
                  Добавить слова
                </Button>
              </Box>
            ) : (
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 2,
                alignItems: 'center',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                {deckDetails.cards.map(card => (
                  <Card key={card.id} sx={{ 
                    width: '100%',
                    borderRadius: 3
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: 2,
                      '&:last-child': { paddingBottom: 2 }
                    }}>
                      <Box sx={{ flex: 1, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                          {card.word} — {card.translate}
                        </Typography>
                      </Box>
                      <Chip 
                        label={getDifficultyLabel(card.difficulty)} 
                        color={getDifficultyColor(card.difficulty)}
                        size="small"
                      />
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}
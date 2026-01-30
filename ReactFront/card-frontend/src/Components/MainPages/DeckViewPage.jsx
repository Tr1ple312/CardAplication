import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Card, CardContent, Chip, CircularProgress, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import api from '../../api/axiosConfig';

export default function DeckView() {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [cardForm, setCardForm] = useState({ word: '', translate: '', difficulty: 1 });
  const [sortBy, setSortBy] = useState('time');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  
  // Для создания колоды
  const [deckDialogOpen, setDeckDialogOpen] = useState(false);
  const [deckForm, setDeckForm] = useState({ name: '', description: '' });
  
  const navigate = useNavigate();

  useEffect(() => {
    loadDecks();
  }, []);

  async function loadDecks() {
    try {
      const res = await api.get('/decks/');
      setDecks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadCards(deckId) {
    try {
      const res = await api.get(`/decks/${deckId}/`);
      setCards(res.data.cards || []);
    } catch (err) {
      console.error(err);
    }
  }

  function handleDeckClick(deck) {
    setSelectedDeck(deck);
    loadCards(deck.id);
  }

  async function handleDeleteDeck(e, deckId) {
    e.stopPropagation();
    if (!window.confirm('Delete this deck?')) return;
    
    try {
      await api.delete(`/decks/${deckId}/`);
      await loadDecks();
      if (selectedDeck?.id === deckId) {
        setSelectedDeck(null);
        setCards([]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteCard(cardId) {
    if (!window.confirm('Delete this card?')) return;
    
    try {
      await api.delete(`/cards/${cardId}/`);
      await Promise.all([loadCards(selectedDeck.id), loadDecks()]);
    } catch (err) {
      console.error(err);
    }
  }

  function openDialog(card = null) {
    setEditingCard(card);
    setCardForm(card || { word: '', translate: '', difficulty: 1 });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingCard(null);
    setCardForm({ word: '', translate: '', difficulty: 1 });
  }

  async function handleSaveCard() {
    if (!cardForm.word.trim() || !cardForm.translate.trim()) {
      alert('Please fill in both fields');
      return;
    }

    try {
      if (editingCard) {
        await api.patch(`/cards/${editingCard.id}/`, cardForm);
      } else {
        await api.post('/cards/', { 
          ...cardForm,
          deck: selectedDeck.id
        });
      }
      
      closeDialog();
      await Promise.all([loadCards(selectedDeck.id), loadDecks()]);
    } catch (err) {
      console.error(err);
      alert('Failed to save card');
    }
  }

  // Функции для создания колоды
  function openDeckDialog() {
    setDeckForm({ name: '', description: '' });
    setDeckDialogOpen(true);
  }

  function closeDeckDialog() {
    setDeckDialogOpen(false);
    setDeckForm({ name: '', description: '' });
  }

  async function handleSaveDeck() {
    if (!deckForm.name.trim()) {
      alert('Please enter deck name');
      return;
    }

    try {
      await api.post('/decks/', deckForm);
      closeDeckDialog();
      await loadDecks();
    } catch (err) {
      console.error(err);
      alert('Failed to create deck');
    }
  }

  function getFilteredAndSortedCards() {
    let filtered = [...cards];
    
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(c => c.difficulty === parseInt(filterDifficulty));
    }
    
    if (sortBy === 'time') {
      filtered.sort((a, b) => new Date(b.time_create) - new Date(a.time_create));
    } else if (sortBy === 'difficulty') {
      filtered.sort((a, b) => a.difficulty - b.difficulty);
    }
    
    return filtered;
  }

  const difficultyLabels = ['', 'Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
  const difficultyColors = ['', 'success', 'info', 'warning', 'error', 'error'];
  
  const filteredCards = getFilteredAndSortedCards();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', marginTop: '102px' }}>
        {/* LEFT - Deck List */}
        <Box sx={{ width: 400, borderRight: '2px solid rgba(255,255,255,0.12)', overflowY: 'auto', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h4">My Decks</Typography>
            <Button variant="contained" onClick={openDeckDialog}>+ New</Button>
          </Box>

          {decks.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">No decks yet</Typography>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={openDeckDialog}>
                Create First Deck
              </Button>
            </Box>
          ) : (
            decks.map(deck => (
              <Card 
                key={deck.id}
                onClick={() => handleDeckClick(deck)}
                sx={{ 
                  mb: 1, 
                  cursor: 'pointer',
                  border: selectedDeck?.id === deck.id ? '2px solid #1976d2' : '1px solid rgba(255,255,255,0.12)',
                  bgcolor: selectedDeck?.id === deck.id ? 'rgba(25,118,210,0.08)' : 'inherit'
                }}
              >
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <Typography variant="h6">{deck.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{deck.cards_count} words</Typography>
                  </Box>
                  <Box>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); navigate(`/decks/${deck.id}/edit`); }}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={(e) => handleDeleteDeck(e, deck.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        {/* RIGHT - Card List */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: 4 }}>
          {!selectedDeck ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column' }}>
              <Typography variant="h4" color="text.secondary">Select a Deck</Typography>
            </Box>
          ) : (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Box>
                  <Typography variant="h3">{selectedDeck.name}</Typography>
                  <Typography variant="body1" color="text.secondary">{filteredCards.length} of {cards.length} words</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="outlined" startIcon={<Add />} onClick={() => openDialog()}>Add</Button>
                  <Button variant="contained" onClick={() => navigate(`/decks/${selectedDeck.id}/learn`)} disabled={cards.length === 0}>
                    Study
                  </Button>
                </Box>
              </Box>

              {/* Filters */}
              {cards.length > 0 && (
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                  <TextField
                    select
                    label="Sort By"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    sx={{ minWidth: 150 }}
                    size="small"
                  >
                    <MenuItem value="time">Recent First</MenuItem>
                    <MenuItem value="difficulty">By Difficulty</MenuItem>
                  </TextField>
                  
                  <TextField
                    select
                    label="Difficulty"
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                    sx={{ minWidth: 150 }}
                    size="small"
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="1">Very Easy</MenuItem>
                    <MenuItem value="2">Easy</MenuItem>
                    <MenuItem value="3">Medium</MenuItem>
                    <MenuItem value="4">Hard</MenuItem>
                    <MenuItem value="5">Very Hard</MenuItem>
                  </TextField>
                </Box>
              )}

              {cards.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6, border: '2px dashed rgba(255,255,255,0.12)', borderRadius: 2 }}>
                  <Typography variant="h5" color="text.secondary">No words yet</Typography>
                  <Button variant="outlined" sx={{ mt: 2 }} onClick={() => openDialog()}>Add First Word</Button>
                </Box>
              ) : filteredCards.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h5" color="text.secondary">No words match the selected filters</Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, mx: 'auto' }}>
                  {filteredCards.map(card => (
                    <Card key={card.id} sx={{ borderRadius: 3 }}>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
                        <Typography variant="h5" sx={{ flex: 1, textAlign: 'center' }}>
                          {card.word} — {card.translate}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <Chip label={difficultyLabels[card.difficulty]} color={difficultyColors[card.difficulty]} size="small" />
                          <IconButton onClick={() => openDialog(card)}><Edit /></IconButton>
                          <IconButton color="error" onClick={() => handleDeleteCard(card.id)}><Delete /></IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {/* Card Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingCard ? 'Edit Card' : 'Add Card'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Word"
            value={cardForm.word}
            onChange={(e) => setCardForm({ ...cardForm, word: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Translation"
            value={cardForm.translate}
            onChange={(e) => setCardForm({ ...cardForm, translate: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Difficulty"
            value={cardForm.difficulty}
            onChange={(e) => setCardForm({ ...cardForm, difficulty: e.target.value })}
            margin="normal"
          >
            {[1,2,3,4,5].map(i => <MenuItem key={i} value={i}>{difficultyLabels[i]}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveCard}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Deck Dialog */}
      <Dialog open={deckDialogOpen} onClose={closeDeckDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Deck</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Deck Name"
            value={deckForm.name}
            onChange={(e) => setDeckForm({ ...deckForm, name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description (optional)"
            value={deckForm.description}
            onChange={(e) => setDeckForm({ ...deckForm, description: e.target.value })}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeckDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveDeck}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
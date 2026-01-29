import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Card, CardContent, Chip, CircularProgress, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select,
  FormControl, InputLabel
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import api from '../../api/axiosConfig';

export default function DeckView() {
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [deckDetails, setDeckDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  
  // Фильтрация
  const [sortBy, setSortBy] = useState('time'); // 'time' или 'difficulty'
  const [filterDifficulty, setFilterDifficulty] = useState('all'); // 'all' или 1-5
  
  // State для модалки редактирования
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [editForm, setEditForm] = useState({
    word: '',
    translate: '',
    difficulty: 1
  });

  // State для модалки добавления
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    word: '',
    translate: '',
    difficulty: 1
  });
  
  const navigate = useNavigate();

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
    // Сброс фильтров при выборе новой колоды
    setSortBy('time');
    setFilterDifficulty('all');
  }

  function handleLearn() {
    if (selectedDeck) {
      navigate(`/decks/${selectedDeck.id}/learn`);
    }
  }

  async function handleDeleteDeck(e, deckId) {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await api.delete(`/decks/${deckId}/`);
        loadDecks();
        if (selectedDeck?.id === deckId) {
          setSelectedDeck(null);
          setDeckDetails(null);
        }
      } catch (error) {
        console.error('Error deleting deck:', error);
      }
    }
  }

  function handleEditDeck(e, deckId) {
    e.stopPropagation();
    navigate(`/decks/${deckId}/edit`);
  }

  async function handleDeleteCard(cardId) {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await api.delete(`/cards/${cardId}/`);
        loadDeckDetails(selectedDeck.id);
        loadDecks();
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  }

  function handleEditCard(card) {
    setEditingCard(card);
    setEditForm({
      word: card.word,
      translate: card.translate,
      difficulty: card.difficulty
    });
    setEditDialogOpen(true);
  }

  function handleCloseEditDialog() {
    setEditDialogOpen(false);
    setEditingCard(null);
    setEditForm({ word: '', translate: '', difficulty: 1 });
  }

  function handleEditFormChange(field, value) {
    setEditForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSaveEdit() {
    try {
      await api.patch(`/cards/${editingCard.id}/`, editForm);
      handleCloseEditDialog();
      loadDeckDetails(selectedDeck.id);
      loadDecks();
    } catch (error) {
      console.error('Error updating card:', error);
      alert('Failed to update card');
    }
  }

  // Добавление новой карточки
  function handleOpenAddDialog() {
    setAddForm({ word: '', translate: '', difficulty: 1 });
    setAddDialogOpen(true);
  }

  function handleCloseAddDialog() {
    setAddDialogOpen(false);
    setAddForm({ word: '', translate: '', difficulty: 1 });
  }

  function handleAddFormChange(field, value) {
    setAddForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSaveAdd() {
    if (!addForm.word.trim() || !addForm.translate.trim()) {
      alert('Please fill in both word and translation');
      return;
    }

    try {
      await api.post('/cards/', {
        ...addForm,
        deck: selectedDeck.id
      });
      handleCloseAddDialog();
      loadDeckDetails(selectedDeck.id);
      loadDecks();
    } catch (error) {
      console.error('Error adding card:', error);
      alert('Failed to add card');
    }
  }

  // Фильтрация и сортировка карточек
  function getFilteredAndSortedCards() {
    if (!deckDetails || !deckDetails.cards) return [];

    let cards = [...deckDetails.cards];

    // Фильтрация по сложности
    if (filterDifficulty !== 'all') {
      cards = cards.filter(card => card.difficulty === parseInt(filterDifficulty));
    }

    // Сортировка
    if (sortBy === 'time') {
      cards.sort((a, b) => new Date(b.time_create) - new Date(a.time_create));
    } else if (sortBy === 'difficulty') {
      cards.sort((a, b) => a.difficulty - b.difficulty);
    }

    return cards;
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
        <CircularProgress size={80} />
      </Box>
    );
  }

  const filteredCards = getFilteredAndSortedCards();

  return (
    <>
      <Box sx={{ 
        display: 'flex', 
      }}>
        {/* LEFT PANEL - Deck List */}
        <Box sx={{ 
          width: '600px',
          borderRight: '2px solid rgba(255, 255, 255, 0.12)',
          overflowY: 'auto',
          padding: 4
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 4
          }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
              My Decks
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/decks/create')}
              sx={{ fontSize: '1.1rem', padding: '12px 24px' }}
            >
              + Create New
            </Button>
          </Box>

          {decks.length === 0 ? (
            <Box sx={{ textAlign: 'center', padding: 6 }}>
              <Typography variant="h5" color="text.secondary">
                You don't have any decks yet
              </Typography>
              <Button 
                variant="outlined" 
                size="large"
                sx={{ marginTop: 3, fontSize: '1.1rem' }}
                onClick={() => navigate('/decks/create')}
              >
                Create your first deck
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {decks.map(deck => (
                <Card 
                  key={deck.id}
                  onClick={() => handleDeckClick(deck)}
                  sx={{ 
                    cursor: 'pointer',
                    border: selectedDeck?.id === deck.id ? '3px solid #1976d2' : '2px solid rgba(255, 255, 255, 0.12)',
                    backgroundColor: selectedDeck?.id === deck.id ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }
                  }}
                >
                  <CardContent sx={{ padding: 3, '&:last-child': { paddingBottom: 3 } }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                          {deck.name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" sx={{ marginTop: 1 }}>
                          {deck.cards_count} words
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton 
                          onClick={(e) => handleEditDeck(e, deck.id)}
                          sx={{ marginRight: 1 }}
                          size="large"
                        >
                          <Edit fontSize="large" />
                        </IconButton>
                        <IconButton 
                          onClick={(e) => handleDeleteDeck(e, deck.id)}
                          color="error"
                          size="large"
                        >
                          <Delete fontSize="large" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>

        {/* RIGHT PANEL - Deck Details */}
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          padding: 5
        }}>
          {!selectedDeck ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column'
            }}>
              <Typography variant="h2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                Select a Deck
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ marginTop: 2 }}>
                Click on a deck on the left to view its contents
              </Typography>
            </Box>
          ) : detailsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 6 }}>
              <CircularProgress size={80} />
            </Box>
          ) : deckDetails ? (
            <Box>
              {/* Header with buttons */}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 3
              }}>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                    {deckDetails.name}
                  </Typography>
                  {deckDetails.description && (
                    <Typography variant="h5" color="text.secondary" sx={{ marginTop: 2 }}>
                      {deckDetails.description}
                    </Typography>
                  )}
                  <Typography variant="h6" color="text.secondary" sx={{ marginTop: 2 }}>
                    {filteredCards.length} of {deckDetails.cards?.length || 0} words
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={handleOpenAddDialog}
                    startIcon={<Add />}
                    sx={{ fontSize: '1.1rem', padding: '12px 24px' }}
                  >
                    Add Card
                  </Button>
                  <Button 
                    variant="contained" 
                    size="large"
                    onClick={handleLearn}
                    disabled={!deckDetails.cards || deckDetails.cards.length === 0}
                    sx={{ fontSize: '1.2rem', padding: '14px 32px' }}
                  >
                    Study
                  </Button>
                </Box>
              </Box>

              {/* Filters */}
              {deckDetails.cards && deckDetails.cards.length > 0 && (
                <Box sx={{ 
                  display: 'flex', 
                  gap: 3, 
                  marginBottom: 4,
                  alignItems: 'center'
                }}>
                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel sx={{ fontSize: '1.1rem' }}>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      label="Sort By"
                      sx={{ fontSize: '1.1rem' }}
                    >
                      <MenuItem value="time" sx={{ fontSize: '1.1rem' }}>Recent First</MenuItem>
                      <MenuItem value="difficulty" sx={{ fontSize: '1.1rem' }}>By Difficulty</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel sx={{ fontSize: '1.1rem' }}>Difficulty</InputLabel>
                    <Select
                      value={filterDifficulty}
                      onChange={(e) => setFilterDifficulty(e.target.value)}
                      label="Difficulty"
                      sx={{ fontSize: '1.1rem' }}
                    >
                      <MenuItem value="all" sx={{ fontSize: '1.1rem' }}>All</MenuItem>
                      <MenuItem value="1" sx={{ fontSize: '1.1rem' }}>Very Easy</MenuItem>
                      <MenuItem value="2" sx={{ fontSize: '1.1rem' }}>Easy</MenuItem>
                      <MenuItem value="3" sx={{ fontSize: '1.1rem' }}>Medium</MenuItem>
                      <MenuItem value="4" sx={{ fontSize: '1.1rem' }}>Hard</MenuItem>
                      <MenuItem value="5" sx={{ fontSize: '1.1rem' }}>Very Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Word list */}
              {!deckDetails.cards || deckDetails.cards.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  padding: 6,
                  border: '3px dashed rgba(255, 255, 255, 0.12)',
                  borderRadius: 3
                }}>
                  <Typography variant="h4" color="text.secondary">
                    This deck has no words yet
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="large"
                    onClick={handleOpenAddDialog}
                    sx={{ marginTop: 3, fontSize: '1.1rem' }}
                  >
                    Add First Word
                  </Button>
                </Box>
              ) : filteredCards.length === 0 ? (
                <Box sx={{ 
                  textAlign: 'center', 
                  padding: 6,
                  border: '3px dashed rgba(255, 255, 255, 0.12)',
                  borderRadius: 3
                }}>
                  <Typography variant="h4" color="text.secondary">
                    No words match the selected filters
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 3,
                  alignItems: 'center',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {filteredCards.map(card => (
                    <Card key={card.id} sx={{ 
                      width: '100%',
                      borderRadius: 4
                    }}>
                      <CardContent sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 4,
                        '&:last-child': { paddingBottom: 4 }
                      }}>
                        <Box sx={{ flex: 1, textAlign: 'center' }}>
                          <Typography variant="h4" sx={{ fontWeight: 500 }}>
                            {card.word} — {card.translate}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Chip 
                            label={getDifficultyLabel(card.difficulty)} 
                            color={getDifficultyColor(card.difficulty)}
                            sx={{ fontSize: '1rem', padding: '20px 12px' }}
                          />
                          <IconButton 
                            onClick={() => handleEditCard(card)}
                            size="large"
                          >
                            <Edit fontSize="large" />
                          </IconButton>
                          <IconButton 
                            onClick={() => handleDeleteCard(card.id)}
                            color="error"
                            size="large"
                          >
                            <Delete fontSize="large" />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          ) : null}
        </Box>
      </Box>

      {/* EDIT CARD DIALOG */}
      <Dialog 
        open={editDialogOpen} 
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Edit Card
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px !important' }}>
          <TextField
            fullWidth
            label="Word"
            value={editForm.word}
            onChange={(e) => handleEditFormChange('word', e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2 }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          />
          <TextField
            fullWidth
            label="Translation"
            value={editForm.translate}
            onChange={(e) => handleEditFormChange('translate', e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2 }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          />
          <TextField
            fullWidth
            select
            label="Difficulty"
            value={editForm.difficulty}
            onChange={(e) => handleEditFormChange('difficulty', e.target.value)}
            margin="normal"
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          >
            <MenuItem value={1} sx={{ fontSize: '1.1rem' }}>Very Easy</MenuItem>
            <MenuItem value={2} sx={{ fontSize: '1.1rem' }}>Easy</MenuItem>
            <MenuItem value={3} sx={{ fontSize: '1.1rem' }}>Medium</MenuItem>
            <MenuItem value={4} sx={{ fontSize: '1.1rem' }}>Hard</MenuItem>
            <MenuItem value={5} sx={{ fontSize: '1.1rem' }}>Very Hard</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button 
            onClick={handleCloseEditDialog}
            size="large"
            sx={{ fontSize: '1.1rem' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveEdit} 
            variant="contained"
            size="large"
            sx={{ fontSize: '1.1rem' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* ADD CARD DIALOG */}
      <Dialog 
        open={addDialogOpen} 
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          Add New Card
        </DialogTitle>
        <DialogContent sx={{ paddingTop: '20px !important' }}>
          <TextField
            fullWidth
            label="Word"
            value={addForm.word}
            onChange={(e) => handleAddFormChange('word', e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2 }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          />
          <TextField
            fullWidth
            label="Translation"
            value={addForm.translate}
            onChange={(e) => handleAddFormChange('translate', e.target.value)}
            margin="normal"
            sx={{ marginBottom: 2 }}
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          />
          <TextField
            fullWidth
            select
            label="Difficulty"
            value={addForm.difficulty}
            onChange={(e) => handleAddFormChange('difficulty', e.target.value)}
            margin="normal"
            InputProps={{ style: { fontSize: '1.2rem' } }}
            InputLabelProps={{ style: { fontSize: '1.1rem' } }}
          >
            <MenuItem value={1} sx={{ fontSize: '1.1rem' }}>Very Easy</MenuItem>
            <MenuItem value={2} sx={{ fontSize: '1.1rem' }}>Easy</MenuItem>
            <MenuItem value={3} sx={{ fontSize: '1.1rem' }}>Medium</MenuItem>
            <MenuItem value={4} sx={{ fontSize: '1.1rem' }}>Hard</MenuItem>
            <MenuItem value={5} sx={{ fontSize: '1.1rem' }}>Very Hard</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions sx={{ padding: 3 }}>
          <Button 
            onClick={handleCloseAddDialog}
            size="large"
            sx={{ fontSize: '1.1rem' }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveAdd} 
            variant="contained"
            size="large"
            sx={{ fontSize: '1.1rem' }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
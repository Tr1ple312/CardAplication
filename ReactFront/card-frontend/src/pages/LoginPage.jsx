import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(username, password);
    
    if (result.success) {
      navigate('/');  // перенаправляем на главную
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 400, 
      margin: '100px auto', 
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <Typography variant="h4">Log in</Typography>
      
      {error && <Alert severity="error">{error}</Alert>}
      
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
        />
        
        <TextField
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        
        <Button 
          fullWidth 
          variant="contained" 
          type="submit"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? 'Log in...' : 'Log in'}
        </Button>
      </form>
    </Box>
  );
}
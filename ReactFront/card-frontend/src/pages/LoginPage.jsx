import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { BOX_STYLES } from '../Components/constans';
import { Link } from 'react-router-dom';


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
      navigate('/');  
    } else {
      setError('Incorrect password or login');
    }
  };

  return (
    <Box sx={BOX_STYLES.centerColumn}>
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
          {loading ? 'Loading...' : 'Log in'}
        </Button>

        <Typography sx={{ mt: 2, textAlign: 'center' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#7919d2' }}>Register</Link>
        </Typography>
      </form>
    </Box>
  );
}
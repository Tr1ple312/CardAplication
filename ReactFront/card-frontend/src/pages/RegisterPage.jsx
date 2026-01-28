import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { BOX_STYLES } from '../Components/constans';
import { Link } from 'react-router-dom';



export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPassword_confirm] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const {register, loading} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if(password !== password_confirm){
            setError('Password do not match')
            return;
        }
        
        const result = await register(username, password, password_confirm, email);
        if (result.success) {
            navigate('/login');  
        } else {
            setError(Object.values(result.error)[0][0]);
        }
    };

    return(
        <Box sx={BOX_STYLES.login_register}>
            <Typography variant="h4">Register</Typography>
            
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

                <TextField
                    fullWidth
                    type="password"
                    label="Confirm your password"
                    value={password_confirm}
                    onChange={(e) => setPassword_confirm(e.target.value)}
                    margin="normal"
                />

                <TextField
                    fullWidth
                    type="email"
                    label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />

                <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit"
                    disabled={loading}
                    sx={{ mt: 2 }}
                >
                    {loading ? 'Loading...' : 'Register'}
                </Button>

                <Typography sx={{ mt: 2, textAlign: 'center' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#7919d2' }}>Login</Link>
                </Typography>
            </form>
        </Box>
    )
}
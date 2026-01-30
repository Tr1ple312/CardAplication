import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6a5acd', 
    },
    secondary: {
      main: '#ffb347', 
    },
    background: {
      default: '#f9f9fb', 
      paper: '#e0e6f1', 
    },
    text: {
      primary: '#2b2b3a', 
      secondary: '#555770', 
    },
    success: {
      main: '#43a047',
    },
    error: {
      main: '#e53935',
    },
    warning: {
      main: '#fbc02d', 
    },
    info: {
      main: '#29b6f6', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default lightTheme;


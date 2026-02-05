import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#6272a4',  
    },
    secondary: {
      main: '#50fa7b',   
    },
    background: {
      default: '#1e1e2f', 
      paper: '#323261',   
    },
    text: {
      primary: '#f8f8f2', 
      secondary: '#bd93f9', 
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default darkTheme


import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',  // это ключевой момент!
    primary: {
      main: '#6272a4',   // основной цвет
    },
    secondary: {
      main: '#50fa7b',   // дополнительный цвет
    },
    background: {
      default: '#1e1e2f', // фон страницы
      paper: '#323261',   // фон карточек
    },
    text: {
      primary: '#f8f8f2', // основной текст
      secondary: '#bd93f9', // дополнительный
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default darkTheme


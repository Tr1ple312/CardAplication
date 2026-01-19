import CenteredLayout from "../layouts/CenteredLayout";
import WordCard from "./Components/CardComponent/";
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "./themes/datkTheme";
import AppBar from "./Components/AppBar";

function App() {
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />   
    <AppBar />

      <CenteredLayout>
        <WordCard word={'hello'} meaning={'Привет'} />
      </CenteredLayout>
    </ThemeProvider>
  );
}

export default App;

// TODO: фикс бага с обработчиком ENTER (если посмотреть перевод до     проверки слова и нажать ENTER карточка не переворачивается)

// TODO: анимация перворачивания карточки

// TODO: Добавление иконки сложности слова на карточку 

// TODO: другие страницы 


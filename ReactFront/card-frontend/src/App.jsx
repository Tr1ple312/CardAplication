import CenteredLayout from "../layouts/CenteredLayout";
import WordCard from "./Components/CardComponent/";
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "./themes/datkTheme";
import AppBar from "./Components/AppBar";
import LightningTest from "./Tests/ListRendering";
import CardDeck from "./Components/CardDeck/CardDeck"; 

function App() {
  return (

    // <LightningTest></LightningTest>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />   
    <AppBar />

      <CenteredLayout>
        <CardDeck/>
      </CenteredLayout>
    </ThemeProvider>
  );
}

export default App;

// TODO: фикс бага с обработчиком ENTER (если посмотреть перевод до  проверки слова и нажать ENTER карточка не переворачивается)

// TODO: анимация перворачивания карточки

// TODO: Добавление иконки сложности слова на карточку 

// TODO: другие страницы 


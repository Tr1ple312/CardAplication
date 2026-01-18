import CenteredLayout from "../layouts/CenteredLayout";
import WordCard from "./Components/CardComponent/";
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "./themes/datkTheme";
import AppBar from "./Components/AppBar";
import CardDeck from "./Tests/ListRendering";

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

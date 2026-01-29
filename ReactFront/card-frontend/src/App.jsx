import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "./themes/datkTheme";
import AppBar from "./Components/AppBar";
import CenteredLayout from "../layouts/CenteredLayout";
import CardDeck from "./Components/CardDeck/CardDeck";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from './pages/context/AuthContext';
import RegisterPage from "./pages/RegisterPage";
import DeckView from "./Components/MainPages/DeckViewPage"
import FullPageLayout from '../layouts/FullPageLayout';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>  
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>  
          <AppBar />
          
          <Routes>
            <Route path="/login" element={
              <CenteredLayout>
                <LoginPage />
              </CenteredLayout>
            }
          />

          <Route path='/register' element={
            <CenteredLayout>
              <RegisterPage />
            </CenteredLayout>
          }
          />
      
          <Route path="/decks/:deckId/learn" element={
            <ProtectedRoute>
              <CenteredLayout>
                <CardDeck />
              </CenteredLayout>
            </ProtectedRoute>
          }
          />

          <Route path="/" element={
            <ProtectedRoute>
              <FullPageLayout>
                <DeckView />
              </FullPageLayout>
            </ProtectedRoute>
          }
          />
          
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;


// TODO: анимация перворачивания карточки

// TODO: страница добавления карточек и создания колод

// TODO: 3 docker контейнера 

// TODO: 2 тема

// TODO: фикс бага с обработчиком ENTER (если посмотреть перевод до  проверки слова и нажать ENTER карточка не переворачивается)

// TODO: подсветка полей при ошибках во время регистрации 



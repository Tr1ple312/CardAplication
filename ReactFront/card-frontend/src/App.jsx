import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from "./themes/datkTheme";
import AppBar from "./Components/AppBar";
import CenteredLayout from "../layouts/CenteredLayout";
import CardDeck from "./Components/CardDeck/CardDeck";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from './pages/context/AuthContext';

// Защищённый роут
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>  {/* ← ПЕРЕСТАВЬ СЮДА */}
        <AuthProvider>  {/* ← А ЭТО СЮДА */}
          <AppBar />
          
          <Routes>
            <Route path="/login" element={
              <CenteredLayout>
                <LoginPage />
              </CenteredLayout>
            } />
            
            <Route path="/" element={
              <ProtectedRoute>
                <CenteredLayout>
                  <CardDeck />
                </CenteredLayout>
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// TODO: фикс бага с обработчиком ENTER (если посмотреть перевод до  проверки слова и нажать ENTER карточка не переворачивается)

// TODO: анимация перворачивания карточки

// TODO: Добавление иконки сложности слова на карточку 

// TODO: другие страницы 


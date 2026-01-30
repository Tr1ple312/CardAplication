import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import logo from "../assets/logo.png";
import { useAuth } from '../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';


const pages = ['decks'];

function ResponsiveAppBar({ isDarkMode, toggleTheme }) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { logout, username, isAuthenticated } = useAuth();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
  toggleTheme();
  };

  const handlePageClick = () => {
    navigate(`/`);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <img 
            src={logo} 
            style={{ height: 75, filter: 'invert(1)', cursor: 'pointer' }} 
            onClick={() => navigate('/')}
          />

          {/* Меню для десктопа */}
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageClick(page)}
                sx={{ my: 3, color: 'white', display: 'block', fontSize: '1.5rem' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Иконка переключения темы */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={handleThemeToggle} 
              sx={{ color: 'white' }}
              size="large"
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* Условный рендеринг: username или кнопка регистрации */}
            {isAuthenticated ? (
              <>
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{ 
                    color: 'white', 
                    fontSize: '1.3rem',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  {username}
                </Button>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.3rem' }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                variant="outlined"
                onClick={() => navigate('/register')}
                sx={{ 
                  color: 'white',
                  borderColor: 'white',
                  fontSize: '1.2rem',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Register
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

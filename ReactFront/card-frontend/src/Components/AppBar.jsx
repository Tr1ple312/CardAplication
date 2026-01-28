import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from "../assets/logo.png";
import { useAuth } from '../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';


const pages = ['decks', 'learn']
const settings = ['Profile', 'Settings', 'Logout']

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();

    if (setting === 'Logout') {
      logout()
      navigate('/login')
    }
  }


 return (
    <AppBar position="static">
      <Container maxWidth="false">
        <Toolbar disableGutters>
          <img src={logo} style={{ height: 75, filter: 'invert(1)' }} />

          {/* Меню для десктопа */}
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseUserMenu}
                sx={{ my: 3, color: 'white', display: 'block', fontSize: '1.5rem'}}
              >
                {page}
              </Button>
            ))}
          </Box>



          {/* Аватар пользователя */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() =>handleMenuClick(setting)}>
                  <Typography sx={{ textAlign: 'center', fontSize: '1.5rem' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

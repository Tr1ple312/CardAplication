import * as React from 'react';
import logo from "../assets/logo.png";
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


const pages = ['decks', 'learn']
const settings = ['Profile', 'Settings', 'Logout']

function ResponsiveAppBar() {

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget)
    }
    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    return(
        <AppBar position='static'>
            <Container maxWidth="false">
                <Toolbar disableGutters sx={{minHeight: 32,height: 32 }}>
                    <img src={logo} style={{ height: 30, filter: 'invert(1)' }}/>

                    <Typography>

                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { usePathname, useRouter } from 'next/navigation';
import { Fira_Sans_Condensed } from 'next/font/google';
import useLogout from '@core/auth/useLogout';
import useGetSession from '@core/auth/useGetSession';
import Image from 'next/image';

const fira_sans_600 = Fira_Sans_Condensed({ weight: ['600'], subsets: ['latin'] });

function TopBarAdmin() {
    const path = usePathname();
    const router = useRouter();
    const session = useGetSession();

    const pages = ['Report', 'Review', 'Verification'];
    const settings = ['Logout'];

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (path.includes('checkout')) {
        return null;
    }

    return (
        <AppBar id="topbar" position="static" sx={{ backgroundColor: '#82A9BB', boxShadow: 'none', height: 'auto' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* START LARGE TABS OF LOGO */}
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            height: '100%',
                            px: '3%',
                            color: 'black',
                            position: 'relative',
                        }}
                    >
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: fira_sans_600.style.fontFamily,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PETPAL
                        </Typography> */}
                        <Image
                            src={'https://drive.google.com/uc?id=1Htzur4wU7MddA1xVm2jeH2U1UKFpsA2J'}
                            alt={'Petpal Logo'}
                            width={130}
                            height={250}
                            style={{ objectFit: 'fill' }}
                        />
                    </Box>
                    {/* END LARGE TABS OF LOGO */}

                    {/* START SMALL TABS OF NAVIGATION */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu;
                                        router.push(`/admin/${page.toLowerCase().replace(' ', '-')}`);
                                    }}
                                >
                                    <Typography textAlign="center" sx={{ fontFamily: fira_sans_600.style.fontFamily }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* END SMALL TABS OF NAVIGATION */}

                    {/* START SMALL TABS OF MIDDLE LOGO */}
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: fira_sans_600.style.fontFamily,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PETPAL
                    </Typography>
                    {/* END SMALL TABS OF MIDDLE LOGO */}

                    {/* START LARGE TABS OF NAVIGATION */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Box
                                key={page}
                                sx={{
                                    borderBottom: path.includes(page.toLowerCase().replace(' ', '-'))
                                        ? '3px solid #121E26'
                                        : 'none',
                                    px: '2%',
                                    whiteSpace: 'pre',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        handleCloseNavMenu;
                                        router.push(`/admin/${page.toLowerCase().replace(' ', '-')}`);
                                    }}
                                    sx={{
                                        px: '1%',
                                        my: 2,
                                        color: path.includes(page.toLowerCase().replace(' ', '-'))
                                            ? '#121E26'
                                            : '#D5E2EB',
                                        letterSpacing: '.1rem',
                                        display: 'block',
                                        fontFamily: fira_sans_600.style.fontFamily,
                                        fontSize: 16,
                                    }}
                                >
                                    {page}
                                </Button>
                            </Box>
                        ))}
                    </Box>
                    {/* END LARGE TABS OF NAVIGATION */}

                    {/* START USER SETTINGS */}
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
                                <MenuItem
                                    key={setting}
                                    onClick={() => {
                                        if (setting.toLowerCase() === 'logout') {
                                            useLogout();
                                            return router.push('/admin/login');
                                        }
                                        return router.push(`/admin/${setting.toLowerCase()}`);
                                    }}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: '#CCB2B2',
                                        },
                                    }}
                                >
                                    <Typography fontFamily={fira_sans_600.style.fontFamily} textAlign="center">
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* END USER SETTINGS */}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default TopBarAdmin;

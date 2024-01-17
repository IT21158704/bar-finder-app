import React, { useEffect, useState } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import StickyFooter from '../../components/Footer/StickyFooter'
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Avatar from '@mui/material/Avatar';
import authAxios from '../../utils/authAxios';
import { apiUrl } from '../../utils/Constants';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';
import { sellerListItems, customerListItems, guestListItems } from '../../components/listItems';
import { Outlet, useNavigate } from 'react-router-dom';
import { ClickOutHandler } from 'react-clickout-ts';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {

  const navigate = useNavigate();
  const [navLinks, setNavlinks] = useState(guestListItems);
  const { logout, userRole } = useAuth();
  const [open, setOpen] = React.useState(true);
  const [userOpen, setUserOpen] = useState(false);
  const [userAPI, setuserAPI] = useState('');
  const [user, setUser] = useState({
    firstName: 'Null',
    lastName: 'Null',
  });


  const [auth, setAuth] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const toggleNotification = () => {
    setUserOpen(!userOpen);
  };
  // Function to handle closing the dialog
  const handleClickOut = () => {
    setUserOpen(false);
  };

  useEffect(() => {
    switch (userRole) {
      case "store": //Admin
        setNavlinks(sellerListItems);
        if (userAPI != null) {
          setuserAPI('seller')
          setAuth(true);
        }
        break;
      case "customer": //Support
        if (userAPI != null) {
          setuserAPI('customer')
          setAuth(true);
        }
        setNavlinks(customerListItems);
        break;
      default:
        setNavlinks(guestListItems)
        navigate("/");
    }

  }, []);

  const getUserDetails = async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/get-user`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('user profile not found.');
      } else {
        // toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  useEffect(() => {
    getUserDetails()
    console.log(user);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {userRole == 'store' ? 'Store Dashboard' : 'Bar Finder'}
            </Typography>

            {auth ? (
              <IconButton color="inherit" onClick={toggleNotification}>
                <Badge>
                  <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
                </Badge>
              </IconButton>
            ) : (
              <div>
                <Button variant="text" onClick={() => navigate('signup')} color="inherit">
                  Signup
                </Button>
                <Button variant="text" onClick={() => navigate('login')} color="inherit">
                  Login
                </Button>
              </div>
            )}


          </Toolbar>

          <ClickOutHandler onClickOut={handleClickOut}>
            <Box sx={{ position: 'absolute', boxShadow: '0 10px 10px rgba(0, 0, 0, 0.2)', top: '60px', right: '20px', background: 'white', color: 'black', padding: '20px', borderRadius: '10px' }} visibility={userOpen ? 'visible' : 'hidden'}>
              <List component="nav" sx={{ width: '300px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <Typography variant='subtitle1'>{user.firstName} {user.lastName}</Typography>
                  <Typography>{userRole}</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />

                <div>
                  <Button size="small" onClick={() => navigate('profile')}>Profile</Button>
                </div>

                <div>
                  <Button size="small" onClick={() => logout()}>Logout</Button>
                </div>

              </List>
            </Box>
          </ClickOutHandler>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {navLinks}
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Outlet />
            <StickyFooter sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
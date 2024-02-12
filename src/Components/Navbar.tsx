import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import ShoppingCard from './CartComponent/ShoppingCard';
import Login from '../Screens/Login';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { useDispatchAuth } from '../contexts/AuthContext';
import { User } from '../utils/interfaces';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import SupportIcon from '@mui/icons-material/Support';

interface NavbarProps {
  isHomepage: boolean;
  isAuthenticated: boolean; 
  onLoginSuccess: () => void; 
  onLogout: () => void; 
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: -7,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

export default function Navbar({ isHomepage, isAuthenticated, onLoginSuccess, onLogout }: NavbarProps) {  
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const cartState = useCart();
  const totalQuantity = cartState.items.reduce((total, item) => total + item.quantity, 0);
  const dispatchAuth = useDispatchAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      onLoginSuccess(); 
    }
  }, [onLoginSuccess]);


  const handleLogin = (user: User) => {
    localStorage.setItem('token', 'dummyToken');
    onLoginSuccess(); 
    setLoginOpen(false);
    dispatchAuth({ type: 'LOGIN', payload: user }); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); 
    setCartOpen(false); 
    setLoginOpen(false); 
  };

  const handleCartClick = () => {
    if (cartState.items.length === 0) {
      navigate('/emptycart');
    } else {
      setCartOpen(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar component="nav" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <RestaurantMenuIcon fontSize="large" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          {isHomepage ? 'Taste4U' : 'Secure Checkout'}
        </Typography>
        {isHomepage ? (
          <>
            <Button color="inherit" className="button" onClick={handleCartClick}>
              <StyledBadge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
              Cart
            </Button>
            <Drawer anchor="right" open={isCartOpen} onClose={() => setCartOpen(false)}>
              <ShoppingCard showCheckoutButton={true} />
            </Drawer>
          </>
        ) : (
          <Button color="inherit" className="button" style={{ marginRight: 5 }}>
            <SupportIcon /> Help
          </Button>
        )}
        {isAuthenticated ? (          <>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => setLoginOpen(true)}>
            Login
          </Button>
        )}

        <Drawer PaperProps={{ sx: { width: '40%' } }} anchor="right" open={isLoginOpen} onClose={() => setLoginOpen(false)}>
          <Login showImage={true} onLogin={handleLogin} />
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

import React,{useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCard from './CartComponent/ShoppingCard';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Login from '../Screens/Login';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";
import{ useCart} from '../Components/CartContext'




const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 10,
    top: -7,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function Navbar() {
  const [isCartOpen, setCartOpen] = React.useState(false); 
  const [isLoginOpen, setLoginOpen] = React.useState(false); 

  const [searchEnabled, setSearchEnabled] = React.useState(false);
  const navigate = useNavigate()

  const handleSearchIconClick = () => {
    setSearchEnabled(true);
  };
  
  const cartState = useCart();
  const totalQuantity = cartState.items.reduce((total, item) => total + item.quantity, 0);
  useEffect(() => {
    // Simulating fetching data from a database (replace with your actual API call)
    
  }, []);
  const handleCartClick = () => {
    // Check if the cart is empty
    if (cartState.items.length === 0) {
      // Navigate to the cart page if it's empty
      navigate('/emptycart');
    } else {
      // Open the drawer if the cart has items
      setCartOpen(true);
    }
  };
  
  return (
    <AppBar component="nav" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <RestaurantMenuIcon fontSize='large'/>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Taste4U
        </Typography>

        {searchEnabled ? (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        ) : (
          <Button color="inherit" onClick={handleSearchIconClick}>
            <SearchIcon />
          </Button>
        )}
        <Button
          color="inherit"
          className="button"
          onClick={handleCartClick} 
        >
          <StyledBadge badgeContent={totalQuantity} color="secondary">
            <ShoppingCartIcon />
          </StyledBadge>              
          Cart
        </Button>
        <Drawer 
          anchor="right" 
          open={isCartOpen} 
          onClose={() => setCartOpen(false)} 
        >
          <ShoppingCard />
        </Drawer>
        
        <Button color="inherit" onClick={() => setLoginOpen(true)}>
          Login
        </Button>
        
        <Drawer
          PaperProps={{
            sx: { width: "40%" },
          }}
          anchor='right'
          open={isLoginOpen} 
          onClose={() => setLoginOpen(false)} 
        >
          <Login />
        </Drawer>
          
      </Toolbar>
    </AppBar>
  );
}




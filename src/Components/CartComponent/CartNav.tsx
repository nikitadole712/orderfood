import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Login from '../../Screens/Login';
import SupportIcon from '@mui/icons-material/Support';




export default function CartNav() {
  const [isLoginOpen, setLoginOpen] = React.useState(false); 
  
  
  return (
    <AppBar component="nav" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <RestaurantMenuIcon fontSize='large' style={{marginLeft: 160}}/>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' , marginLeft: 10} }}
        >
          Secure Checkout
        </Typography>
        <Button
          color="inherit"
          className="button"
          style={{marginRight: 5}}
        >
            <SupportIcon /> Help
        </Button>
        
        <Button color="inherit" onClick={() => setLoginOpen(true)} style={{marginRight: 200}}>
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
            <Login showImage={true}/>
        </Drawer>
          
      </Toolbar>
    </AppBar>
  );
}




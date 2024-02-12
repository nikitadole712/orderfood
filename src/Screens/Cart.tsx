import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import CartAccount from '../Components/CartComponent/CartAccount';
import CartAddress from '../Components/CartComponent/CartAddress';
import CartPayment from '../Components/CartComponent/CartPayment';
import Navbar from '../Components/Navbar';
import ShoppingCard from '../Components/CartComponent/ShoppingCard';

export default function Cart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleNextButtonClick = () => {
    setIsNextClicked(true);
  };

  return (
    <div style={{ display: 'flex' , minWidth: 800, minHeight: 80}}>
      <Navbar isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} isHomepage={false}/>

      <div style={{ marginLeft: '160px', marginTop: '100px' }}>
        <Container>
          <Stack
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: '100%',
              },
            }}
          >
            {/* Pass isAuthenticated prop to CartAccount */}
            <CartAccount isDisabled={isAuthenticated} isAuthenticated={isAuthenticated} onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />

              <CartAddress isDisabled={!isAuthenticated} isAuthenticated={isAuthenticated} onNextButtonClick={handleNextButtonClick} />
            
              <CartPayment isDisabled={!isAuthenticated || !isNextClicked} isAuthenticated={isAuthenticated}/>
            
          </Stack>
        </Container>
      </div>

      <div style={{ marginTop: '60px' }}>
        <Container
          style={{
            maxWidth: 450,
            minHeight: 700,
            alignSelf: 'flex-start',
          }}
        >
          <Paper elevation={3} square>
            <ShoppingCard showCheckoutButton={false} />
          </Paper>
        </Container>
      </div>
    </div>
  );
}

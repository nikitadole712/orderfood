import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import React, { useState } from 'react';
import CartAccount from '../Components/CartComponent/CartAccount';
import CartAddress from '../Components/CartComponent/CartAddress';
import CartPayment from '../Components/CartComponent/CartPayment';
import CartNav from '../Components/CartComponent/CartNav';
import ShoppingCard from '../Components/CartComponent/ShoppingCard';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authState = useAuth();

  const handleLoginSignupSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div style={{ display: 'flex' }}>
      <>
        <CartNav />
      </>

      <div style={{ marginLeft: '160px', marginTop: '100px' }}>
        <Container>
          <Stack
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
              },
            }}
          >
            <CartAccount />
            <Paper
              elevation={3}
              square
              style={{ maxWidth: 800, minHeight: 80 }}
            >
              <CartAddress isDisabled={!isAuthenticated} />
            </Paper>
            <Paper
              elevation={3}
              square
              style={{ maxWidth: 800, minHeight: 80 }}
            >
              <CartPayment isDisabled={!isAuthenticated} />
            </Paper>
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

import { Button, Typography } from '@mui/material';
import React from 'react';
interface Styles {
  container: React.CSSProperties;
  image: React.CSSProperties;
  text: React.CSSProperties;
}

const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh', 
  },
  image: {
    width: '271px',
    height: '256px',
  },
  text: {
    color: 'gray',
    fontSize: '14px',
  },
};

export default function EmptyCart() {
  return (
    <div style={styles.container}>
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
        alt="emptycart"
        style={styles.image}
      />
      <Typography variant="h5" style={{marginTop: '30px',fontSize: '20px',color: '#555',}}><strong>Your Cart is Empty</strong></Typography>
      <Typography variant="h6" style={styles.text}>
        You can go to the home page and discover more options
      </Typography>
      <Button variant="contained" color="secondary"style={{marginTop: '30px' ,borderRadius: 0}}>
        Find Food
      </Button>
    </div>
  );
}

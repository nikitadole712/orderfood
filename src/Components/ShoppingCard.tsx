import React, { useState , useEffect} from 'react';
import{ useCart} from './../Components/CartContext'
import { FoodItem } from '../utils/interfaces';
import {formatCurrency} from '../utils/formatCurrency'
import { Button,Typography, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction,Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';



export default function ShoppingCard() {
  
  const cartState = useCart();
  useEffect(() => {
    // Simulating fetching data from a database (replace with your actual API call)
    
  }, []);
  
  return (

    <div className='cart2'>
      <Paper style={{ marginRight: '30px', minWidth: 400, minHeight: 700}}>
        <div>
      <Typography variant='h5'style={{
    display: 'flex',
    justifyContent: 'center',
    color: 'purple',
    marginTop: '50px',

      }}>
    <strong>Basket</strong></Typography></div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md">
          <List >
          {cartState.items.map((item: FoodItem) => (
            <ListItem key={item._id} disablePadding>
              <ListItemText
                primary={item.name}
                secondary={`${item.quantity} x ${formatCurrency(item.price)}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          <Divider component="li" />

        </List>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
  <Typography variant="h6">To Pay:</Typography>
  <div style={{ minWidth: '200px' }}>
    <Typography variant="h6" style={{ textAlign: 'right' }}>
      {formatCurrency(getTotalPrice(cartState.items))}
    </Typography>
  </div>
</div>
        <div>
        <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 4 }}
            variant="contained"
            color="secondary"

          >
          Checkout
          </Button>
        </div>
      </div>
      </Paper>
    </div>
  )
}
function getTotalPrice(items: FoodItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

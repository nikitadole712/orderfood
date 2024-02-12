import React, { useEffect} from 'react';
import{ useCart} from '../CartContext'
import { FoodItem } from '../../utils/interfaces';
import {formatCurrency} from '../../utils/formatCurrency'
import { Button,Typography, List, ListItem, ListItemText,ListItemSecondaryAction, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import{ useDispatchCart} from '../CartContext'
import { Container } from '@mui/system';
import { useNavigate } from "react-router-dom";

interface ShoppingCardProps {
  showCheckoutButton: boolean;
}

export default function ShoppingCard({ showCheckoutButton }: ShoppingCardProps) {
  const cartState = useCart();
  const navigate = useNavigate()
  const dispatch = useDispatchCart();
  useEffect(() => {
    // Simulating fetching data from a database (replace with your actual API call)
    
  }, []);

  const handleIncrement = (item: FoodItem) => {
    dispatch({ type: 'INCREMENT_ITEM', payload: item });
  };

  const handleDecrement = (item: FoodItem) => {
    dispatch({ type: 'DECREMENT_ITEM', payload: item });
  };


  const totalPrice = getTotalPrice(cartState.items);

  useEffect(() => {
    // Use the cart length to navigate to the empty cart page if the cart is empty
    if (cartState.items.length === 0) {
      navigate('/emptycart'); 
    }
  }, [cartState.items, navigate]);

  return (
      <div className='cart2'>
        <Container style={{ marginRight: '30px', minWidth: 400 ,minHeight: 600}}>
          <div className="container ">
            <div>
              <Typography variant='h5' style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'purple',
                marginTop: '45px',
                marginBottom: '40px'
              }}>
                <strong>Basket</strong>
              </Typography>
            </div>
            <List>
              {cartState.items.map((item: FoodItem) => (
                <ListItem key={item._id} disablePadding>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.quantity} x ${formatCurrency(item.price)}`}
                  style={{   marginLeft: '15px' }}/>
                  <Box sx={{ display: 'flex', marginRight: 6,border: '1px solid purple',}}>
                    <Button size="small" aria-label="add" onClick={() => handleIncrement(item)}>
                      <AddIcon style={{ color:'purple'}}/>
                    </Button>
  
                    <Typography variant="body2">
                    {item.quantity}
                    </Typography>
  
                    <Button size="small" aria-label="remove" onClick={() => handleDecrement(item)}>
                      <RemoveIcon style={{ color:'purple'}}/>
                    </Button>
                  </Box>
                  <ListItemSecondaryAction>
                  <Typography color="inherit">
                {item.price * item.quantity}/-
            </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
              <Divider  />
            </List>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
              <Typography variant="h6">To Pay:</Typography>
              <div style={{ minWidth: '200px' }}>
                <Typography variant="h6" style={{ textAlign: 'right' }}>
                  {formatCurrency(totalPrice)}
                </Typography>
              </div>
            </div>
            <div>
            {showCheckoutButton && (
              <Button
                type="submit"
                sx={{ marginTop: 3, borderRadius: 4 ,width: '100%'}}
                variant="contained"
                color="secondary"
                onClick={()=>navigate('/cart')}
              >
              Payment
              </Button>
            )}
            </div>
          </div>
        </Container>
      </div>
    );
  }
function getTotalPrice(items: FoodItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

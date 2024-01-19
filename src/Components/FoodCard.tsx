import React, { useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Box,
  IconButton,
  Modal,
} from '@mui/material';
import { FoodItem } from '../utils/interfaces';
import CloseIcon from '@mui/icons-material/Close';
import{ useDispatchCart} from './CartContext'
import {formatCurrency} from '../utils/formatCurrency';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



interface IProps {
  item: FoodItem;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function FoodCard(props: IProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatchCart();
  const [openSnack, setOpensnack] = React.useState(false);


  const item = props.item;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpensnack(false);
  };


  const handleAddToCart = () => {
    setOpensnack(true);
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  return (
    <div>
      <Card style={{ width: '16rem' }}>
        <CardMedia sx={{ height: 120 }} image={item.img} title={item.name} />
        <CardContent style={{ maxHeight: '200px' }}>
          <CardActions>
            <Link onClick={handleOpen} color="inherit" underline="none" style={{ cursor: "pointer" }}>
              {item.name}
            </Link>
          </CardActions>
          <Typography variant="body2" color="text.secondary">
            {item.description.substring(0, 48)}...
          </Typography>
        </CardContent>
      </Card>

      <Modal open={open} onClose={handleClose}>
        <Card style={{ width: '20rem' }} sx={style}>
          <Typography gutterBottom variant="h6" component="div">
            {item.name}
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          <CardMedia sx={{ height: 150 }} title={item.name} image={item.img} />
          <CardContent style={{ maxHeight: '300px' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {item.description}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
              <Button size="small" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Typography>{formatCurrency(item.price)}/-
            </Typography>
                
              </Box>
          </CardContent>
        </Card>
      </Modal>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
>
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
Added to cart        </Alert>
      </Snackbar>
    </div>
  );
}

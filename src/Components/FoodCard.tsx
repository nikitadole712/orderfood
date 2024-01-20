import React, { useState } from 'react';
import { Modal, CardActionArea } from '@mui/material';
import { FoodItem } from '../utils/interfaces';
import { useDispatchCart } from './CartContext';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ItemCard from './base/ItemCard';

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
  const handleCloseSnack = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
      <CardActionArea onClick={() => handleOpen()}>
        <ItemCard item={item} isDetail={false} />
      </CardActionArea>
      <Modal open={open} onClose={handleClose}>
        <ItemCard
          item={item}
          isDetail={true}
          handleAddToCart={handleAddToCart}
          style={style}
        />
      </Modal>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnack}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Added to cart{' '}
        </Alert>
      </Snackbar>
    </div>
  );
}

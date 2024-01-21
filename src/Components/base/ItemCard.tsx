import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
} from '@mui/material';
import { FoodItem } from '../../utils/interfaces';
import { formatCurrency } from '../../utils/formatCurrency';

interface IProps {
  item: FoodItem;
  isDetail: boolean;
  handleAddToCart?: any;
  style?: any;
}

const typeProps = {
  Grid: {
    width: '16rem',
    contentHeight: '200px',
    mediaHeight: 120,
  },
  Detail: {
    width: '20rem',
    contentHeight: '300px',
    mediaHeight: 150,
  },
};

export default function ItemCard(props: IProps) {
  const cardProps = props.isDetail
    ? typeProps.Detail
    : typeProps.Grid;
  const item = props.item;

  const getDescription = () => {
    return props.isDetail
      ? item.description
      : item.description.substring(0, 48).concat('...');
  };

  return (
    <Card style={{ width: cardProps.width }} sx={props.style}>
      <CardHeader title={item.name} />
      <CardMedia
        sx={{ height: cardProps.mediaHeight }}
        image={item.img}
        title={item.name}
      />
      <CardContent style={{ maxHeight: cardProps.contentHeight }}>
        <Typography variant="body2" color="text.secondary">
          {getDescription()}
        </Typography>
      </CardContent>
      {props.isDetail && (
        <CardActions style={{ justifyContent: 'space-evenly' }}>
          <Button size="small" onClick={props.handleAddToCart}>
            Add to Cart
          </Button>
          <Typography>{formatCurrency(item.price)}/-</Typography>
        </CardActions>
      )}
    </Card>
  );
}

import { Paper, Typography, Grid } from '@mui/material';
import React from 'react';
import { Category } from '../utils/interfaces';
import FoodCard from './FoodCard';

interface IProps {
  cat: Category;
}

export default function CategorySection(props: IProps) {
  const items = props.cat.items;
  return (
    <div>
      <Paper
        elevation={0}
        sx={{ p: 3, margin: 3, bgcolor: '#f5f5f5' }}
      >
        <Typography
          component="h2"
          variant="h4"
          color="black"
          gutterBottom
        >
          {props.cat.name}
        </Typography>

        <Grid container spacing={4}>
          {items &&
            items.map((item) => {
              return (
                <Grid item md={3}>
                  <FoodCard item={item} />
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </div>
  );
}

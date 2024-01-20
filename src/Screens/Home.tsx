import React from 'react';
import { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Category } from '../utils/interfaces';
import CategorySection from '../Components/CategorySection';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function Home() {
  const [categories, setCategories] = useState<Category[]>();

  const loadData = async () => {
    let response = await fetch('http://localhost:5000/api/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let categories: Category[] = await response.json();
    setCategories(categories);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Container sx={{ py: 12 }}>
        {categories &&
          categories.map((cat) => {
            return <CategorySection cat={cat} />;
          })}
      </Container>
      <Footer />
    </div>
  );
}

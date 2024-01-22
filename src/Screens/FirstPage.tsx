import { FormControl } from '@mui/base';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import {
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Drawer,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { Typewriter } from 'react-simple-typewriter';
import Login from './Login';
import IcecreamTwoToneIcon from '@mui/icons-material/IcecreamTwoTone';
import React, { useState } from 'react';

export default function FirstPage() {
  const [open, setOpen] = React.useState(false);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const handleType = (count: number) => {
    console.log(count);
  };
  const [openup, setOpenup] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 20
      );
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error(error);
          alert('Unable to access location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleFindFood = () => {
    if (!location) {
      setError('Please enter a valid location.');
    } else {
      setError('');
      window.location.pathname = '/home';
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 5,
      }}
    >
      <Container sx={{ marginRight: 5, marginTop: 5 }}>
        <Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            className="mt-5"
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantMenuIcon
                sx={{
                  fontSize: '60px',
                  marginRight: '8px',
                  color: 'secondary.main',
                }}
              />{' '}
              {/* Increased icon size to 40px */}
              <Typography
                variant="h4"
                component="div"
                color="secondary.main"
              >
                <b>Taste4U</b>
              </Typography>
            </div>
          </div>
          <div className="mt-4">
            <h1
              style={{
                paddingTop: '5rem',
                margin: 'auto 0',
                fontWeight: 'normal',
              }}
            >
              {' '}
              <div
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: '40px',
                  minHeight: '4rem',
                }}
              >
                <Typewriter
                  words={[
                    'Hungry?',
                    'Movie Marathon?',
                    'Cooking gone wrong?',
                    'Game night?',
                    'Unexcepted guest?',
                    'Late night at office?',
                  ]}
                  loop={50}
                  typeSpeed={70}
                  deleteSpeed={60}
                  delaySpeed={100}
                  onType={handleType}
                />
              </div>
            </h1>
            <Typography variant="h5" color="#9e9e9e">
              Order your favourite food now.
            </Typography>
          </div>

          <FormControl className="mt-5">
            <OutlinedInput
              style={{ borderRadius: 0 }}
              type="search"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setError('');
              }}
              placeholder="Enter your delivery location..."
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    color="inherit"
                    startIcon={<MyLocationIcon />}
                    onClick={handleLocation}
                    sx={{ height: '100%', padding: '18.5px 14px' }}
                  >
                    Locate me
                  </Button>
                </InputAdornment>
              }
              sx={{ height: '60px' }}
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleFindFood}
              sx={{
                height: '61px !important',
                padding: '17px 16px',
                borderRadius: 0,
                marginBottom: '2px',
              }}
            >
              Find food
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Backdrop
              sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 100,
              }}
              open={openup}
            >
              <CircularProgress
                color="inherit"
                value={progress}
                size={80}
                thickness={4}
              />
              <IcecreamTwoToneIcon
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  size: 80,
                }}
              />
            </Backdrop>

            <Typography color="#9e9e9e" className="mt-4">
              POPULAR DISHES IN INDIA.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                mt: 4,
              }}
            >
              <Typography>Pizza</Typography>
              <Typography color="#9e9e9e">Burger</Typography>
              <Typography>Thali</Typography>
              <Typography color="#9e9e9e">Chinese</Typography>
              <Typography>Dessert</Typography>
              <Typography color="#9e9e9e">Ice-Creame</Typography>
            </Box>
          </FormControl>
        </Box>
      </Container>
      <img
        src={require('/home/vmaral/Desktop/Nikita/Projects/orderfood/src/Assets/sauce1.webp')}
        alt="Test"
        style={{ width: '130%', height: '100vh' }}
      />
    </div>
  );
}

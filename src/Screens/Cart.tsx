import React, { useState } from 'react';
import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Box, Button, Link, TextField, Typography , Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ShoppingCard from '../Components/CartComponent/ShoppingCard';
import CartNav from '../Components/CartComponent/CartNav';
import CreditCardIcon from '@mui/icons-material/CreditCard';


export default function Cart() {
  const [isSignup, setIsSignup] = useState(false);
  const [isFirstPaperVisible, setIsFirstPaperVisible] = useState(true);
  const [isSecondPaperVisible, setIsSecondPaperVisible] = useState(false);
  // Function to toggle paper visibility
  const togglePapers = () => {
    setIsFirstPaperVisible(!isFirstPaperVisible);
    setIsSecondPaperVisible(!isSecondPaperVisible);
  };

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = isSignup ? 'http://localhost:5000/signup' : 'http://localhost:5000/loginuser';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(data.message || 'Something went wrong!');
        });
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.success) {
        navigate('/home');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    })
    .catch(error => {
      console.log(error);
      setError(error.message || 'Something went wrong!');
    });
  };

  return (
   
    <div style={{ display: 'flex' }}>
 <>
     <CartNav/>
     </>
   
      <div style={{marginLeft: '160px', marginTop: '100px'}}>
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
                {isFirstPaperVisible && (
      <Paper elevation={3} square style={{maxWidth: 800, maxHeight: 200,}}>
      <div style={{ padding: '20px' }}>
          <div className='div1' style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'middle' }}>        
          <Typography variant="h5"><strong>Account</strong>
        </Typography>
        <Typography style={{ color: 'gray',marginBottom: '30px'  }}>
          To place your order now, log in to your existing account or sign up.
        </Typography>
        <Button variant="outlined" 
        color="secondary" 
        style={{ marginRight: '30px' , fontSize: '11px', borderRadius: '0' }}
        onClick={togglePapers} // Update the state when this button is clicked
        >
          Have an account?<br />
      Login
      </Button>
        <Button variant="contained" 
        color="secondary" 
        style={{ marginRight: '30px', fontSize: '11px', borderRadius: '0'  }}
        onClick={togglePapers} // Update the state when this button is clicked
        >
          New to Taste4U?
        <br />Signup
        </Button>
        </div>
        <div className='div2' style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <img 
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" 
              alt="Vegetable" 
              style={{ width: '140px', height: '140px', marginLeft: '100px' }} 
            />

</div>
</div>
      </Paper>
                )}
                          {isSecondPaperVisible && (
      <Paper elevation={3} square style={{maxWidth: 800, maxHeight: 800,}}>
      <div style={{ padding: '20px' }}>
          
          <div className='div1' style={{ display: 'inline-block', marginRight: '20px', verticalAlign: 'middle' }}>        

          <Typography variant="h5"><strong>Account</strong>
        </Typography>
        <Typography style={{ color: 'gray',marginBottom: '30px'  }}>
          To place your order now, log in to your existing account or sign up.
        </Typography>
        </div>
        <div className='div2' style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <img 
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r" 
              alt="Vegetable" 
              style={{ width: '140px', height: '140px', marginLeft: '100px' }} 
            />
</div>
<div className='divmiddle'>
<form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={'column'}
          maxWidth={500}
          
        >
          <div className= 'div1'>
          
          <Typography>
          {isSignup ? 'Sign up' : 'Login'} {isSignup ? 'or ' : 'or '}
  <Link
    onClick={() => setIsSignup(!isSignup)}
    color="secondary"
    underline="none"
  >
    {isSignup ? 'login to your account' : 'create an account'}
  </Link>
</Typography>
</div>
          {isSignup && (
            <TextField
              name="name"
              type={'text'}
              margin="normal"
              variant="outlined"
              placeholder="Name"
              autoComplete='off'
              value={credentials.name}
              onChange={handleChange}
              style={{ borderRadius: 0 }}
              />
          )}
          <TextField
            name="email"
            type={'email'}
            margin="normal"
            variant="outlined"
            placeholder="Email"
            autoComplete='off'
            value={credentials.email}
            onChange={handleChange}
            style={{ borderRadius: 0 }}

          />
          <TextField
            name="password"
            type={'password'}
            margin="normal"
            variant="outlined"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            style={{ borderRadius: 0 }}

          />
          <Button
            type="submit"
            sx={{ marginTop: 3, borderRadius: 4 }}
            variant="contained"
            color="secondary"

          >
            {isSignup ? 'Signup' : 'Login'}
          </Button>
          <Typography style={{ color: 'gray', marginTop:'10px'  }}>By clicking on Login, I accept <Link color="inherit" underline="none"><strong>Terms & Conditions</strong></Link> & <Link color="inherit" underline="none"><strong>Privacy Policy</strong></Link></Typography>
          {error && (
            <Typography color="error" textAlign="center" marginTop={2}>
              {error}
            </Typography>
          )}
        </Box>
      </form>
</div>

        
</div>
      </Paper>
                          )}
      <Paper elevation={3} square style={{maxWidth: 800, minHeight: 80,}}>
        <Accordion style={{maxWidth: 800, minHeight: 80,}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <Typography variant="h6" style={{color: 'black', marginTop: '15px', marginLeft: '5px'}}><strong>Delivery address</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Box style={{ marginLeft: '5px' }}>
      {/* First Line: Street Name and House Number */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6"><strong>Street Name</strong></Typography>
          <TextField
            id="street-name"
            variant="outlined"
            fullWidth
            // You can add more properties or handlers as needed
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"><strong>House Number</strong></Typography>
          <TextField
            id="house-number"
            variant="outlined"
            fullWidth
            // You can add more properties or handlers as needed
          />
        </Grid>
      </Grid>
      
      {/* Second Line: Postcode and City */}
      <Grid container spacing={2} style={{ marginTop: '10px' }}>
        <Grid item xs={6}>
          <Typography variant="h6"><strong>Postcode</strong></Typography>
          <TextField
            id="postcode"
            variant="outlined"
            fullWidth
            // You can add more properties or handlers as needed
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"><strong>City</strong></Typography>
          <TextField
            id="city"
            variant="outlined"
            fullWidth
            // You can add more properties or handlers as needed
          />
        </Grid>
      </Grid>
    </Box>
        </AccordionDetails>
      </Accordion>
      </Paper>
      <Paper elevation={3} square style={{maxWidth: 800, minHeight: 80,}}>
      <Accordion style={{maxWidth: 800, minHeight: 80,}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <Typography variant="h6" style={{color: 'black', marginTop: '15px', marginLeft: '5px'}}><strong><CreditCardIcon fontSize="large"/> Payment</strong></Typography>
        </AccordionSummary>
        <AccordionDetails>
<Stack spacing={2} direction="row" alignItems="center">
  
</Stack>
        </AccordionDetails>
        </Accordion>
            </Paper>
      </Stack>
      </Container>
      </div>
      
<div style={{marginTop: '60px'}}>
      <Container style={{ maxWidth: 450, minHeight: 700, alignSelf: 'flex-start' }}>
        <Paper elevation={3} square>
      <ShoppingCard/>
      </Paper>
      </Container>
      </div>
    </div>
  );
}

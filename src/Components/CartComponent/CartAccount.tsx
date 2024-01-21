import React, { useState } from 'react';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CartAccount() {
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

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = isSignup
      ? 'http://localhost:5000/signup'
      : 'http://localhost:5000/loginuser';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || 'Something went wrong!');
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.success) {
          navigate('/home');
        } else {
          setError('Invalid username or password. Please try again.');
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message || 'Something went wrong!');
      });
  };

  return (
    <Paper>
      {isFirstPaperVisible && (
        <div style={{ padding: '20px' }}>
          <div
            className="div1"
            style={{
              display: 'inline-block',
              marginRight: '20px',
              verticalAlign: 'middle',
            }}
          >
            <Typography variant="h5">
              <strong>Account</strong>
            </Typography>
            <Typography style={{ color: 'gray', marginBottom: '30px' }}>
              To place your order now, log in to your existing account or sign up.
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              style={{
                marginRight: '30px',
                fontSize: '11px',
                borderRadius: '0',
              }}
              onClick={togglePapers}
            >
              Have an account?
              <br />
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{
                marginRight: '30px',
                fontSize: '11px',
                borderRadius: '0',
              }}
              onClick={togglePapers}
            >
              New to Taste4U?
              <br />
              Signup
            </Button>
          </div>
          <div
            className="div2"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
          >
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
              alt="Vegetable"
              style={{
                width: '140px',
                height: '140px',
                marginLeft: '100px',
              }}
            />
          </div>
        </div>
      )}

      {isSecondPaperVisible && (
        <Paper elevation={3} square style={{ maxWidth: 800, maxHeight: 800 }}>
          <div style={{ padding: '20px' }}>
            <div
              className="div1"
              style={{
                display: 'inline-block',
                marginRight: '20px',
                verticalAlign: 'middle',
              }}
            >
              <Typography variant="h5">
                <strong>Account</strong>
              </Typography>
              <Typography style={{ color: 'gray', marginBottom: '30px' }}>
                To place your order now, log in to your existing account or sign up.
              </Typography>
            </div>
            <div
              className="div2"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
                alt="Vegetable"
                style={{
                  width: '140px',
                  height: '140px',
                  marginLeft: '100px',
                }}
              />
            </div>
            <div className="divmiddle">
              <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection={'column'} maxWidth={500}>
                  <div className="div1">
                    <Typography>
                      {isSignup ? 'Sign up' : 'Login'}{' '}
                      {isSignup ? 'or ' : 'or '}
                      <Link
                        onClick={() => setIsSignup(!isSignup)}
                        color="secondary"
                        underline="none"
                      >
                        {isSignup
                          ? 'login to your account'
                          : 'create an account'}
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
                      autoComplete="off"
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
                    autoComplete="off"
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
                  <Typography
                    style={{ color: 'gray', marginTop: '10px' }}
                  >
                    By clicking on Login, I accept{' '}
                    <Link color="inherit" underline="none">
                      <strong>Terms & Conditions</strong>
                    </Link>{' '}
                    &{' '}
                    <Link color="inherit" underline="none">
                      <strong>Privacy Policy</strong>
                    </Link>
                  </Typography>
                  {error && (
                    <Typography
                      color="error"
                      textAlign="center"
                      marginTop={2}
                    >
                      {error}
                    </Typography>
                  )}
                </Box>
              </form>
            </div>
          </div>
        </Paper>
      )}
    </Paper>
  );
}

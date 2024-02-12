import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import '/home/vmaral/Desktop/Nikita/Projects/orderfood/src/App.css';
import { useDispatchAuth } from '../contexts/AuthContext';
import { User } from '../utils/interfaces';

interface IProps {
  showImage: boolean;
  navigateToHome?: boolean;
  onLogin: (user: User) => void; // Callback function for successful login
}

export default function Login({ showImage, navigateToHome, onLogin }: IProps) {
  const [isSignup, setIsSignup] = useState(false);
  const dispatchAuth = useDispatchAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

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
        if (data) {
          dispatchAuth({ type: 'LOGIN', payload: data }); // Dispatch the login action
          onLogin(data); // Invoke the callback function on successful login
          navigateToHome && navigate('/home');
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
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={'column'}
          maxWidth={500}
          marginTop={5}
          padding={5}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div className="div1">
              <Typography variant="h4" padding={3}>
                <strong> {isSignup ? 'Sign up' : 'Login'}</strong>
              </Typography>

              <Typography>
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
            <div
              className="div2"
              style={{
                display: 'inline-block',
                verticalAlign: 'middle',
              }}
            >
              {showImage && (
                <img
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
                  alt="Vegetable"
                  style={{
                    width: '140px',
                    height: '140px',
                    marginLeft: '100px',
                  }}
                />
              )}
            </div>
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
  );
}

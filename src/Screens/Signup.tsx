import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, Typography, Box } from '@mui/material';

export default function Signup() {
  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  

  return (
        <div>
      <form>
        <Box
          display="flex"
          flexDirection={'column'}
          maxWidth={400}
          alignItems="center"
          justifyContent={'center'}
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={'5px 5px 10px #ccc'}
          sx={{
            ':hover': {
              boxShadow: '10px 10px 20px #ccc',
            },
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            Signup
          </Typography>
          
            <TextField
              name="name"
              value={credentials.name}
              type={'text'}
              margin="normal"
              variant="outlined"
              placeholder="Name"
            />
          <TextField
            name="email"
            value={credentials.email}
            type={'email'}
            margin="normal"
            variant="outlined"
            placeholder="Email"
          />
          <TextField
            name="password"
            value={credentials.password}
            type={'password'}
            margin="normal"
            variant="outlined"
            placeholder="Password"
          />
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
          >
            Signup
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            Already User
          </Button>
        </Box>
      </form>
      </div>
  );
}

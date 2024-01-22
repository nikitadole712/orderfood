import { Button, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import Login from '../../Screens/Login';

interface CartAccountProps {
  isAuthenticated?: boolean;
  isDisabled?: boolean;
}

export default function CartAccount({
  isAuthenticated,
  isDisabled,
}: CartAccountProps) {
  const [isFirstPaperVisible, setIsFirstPaperVisible] =
    useState(true);
  const [isSecondPaperVisible, setIsSecondPaperVisible] =
    useState(false);

  const togglePapers = () => {
    setIsFirstPaperVisible(!isFirstPaperVisible);
    setIsSecondPaperVisible(!isSecondPaperVisible);
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
            <Typography
              style={{ color: 'gray', marginBottom: '30px' }}
            >
              To place your order now, log in to your existing account
              or sign up.
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
        <Paper
          elevation={3}
          square
          style={{ maxWidth: 800, maxHeight: 800 }}
        >
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
              <Typography
                style={{ color: 'gray', marginBottom: '30px' }}
              >
                To place your order now, log in to your existing
                account or sign up.
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
              <Login showImage={false} />
            </div>
          </div>
        </Paper>
      )}
    </Paper>
  );
}

import React, { useState, useEffect } from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Login from '../../Screens/Login';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatchAuth } from '../../contexts/AuthContext';
import { User } from '../../utils/interfaces';

interface CartAccountProps {
  isAuthenticated: boolean; 
  onLoginSuccess: () => void; 
  onLogout: () => void;
  isDisabled: boolean;
}

export default function CartAccount({ isDisabled, isAuthenticated, onLoginSuccess, onLogout }: CartAccountProps) {
  const [isFirstPaperVisible, setIsFirstPaperVisible] = useState(true);
  const [isSecondPaperVisible, setIsSecondPaperVisible] = useState(false);

  const dispatchAuth = useDispatchAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isAuthenticated) {
      setIsFirstPaperVisible(false);
      setIsSecondPaperVisible(false);
    } else {
      setIsFirstPaperVisible(true);
      setIsSecondPaperVisible(false);
    }
  }, [isAuthenticated]);

  const handleLogin = (user: User) => {
    localStorage.setItem('token', 'dummyToken');
    onLoginSuccess(); 
    dispatchAuth({ type: 'LOGIN', payload: user });
  };

  const togglePapers = () => {
    setIsFirstPaperVisible(!isFirstPaperVisible);
    setIsSecondPaperVisible(!isSecondPaperVisible);
  };

  return (
    <Accordion id="panel1a-header" style={{ width: '100%', maxWidth: 800, minHeight: 80 }} disabled={isDisabled}> 
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        onClick={togglePapers}
      >
        <Typography variant="h5">
          <strong>Account</strong>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isFirstPaperVisible && (
          <div style={{ width: '100%' }}>
            <Typography style={{ color: 'gray', marginBottom: '30px' }}>
              To place your order now, log in to your existing account or sign up.
            </Typography>
            <div>
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginRight: '30px', fontSize: '11px', borderRadius: '0' }}
                onClick={togglePapers}
              >
                Have an account?
                <br />
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ fontSize: '11px', borderRadius: '0' }}
                onClick={togglePapers}
              >
                New to Taste4U?
                <br />
                Signup
              </Button>
            </div>
          </div>
        )}

        {isSecondPaperVisible && (
          <div style={{ width: '100%' }}>
            <Typography style={{ color: 'gray', marginBottom: '30px' }}>
              To place your order now, log in to your existing account or sign up.
            </Typography>
            <Login showImage={false} onLogin={handleLogin} />
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

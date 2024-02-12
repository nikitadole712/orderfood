import React from 'react';
import { Box, TextField, Typography, Grid, Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface CartAddressProps {
  isDisabled: boolean;
  isAuthenticated: boolean; // New prop to track authentication status
  onNextButtonClick: () => void;
}

const CartAddress: React.FC<CartAddressProps> = ({ isDisabled, isAuthenticated, onNextButtonClick }) => {
  const handleNextClick = () => {
    onNextButtonClick(); 
  };

  return (
    <div>
      <Accordion style={{ width: 800, minHeight: 80 }} disabled={isDisabled || !isAuthenticated}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            variant="h6"
            style={{
              color: 'black',
              marginTop: '15px',
              marginLeft: '5px',
            }}
          >
            <strong>Delivery address</strong>
          </Typography>
        </AccordionSummary>
        {isAuthenticated ? ( 
          <AccordionDetails>
            <Box style={{ marginLeft: '5px' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    <strong>Street Name</strong>
                  </Typography>
                  <TextField
                    id="street-name"
                    variant="outlined"
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    <strong>House Number</strong>
                  </Typography>
                  <TextField
                    id="house-number"
                    variant="outlined"
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    <strong>Postcode</strong>
                  </Typography>
                  <TextField
                    id="postcode"
                    variant="outlined"
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">
                    <strong>City</strong>
                  </Typography>
                  <TextField
                    id="city"
                    variant="outlined"
                    fullWidth
                    disabled={isDisabled}
                  />
                </Grid>
              </Grid>
              <div style={{marginTop: '5px'}}>
                <Button onClick={handleNextClick}>Next <NavigateNextIcon/></Button>
              </div>
            </Box>
          </AccordionDetails>
        ) : (
          <></>
        )}
      </Accordion>
    </div>
  );
};

export default CartAddress;

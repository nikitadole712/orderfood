import React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CartAddress() {
  return (
    <div>
      <Accordion style={{ maxWidth: 800, minHeight: 80 }}>
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
        <AccordionDetails>
          <Box style={{ marginLeft: '5px' }}>
            {/* First Line: Street Name and House Number */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <strong>Street Name</strong>
                </Typography>
                <TextField
                  id="street-name"
                  variant="outlined"
                  fullWidth
                  // You can add more properties or handlers as needed
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
                  // You can add more properties or handlers as needed
                />
              </Grid>
            </Grid>

            {/* Second Line: Postcode and City */}
            <Grid container spacing={2} style={{ marginTop: '10px' }}>
              <Grid item xs={6}>
                <Typography variant="h6">
                  <strong>Postcode</strong>
                </Typography>
                <TextField
                  id="postcode"
                  variant="outlined"
                  fullWidth
                  // You can add more properties or handlers as needed
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
                  // You can add more properties or handlers as needed
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

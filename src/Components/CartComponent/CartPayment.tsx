import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Button,
    Typography,
  } from '@mui/material';
  import CreditCardIcon from '@mui/icons-material/CreditCard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import PaidIcon from '@mui/icons-material/Paid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

interface CartPaymentProps {
  isDisabled: boolean;
  isAuthenticated: boolean;

}

export default function CartPayment({ isDisabled, isAuthenticated }: CartPaymentProps) {
  const [alignment, setAlignment] = React.useState<string>();

  const handleChangeButton = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };
  const handleCheckout = () => {
  };

  return (
    <div>
      <Accordion style={{ maxWidth: 800, minHeight: 80 }} disabled={isDisabled || !isAuthenticated}>
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
            <strong>
              <CreditCardIcon fontSize="large" /> Payment
            </strong>
          </Typography>
        </AccordionSummary>
        {isAuthenticated ? (
        <AccordionDetails>
          <Stack
            spacing={2}
            direction="column"
            alignItems="center"
          >
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeButton}
              aria-label="Platform"
              orientation="vertical"
            >
                    <ToggleButton
                      value="list"
                      aria-label="list"
                      style={{
                        border: '2px solid',
                        minWidth: '650px',
                        minHeight: '70px',
                      }}
                    >
                      <CreditCardIcon
                        sx={{
                          color: 'secondary.main',
                          fontSize: '30px',
                        }}
                      />{' '}
                      <Typography
                        style={{
                          marginRight: '600px',
                          color: 'black',
                        }}
                      >
                        <strong>Credit Card</strong>
                      </Typography>
                    </ToggleButton>

                    <ToggleButton
                      value="module"
                      style={{
                        border: '2px solid',
                        minWidth: '650px',
                        minHeight: '70px',
                        marginTop: '20px'
                      }}
                    >
                      <CurrencyBitcoinIcon
                        sx={{
                          color: 'secondary.main',
                          fontSize: '30px',
                        }}
                      />{' '}
                      <Typography
                        style={{
                          marginRight: '650px',
                          color: 'black',
                        }}
                      >
                        <strong>BitCoin</strong>
                      </Typography>
                    </ToggleButton>

                    <ToggleButton
                      value="quilt"
                      style={{
                        border: '2px solid',
                        minWidth: '650px',
                        minHeight: '70px',
                        marginTop: '20px'
                      }}
                    >
                      <CurrencyRupeeIcon
                        sx={{
                          color: 'secondary.main',
                          fontSize: '30px',
                        }}
                      />{' '}
                      <Typography
                        style={{
                          marginRight: '630px',
                          color: 'black',
                        }}
                      >
                        <strong>Cash on Delivery</strong>
                      </Typography>
                    </ToggleButton>

                    <ToggleButton
                      value="bitcoin"
                      style={{
                        border: '2px solid',
                        minWidth: '650px',
                        minHeight: '70px',
                        marginTop: '20px'
                      }}
                    >
                      <PaidIcon
                        sx={{
                          color: 'secondary.main',
                          fontSize: '30px',
                        }}
                      />{' '}
                      <Typography
                        style={{
                          marginRight: '650px',
                          color: 'black',
                        }}
                      >
                        <strong>PayPal</strong>
                      </Typography>
                    </ToggleButton>
                    </ToggleButtonGroup>

                  </Stack>
                  <Button
                type="submit"
                sx={{ marginTop: 3, borderRadius: 4 ,width: '100%'}}
                variant="contained"
                color="secondary"
                onClick={handleCheckout}
              >
                Checkout
              </Button>
                </AccordionDetails>
                ) : (
                  <></>
                )}
              </Accordion>
    </div>
  )
}

import React from 'react'
import { Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';


export default function Footer() {
  return (
    <div>
      <div className="container">
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
  
    <RestaurantMenuIcon /><Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <b>Taste4U</b>
          </Typography>
          <span className="text-muted"><h5><b>© 2024 <i>Taste4U</i>, Inc</b></h5></span>
    </footer>
    <Typography variant='h5' className='mb-3 mx-4'>Follow us</Typography>
    <Link color='inherit' ><FacebookIcon sx={{fontSize:40}}/></Link>
    <Link color='inherit'><InstagramIcon sx={{fontSize:40}}/></Link>
    <Link color='inherit'><TwitterIcon sx={{fontSize:40}}/></Link>
    <Link color='inherit'><PinterestIcon sx={{fontSize:40}}/></Link>
  </div>
  </div>
  )
}

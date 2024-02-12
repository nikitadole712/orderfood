const express = require('express');
const User = require('../User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const axios = require('axios');

router.post(
  '/signup',
  [
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);
router.post(
  '/loginuser',
  [
    body('email', 'Invalid Email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: 'Try correct Username' });
      }
      if (req.body.password !== userData.password) {
        return res
          .status(400)
          .json({ errors: 'Try correct Password' });
      }
      return res.json({ name: userData.name, email: userData.email });
    } catch (error) {
      console.log(error);
      res.status(400).json({ errors: false });
    }
  }
);

router.get('/getusers', async (req, res) => {
  try {
    let users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});
router.post('/getlocation', async (req, res) => {
  try {
    let lat = req.body.latlong.lat;
    let long = req.body.latlong.long;
    console.log(lat, long);
    let location = await axios
      .get(
        'https://api.opencagedata.com/geocode/v1/json?q=' +
          lat +
          '+' +
          long +
          '&key=74c89b3be64946ac96d777d08b878d43'
      )
      .then(async (res) => {
        console.log(res.data.results);

        let response = res.data.results[0].components;
        console.log(response);
        let { village, county, state_district, state, postcode } =
          response;
        return String(
          village +
            ',' +
            county +
            ',' +
            state_district +
            ',' +
            state +
            '\n' +
            postcode
        );
      })
      .catch((error) => {
        console.error(error);
      });
    res.send({ location });
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
});

module.exports = router;

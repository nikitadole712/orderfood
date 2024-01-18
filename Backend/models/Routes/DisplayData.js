const express = require('express');
const Data = require('../Data');
const router = express.Router();
const Order = require('../Order');

router.get('/products', async (req, res) => {
  try {
    let items = await Data.find({});
    var catMap = {};
    for (var i = 0; i < items.length; i++) {
      var category = items[i]['CategoryName'];
      if (!catMap[category]) {
        catMap[category] = [];
      }
      catMap[category].push(items[i]);
    }
    let result = [];
    for (const [key, value] of Object.entries(catMap)) {
      result.push({ name: key, items: value });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  console.log('1231242343242354', req.body.email);
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);
      console.log('1231242343242354', req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send('Server Error', error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send('Server Error', error.message);
    }
  }
});

router.get('/mycart', async (req, res) => {
  try {
    console.log(req.body.email);
    let eId = await Order.findOne({ email: req.body.email });
    res.json({ orderData: eId });
  } catch (error) {
    res.send('Error', error.message);
  }
});

router.get('/', (req, res) => {
  res.send('api working');
});

module.exports = router;

const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      console.log('USER:',user);
      const orders = await service.findByUser(user.sub);
      console.log('ORDERS:',orders);
      res.json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      next(error);
    }
  }
);

module.exports = router;
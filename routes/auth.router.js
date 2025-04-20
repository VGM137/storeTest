const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config.js');

const AuthService = require('../services/auth.service.js');
const validatorHandler = require('../middlewares/validator.handler.js');
const { updatePasswordSchema } = require('../schemas/auth.schema.js');
const router = express.Router();
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    }
    catch (error) {
      next(error);
    }
  }
);

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = await service.sendRecovery(email);
    res.json(rta);
  }catch (error) {
    next(error);
  }
});

router.post('/change-password',
  validatorHandler(updatePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, password } = req.body;
      const rta = await service.changePassword(token, password);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
const jwt = require('jsonwebtoken');

const { config } = require('./config/config.js');

const secret = config.secret;
const payload = {
  sub: 1,
  name: 'Javier',
  iat: 123456789,
};

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);
console.log('token', token);
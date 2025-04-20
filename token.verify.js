const jwt = require('jsonwebtoken');
const { config } = require('./config/config.js');

const secret = config.secret;
const token = ''

function verifyToken(token, secret) {
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return err;
    }
    return decoded;
  });
}
const payload = verifyToken(token, secret);
console.log('payload', payload);
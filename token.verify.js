const jwt = require('jsonwebtoken');
const { config } = require('./config/config.js');

const secret = config.secret;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKYXZpZXIiLCJpYXQiOjEyMzQ1Njc4OX0.K6N1e6ZUvShGBiHAoVT2jvln19X3YHx6wMS8rhJSRbg'

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
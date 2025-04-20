const boom = require('@hapi/boom');
const { config } = require('../config/config.js');

function chekApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  }
  else {
    next(boom.unauthorized('API key no valid'));
  }
}

function checkAdminRole(req, res, next) {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  }
  else {
    next(boom.unauthorized('User not admin'));
  }
}

function checkRoles(roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    }
    else {
      next(boom.unauthorized('User not admin'));
    }
  }
}

module.exports = {
  chekApiKey,
  checkAdminRole,
  checkRoles};
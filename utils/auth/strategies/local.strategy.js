const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const AuthService = require('../../../services/auth.service');
const service = new AuthService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  },
  async (username, password, done) => {
    const credentials = {
      email: username,
      password
    };
    try {
      const user = await service.getUser(credentials);
      done(null, user);
    }catch (error) {
      done(error);
    }
  }
);

module.exports = LocalStrategy
const {Strategy, ExtractJwt} = require('passport-jwt');
const { config } = require('../../../config/config.js');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
  algorithms: ['HS256']
};

const JwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    done(null, payload);
  } catch (error) {
    done(error, false);
  }
});

module.exports = JwtStrategy;
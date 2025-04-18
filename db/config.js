const { config } = require('./../config/config');

module.exports = {
  development: {
    url: config.dbUrl,
    dialectOptions: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialectOptions: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
  },
}
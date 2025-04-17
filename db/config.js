const { config } = require('./../config/config');

const { user, password, host, port, name } = config.db;

const USER = encodeURIComponent(user)
const PASSWORD = encodeURIComponent(password)
const URI = `postgres://${USER}:${PASSWORD}@${host}:${port}/${name}`

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
}
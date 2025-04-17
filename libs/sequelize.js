const { Sequelize } = require('sequelize');
const { config } = require('../config/config');

const setupModels = require('../db/models');

const { user, password, host, port, name } = config.db;

const USER = encodeURIComponent(user)
const PASSWORD = encodeURIComponent(password)
const URI = `postgres://${USER}:${PASSWORD}@${host}:${port}/${name}`

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: false,
});

setupModels(sequelize);

module.exports = sequelize;
const {Pool} = require('pg');
const { config } = require('../config/config');

const { user, password, host, port, name } = config.db;

const DB_USER = user
const DB_PASSWORD = password
const DB_HOST = host
const DB_PORT = port
const DB_NAME = name

const USER = encodeURIComponent(DB_USER)
const PASSWORD = encodeURIComponent(DB_PASSWORD)
const URI = `postgres://${USER}:${PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

const pool = new Pool({connectionString: URI});

module.exports = pool;
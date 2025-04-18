require('dotenv').config();

console.log('config loaded', process.env.DB_URL);

const config = {
  env: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    name: process.env.DB_NAME || 'yourdb',
  },
  dbUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
}

module.exports = { config };
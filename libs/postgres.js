const {Client} = require('pg');

async function getConnection (){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'user',
    password: 'password',
    database: 'yourdb'
  });
  await client.connect();
  return client;
}

module.exports = {
  getConnection,
}
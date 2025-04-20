const bycrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'myPassword';
  const hash = await bycrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
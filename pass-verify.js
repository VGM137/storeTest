const bycrypt = require('bcrypt');

async function verify() {
  const myPassword = 'myPassword';
  const hash = '';
  const isMatch = await bycrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verify();
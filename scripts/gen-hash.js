const bcrypt = require('bcryptjs');
const pw = 'Wrdigital2025!';
const hash = bcrypt.hashSync(pw, 10);
console.log(hash);

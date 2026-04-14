const bcrypt = require('bcryptjs');
const password = 'Wrdigital2025!';
const hash = '$2b$10$PwiPL5ETQRjSPoAVkYdt4eq8cuIswt5mTP92quqsSbmtgsXVqNBqy';

console.log('Testing Password: ', password);
console.log('Using Hash: ', hash);
console.log('Match: ', bcrypt.compareSync(password, hash));

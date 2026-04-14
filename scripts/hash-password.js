// Script per generare password hashate
// Uso: node scripts/hash-password.js tuapassword

const bcryptjs = require('bcryptjs');

const password = process.argv[2];

if (!password) {
    console.log('Uso: node scripts/hash-password.js <password>');
    process.exit(1);
}

const hash = bcryptjs.hashSync(password, 10);
console.log('\nPassword hashata (copia questo valore nel file users.json):');
console.log(hash);
console.log('\n');

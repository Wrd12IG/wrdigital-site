const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { google } = require('googleapis');
const readline = require('readline');

// Configurazione
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const PARENT_FOLDER_ID = '1vbjUnaGvwKRZe7KwyQWLowdzhm5DRk5z'; // Area Clienti WR Digital

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function getAuth() {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error('Credenziali Google mancanti in .env.local');
    }
    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
}

function loadUsers() {
    if (!fs.existsSync(USERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

async function createDriveFolder(drive, name) {
    console.log('   📂 Creazione cartella principale...');
    const res = await drive.files.create({
        resource: {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [PARENT_FOLDER_ID]
        },
        fields: 'id'
    });
    const folderId = res.data.id;

    const subfolders = ['01.Fatture', '02.Preventivi', '03.DDT'];
    for (const sub of subfolders) {
        console.log(`   📂 Creazione sottocartella: ${sub}`);
        await drive.files.create({
            resource: {
                name: sub,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [folderId]
            }
        });
    }

    return folderId;
}

async function addUser() {
    console.log('\n--- AGGIUNGI NUOVO CLIENTE ---\n');

    const name = await question('Nome Cliente (es. Azienda SRL): ');
    const email = await question('Email: ');
    const password = await question('Password: ');

    const users = loadUsers();

    if (users.find(u => u.email === email)) {
        console.log('❌ Errore: Un utente con questa email esiste già.');
        return;
    }

    console.log('\n🔒 Criptazione password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    let driveFolderId = '';

    try {
        console.log('☁️  Connessione a Google Drive...');
        const auth = await getAuth();
        const drive = google.drive({ version: 'v3', auth });

        driveFolderId = await createDriveFolder(drive, name);
        console.log(`✅ Cartelle create su Drive (ID: ${driveFolderId})`);
    } catch (e) {
        console.log('⚠️  Impossibile creare cartelle su Drive (hai configurato .env.local?).');
        console.log('Errore:', e.message);
        console.log('L\'utente verrà creato senza folder ID.');
    }

    const newUser = {
        id: Date.now().toString(),
        email,
        password: hashedPassword,
        name,
        driveFolderId
    };

    users.push(newUser);
    saveUsers(users);

    console.log(`\n✨ Utente ${name} creato con successo!`);
}

async function changePassword() {
    console.log('\n--- CAMBIA PASSWORD ---\n');

    const email = await question('Email utente: ');
    const users = loadUsers();
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex === -1) {
        console.log('❌ Utente non trovato.');
        return;
    }

    const newPassword = await question('Nuova Password: ');
    users[userIndex].password = await bcrypt.hash(newPassword, 10);

    saveUsers(users);
    console.log(`✅ Password aggiornata per ${users[userIndex].name}`);
}

async function listUsers() {
    const users = loadUsers();
    console.log('\n--- LISTA UTENTI ---\n');
    users.forEach(u => {
        console.log(`- ${u.name} (${u.email}) [Drive: ${u.driveFolderId ? 'OK' : 'NO'}]`);
    });
}

async function main() {
    // Carica variabili d'ambiente se eseguito localmente
    require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

    console.log('1. Aggiungi Utente');
    console.log('2. Cambia Password');
    console.log('3. Lista Utenti');
    console.log('4. Esci');

    const choice = await question('\nScegli opzione (1-4): ');

    switch (choice) {
        case '1': await addUser(); break;
        case '2': await changePassword(); break;
        case '3': await listUsers(); break;
        case '4': process.exit(0); break;
        default: console.log('Scelta non valida');
    }

    rl.close();
}

main().catch(console.error);

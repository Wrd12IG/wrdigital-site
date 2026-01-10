const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Configurazione
const PARENT_FOLDER_ID = '1vbjUnaGvwKRZe7KwyQWLowdzhm5DRk5z'; // Area Clienti WR Digital

// Utenti per cui creare le cartelle
const users = [
    { id: '1', name: 'Cliente Demo', email: 'cliente@esempio.it' },
    { id: '2', name: 'Mario Rossi', email: 'mario.rossi@azienda.it' },
    { id: '3', name: 'Laura Bianchi', email: 'laura.bianchi@startup.com' },
    { id: '4', name: 'Giuseppe Verdi', email: 'giuseppe.verdi@impresa.it' },
];

// Sottocartelle da creare per ogni utente
const subfolders = ['01.Fatture', '02.Preventivi', '03.DDT'];

async function main() {
    // Autenticazione
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const userFolderIds = {};

    for (const user of users) {
        console.log(`\n📁 Creazione cartella per: ${user.name}`);

        // Crea cartella principale per l'utente
        const folderMetadata = {
            name: user.name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: [PARENT_FOLDER_ID],
        };

        try {
            const folder = await drive.files.create({
                resource: folderMetadata,
                fields: 'id, name',
            });

            const folderId = folder.data.id;
            userFolderIds[user.id] = folderId;
            console.log(`   ✅ Cartella creata: ${folder.data.name} (ID: ${folderId})`);

            // Crea sottocartelle
            for (const subfolder of subfolders) {
                const subfolderMetadata = {
                    name: subfolder,
                    mimeType: 'application/vnd.google-apps.folder',
                    parents: [folderId],
                };

                const sub = await drive.files.create({
                    resource: subfolderMetadata,
                    fields: 'id, name',
                });
                console.log(`      📂 Sottocartella: ${sub.data.name}`);
            }
        } catch (error) {
            console.error(`   ❌ Errore per ${user.name}:`, error.message);
        }
    }

    // Aggiorna users.json con i nuovi folder IDs
    console.log('\n📝 Aggiornamento users.json...');

    const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    for (const userData of usersData) {
        if (userFolderIds[userData.id]) {
            userData.driveFolderId = userFolderIds[userData.id];
            console.log(`   ✅ ${userData.name}: ${userFolderIds[userData.id]}`);
        }
    }

    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    console.log('\n✨ Configurazione completata!');
    console.log('\nOgni utente ora ha la sua cartella con:');
    subfolders.forEach(sf => console.log(`   📂 ${sf}`));
}

main().catch(console.error);

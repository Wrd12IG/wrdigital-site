// Importa i dati da SQLite (Prisma) in Firestore, mantenendo gli id.
//   DATABASE_URL=file:./prisma/dev.db FIREBASE_SERVICE_ACCOUNT='...' npx tsx scripts/migrate-to-firestore.ts [--dry-run] [--only=Lead,User]
import { PrismaClient } from '@prisma/client';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { MODELS } from '../lib/db/meta';
import { FirestoreStore } from '../lib/db/store';

const dryRun = process.argv.includes('--dry-run');
const only = process.argv.find((a) => a.startsWith('--only='))?.slice(7).split(',');

function credentials() {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) return undefined;
    return JSON.parse(raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8'));
}

(async () => {
    if (!process.env.DATABASE_URL) throw new Error('Imposta DATABASE_URL sul file SQLite sorgente');
    const prisma = new PrismaClient() as any;
    let store: FirestoreStore | undefined;
    if (!dryRun) {
        const creds = credentials();
        if (!creds && !process.env.FIRESTORE_EMULATOR_HOST) throw new Error('Imposta FIREBASE_SERVICE_ACCOUNT (o FIRESTORE_EMULATOR_HOST)');
        if (!getApps().length) initializeApp(creds ? { credential: cert(creds) } : { projectId: process.env.FIREBASE_PROJECT_ID || 'demo-wrdigital' });
        store = new FirestoreStore(getFirestore());
    }

    let total = 0;
    for (const model of Object.keys(MODELS)) {
        if (only && !only.includes(model)) continue;
        const delegate = model.charAt(0).toLowerCase() + model.slice(1);
        const rows: any[] = await prisma[delegate].findMany();
        console.log(`${dryRun ? '[dry-run] ' : ''}${model}: ${rows.length} record`);
        total += rows.length;
        if (store && rows.length) await store.setMany(model, rows.map(({ id, ...data }) => ({ id, data })));
    }
    console.log(`${dryRun ? 'Da importare' : 'Importati'}: ${total} record`);
    await prisma.$disconnect();
})().catch((e) => { console.error(e); process.exit(1); });

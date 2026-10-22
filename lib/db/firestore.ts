import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { FirestoreStore } from './store';
import { createClient } from './client';

function credentials(): ServiceAccount | undefined {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (raw) {
        // JSON in chiaro oppure base64 del JSON
        const json = raw.trim().startsWith('{') ? raw : Buffer.from(raw, 'base64').toString('utf8');
        return JSON.parse(json);
    }
    const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;
    if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
        return { projectId: FIREBASE_PROJECT_ID, clientEmail: FIREBASE_CLIENT_EMAIL, privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') };
    }
    return undefined;
}

export function createFirestoreClient() {
    if (!getApps().length) {
        const creds = credentials();
        // Senza credenziali ma con FIRESTORE_EMULATOR_HOST si usa l'emulatore locale.
        initializeApp(creds ? { credential: cert(creds) } : { projectId: process.env.FIREBASE_PROJECT_ID || 'demo-wrdigital' });
    }
    return createClient(new FirestoreStore(getFirestore()));
}

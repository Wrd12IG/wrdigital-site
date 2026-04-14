import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { google } from 'googleapis';
import { authOptions } from '@/lib/auth';

// Configura le credenziali Google Drive
// Dovrai creare un Service Account in Google Cloud Console
// e scaricare il file JSON delle credenziali
const getAuth = () => {
    // Se hai le credenziali come variabili d'ambiente
    if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
        return new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });
    }

    // Fallback per sviluppo - restituisce dati demo
    return null;
};

export async function GET(req: Request) {
    try {
        // Verifica autenticazione
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
        }

        // Ottieni folderId dalla query string o dalla sessione
        const { searchParams } = new URL(req.url);
        const queryFolderId = searchParams.get('folderId');

        // La root dell'utente salvata in sessione
        const userRootFolderId = (session.user as { driveFolderId?: string }).driveFolderId;

        // Se c'è un folderId specfico richiesto, usa quello, altrimenti usa la root
        const targetFolderId = queryFolderId || userRootFolderId;

        // Se non abbiamo NESSUN folder ID valido (nè query nè root), fallback su Demo
        if (!targetFolderId || targetFolderId === 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE') {
            // ... Codice Demo esistente (evito di ripeterlo qui per brevità, ma nel codice finale ci sarà) ...
            // Per semplicità qui rimetto i dati demo diretti se manca l'ID
            return NextResponse.json({
                files: [
                    {
                        id: 'demo-root',
                        name: 'Cartella Demo (Configurazione Mancante)',
                        mimeType: 'application/vnd.google-apps.folder',
                        size: '-',
                        modifiedTime: new Date().toISOString(),
                    }
                ],
                isDemo: true,
                message: 'Configurazione incompleta'
            });
        }

        const auth = getAuth();
        if (!auth) {
            // Fallback Demo se mancano credenziali server
            return NextResponse.json({ files: [], isDemo: true, message: 'Server Credentials Missing' });
        }

        const drive = google.drive({ version: 'v3', auth });

        // Ottieni i file dalla cartella target
        const response = await drive.files.list({
            q: `'${targetFolderId}' in parents and trashed = false`,
            fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink, iconLink)',
            orderBy: 'folder, modifiedTime desc', // Cartelle prima dei file
            pageSize: 50,
        });

        const files = response.data.files?.map(file => ({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            size: file.size ? formatBytes(parseInt(file.size)) : '-',
            modifiedTime: file.modifiedTime,
            webViewLink: file.webViewLink,
            iconLink: file.iconLink,
        })) || [];

        return NextResponse.json({ files, isDemo: false });

    } catch (error) {
        console.error('Errore Google Drive:', error);
        return NextResponse.json(
            { error: 'Errore nel caricamento dei file' },
            { status: 500 }
        );
    }
}

function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

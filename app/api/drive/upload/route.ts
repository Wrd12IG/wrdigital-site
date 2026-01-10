import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { google } from 'googleapis';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        // Verifica permessi (solo Admin per ora)
        if (session?.user?.email !== 'admin@wrdigital.com') {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const folderId = formData.get('folderId') as string;

        if (!file || !folderId) {
            return NextResponse.json({ error: 'File o Folder ID mancanti' }, { status: 400 });
        }

        // Configura Google Drive
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Converti File standard in Stream per Google Drive
        const fileBuffer = await file.arrayBuffer();
        const bufferStream = new Readable();
        bufferStream.push(Buffer.from(fileBuffer));
        bufferStream.push(null);

        const response = await drive.files.create({
            requestBody: {
                name: file.name,
                parents: [folderId],
            },
            media: {
                mimeType: file.type,
                body: bufferStream,
            },
            fields: 'id, name, webViewLink',
        });

        return NextResponse.json({
            success: true,
            fileId: response.data.id,
            link: response.data.webViewLink
        });

    } catch (error) {
        console.error('Errore upload:', error);
        return NextResponse.json({ error: 'Errore durante l\'upload' }, { status: 500 });
    }
}

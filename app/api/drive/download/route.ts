import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { google } from 'googleapis';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const fileId = searchParams.get('fileId');

        if (!fileId) {
            return NextResponse.json({ error: 'ID file mancante' }, { status: 400 });
        }

        // Auth Google Drive
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // 1. Ottieni metadati file (per nome e mimeType)
        const fileMetadata = await drive.files.get({
            fileId: fileId,
            fields: 'name, mimeType, size',
        });

        const fileName = fileMetadata.data.name || 'download';
        const mimeType = fileMetadata.data.mimeType || 'application/octet-stream';

        // 2. Ottieni stream file
        const response = await drive.files.get(
            { fileId: fileId, alt: 'media' },
            { responseType: 'stream' }
        );

        // Converti Node.js ReadableStream in Web ReadableStream
        // @ts-ignore
        const stream = new ReadableStream({
            start(controller) {
                // @ts-ignore
                response.data.on('data', (chunk) => controller.enqueue(chunk));
                // @ts-ignore
                response.data.on('end', () => controller.close());
                // @ts-ignore
                response.data.on('error', (err) => controller.error(err));
            },
        });

        // Restituisci response con headers per download
        return new NextResponse(stream, {
            headers: {
                'Content-Type': mimeType,
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });

    } catch (error) {
        console.error('Errore download file:', error);
        return NextResponse.json({ error: 'Errore durante il download' }, { status: 500 });
    }
}

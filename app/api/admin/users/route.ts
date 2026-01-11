import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { google } from 'googleapis';

const PARENT_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '';

// Helper Google Drive Authentication
const getDriveAuth = () => {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error('Credenziali Google mancanti');
    }
    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
};

// Helper: Check Admin Role
const isAdmin = (session: any) => {
    return session?.user?.role === 'admin';
};

// GET: Lista Utenti
export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                driveFolderId: true,
                createdAt: true
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Errore server' }, { status: 500 });
    }
}

// POST: Crea Utente
export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Email già in uso' }, { status: 400 });
        }

        // Cripta password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crea cartelle su Drive
        let driveFolderId = '';
        try {
            const auth = getDriveAuth();
            const drive = google.drive({ version: 'v3', auth });

            // Crea cartella principale
            const folderMetadata = {
                name: name,
                mimeType: 'application/vnd.google-apps.folder',
                parents: [PARENT_FOLDER_ID],
            };

            const folder = await drive.files.create({
                requestBody: folderMetadata,
                fields: 'id',
            });

            driveFolderId = folder.data.id || '';

            // Crea sottocartelle
            const subfolders = ['01.Fatture', '02.Preventivi', '03.DDT'];
            for (const sub of subfolders) {
                await drive.files.create({
                    requestBody: {
                        name: sub,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [driveFolderId]
                    }
                });
            }

        } catch (driveError) {
            console.error('Errore creazione Drive:', driveError);
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
                role: 'user',
                driveFolderId
            }
        });

        const { password: _, ...safeUser } = newUser;
        return NextResponse.json(safeUser);

    } catch (error) {
        console.error('Errore creazione utente:', error);
        return NextResponse.json({ error: 'Errore server' }, { status: 500 });
    }
}

// PUT: Aggiorna Utente (es. Password)
export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const { email, newPassword } = await req.json();

        if (!email || !newPassword) {
            return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email: email.toLowerCase() },
            data: { password: hashedPassword }
        });

        return NextResponse.json({ success: true, message: 'Password aggiornata' });

    } catch (error) {
        console.error('Errore aggiornamento utente:', error);
        return NextResponse.json({ error: 'Errore server' }, { status: 500 });
    }
}

// DELETE: Elimina Utente
export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email mancante' }, { status: 400 });
        }

        await prisma.user.delete({
            where: { email: email.toLowerCase() }
        });

        return NextResponse.json({ success: true, message: 'Utente eliminato' });

    } catch (error) {
        console.error('Errore eliminazione utente:', error);
        return NextResponse.json({ error: 'Errore server' }, { status: 500 });
    }
}

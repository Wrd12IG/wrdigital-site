import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pump = promisify(pipeline);

// Percorso dove salvare l'immagine custom
// Salviamo in 'data' per persistenza sicura, o sovrascriviamo in public se possibile.
// Per sicurezza e flessibilità, la salviamo in 'data' e la serviamo tramite API dedicata.
const DATA_DIR = path.join(process.cwd(), 'data');
const HERO_IMAGE_PATH = path.join(DATA_DIR, 'hero-bg-custom.png');
const PUBLIC_HERO_PATH = path.join(process.cwd(), 'public', 'hero-bg.png');

// Helper per verificare se admin
const isAdmin = (session: any) => {
    return (session?.user as any)?.role === 'admin' || session?.user?.email === 'roberto@wrdigital.it' || session?.user?.email === 'admin@wrdigital.com';
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nessun file caricato' }, { status: 400 });
        }

        // Assicuriamoci che la cartella data esista
        if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
        }

        // Convertiamo il file in buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Salviamo il file come 'hero-bg-custom.png' in data
        // Questo sarà il "source of truth"
        fs.writeFileSync(HERO_IMAGE_PATH, buffer);

        // Opzionale: Sovrascriviamo anche in public per fallback veloce statico (potrebbe richiedere riavvio in alcuni hosting, ma utile in dev)
        // try {
        //     fs.writeFileSync(PUBLIC_HERO_PATH, buffer);
        // } catch (e) {
        //     console.warn("Impossibile scrivere in public (normale in alcuni env):", e);
        // }

        return NextResponse.json({ success: true, message: 'Immagine Hero aggiornata' });

    } catch (error) {
        console.error('Errore update hero image:', error);
        return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) {
            return NextResponse.json({ error: 'Non autorizzato' }, { status: 403 });
        }

        // Elimina l'immagine custom per tornare al default
        if (fs.existsSync(HERO_IMAGE_PATH)) {
            fs.unlinkSync(HERO_IMAGE_PATH);
        }

        return NextResponse.json({ success: true, message: 'Ripristinato sfondo originale' });

    } catch (error) {
        console.error('Errore reset hero image:', error);
        return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 });
    }
}

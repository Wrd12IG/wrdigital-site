import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

// Cartella Upload Pubblica
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'portfolio');

const isAdmin = (session: any) => {
    return (session?.user as any)?.role === 'admin' || session?.user?.email === 'roberto@wrdigital.it';
};

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });

        // Crea cartella se non esiste
        if (!fs.existsSync(UPLOAD_DIR)) {
            fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Nome file unico: timestamp_nomeoriginale (sanitizzato)
        const filename = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
        const filePath = path.join(UPLOAD_DIR, filename);

        fs.writeFileSync(filePath, buffer);

        // Ritorna il path pubblico
        return NextResponse.json({
            success: true,
            url: `/uploads/portfolio/${filename}`
        });

    } catch (error) {
        console.error("Portfolio Upload Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json');

const isAdmin = (session: any) => {
    return (session?.user as any)?.role === 'admin' || session?.user?.email === 'roberto@wrdigital.it';
};

// Helper to read data safely
const readConfig = () => {
    if (!fs.existsSync(DATA_FILE)) return {};
    try {
        return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch { return {}; }
};

export async function GET() {
    return NextResponse.json(readConfig());
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!isAdmin(session)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

        const newConfig = await req.json();

        // Ensure dir exists
        const dir = path.dirname(DATA_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        // Save
        fs.writeFileSync(DATA_FILE, JSON.stringify(newConfig, null, 4));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Config Save Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

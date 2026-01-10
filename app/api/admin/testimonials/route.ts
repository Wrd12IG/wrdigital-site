import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'testimonials.json');

export async function GET() {
    try {
        if (!fs.existsSync(DATA_FILE)) return NextResponse.json([]);
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        return NextResponse.json(data);
    } catch { return NextResponse.json([]); }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const data = await request.json();
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return NextResponse.json({ success: true });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

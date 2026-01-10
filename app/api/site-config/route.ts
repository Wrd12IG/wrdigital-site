import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'site-config.json');

export async function GET() {
    if (!fs.existsSync(DATA_FILE)) {
        return NextResponse.json({});
    }

    try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
            },
        });
    } catch (e) {
        return NextResponse.json({});
    }
}

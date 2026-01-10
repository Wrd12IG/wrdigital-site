import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Helper per leggere il file JSON
const getData = () => {
    const filePath = path.join(process.cwd(), 'data', 'portfolio.json');
    if (!fs.existsSync(filePath)) return [];

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContent);
    } catch (e) {
        console.error("Errore parsing portfolio:", e);
        return [];
    }
};

export async function GET() {
    const projects = getData();
    // Cache control per aggiornamenti rapidi
    return NextResponse.json(projects, {
        headers: {
            'Cache-Control': 's-maxage=10, stale-while-revalidate=59',
        },
    });
}

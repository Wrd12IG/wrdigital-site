import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'seo-meta.json');

export async function GET(
    request: Request,
    props: { params: Promise<{ pageKey: string }> }
) {
    try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        const params = await props.params;
        const pageKey = params.pageKey;

        if (data[pageKey]) {
            return NextResponse.json(data[pageKey]);
        }

        return NextResponse.json({});
    } catch {
        return NextResponse.json({});
    }
}

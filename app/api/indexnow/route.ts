import { NextResponse } from 'next/server';

// IndexNow — Protocollo per indicizzazione rapida su Bing, Yandex, Naver
// Notifica i motori di ricerca quando le pagine vengono create/aggiornate
// Documentazione: https://www.indexnow.org/

const INDEXNOW_KEY = 'wrdigital2026indexnowkey8a7f3b9d';
const HOST = 'www.wrdigital.it';
const INDEX_NOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { urls } = body as { urls: string[] };

        if (!urls || !Array.isArray(urls) || urls.length === 0) {
            return NextResponse.json({ error: 'urls array required' }, { status: 400 });
        }

        // Valida che gli URL appartengano al dominio corretto
        const validUrls = urls.filter(url =>
            typeof url === 'string' && url.startsWith(`https://${HOST}`)
        );

        if (validUrls.length === 0) {
            return NextResponse.json({ error: 'No valid URLs for this host' }, { status: 400 });
        }

        const payload = {
            host: HOST,
            key: INDEXNOW_KEY,
            keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
            urlList: validUrls,
        };

        const response = await fetch(INDEX_NOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
        });

        if (response.ok || response.status === 202) {
            return NextResponse.json({
                success: true,
                submitted: validUrls.length,
                status: response.status,
            });
        }

        return NextResponse.json({
            error: 'IndexNow submission failed',
            status: response.status,
        }, { status: 500 });

    } catch (error) {
        console.error('IndexNow error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// GET: verifica che l'endpoint sia attivo
export async function GET() {
    return NextResponse.json({
        service: 'IndexNow',
        host: HOST,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        status: 'active',
    });
}

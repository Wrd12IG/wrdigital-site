import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const apiKey = process.env.FREEPIK_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'Freepik API Key missing' }, { status: 500 });
    }

    try {
        // Freepik API: Search for photos matching the query
        // Using filters[content_type.photo]=1 to get photos (suitable for covers)
        const res = await fetch(`https://api.freepik.com/v1/resources?locale=it-IT&page=1&limit=12&term=${encodeURIComponent(query)}&filters[content_type.photo]=1`, {
            headers: {
                'X-Freepik-API-Key': apiKey,
                'Accept-Language': 'it-IT'
            }
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Freepik API Error Body:', errorText);
            throw new Error(`Freepik API Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        // Map Freepik structure to our app's needs
        // Note: Freepik API structure might vary, we allow fallback
        const results = data.data.map((item: any) => ({
            id: item.id,
            urls: {
                // Prefer high-quality source, fallback to preview
                regular: item.image?.source?.url || item.preview?.url || '',
                small: item.preview?.url || item.image?.source?.url || ''
            },
            alt_description: item.title || 'Freepik Image',
            user: { name: item.author?.name || 'Freepik Author' }
        }));

        return NextResponse.json({ results });

    } catch (error: any) {
        console.error('Freepik Route Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
    // Configura credenziali da variabili d'ambiente
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const siteUrl = 'https://www.wrdigital.it/';

    // Se mancano le credenziali, restituisci dati di esempio (Mock) per visualizzare la UI
    if (!clientEmail || !privateKey) {
        return NextResponse.json(getMockData());
    }

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
        });

        const searchconsole = google.searchconsole({ version: 'v1', auth });

        // Calcola date: Ultimi 28 giorni
        const endDateObj = new Date();
        const startDateObj = new Date();
        startDateObj.setDate(endDateObj.getDate() - 28);

        const endDate = endDateObj.toISOString().split('T')[0];
        const startDate = startDateObj.toISOString().split('T')[0];

        // 1. Termometro Traffico (Timeline)
        const trafficRes = await searchconsole.searchanalytics.query({
            siteUrl,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['date'],
                rowLimit: 30,
            }
        });

        // 2. Top Keywords
        const keywordsRes = await searchconsole.searchanalytics.query({
            siteUrl,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['query'],
                rowLimit: 10,
                aggregationType: 'byProperty'
            }
        });

        // 3. Opportunità (High Impr, Low CTR)
        // Eseguo query ampia e filtro in memoria
        const opportunityRes = await searchconsole.searchanalytics.query({
            siteUrl,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['page', 'query'],
                rowLimit: 500
            }
        });

        // Filtro logico: Imp > 500, CTR < 3%, Pos < 20
        const rawOpps = opportunityRes.data.rows || [];
        const opportunities = rawOpps
            .filter((r: any) => (r.impressions || 0) > 500 && (r.ctr || 0) < 0.03 && (r.position || 0) < 20)
            .sort((a: any, b: any) => (b.impressions || 0) - (a.impressions || 0))
            .slice(0, 5);

        return NextResponse.json({
            traffic: trafficRes.data.rows || [],
            keywords: keywordsRes.data.rows || [],
            opportunities: opportunities,
            isMock: false
        });

    } catch (error) {
        console.error('GSC API Error:', error);
        return NextResponse.json({ ...getMockData(), error: 'API Error, showing mock data' });
    }
}

function getMockData() {
    const dates = [];
    for (let i = 28; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]);
    }

    const traffic = dates.map(d => ({
        keys: [d],
        clicks: Math.floor(Math.random() * 40) + 20 + (Math.random() * 50),
        impressions: Math.floor(Math.random() * 1000) + 500
    }));

    return {
        isMock: true,
        traffic,
        keywords: [
            { keys: ['agenzia seo milano'], position: 3.2, clicks: 154, impressions: 4500, ctr: 0.034 },
            { keys: ['realizzazione siti web'], position: 5.1, clicks: 98, impressions: 3200, ctr: 0.030 },
            { keys: ['consulenza marketing'], position: 8.4, clicks: 45, impressions: 8000, ctr: 0.005 },
            { keys: ['ecommerce strategy'], position: 2.1, clicks: 210, impressions: 1500, ctr: 0.14 },
            { keys: ['agenzia digitale'], position: 11.5, clicks: 30, impressions: 6000, ctr: 0.005 },
        ],
        opportunities: [
            { keys: ['/servizi/web', 'web design luxury'], position: 9.5, clicks: 12, impressions: 2800, ctr: 0.004 },
            { keys: ['/blog/seo-2026', 'trend seo futuri'], position: 12.1, clicks: 8, impressions: 1900, ctr: 0.004 }
        ]
    };
}

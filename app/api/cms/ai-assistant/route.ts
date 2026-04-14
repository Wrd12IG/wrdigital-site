import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { action, content, context } = await request.json();

        const GOOGLE_AI_KEY = process.env.GOOGLE_AI_KEY;

        if (!GOOGLE_AI_KEY) {
            return NextResponse.json(
                { error: 'Google AI API key not configured' },
                { status: 500 }
            );
        }

        let prompt = '';
        const systemMessage = 'Sei un esperto di copywriting e marketing digitale italiano. IMPORTANTE: Rispondi ESCLUSIVAMENTE con il testo richiesto. NON aggiungere saluti, spiegazioni, "Ecco le opzioni", o altro testo colloquiale. Restituisci SOLO il risultato finale.';

        switch (action) {
            case 'improve':
                prompt = `Migliora questo testo rendendolo più persuasivo e ottimizzato SEO, mantenendo il tono professionale:\n\n${content}`;
                break;

            case 'shorten':
                prompt = `Rendi questo testo più conciso senza perdere il messaggio chiave:\n\n${content}`;
                break;

            case 'lengthen':
                prompt = `Espandi questo testo aggiungendo dettagli rilevanti e esempi:\n\n${content}`;
                break;

            case 'seo':
                const keyword = context?.keyword || '';
                prompt = `Ottimizza questo testo per la keyword "${keyword}" migliorando la densità keyword e aggiungendo termini correlati LSI. Mantieni naturalezza e leggibilità:\n\n${content}`;
                break;

            case 'tone':
                const tone = context?.tone || 'professionale';
                prompt = `Riscrivi questo testo con un tono ${tone}:\n\n${content}`;
                break;

            case 'translate':
                const lang = context?.language || 'inglese';
                prompt = `Traduci questo testo in ${lang} mantenendo il tono e lo stile:\n\n${content}`;
                break;

            case 'generate-meta':
                prompt = `Genera:
1. Un meta title ottimizzato SEO (50-60 caratteri)
2. Una meta description persuasiva (120-160 caratteri)
3. 3 varianti di H1

Basandoti su questo contenuto:\n\n${content}`;
                break;

            default:
                prompt = `Migliora questo contenuto:\n\n${content}`;
                break;
        }

        // Call Google Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_AI_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: `${systemMessage}\n\nTask: ${prompt}` }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1000,
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Gemini API Error:', error);

            return NextResponse.json(
                { error: error.error?.message || 'Google AI request failed' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const result = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        return NextResponse.json({
            success: true,
            result,
            action,
            tokensUsed: 0 // Gemini usage metadata structure is different, keeping 0 for now
        });

    } catch (error: any) {
        console.error('AI Assistant Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

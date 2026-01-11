import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

function cleanAndParseJSON(text: string) {
    try {
        let clean = text.replace(/```json/g, '').replace(/```/g, '');
        const firstOpen = Math.min(
            clean.indexOf('{') === -1 ? Infinity : clean.indexOf('{'),
            clean.indexOf('[') === -1 ? Infinity : clean.indexOf('[')
        );
        const lastClose = Math.max(clean.lastIndexOf('}'), clean.lastIndexOf(']'));
        if (firstOpen !== Infinity && lastClose !== -1) {
            clean = clean.substring(firstOpen, lastClose + 1);
        }
        return JSON.parse(clean);
    } catch (e) {
        return null;
    }
}

export async function POST(request: Request) {
    try {
        const { type, topic, pageKey } = await request.json();

        if (type === 'trends') {
            try {
                const prompt = `Agisci come un esperto SEO specializzato nel MERCATO ITALIANO. 
                Genera un JSON array di 4 trend digitali emergenti SPECIFICAMENTE per l'Italia per il 2026.
                Le keyword devono essere in italiano e riflettere le ricerche degli utenti in Italia.
                Schema: [{keyword, volume, difficulty, topic}]. Solo JSON, no testo extra.`;

                const result = await model.generateContent(prompt);
                const json = cleanAndParseJSON(result.response.text());
                if (Array.isArray(json)) return NextResponse.json(json);
                throw new Error("Invalid JSON from AI");
            } catch (e) {
                console.error("GEMINI TRENDS ERROR:", e);
                return NextResponse.json([
                    { keyword: "SEO per l'IA in Italia", volume: "+450%", difficulty: "Alta", topic: "AI Strategy" },
                    { keyword: "Social Commerce TikTok Italia", volume: "+200%", difficulty: "Media", topic: "B2C" },
                    { keyword: "Digital Transformation PMI", volume: "+120%", difficulty: "Media", topic: "Business" },
                    { keyword: "Content Marketing 2026", volume: "+300%", difficulty: "Alta", topic: "Content" }
                ]);
            }
        }

        if (type === 'blog-post') {
            try {
                // 1. Generate Content with AI
                const prompt = `Agisci come un blogger esperto. Scrivi un articolo approfondito in italiano su: "${topic}". 
                Includi un titolo accattivante, un riassunto (excerpt) di max 2 righe, e il contenuto in Markdown con paragrafi ben strutturati, elenchi puntati e grasetti.
                Formatta la risposta come JSON: { "title": "...", "excerpt": "...", "content": "..." }`;

                const result = await model.generateContent(prompt);
                const data = cleanAndParseJSON(result.response.text()) || {
                    title: `${topic}: Guida 2026`,
                    content: result.response.text(),
                    excerpt: `Analisi approfondita su ${topic}.`
                };

                // 2. Try to get a real image from Freepik if configured
                let imageUrl = `https://loremflickr.com/1024/600/${encodeURIComponent(topic.split(' ')[0])}`;

                const freepikKey = process.env.FREEPIK_API_KEY;
                if (freepikKey) {
                    try {
                        const freeres = await fetch(`https://api.freepik.com/v1/resources?term=${encodeURIComponent(topic)}&filters[content_type.photo]=1&limit=1`, {
                            headers: { 'X-Freepik-API-Key': freepikKey }
                        });
                        if (freeres.ok) {
                            const freedata = await freeres.json();
                            if (freedata.data?.[0]?.image?.source?.url) {
                                imageUrl = freedata.data[0].image.source.url;
                            } else if (freedata.data?.[0]?.preview?.url) {
                                imageUrl = freedata.data[0].preview.url;
                            }
                        }
                    } catch (e) {
                        console.error("Freepik fetch error during AI generation:", e);
                    }
                }

                return NextResponse.json({
                    ...data,
                    image: imageUrl
                });
            } catch (e: any) {
                console.error("AI Blog Generation Error:", e);
                return NextResponse.json({ error: "AI Error", details: e.message }, { status: 500 });
            }
        }

        if (type === 'blog-seo') {
            try {
                const result = await model.generateContent(`Genera JSON SEO per articolo su "${topic}": {metaTitle, metaDescription, keywords}.`);
                const json = cleanAndParseJSON(result.response.text());
                return NextResponse.json(json || { metaTitle: topic, metaDescription: topic, keywords: topic });
            } catch {
                return NextResponse.json({ metaTitle: topic, metaDescription: topic, keywords: topic });
            }
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (e) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// FAQ Templates by topic
const faqTemplates: Record<string, any[]> = {
    'seo': [
        {
            question: "Quanto tempo ci vuole per vedere risultati SEO?",
            answer: "La SEO è un investimento a medio-lungo termine. I primi risultati tangibili si vedono generalmente tra i 3-6 mesi dall'inizio dell'attività, ma il tempo esatto dipende da diversi fattori: competitività del settore, stato attuale del sito, qualità dei contenuti e autorità del dominio. Tuttavia, costruiamo fondamenta solide che portano benefici duraturi nel tempo, con un ROI crescente che si consolida dopo il primo anno.",
            priority: 9,
            keywords: ["tempo risultati seo", "quanto tempo seo", "risultati seo"],
            searchIntent: "informational"
        },
        {
            question: "Cos'è la SEO tecnica e perché è importante?",
            answer: "La SEO tecnica è l'ottimizzazione del 'motore' del tuo sito web: velocità di caricamento, struttura delle URL, sicurezza HTTPS, dati strutturati (Schema.org), mobile-friendliness e crawlability. È la base fondamentale su cui costruire la tua strategia SEO perché, anche con contenuti eccellenti, un sito tecnicamente carente non verrà indicizzato correttamente da Google. Nel 2026, con i Core Web Vitals che impattano direttamente il ranking, la SEO tecnica è più importante che mai.",
            priority: 8,
            keywords: ["seo tecnica", "ottimizzazione tecnica", "core web vitals"],
            searchIntent: "informational"
        },
        {
            question: "Quanto costa un servizio SEO professionale?",
            answer: "Il costo di un servizio SEO professionale varia in base agli obiettivi, al settore e alla competitività. In generale, per PMI italiane consigliamo budget mensili a partire da 800-1500€/mese per attività SEO complete (audit, ottimizzazione on-page, link building, contenuti). Per e-commerce o settori molto competitivi, l'investimento può salire a 2000-5000€/mese. Diffidate da offerte troppo economiche: la SEO di qualità richiede competenze, tempo e strumenti professionali. In W[r]Digital offriamo pacchetti personalizzati con KPI misurabili e ROI trasparente.",
            priority: 10,
            keywords: ["costo seo", "prezzo seo", "quanto costa seo"],
            searchIntent: "commercial"
        },
        {
            question: "La SEO funziona ancora nel 2026?",
            answer: "Assolutamente sì! La SEO è più rilevante che mai nel 2026. Con l'evoluzione dell'AI e di Google SGE (Search Generative Experience), le strategie si sono evolute ma il concetto base rimane: apparire nelle ricerche quando gli utenti cercano soluzioni. Oggi la SEO richiede contenuti E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness), ottimizzazione per ricerca vocale, focus su user experience e dati strutturati. Chi si adatta vince; chi resta fermo perde.",
            priority: 7,
            keywords: ["seo 2026", "seo funziona", "seo ancora valida"],
            searchIntent: "informational"
        },
        {
            question: "Posso fare SEO da solo o serve un'agenzia?",
            answer: "Tecnicamente è possibile fare SEO in autonomia, soprattutto per progetti piccoli o blog personali. Tuttavia, per business competitivi, affidarsi a professionisti fa la differenza per diversi motivi: strumenti premium (Ahrefs, SEMrush, Screaming Frog), esperienza nel navigare algoritmi complessi, tempo dedicato (la SEO richiede costanza), network per link building di qualità e capacità di analisi strategica. Un'agenzia come W[r]Digital ti permette di concentrarti sul tuo core business mentre noi massimizziamo la tua visibilità online.",
            priority: 6,
            keywords: ["seo fai da te", "seo autonomia", "agenzia seo necessaria"],
            searchIntent: "commercial"
        }
    ],
    'social': [
        {
            question: "Quali social media dovrei usare per la mia azienda?",
            answer: "La scelta dei social dipende dal tuo target e obiettivi. Per B2B, LinkedIn è fondamentale per networking e lead generation. Instagram e TikTok dominano nel B2C, soprattutto per brand visivi e Gen Z/Millennials. Facebook resta rilevante per target 35+ e community locali. YouTube è essenziale per video-marketing e tutorial. In W[r]Digital analizziamo il tuo pubblico target per identificare i 2-3 canali dove concentrare gli sforzi, evitando dispersione di risorse.",
            priority: 9,
            keywords: ["quali social usare", "social media azienda", "scelta social network"],
            searchIntent: "informational"
        },
        {
            question: "Quanto spesso devo postare sui social?",
            answer: "La frequenza ideale varia per piattaforma: Instagram 4-7 post/settimana + Stories quotidiane; TikTok 3-5 video/settimana; LinkedIn 3-5 post/settimana; Facebook 3-4 post/settimana. La qualità batte sempre la quantità: meglio 3 post strategici a settimana che 10 post mediocri. L'algoritmo premia l'engagement, non il volume. In W[r]Digital creiamo calendari editoriali sostenibili che bilanciano frequenza, qualità dei contenuti e capacità produttiva del brand.",
            priority: 8,
            keywords: ["frequenza post social", "quanto postare", "calendario social"],
            searchIntent: "informational"
        },
        {
            question: "Come misuro il ROI dei social media?",
            answer: "Il ROI social si misura tracciando KPI specifici: tasso di conversione da social a sito, costo per lead (CPL), valore lifetime del cliente acquisito, engagement rate, reach e impression. Strumenti come Meta Business Suite, LinkedIn Analytics e UTM parameters permettono di tracciare il customer journey. Non fermarti a like e follower: quello che conta è quanti lead/vendite generano i tuoi sforzi social. In W[r]Digital configuriamo dashboard personalizzate che mostrano il vero impatto economico delle campagne social.",
            priority: 10,
            keywords: ["roi social media", "misurare social", "kpi social media"],
            searchIntent: "commercial"
        }
    ],
    'google ads': [
        {
            question: "Qual è il budget minimo per Google Ads?",
            answer: "Non esiste un budget minimo assoluto per Google Ads, ma per ottenere dati significativi e risultati concreti consigliamo di partire da almeno 500-1000€/mese. Questo permette di raccogliere abbastanza click e conversioni per ottimizzare le campagne. Per settori competitivi (es. assicurazioni, finanza, legale) può servire un budget superiore. Il budget ideale dipende dal CPC medio del tuo settore e dagli obiettivi di acquisizione. In W[r]Digital facciamo sempre un'analisi preliminare per definire il budget ottimale basato sul tuo ROI target.",
            priority: 10,
            keywords: ["budget google ads", "quanto costa google ads", "budget minimo ads"],
            searchIntent: "commercial"
        },
        {
            question: "Google Ads funziona davvero per le piccole imprese?",
            answer: "Assolutamente sì! Google Ads è uno strumento democratico che permette anche alle piccole imprese di competere con grandi brand, grazie al targeting preciso e al modello pay-per-click. La chiave è la strategia: scegliere keyword long-tail meno competitive, ottimizzare landing page per conversione, utilizzare estensioni annuncio e monitorare costantemente il Quality Score. Una PMI ben gestita può ottenere ROAS (Return on Ad Spend) di 3x-8x, rendendo Google Ads uno dei canali più redditizi. In W[r]Digital specializziamo le campagne per massimizzare il budget di PMI.",
            priority: 9,
            keywords: ["google ads pmi", "ads piccole imprese", "google ads funziona"],
            searchIntent: "commercial"
        }
    ],
    'web': [
        {
            question: "Quanto tempo serve per realizzare un sito web?",
            answer: "Le tempistiche per un sito web dipendono dalla complessità del progetto. Una Landing Page professionale richiede circa 2-3 settimane. Un sito vetrina aziendale (5-10 pagine) richiede 4-6 settimane. Un e-commerce o una web app complessa possono richiedere dai 2 ai 4 mesi. In W[r]Digital lavoriamo con sprint settimanali e scadenze certe, garantendo un go-live rapido senza compromettere la qualità o l'ottimizzazione SEO.",
            priority: 8,
            keywords: ["tempi sito web", "quanto tempo sito", "durata progetto web"],
            searchIntent: "informational"
        },
        {
            question: "È meglio usare Wordpress o un sito su misura?",
            answer: "Dipende dalle esigenze. WordPress è ottimo per blog e siti editoriali grazie alla facilità di gestione, ma può essere lento e vulnerabile se non manutenuto. Per aziende che cercano performance massime, sicurezza e design unico, consigliamo soluzioni su misura (come Next.js/React) che garantiscono velocità di caricamento istantanee (Core Web Vitals ottimali) e massima scalabilità. W[r]Digital è specializzata in entrambe le tecnologie e ti consiglierà la soluzione migliore per il tuo business case.",
            priority: 9,
            keywords: ["wordpress vs custom", "sito su misura", "quale cms scegliere"],
            searchIntent: "commercial"
        },
        {
            question: "Il sito sarà ottimizzato per mobile?",
            answer: "Assolutamente si. Oggi oltre il 70% del traffico web è mobile. Adottiamo un approccio 'Mobile-First': progettiamo l'esperienza utente partendo dagli smartphone per poi scalarla su desktop. I nostri siti sono responsive, veloci e testati su tutti i dispositivi principali per garantire un'esperienza fluida e conversioni elevate anche da mobile.",
            priority: 10,
            keywords: ["sito mobile friendly", "responsive design", "ottimizzazione mobile"],
            searchIntent: "informational"
        }
    ],
    'ecommerce': [
        {
            question: "Quale piattaforma e-commerce scegliere?",
            answer: "Per brand in crescita, Shopify è spesso la scelta migliore per affidabilità e facilità d'uso. Per progetti complessi con integrazioni custom, WooCommerce o soluzioni Headless (Shopify Plus + Next.js) offrono maggiore flessibilità. W[r]Digital analizza il tuo catalogo, volumi di vendita e necessità logistiche per consigliare l'infrastruttura tecnologica più adatta a scalare il tuo fatturato.",
            priority: 9,
            keywords: ["piattaforma ecommerce", "shopify vs woocommerce", "miglior ecommerce"],
            searchIntent: "commercial"
        },
        {
            question: "Come posso aumentare le vendite del mio e-commerce?",
            answer: "Aumentare le vendite richiede un mix di CRO (Conversion Rate Optimization), Email Marketing e Advertising. Ottimizziamo le schede prodotto, semplifichiamo il checkout, implementiamo recupero carrelli abbandonati (che recupera fino al 15% delle vendite perse) e creiamo campagne Google Shopping mirate. L'obiettivo è aumentare il Customer Lifetime Value (LTV) e ridurre il Costo di Acquisizione (CAC).",
            priority: 10,
            keywords: ["aumentare vendite ecommerce", "strategia ecommerce", "vendere online"],
            searchIntent: "commercial"
        }
    ],
    'default': [
        {
            question: "Perché scegliere W[r]Digital come partner digitale?",
            answer: "W[r]Digital non è la classica agenzia. Uniamo creatività e dati con un approccio scientifico al marketing digitale. Il nostro metodo si basa su KPI reali e ROI misurabile, costruendo strategie personalizzate che durano nel tempo. Ogni progetto è seguito da specialist dedicati con competenze verticali (SEO, Ads, Social, Dev). Non vendiamo pacchetti preconfezionati ma soluzioni su misura. Il nostro track record parla chiaro: 95% dei clienti in prima pagina Google, +380% di traffico medio, 2.5x ROI sulle campagne Ads. Trasformiamo la tua presenza online in un generatore di profitti concreto.",
            priority: 8,
            keywords: ["agenzia digital marketing", "perchè scegliere wrdigital", "agenzia milano"],
            searchIntent: "commercial"
        },
        {
            question: "Quali servizi offre W[r]Digital?",
            answer: "Copriamo l'intero ecosistema digitale con 4 pilastri: SEO & Content (ottimizzazione tecnica, link building, contenuti strategici), Social Media (gestione Instagram, TikTok, LinkedIn con focus su community building), Web Development (siti ultra-performanti con Next.js, mobile-first, ottimizzati SEO) e Ads & Performance (Google Ads, Meta Ads, campagne data-driven con focus su ROAS). Offriamo anche servizi complementari come e-commerce development, marketing automation e consulenza strategica. Ogni servizio è scalabile in base agli obiettivi e al budget del cliente.",
            priority: 9,
            keywords: ["servizi digital marketing", "cosa fa wrdigital", "servizi agenzia"],
            searchIntent: "informational"
        },
        {
            question: "Come iniziare a lavorare con W[r]Digital?",
            answer: "Il processo è semplice e trasparente: 1) Primo contatto via form o telefono dove capiamo le tue esigenze iniziali. 2) Audit gratuita del tuo attuale stato digitale (sito, social, competitors). 3) Presentazione strategia personalizzata con timeline, KPI e budget chiaro. 4) Kick-off progetto con assegnazione del team dedicato. 5) Monitoring continuo con report mensili trasparenti. Non richiediamo vincoli lunghissimi: vogliamo guadagnarci la tua fiducia mese dopo mese con risultati concreti. Il primo step? Contattaci per la tua audit gratuita.",
            priority: 7,
            keywords: ["come iniziare wrdigital", "processo collaborazione", "audit gratuita"],
            searchIntent: "commercial"
        }
    ]
};

/**
 * POST /api/admin/faq-suggestions
 * Body: { queries?: string[], topic?: string }
 * Returns: { suggestions: Array<{ question: string, answer: string, priority: number }> }
 */
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Simulate AI "Thinking" delay for UX
        await new Promise(resolve => setTimeout(resolve, 1500));

        const { queries, topic } = await req.json();

        let suggestions: any[] = [];
        let source = '';

        if (topic) {
            // Use topic to find matching template
            const topicLower = topic.toLowerCase();
            let templateKey = 'default';

            if (topicLower.includes('seo')) templateKey = 'seo';
            else if (topicLower.includes('social')) templateKey = 'social';
            else if (topicLower.includes('ads') || topicLower.includes('google ads')) templateKey = 'google ads';
            else if (topicLower.includes('web') || topicLower.includes('sito') || topicLower.includes('design')) templateKey = 'web';
            else if (topicLower.includes('shop') || topicLower.includes('ecommerce') || topicLower.includes('vendere')) templateKey = 'ecommerce';

            suggestions = faqTemplates[templateKey] || faqTemplates['default'];
            source = `topic-based: ${topic}`;
        } else if (queries && queries.length > 0) {
            // Analyze queries to determine best template
            const queriesText = queries.join(' ').toLowerCase();
            let templateKey = 'default';

            if (queriesText.includes('seo')) templateKey = 'seo';
            else if (queriesText.includes('social')) templateKey = 'social';
            else if (queriesText.includes('ads')) templateKey = 'google ads';
            else if (queriesText.includes('web') || queriesText.includes('sito')) templateKey = 'web';
            else if (queriesText.includes('shop') || queriesText.includes('ecommerce')) templateKey = 'ecommerce';

            suggestions = faqTemplates[templateKey] || faqTemplates['default'];
            source = `google-queries: ${queries.length} queries`;
        } else {
            return NextResponse.json({ error: 'Fornisci almeno queries o topic' }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            suggestions: suggestions,
            metadata: {
                source: source,
                generatedAt: new Date().toISOString(),
                topic: topic || 'Google Search Queries',
                queriesAnalyzed: queries?.length || 0
            }
        });

    } catch (error: any) {
        console.error('FAQ Suggestions Error:', error);
        return NextResponse.json({
            error: 'Errore nella generazione delle FAQ',
            details: error.message
        }, { status: 500 });
    }
}

/**
 * GET /api/admin/faq-suggestions?topic=seo
 * Quick suggestions based on topic
 */
export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any)?.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const topic = searchParams.get('topic') || 'digital marketing';

    // Forward to POST with topic
    return POST(new Request(req.url, {
        method: 'POST',
        headers: req.headers,
        body: JSON.stringify({ topic })
    }));
}

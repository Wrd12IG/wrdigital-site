
export const servicesData: Record<string, {
    title: string;
    uvpTitle: string;
    uvpSubtitle: string;
    ctaText: string;
    description: string;
    clientCount: number;
    stats: { value: string; label: string }[];
    benefits: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    testimonials: { quote: string; author: string; company: string; result: string }[];
    comparison: { feature: string; diy: string; agency: string; wrdigital: string }[];
}> = {
    'seo': {
        title: 'SEO & Content',
        uvpTitle: 'SEO: Fatti trovare quando conta davvero.',
        uvpSubtitle: 'Essere in seconda pagina su Google significa essere invisibili.',
        ctaText: 'Analizza il mio sito gratis',
        clientCount: 52,
        description: 'In W[r]Digital scaliamo i motori di ricerca con un approccio tecnico e contenuti che piacciono sia agli algoritmi che alle persone. Costruiamo un\'infrastruttura di acquisizione organica che lavora 24/7.',
        stats: [
            { value: '+145%', label: 'Traffico Organico' },
            { value: '3.8x', label: 'ROI Medio' },
            { value: '4', label: 'Mesi per Risultati' }
        ],
        benefits: [
            { title: 'Audit Tecnica Profonda', description: 'Analisi completa di 200+ fattori SEO con report dettagliato e priorità di intervento.' },
            { title: 'Link Building Premium', description: 'Backlink da siti autorevoli (DR 50+) nel tuo settore per scalare le SERP.' },
            { title: 'Content Strategy ROI', description: 'Piano editoriale basato su keyword ad alto intento di acquisto.' },
            { title: 'Rimozione Penalizzazioni', description: 'Recupero da penalizzazioni Google con garanzia di risultato.' },
            { title: 'Report Mensili Trasparenti', description: 'Dashboard in tempo reale + call mensile con il tuo SEO Specialist.' }
        ],
        faq: [
            { question: 'Quanto tempo ci vuole per vedere risultati SEO?', answer: 'I primi miglioramenti sono visibili in 2-3 mesi. Risultati significativi in 4-6 mesi. La SEO è un investimento a lungo termine che cresce esponenzialmente.' },
            { question: 'Quanto costa il servizio SEO?', answer: 'I nostri piani partono da €1.500/mese per PMI. Il costo dipende dalla competitività del settore e dagli obiettivi. Richiedi un preventivo personalizzato.' },
            { question: 'Lavorate con competitor nel mio settore?', answer: 'No. Garantiamo esclusività di settore per area geografica. Non lavorerai mai contro un nostro cliente.' },
            { question: 'Cosa succede se non raggiungo i risultati?', answer: 'Offriamo una garanzia performance-based. Se non miglioriamo il tuo traffico organico del 50% in 6 mesi, lavoriamo gratis fino al raggiungimento.' }
        ],
        testimonials: [
            { quote: 'In 6 mesi siamo passati dalla pagina 3 alla prima posizione.', author: 'Marco B.', company: 'TechSolutions', result: '+380% Traffico' },
            { quote: 'ROI del 400% sul nostro investimento SEO. Risultati concreti.', author: 'Elena R.', company: 'E-Shop Italia', result: '4x ROI' },
            { quote: 'Finalmente visibili per le keyword che contano davvero.', author: 'Luca M.', company: 'Studio Legale', result: '+95 Keyword Top 3' }
        ],
        comparison: [
            { feature: 'ROI Medio', diy: '0.5x', agency: '1.5x', wrdigital: '3.8x' },
            { feature: 'Tempo Risultati', diy: '12+ mesi', agency: '8 mesi', wrdigital: '4 mesi' },
            { feature: 'Backlink/mese', diy: '2-5', agency: '10-15', wrdigital: '25+' },
            { feature: 'Report', diy: 'Nessuno', agency: 'Mensile', wrdigital: 'Real-time' },
            { feature: 'Supporto', diy: '-', agency: 'Email', wrdigital: 'Dedicato 24/7' }
        ]
    },
    'social': {
        title: 'Social Media',
        uvpTitle: 'Social Media: Costruiamo community, non solo follower.',
        uvpSubtitle: 'I "like" non pagano le bollette. Trasforma i follower in clienti fedeli.',
        ctaText: 'Ottieni una consulenza social',
        clientCount: 41,
        description: 'Creiamo narrazioni visive e piani editoriali che trasformano gli utenti distratti in ambasciatori fedeli del tuo brand.',
        stats: [
            { value: '+300%', label: 'Engagement Rate' },
            { value: '-40%', label: 'Costo per Lead' },
            { value: '15', label: 'Post/Mese' }
        ],
        benefits: [
            { title: 'Visual Storytelling', description: 'Contenuti video e grafici che catturano l\'attenzione nei primi 3 secondi.' },
            { title: 'Community Management', description: 'Risposte entro 1 ora, 7 giorni su 7. La tua community sempre curata.' },
            { title: 'Social Ads Conversion', description: 'Campagne Meta ottimizzate per lead e vendite, non vanity metrics.' },
            { title: 'Influencer Activation', description: 'Network di 500+ creator per amplificare il tuo messaggio.' },
            { title: 'Direct Response Copy', description: 'Testi che convertono, basati su psicologia e A/B testing.' }
        ],
        faq: [
            { question: 'Quanti post pubblicate al mese?', answer: 'Il piano base include 15 post/mese + Stories giornaliere. Possiamo scalare in base alle tue esigenze.' },
            { question: 'Gestite anche le risposte ai commenti?', answer: 'Sì, il Community Management è incluso in tutti i piani. Rispondiamo entro 1 ora in orario lavorativo.' },
            { question: 'Posso approvare i contenuti prima della pubblicazione?', answer: 'Certamente. Ogni mese ricevi il piano editoriale completo per approvazione con almeno 7 giorni di anticipo.' },
            { question: 'Lavorate con TikTok?', answer: 'Sì! Siamo specializzati in contenuti short-form per TikTok, Reels e Shorts.' }
        ],
        testimonials: [
            { quote: 'Da 2.000 a 50.000 follower in 8 mesi. Il 15% sono diventati clienti.', author: 'Laura R.', company: 'BeautyLab', result: '+2400% Follower' },
            { quote: 'Engagement triplicato in 3 mesi. I nostri post ora convertono.', author: 'Fabio T.', company: 'FitnessPro', result: '+320% Engagement' },
            { quote: 'Community attiva e lead costanti ogni settimana.', author: 'Sara M.', company: 'Boutique Milano', result: '45 Lead/mese' }
        ],
        comparison: [
            { feature: 'Engagement Rate', diy: '1-2%', agency: '3-4%', wrdigital: '8%+' },
            { feature: 'Post/Mese', diy: '4-8', agency: '12', wrdigital: '15+' },
            { feature: 'Tempo Risposta', diy: '24h+', agency: '4h', wrdigital: '< 1h' },
            { feature: 'Video Content', diy: 'No', agency: '2/mese', wrdigital: '8/mese' },
            { feature: 'Influencer', diy: 'No', agency: 'Extra', wrdigital: 'Incluso' }
        ]
    },
    'ads': {
        title: 'Advertising',
        uvpTitle: 'Smetti di bruciare budget. Inizia a investire in Profitto.',
        uvpSubtitle: 'Campagne PPC chirurgiche su Google e Meta. Paghi solo per risultati misurabili.',
        ctaText: 'Calcola il tuo potenziale ROI',
        clientCount: 38,
        description: 'Ogni euro speso deve tornarti con gli interessi. Utilizziamo algoritmi di bidding avanzati e creatività ad alta conversione.',
        stats: [
            { value: '4.2', label: 'ROAS Medio' },
            { value: '-35%', label: 'CPA vs Media' },
            { value: '72', label: 'Ore Setup' }
        ],
        benefits: [
            { title: 'Google Search & Shopping', description: 'Campagne search intent-based che catturano clienti pronti all\'acquisto.' },
            { title: 'Meta Scaling', description: 'Strategie di scaling profittevole da €1k a €100k/mese di spend.' },
            { title: 'Retargeting Omnicanale', description: 'Sequenze multi-touchpoint che convertono il 340% in più.' },
            { title: 'A/B Testing Continuo', description: 'Test settimanali su creatività, copy e landing per ottimizzare il ROAS.' },
            { title: 'Dashboard Real-time', description: 'Monitora performance, spesa e ROI in tempo reale dal tuo smartphone.' }
        ],
        faq: [
            { question: 'Qual è il budget minimo per iniziare?', answer: 'Consigliamo un minimo di €2.000/mese di ad spend per avere dati sufficienti all\'ottimizzazione. Il nostro fee è separato.' },
            { question: 'Quanto tempo per vedere il ROI positivo?', answer: 'Con campagne ben strutturate, il break-even si raggiunge solitamente entro 30-45 giorni.' },
            { question: 'Gestite anche il creative?', answer: 'Sì, abbiamo un team interno di graphic designer e copywriter specializzati in advertising.' },
            { question: 'Che piattaforme usate?', answer: 'Google Ads (Search, Display, Shopping, YouTube), Meta (Facebook, Instagram), LinkedIn, TikTok Ads.' }
        ],
        testimonials: [
            { quote: 'ROAS da 1.8 a 5.2 in 3 mesi. Fatturato triplicato stesso budget.', author: 'Andrea V.', company: 'FashionStore', result: 'ROAS 5.2x' },
            { quote: 'CPA dimezzato in 6 settimane. Campagne finalmente profittevoli.', author: 'Marco P.', company: 'TechStartup', result: '-52% CPA' },
            { quote: 'Scaling da 5k a 50k/mese mantenendo il ROAS. Incredibile.', author: 'Giulia F.', company: 'HomeDecor', result: '10x Scale' }
        ],
        comparison: [
            { feature: 'ROAS Medio', diy: '1.2x', agency: '2.5x', wrdigital: '4.2x' },
            { feature: 'CPA', diy: '+40%', agency: 'Media', wrdigital: '-35%' },
            { feature: 'Test/Mese', diy: '2-3', agency: '5-8', wrdigital: '20+' },
            { feature: 'Creatività', diy: 'Fai da te', agency: 'Extra', wrdigital: 'Incluse' },
            { feature: 'Ottimizzazione', diy: 'Settimanale', agency: '2x/sett', wrdigital: 'Giornaliera' }
        ]
    },
    'web': {
        title: 'Web Design',
        uvpTitle: 'Web Design: Il tuo ufficio digitale aperto 24/7.',
        uvpSubtitle: 'Un sito lento allontana i clienti. Progettiamo velocità e conversione.',
        ctaText: 'Richiedi preventivo in 24h',
        clientCount: 47,
        description: 'Progettiamo esperienze web ultra-veloci, moderne e ottimizzate per convertire ogni visita in un contatto qualificato.',
        stats: [
            { value: '0.8', label: 'Sec Load Time' },
            { value: '98', label: 'PageSpeed Score' },
            { value: '+65%', label: 'Conversion Rate' }
        ],
        benefits: [
            { title: 'Design Mobile-First', description: 'Il 70% del traffico è mobile. Partiamo da lì per garantire UX perfetta.' },
            { title: 'Velocità < 2 Secondi', description: 'Ogni secondo di ritardo costa il 7% delle conversioni. Noi li eliminiamo.' },
            { title: 'UX Conversion-Focused', description: 'Layout studiati per guidare l\'utente verso l\'azione desiderata.' },
            { title: 'Integrazione CRM', description: 'Collegamento nativo con HubSpot, Salesforce, Mailchimp e 50+ tool.' },
            { title: 'Sicurezza Enterprise', description: 'SSL, backup giornalieri, protezione DDoS e monitoraggio 24/7.' }
        ],
        faq: [
            { question: 'Quanto tempo ci vuole per un sito web?', answer: 'Landing page: 2 settimane. Sito corporate: 4-6 settimane. E-commerce: 8-12 settimane.' },
            { question: 'Usate WordPress o codice custom?', answer: 'Dipende dal progetto. Per massime performance usiamo Next.js. Per gestione autonoma, WordPress ottimizzato.' },
            { question: 'Il sito sarà ottimizzato SEO?', answer: 'Assolutamente. Ogni sito include SEO tecnica on-page completa: meta tag, schema markup, sitemap, robots.txt.' },
            { question: 'Offrite manutenzione post-lancio?', answer: 'Sì, piani di manutenzione da €150/mese che includono aggiornamenti, backup e supporto prioritario.' }
        ],
        testimonials: [
            { quote: 'Sito che carica in <1s. Richieste preventivo +180% nel primo mese.', author: 'Giulia N.', company: 'ArchStudio', result: '+180% Lead' },
            { quote: 'PageSpeed da 45 a 98. Conversioni raddoppiate.', author: 'Roberto C.', company: 'ConsulenzaHR', result: '+110% Conv.' },
            { quote: 'Design moderno che ha riposizionato il nostro brand. Wow.', author: 'Alessia B.', company: 'LuxuryTravel', result: 'Brand Premium' }
        ],
        comparison: [
            { feature: 'Load Time', diy: '5+ sec', agency: '3 sec', wrdigital: '< 1 sec' },
            { feature: 'PageSpeed', diy: '40-60', agency: '70-85', wrdigital: '95+' },
            { feature: 'Mobile UX', diy: 'Adattato', agency: 'Responsive', wrdigital: 'Mobile-First' },
            { feature: 'SEO Tecnica', diy: 'Base', agency: 'Inclusa', wrdigital: 'Avanzata' },
            { feature: 'Supporto', diy: 'Nessuno', agency: 'Email', wrdigital: '24/7 Dedicato' }
        ]
    },
    'strategy': {
        title: 'Marketing Strategy',
        uvpTitle: 'Marketing Strategy: Il cervello dietro la crescita.',
        uvpSubtitle: 'Senza una mappa, ti perdi. Disegniamo la rotta sicura verso i tuoi obiettivi di fatturato.',
        ctaText: 'Pianifica la tua crescita',
        clientCount: 25,
        description: 'Trasformiamo obiettivi aziendali in piani d\'azione concreti. Analizziamo il mercato, definiamo il posizionamento e orchestrano i canali per la massima efficienza.',
        stats: [
            { value: '+210%', label: 'Crescita YoY' },
            { value: '-25%', label: 'Churn Rate' },
            { value: '30+', label: 'Audit Strategici' }
        ],
        benefits: [
            { title: 'Analisi Competitiva', description: 'Mappatura completa dei competitor per identificare gap e opportunità inesplorate.' },
            { title: 'Brand Positioning', description: 'Definizione della Value Proposition unica per distinguersi nel mercato affollato.' },
            { title: 'Funnel Architecture', description: 'Progettazione del percorso cliente ottimale, dall\'awareness alla fidelizzazione.' },
            { title: 'Data Analytics Setup', description: 'Configurazione di dashboard per decisioni basate sui dati, non sulle opinioni.' },
            { title: 'Retention Strategy', description: 'Strategie per aumentare il Lifetime Value (LTV) e ridurre l\'abbandono.' }
        ],
        faq: [
            { question: 'A chi serve una strategia di marketing?', answer: 'A tutte le aziende che vogliono crescere in modo prevedibile e scalabile, uscendo dalla logica del "si è sempre fatto così".' },
            { question: 'Si tratta solo di teoria?', answer: 'Assolutamente no. Consegniamo un piano operativo (Action Plan) con scadenze, budget e KPI da monitorare.' },
            { question: 'Collaborate con il mio team interno?', answer: 'Sì, spesso agiamo come "Fractional CMO", guidando il tuo team nell\'esecuzione corretta della strategia.' },
            { question: 'Quanto dura una consulenza strategica?', answer: 'La fase di audit e pianificazione dura 4-6 settimane. Poi possiamo supportarti nell\'esecuzione mensile.' }
        ],
        testimonials: [
            { quote: 'Finalmente abbiamo capito dove stavamo sprecando budget. Chiarezza assoluta.', author: 'Stefano G.', company: 'FinTech SpA', result: '-30% Sprechi' },
            { quote: 'Un piano d\'azione che ha raddoppiato il nostro fatturato in 12 mesi.', author: 'Maria L.', company: 'FashionBrand', result: '2x Fatturato' },
            { quote: 'W[r]Digital è diventato il nostro reparto marketing strategico esterno.', author: 'Paolo R.', company: 'B2B Services', result: 'Partner 3 Anni' }
        ],
        comparison: [
            { feature: 'Approccio', diy: 'Tattico', agency: 'Esecutivo', wrdigital: 'Olistico' },
            { feature: 'Focus', diy: 'Risparmio', agency: 'Media Spend', wrdigital: 'Marginalità' },
            { feature: 'Output', diy: 'Idee sparse', agency: 'Campagne', wrdigital: 'Action Plan' },
            { feature: 'Orizzonte', diy: 'Breve', agency: 'Medio', wrdigital: 'Lungo Termine' },
            { feature: 'Supporto', diy: '-', agency: 'Account', wrdigital: 'Senior Strategist' }
        ]
    }
};

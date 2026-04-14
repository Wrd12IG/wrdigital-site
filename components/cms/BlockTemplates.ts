import { BlockType } from './BlockEditor';

export interface BlockTemplate {
    id: string;
    name: string;
    description: string;
    category: 'hero' | 'content' | 'cta' | 'layout';
    thumbnail?: string;
    blocks: Array<{
        type: BlockType;
        content: Record<string, any>;
    }>;
}

export const BLOCK_TEMPLATES: BlockTemplate[] = [
    // HERO TEMPLATES
    {
        id: 'hero-agency',
        name: 'Hero Agenzia',
        description: 'Hero perfetto per agenzie digitali con gradiente moderno',
        category: 'hero',
        blocks: [{
            type: 'hero',
            content: {
                title: 'Trasformiamo la tua presenza digitale',
                subtitle: '<p>L\'<strong>agenzia di marketing digitale</strong> che fa crescere il tuo business con strategie data-driven e creatività premium.</p>',
                ctaText: 'Richiedi una Consulenza Gratuita',
                ctaLink: '/contatti',
                backgroundType: 'gradient'
            }
        }]
    },
    {
        id: 'hero-ecommerce',
        name: 'Hero E-commerce',
        description: 'Hero ottimizzato per conversion con call-to-action chiara',
        category: 'hero',
        blocks: [{
            type: 'hero',
            content: {
                title: 'Le migliori offerte del 2026',
                subtitle: '<p>Scopri i prodotti più venduti con <strong>spedizione gratuita</strong> e <strong>garanzia 30 giorni</strong>.</p>',
                ctaText: 'Scopri le Offerte',
                ctaLink: '/prodotti',
                backgroundType: 'image'
            }
        }]
    },
    {
        id: 'hero-saas',
        name: 'Hero SaaS',
        description: 'Hero per software con focus su benefit e prova gratuita',
        category: 'hero',
        blocks: [{
            type: 'hero',
            content: {
                title: 'Il software che automatizza il tuo flusso di lavoro',
                subtitle: '<p>Risparmia <strong>15 ore a settimana</strong> con il nostro sistema intelligente di gestione progetti.</p>',
                ctaText: 'Inizia la prova gratuita di 14 giorni',
                ctaLink: '/signup',
                backgroundType: 'gradient'
            }
        }]
    },

    // CONTENT TEMPLATES
    {
        id: 'about-story',
        name: 'Chi Siamo - Storia',
        description: 'Sezione About Us con storia aziendale',
        category: 'content',
        blocks: [
            {
                type: 'text-block',
                content: {
                    content: `
                        <h2>La nostra storia</h2>
                        <p>Fondata nel 2020, <strong>W[r]Digital</strong> nasce dalla passione di tre professionisti del marketing digitale con un obiettivo chiaro: portare risultati concreti alle aziende italiane.</p>
                        <p>In appena 4 anni abbiamo servito oltre <strong>200 clienti</strong> in tutta Italia, generando un fatturato combinato di oltre <em>15 milioni di euro</em>  grazie alle nostre strategie SEO, Social Media e Advertising.</p>
                        <h3>I nostri valori</h3>
                        <ul>
                            <li><strong>Trasparenza</strong>: Report dettagliati ogni mese</li>
                            <li><strong>ROI-First</strong>: Ogni euro deve tornare moltiplicato</li>
                            <li><strong>Partnership</strong>: Il tuo successo è il nostro successo</li>
                        </ul>
                    `
                }
            }
        ]
    },
    {
        id: 'blog-article',
        name: 'Articolo Blog',
        description: 'Template per articolo blog ottimizzato SEO',
        category: 'content',
        blocks: [
            {
                type: 'text-block',
                content: {
                    content: `
                        <h1>Come aumentare il traffico organico del 300% in 6 mesi</h1>
                        <p><em>Pubblicato il 7 gennaio 2026 • Tempo di lettura: 8 minuti</em></p>
                        
                        <p>La <strong>SEO</strong> non è morta. Anzi, nel 2026 è più importante che mai. In questa guida ti mostrerò esattamente come abbiamo triplicato il traffico organico di un nostro cliente in soli 6 mesi.</p>
                        
                        <h2>1. Audit Tecnica Profonda</h2>
                        <p>Il primo passo è sempre un'analisi completa del sito. Ecco cosa controllare:</p>
                        <ul>
                            <li>Velocità di caricamento (obiettivo: < 2 secondi)</li>
                            <li>Core Web Vitals (LCP, FID, CLS)</li>
                            <li>Struttura URL e sitemap</li>
                            <li>Mobile-friendliness</li>
                        </ul>
                        
                        <blockquote>"Un sito lento costa il 7% di conversioni per ogni secondo di ritardo" - Google Research</blockquote>
                        
                        <h2>2. Content Strategy</h2>
                        <p>Identificare le <strong>keyword ad alto intento</strong> è fondamentale. Non puntare solo su keyword ad alto volume.</p>
                    `
                }
            }
        ]
    },
    {
        id: 'feature-list',
        name: 'Lista Features',
        description: 'Elenco caratteristiche prodotto/servizio', category: 'content',
        blocks: [
            {
                type: 'text-block',
                content: {
                    content: `
                        <h2>Tutto quello che ti serve, in un unico strumento</h2>
                        <p>Il nostro software include tutte le funzionalità per gestire il tuo business digitale.</p>
                        
                        <h3>📊 Analytics Avanzati</h3>
                        <p>Dashboard in tempo reale con metriche personalizzate, export CSV/PDF e integrazione con Google Analytics 4.</p>
                        
                        <h3>🤖 Automazioni Intelligenti</h3>
                        <p>Crea workflow automatici che ti fanno risparmiare ore ogni settimana. Trigger basati su eventi, condizioni e azioni multiple.</p>
                        
                        <h3>🔒 Sicurezza Enterprise</h3>
                        <p>Crittografia end-to-end, backup giornalieri automatici, conformità GDPR e certificazione ISO 27001.</p>
                        
                        <h3>👥 Collaborazione Team</h3>
                        <p>Invita il tuo team, assegna ruoli e permessi, commenta e tagga colleghi direttamente nei task.</p>
                    `
                }
            }
        ]
    },

    // CTA TEMPLATES
    {
        id: 'cta-consultation',
        name: 'CTA Consulenza',
        description: 'Call-to-action per prenotazione consulenza',
        category: 'cta',
        blocks: [{
            type: 'cta',
            content: {
                title: 'Vuoi far crescere il tuo business online?',
                description: '<p>Prenota una <strong>consulenza gratuita di 30 minuti</strong> con un nostro esperto. Analizzeremo la tua situazione attuale e ti proporremo una strategia personalizzata.</p>',
                buttonText: 'Prenota la Consulenza Gratuita',
                buttonLink: '/contatti',
                style: 'primary'
            }
        }]
    },
    {
        id: 'cta-trial',
        name: 'CTA Prova Gratuita',
        description: 'Call-to-action per free trial SaaS',
        category: 'cta',
        blocks: [{
            type: 'cta',
            content: {
                title: 'Pronto a provare gratuitamente?',
                description: '<p><strong>14 giorni di prova gratuita</strong>. Nessuna carta di credito richiesta. Cancella quando vuoi.</p>',
                buttonText: 'Inizia subito gratis',
                buttonLink: '/signup',
                style: 'primary'
            }
        }]
    },
    {
        id: 'cta-newsletter',
        name: 'CTA Newsletter',
        description: 'Call-to-action per iscrizione newsletter',
        category: 'cta',
        blocks: [{
            type: 'cta',
            content: {
                title: 'Resta aggiornato con la nostra newsletter',
                description: '<p>Ricevi ogni settimana <strong>strategie, case study e consigli</strong> direttamente nella tua inbox. Già 5.000+ professionisti si fidano di noi.</p>',
                buttonText: 'Iscriviti Gratis',
                buttonLink: '/newsletter',
                style: 'secondary'
            }
        }]
    },

    // LAYOUT TEMPLATES
    {
        id: 'landing-complete',
        name: 'Landing Page Completa',
        description: 'Template landing page conversion-optimized',
        category: 'layout',
        blocks: [
            {
                type: 'hero',
                content: {
                    title: 'Il Corso di Marketing Digitale #1 in Italia',
                    subtitle: '<p>Impara da <strong>esperti con 10+ anni di esperienza</strong> e ottieni risultati concreti in 90 giorni. Garanzia soddisfatti o rimborsati.</p>',
                    ctaText: 'Iscriviti al Corso',
                    ctaLink: '#pricing',
                    backgroundType: 'gradient'
                }
            },
            {
                type: 'text-block',
                content: {
                    content: `
                        <h2>Cosa imparerai</h2>
                        <ul>
                            <li><strong>SEO Avanzata</strong>: Posizionati primo su Google</li>
                            <li><strong>Google Ads</strong>: Campagne profittevoli da subito</li>
                            <li><strong>Social Media Marketing</strong>: Da 0 a 10K follower</li>
                            <li><strong>Email Marketing</strong>: Automation e conversion</li>
                        </ul>
                    `
                }
            },
            {
                type: 'cta',
                content: {
                    title: 'Posti limitati: Solo 30 studenti per edizione',
                    description: '<p><strong>Garanzia 30 giorni</strong>: Se non sei soddisfatto, rimborso completo senza domande.</p>',
                    buttonText: 'Prenota il mio posto',
                    buttonLink: '#pricing',
                    style: 'primary'
                }
            }
        ]
    },
    {
        id: 'service-page',
        name: 'Pagina Servizio',
        description: 'Template per pagina di presentazione servizio',
        category: 'layout',
        blocks: [
            {
                type: 'hero',
                content: {
                    title: 'Servizio SEO Professionale',
                    subtitle: '<p>Scaliamo i motori di ricerca con un approccio <strong>tecnico e contenuti ROI-oriented</strong>. Risultati garantiti in 6 mesi.</p>',
                    ctaText: 'Richiedi un preventivo',
                    ctaLink: '/contatti',
                    backgroundType: 'gradient'
                }
            },
            {
                type: 'text-block',
                content: {
                    content: `
                        <h2>Come funziona</h2>
                        <h3>1. Audit Gratuito</h3>
                        <p>Analizziamo il tuo sito e ti mostriamo le opportunità nascoste.</p>
                        
                        <h3>2. Strategia Personalizzata</h3>
                        <p>Creiamo un piano su misura per il tuo settore e obiettivi.</p>
                        
                        <h3>3. Esecuzione</h3>
                        <p>Il nostro team esegue tutte le ottimizzazioni tecniche e di contenuto.</p>
                        
                        <h3>4. Report Mensili</h3>
                        <p>Monitori i progressi con dashboard in tempo reale e call mensili.</p>
                    `
                }
            },
            {
                type: 'cta',
                content: {
                    title: 'Pronto a dominare la prima pagina di Google?',
                    description: '<p>Oltre <strong>150 clienti</strong> si fidano di noi. Il prossimo potresti essere tu.</p>',
                    buttonText: 'Analizza il mio sito gratis',
                    buttonLink: '/audit',
                    style: 'primary'
                }
            }
        ]
    },
    {
        id: 'stats-section',
        name: 'Sezione Statistiche',
        description: 'Griglia con numeri e traguardi aziendali',
        category: 'content',
        blocks: [{
            type: 'stats',
            content: {
                items: [
                    { value: '250+', label: 'Clienti Soddisfatti' },
                    { value: '15M€', label: 'Fatturato Generato' },
                    { value: '98%', label: 'Retention Rate' },
                    { value: '4.9/5', label: 'Rating Media' }
                ]
            }
        }]
    },
    {
        id: 'testimonials-grid',
        name: 'Testimonianze',
        description: 'Griglia di feedback dei clienti',
        category: 'content',
        blocks: [{
            type: 'testimonials',
            content: {
                items: [
                    { name: 'Marco Rossi', role: 'CEO di TechFlow', quote: 'Lavoro fantastico della W[r]Digital. Hanno trasformato il nostro sito in una macchina da lead.' },
                    { name: 'Elena Bianchi', role: 'Marketing Manager', quote: 'Professionalità e risultati oltre le aspettative. Consigliatissimi!' }
                ]
            }
        }]
    },
    {
        id: 'two-columns-feature',
        name: 'Due Colonne',
        description: 'Layout a due colonne per testo e immagini',
        category: 'layout',
        blocks: [{
            type: 'columns',
            content: {
                columns: 2,
                items: [
                    { content: '<h3>Flessibilità Totale</h3><p>I nostri sistemi si adattano alle tue esigenze specifiche senza compromessi.</p>' },
                    { content: '<h3>Supporto H24</h3><p>Un team dedicato a tua disposizione per ogni necessità tecnica o strategica.</p>' }
                ]
            }
        }]
    }
];

// Helper to get templates by category
export function getTemplatesByCategory(category: BlockTemplate['category']): BlockTemplate[] {
    return BLOCK_TEMPLATES.filter(t => t.category === category);
}

// Helper to get template by ID
export function getTemplateById(id: string): BlockTemplate | undefined {
    return BLOCK_TEMPLATES.find(t => t.id === id);
}

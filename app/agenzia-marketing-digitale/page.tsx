import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { ArrowRight, Check, Download, Info } from 'lucide-react';
import PillarServiceWidget from '@/components/PillarServiceWidget';
import styles from './PillarPage.module.css';

export const metadata: Metadata = {
    title: 'Agenzia Marketing Digitale: La Guida Completa 2026 | W[r]Digital',
    description: 'Scopri come scegliere la giusta agenzia di marketing digitale nel 2026. Guida strategica su SEO, AI Search, e metriche reali. Evita le vanity metrics.',
    alternates: {
        canonical: '/agenzia-marketing-digitale',
    },
    openGraph: {
        title: 'Agenzia Marketing Digitale: La Guida Strategica 2026',
        description: 'Non sprecare budget. Ecco come distinguere un\'agenzia seria da una fabbrica di fumo. La guida definitiva di W[r]Digital.',
        url: 'https://www.wrdigital.it/agenzia-marketing-digitale',
        type: 'article',
        publishedTime: '2026-01-01',
        authors: ['W[r]Digital Team'],
        images: [{ url: '/og-pillar-marketing.jpg', width: 1200, height: 630, alt: 'Agenzia Marketing Digitale 2026' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Article",
            "headline": "Agenzia Marketing Digitale: La Guida Completa alla Strategia [r]eale 2026",
            "image": "https://www.wrdigital.it/og-pillar-marketing.jpg",
            "author": {
                "@type": "Organization",
                "name": "W[r]Digital"
            },
            "publisher": {
                "@type": "Organization",
                "name": "W[r]Digital",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.wrdigital.it/logo.png"
                }
            },
            "datePublished": "2026-01-01",
            "dateModified": "2026-01-06"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Quanto costa un'agenzia di marketing digitale?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Il costo varia in base agli obiettivi. Diffida dai pacchetti standard: un'agenzia seria lavora su preventivi personalizzati basati sul ROI atteso."
                    }
                },
                {
                    "@type": "Question",
                    "name": "In quanto tempo arrivano i risultati?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Per la SEO tecnica, 3-6 mesi. Per l'Advertising, i primi dati arrivano in 2-4 settimane."
                    }
                }
            ]
        }
    ]
};

export default function PillarPage() {
    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className={styles.hero}>
                <span className={styles.heroLabel}>Pillar Page 2026</span>
                <h1 className={styles.title}>
                    Agenzia Marketing Digitale: <br />
                    La Guida Completa alla Strategia <span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>eale</span> 2026
                </h1>
                <p className={styles.subtitle}>
                    Come distinguere i professionisti dai venditori di fumo, dominare la SEO semantica e trasformare il budget in fatturato netto.
                </p>
                <div className={styles.metaInfo}>
                    <span>Ultimo aggiornamento: Gennaio 2026</span>
                    <span>•</span>
                    <span>Tempo di lettura: 12 min</span>
                </div>
            </header>

            <div className={styles.layout}>
                {/* Sticky Sidebar */}
                <aside className={styles.sidebar}>
                    <nav className={styles.toc}>
                        <div className={styles.tocTitle}>Indice dei Contenuti</div>
                        <ul className={styles.tocList}>
                            <li><a href="#intro" className={styles.tocLink}>1. Intro: Il Panorama 2026</a></li>
                            <li><a href="#ruolo" className={styles.tocLink}>2. Cosa fa un'Agenzia</a></li>
                            <li><a href="#pilastri" className={styles.tocLink}>3. I Pilastri Strategici</a></li>
                            <li><a href="#scelta" className={`${styles.tocLink} ${styles.tocLinkActive}`}>4. Come Scegliere (Cruciale)</a></li>
                            <li><a href="#cases" className={styles.tocLink}>5. Case Studies Reali</a></li>
                            <li><a href="#faq" className={styles.tocLink}>6. Domande Frequenti</a></li>
                        </ul>
                    </nav>

                    <div className={styles.sidebarWidget}>
                        <PillarServiceWidget />
                    </div>
                </aside>

                {/* Main Content */}
                <article className={styles.content}>

                    {/* Hero Visual */}
                    <div className={styles.heroImage}>
                        <img
                            src="/pillar-page-hero.png"
                            alt="W[r]Digital Strategic Framework Visualization"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            background: 'rgba(0,0,0,0.6)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backdropFilter: 'blur(4px)'
                        }}>
                            <span className={styles.brandedText} style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                                W<span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>Digital Strategy
                            </span>
                        </div>
                    </div>

                    {/* Chapter 1 */}
                    <section id="intro">
                        <h2>1. Introduzione: Il panorama digitale nel 2026</h2>
                        <p>
                            Il 2025 ha segnato lo spartiacque definitivo. L'avvento della <strong>Search Generative Experience (SGE)</strong> e degli algoritmi predittivi ha reso obsolete le vecchie tattiche di "keyword stuffing". Oggi, o hai una <strong>Topical Authority</strong> indiscutibile, o sei invisibile.
                        </p>
                        <p>
                            In questa guida, smonteremo i miti e ti forniremo la cassetta degli attrezzi per valutare (e pretendere) l'eccellenza dalla tua agenzia partner.
                        </p>
                    </section>
                    {/* Chapter 2 */}
                    <section id="ruolo">
                        <h2>2. Cosa fa un'Agenzia di Marketing Digitale</h2>
                        <p>
                            Non siamo solo "quelli che fanno i post su Facebook". Un'agenzia moderna è un partner tecnologico che orchestra diversi canali per un unico obiettivo: <strong>la crescita del fatturato</strong>.
                        </p>
                        <ul style={{ marginBottom: '2rem' }}>
                            <li><strong><Link href="/servizi/seo" className="text-gradient">SEO Semantica</Link>:</strong> Posizionarsi per risposte, non solo per parole.</li>
                            <li><strong>Data Analytics:</strong> Monitoraggio in tempo reale del ROI.</li>
                            <li><strong>Performance Marketing:</strong> Acquisizione clienti tramite campagne chirurgiche.</li>
                        </ul>
                    </section>

                    {/* Chapter 3 */}
                    <section id="pilastri">
                        <h2>3. I Pilastri di una Strategia di Successo</h2>
                        <h3><span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>icerca</span> di Mercato</h3>
                        <p>Senza dati, è solo un'opinione. Analizziamo i tuoi competitor con strumenti AI-driven per scoprire le loro lacune.</p>
                        <p style={{ marginTop: '1rem', fontStyle: 'italic', borderLeft: '3px solid #FACC15', paddingLeft: '1rem', color: '#ccc' }}>
                            Capire la teoria è il primo passo, ma l'esecuzione è ciò che conta. <Link href="/servizi/seo" className="text-yellow-400 font-bold hover:underline">[Attiva il tuo posizionamento con i nostri servizi SEO verticali].</Link>
                        </p>

                        <h3><span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>ealizzazione</span> Tecnica</h3>
                        <p>Un sito lento uccide le conversioni. La nostra infrastruttura Next.js garantisce caricamenti istantanei.</p>
                        <p style={{ marginTop: '1rem', fontStyle: 'italic', borderLeft: '3px solid #10b981', paddingLeft: '1rem', color: '#ccc' }}>
                            La tua infrastruttura digitale è pronta per il 2026? <Link href="/servizi/web" className="text-green-400 font-bold hover:underline">[Richiedi un'audit per il tuo nuovo sito web].</Link>
                        </p>
                    </section>

                    {/* Chapter 4 - THE CORE */}
                    <section id="scelta">
                        <h2>4. Come scegliere la giusta agenzia <br /><span style={{ fontSize: '0.6em', fontWeight: 400, color: 'var(--color-text-muted)' }}>(e perché la trasparenza è l'unica metrica che conta)</span></h2>
                        <p>
                            Scegliere un partner per il proprio marketing digitale è come scegliere un architetto per la propria casa: se le fondamenta sono sbagliate, tutto il resto crollerà, indipendentemente dal colore delle pareti.
                        </p>
                        <p>
                            Il mercato è saturo di "esperti" dell'ultimo minuto. Per proteggere il tuo investimento, ecco i <strong>5 pilastri</strong> che devono guidare la tua scelta.
                        </p>

                        <h3>4.1 Diffida dalle "Vanity Metrics"</h3>
                        <p>
                            Molte agenzie proveranno a impressionarti con il numero di Like, i follower o le "impression". In <span className={styles.brandedText}>W<span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>Digital</span>, chiamiamo queste cifre <em>Vanity Metrics</em> (metriche della vanità).
                        </p>
                        <ul>
                            <li><strong>La verità:</strong> I Like non pagano le fatture.</li>
                            <li><strong>Cosa cercare:</strong> Un'agenzia seria parla di <strong>Conversioni</strong>, <strong>CAC</strong> e <strong>ROAS</strong>. Se l'agenzia non ti chiede "Qual è il tuo margine per ogni vendita?", scappa.</li>
                        </ul>

                        {/* Graph Comparison */}
                        <div className={styles.graphContainer}>
                            <div className={styles.graphTitle}>Focus dell'Agenzia vs. Impatto sul Business</div>
                            <div className={styles.barChart}>
                                <div className={styles.barCol}>
                                    <div className={styles.bar} style={{ height: '30%' }}></div>
                                    <span className={styles.barLabel}>Agenzia "Social"</span>
                                </div>
                                <div className={styles.barCol}>
                                    <div className={styles.bar} style={{ height: '40%' }}></div>
                                    <span className={styles.barLabel}>Agenzia "Web"</span>
                                </div>
                                <div className={styles.barCol}>
                                    <div className={`${styles.bar} ${styles.highlight}`} style={{ height: '95%' }}></div>
                                    <span style={{ color: '#FACC15', fontWeight: 700, whiteSpace: 'nowrap' }}>
                                        W<span>[</span><span style={{ color: '#fff' }}>r</span><span>]</span>Digital
                                    </span>
                                </div>
                            </div>
                        </div>

                        <h3>4.2 La <span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>esponsabilità</span> dei Dati</h3>
                        <p>
                            Un'agenzia d'élite non nasconde i dati dietro report complessi e illeggibili.
                        </p>
                        <div className={styles.checklist}>
                            <div className={styles.checklistItem}>
                                <div className={styles.checkNumber}>!</div>
                                <div><strong>Il segnale d'allarme:</strong> Ricevere un PDF statico a fine mese con grafici generici.</div>
                            </div>
                            <div className={styles.checklistItem}>
                                <div className={styles.checkNumber} style={{ background: '#22c55e', color: '#fff' }}><Check size={14} /></div>
                                <div><strong>Lo standard <span className={styles.brandedText}>W<span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>Digital</span>:</strong> Offriamo una <strong>Dashboard in tempo reale</strong>. Devi poter vedere dove vanno i tuoi soldi.</div>
                            </div>
                        </div>

                        <h3>4.3 Specializzazione vs. "Tuttologia"</h3>
                        <p>
                            Chi dice di saper fare tutto, spesso non eccelle in nulla.
                            In <span className={styles.brandedText}>W<span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>Digital</span>, separiamo nettamente chi scrive codice da chi ottimizza campagne Ads.
                        </p>

                        <h3>4.4 Metodologia <span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>igorosa</span></h3>
                        <p>
                            Il marketing nel 2026 è una scienza esatta. Chiedi: <em>"Qual è il vostro processo di test?"</em>.
                            Se la risposta non include <strong>A/B Testing</strong> o <strong>Heatmaps</strong>, stanno andando a intuito.
                        </p>

                        <div className={styles.resourceBox}>
                            <div className={styles.resourceIcon}>
                                <Info />
                            </div>
                            <div className={styles.resourceContent}>
                                <h4>Resource: Le 5 Domande "Scomode"</h4>
                                <p>Scarica la lista delle domande da fare a un'agenzia prima di firmare il contratto.</p>
                                <a href="/downloads/checklist-agency-questions.pdf" download className="btn btn-secondary">Scarica Checklist</a>
                            </div>
                        </div>

                        <h3>4.5 L'empatia strategica</h3>
                        <p>
                            La tecnologia è il motore, ma la strategia umana è il pilota. Prima di firmare, chiedi di vedere un <Link href="/#case-studies" className="text-gradient font-bold">Caso Studio reale</Link> simile al tuo.
                        </p>

                    </section>

                    {/* Chapter 5 */}
                    <section id="cases">
                        <h2>5. Case Studies: Dalla Teoria alla <span className={styles.brandedText}><span className={styles.bracket}>[</span><span className={styles.letterR}>r</span><span className={styles.bracket}>]</span>ealtà</span></h2>
                        <p>
                            Risultati reali, non proiezioni. Abbiamo aiutato brand italiani a scalare i vertici delle loro nicchie.
                            <br />
                            <Link href="/#case-studies" className="btn btn-primary" style={{ marginTop: '1rem' }}>Vedi i Risultati</Link>
                        </p>
                    </section>

                    {/* FAQ */}
                    <section id="faq" className={styles.faqSection}>
                        <h2>6. FAQ: Domande Frequenti</h2>

                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>Quanto costa un'agenzia di marketing digitale?</div>
                            <div className={styles.faqAnswer}>Il costo varia in base agli obiettivi. Diffida dai pacchetti standard: un'agenzia seria lavora su preventivi personalizzati basati sul ROI atteso.</div>
                        </div>
                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>In quanto tempo arrivano i risultati?</div>
                            <div className={styles.faqAnswer}>Per la SEO tecnica, 3-6 mesi. Per l'Advertising, i primi dati arrivano in 2-4 settimane.</div>
                        </div>
                        <div className={styles.faqItem}>
                            <div className={styles.faqQuestion}>Perché scegliere W[r]Digital?</div>
                            <div className={styles.faqAnswer}>Perché non vendiamo servizi, ma partnership di crescita basate su dati trasparenti e responsabilità.</div>
                        </div>
                    </section>

                </article>
            </div>
        </div>
    );
}

import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Consulenza SEO Nova Milanese e Brianza | W[r]Digital',
    description: 'Consulenza SEO per PMI a Nova Milanese, Desio e in Monza Brianza. Analisi, SEO locale e contenuti che portano clienti, non solo visite. Primo confronto gratuito.',
    alternates: {
        canonical: 'https://www.wrdigital.it/consulenza-seo-nova-milanese',
    },
    openGraph: {
        title: 'Consulenza SEO Nova Milanese e Brianza | W[r]Digital',
        description: 'Consulenza SEO per PMI a Nova Milanese, Desio e in Monza Brianza. Analisi, SEO locale e contenuti che portano clienti, non solo visite. Primo confronto gratuito.',
        url: 'https://www.wrdigital.it/consulenza-seo-nova-milanese',
        locale: 'it_IT',
        type: 'website',
        images: [{ url: '/og-seo.png', width: 1200, height: 630, alt: 'SEO Nova Milanese' }],
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service",
            "name": "Consulenza SEO Nova Milanese",
            "description": "Servizio di ottimizzazione per i motori di ricerca (SEO) per aziende e PMI di Nova Milanese, Desio e in Monza Brianza. Include audit tecnica, local SEO e content strategy.",
            "provider": {
                "@type": "LocalBusiness",
                "name": "W[r]Digital",
                "url": "https://www.wrdigital.it",
                "logo": "https://www.wrdigital.it/logo.png",
                "image": "https://www.wrdigital.it/og-image.png",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Via Venezia, 2",
                    "addressLocality": "Nova Milanese",
                    "addressRegion": "MB",
                    "postalCode": "20834",
                    "addressCountry": "IT"
                },
                "telephone": "+393401204651"
            },
            "areaServed": [
                { "@type": "City", "name": "Nova Milanese" },
                { "@type": "City", "name": "Desio" },
                { "@type": "City", "name": "Muggiò" },
                { "@type": "City", "name": "Monza" },
                { "@type": "AdministrativeArea", "name": "Provincia di Monza e della Brianza" }
            ],
            "url": "https://www.wrdigital.it/consulenza-seo-nova-milanese"
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "In quanto tempo si vedono i risultati?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "I primi movimenti di posizione in 2–3 mesi. Contatti in modo stabile, realisticamente, dal sesto mese in avanti. Su nicchie locali poco competitive può andare più veloce; su settori affollati serve più tempo."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Lavorate solo con aziende di Nova Milanese?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No, seguiamo clienti in tutta la Lombardia e fuori. Ma sul territorio di Monza e Brianza abbiamo un vantaggio pratico: possiamo vederci di persona, e per il lavoro sulla SEO locale conoscere il territorio conta."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Ho già un sito. Va rifatto?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Nella maggior parte dei casi no. Si interviene su struttura e contenuti. Se invece il sito è costruito su una tecnologia che Google non riesce a leggere, o è lentissimo su mobile, te lo diciamo subito — ma è la minoranza dei casi."
                    }
                },
                {
                    "@type": "Question",
                    "name": "La SEO serve ancora con l'intelligenza artificiale?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Sì. I sistemi di AI costruiscono le risposte partendo dalle stesse fonti che Google considera autorevoli. Il lavoro di fondo — essere la pagina che risponde meglio a una domanda — è ciò che serve per essere citati anche lì."
                    }
                }
            ]
        }
    ]
};

const RESULTS = [
    { value: '+145%', label: 'Traffico organico medio in 6 mesi' },
    { value: '3.8x', label: 'ROI medio sulle campagne SEO' },
    { value: '4 mesi', label: 'Tempo medio per i primi risultati' },
    { value: '4.9/5', label: 'Rating delle nostre PMI clienti' },
];

export default function SeoNovaPage() {
    return (
        <main className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* HERO */}
            <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-green-400/5 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="inline-block text-green-400 text-xs font-mono uppercase tracking-[0.3em] mb-6 border border-green-400/30 px-4 py-2 rounded-full">
                        SEO · Nova Milanese & Brianza
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase">
                        Consulenza SEO a Nova Milanese:<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-400">
                            Far trovare la tua azienda
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                        Ci sono due modi in cui un&apos;azienda della Brianza trova nuovi clienti online. Il primo è pagare per farsi vedere: campagne, sponsorizzate, budget mensile. Funziona finché il budget c&apos;è. Il secondo è essere già lì quando qualcuno digita esattamente il problema che tu risolvi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/preventivo" className="bg-yellow-400 text-black font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20">
                            Audit SEO Gratuita →
                        </Link>
                        <Link href="/servizi/seo" className="border border-white/20 text-white font-bold px-8 py-4 rounded-full hover:border-white/40 transition-colors">
                            Scopri il servizio SEO
                        </Link>
                    </div>
                </div>
            </section>

            {/* RISULTATI */}
            <section className="py-16 border-y border-white/10 bg-white/5">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {RESULTS.map(r => (
                        <div key={r.value}>
                            <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2">{r.value}</div>
                            <div className="text-gray-400 text-sm">{r.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ARTICOLO PRINCIPALE */}
            <section className="py-24 px-6 max-w-4xl mx-auto leading-relaxed text-gray-300 space-y-12">
                <div className="prose prose-invert max-w-none">
                    <p className="text-lg">
                        Il secondo modo si chiama <strong>SEO</strong>. Questa pagina spiega come lo facciamo, per chi ha senso, e quando invece è meglio dirti di no.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Cos&apos;è davvero una consulenza SEO (e cosa non è)</h2>
                    <p>
                        Una consulenza SEO non è &quot;mettere le parole chiave nel sito&quot;. È un lavoro di tre pezzi che devono stare insieme:
                    </p>
                    <ul className="list-disc pl-6 space-y-3 mt-4">
                        <li>
                            <strong>Capire cosa cercano le persone.</strong> Non quello che pensi cerchino. I dati veri: volumi, intenzioni, il linguaggio esatto che usa chi ha il portafoglio in mano. Chi cerca &quot;agenzia marketing&quot; sta studiando; chi cerca &quot;consulenza SEO Nova Milanese&quot; sta scegliendo un fornitore. Sono due persone diverse e meritano due pagine diverse.
                        </li>
                        <li>
                            <strong>Rendere il sito comprensibile a Google.</strong> Struttura, velocità, dati strutturati, architettura interna. Il lavoro invisibile, quello che nessun cliente vede ma senza cui il resto non decolla.
                        </li>
                        <li>
                            <strong>Dare a Google qualcosa da mostrare.</strong> Pagine che rispondono meglio delle altre alla domanda. Non articoli riempitivi: contenuti che una persona reale legge fino in fondo e poi ti chiama.
                        </li>
                    </ul>
                    <p className="mt-4">
                        Quello che una consulenza SEO <strong>non</strong> è: una promessa di prima posizione entro trenta giorni. Se qualcuno te la fa, sta vendendo fumo o sta puntando su parole che non cerca nessuno.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">SEO locale: farsi trovare a Nova Milanese, Desio, Muggiò e in Brianza</h2>
                    <p>
                        Per un&apos;azienda con una sede fisica, la partita si gioca in gran parte sulla mappa. Quando qualcuno cerca un servizio da mobile a Nova Milanese, Google mostra prima tre attività locali e poi i risultati classici. Se non sei in quei tre, per metà delle ricerche non esisti.
                    </p>
                    <p className="mt-4">Su cosa lavoriamo:</p>
                    <ul className="list-disc pl-6 space-y-3 mt-2">
                        <li><strong>Profilo dell&apos;attività su Google</strong> curato davvero: categorie corrette, servizi, foto aggiornate, orari, domande e risposte. È il fattore più sottovalutato e più veloce da sistemare.</li>
                        <li><strong>Recensioni</strong>, non solo quante ma come rispondi. Una risposta scritta bene a una recensione tiepida vale più di dieci stelline mute.</li>
                        <li><strong>Coerenza dei dati aziendali</strong> (nome, indirizzo, telefono) su tutte le directory dove compari. Le incoerenze confondono Google.</li>
                        <li><strong>Pagine per territorio</strong> dove ha senso — e solo dove ha senso. Venti pagine copia-incolla con il nome del comune cambiato sono controproducenti.</li>
                    </ul>
                    <p className="mt-4">
                        Il bacino non è &quot;l&apos;Italia&quot;. Sono Nova Milanese, Desio, Muggiò, Varedo, Bovisio, Seregno, Lissone, Monza. Aziende che a venti minuti di macchina possono venire a sedersi al tavolo con te. È un mercato più piccolo e molto meno affollato: qui si vince.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Consulenza SEO o agenzia di comunicazione digitale: cosa ti serve?</h2>
                    <p>Domanda che ci fanno spesso, e la risposta onesta dipende da dove sei.</p>
                    <p className="mt-4">
                        <strong>Ti serve una consulenza SEO</strong> se hai già un sito che funziona, ricevi qualche contatto, e vuoi che il canale organico diventi prevedibile. È un intervento chirurgico su una macchina che gira.
                    </p>
                    <p className="mt-2">
                        <strong>Ti serve un&apos;agenzia di comunicazione digitale a 360°</strong> se il posizionamento del brand è ancora da costruire, se i social sono fermi da mesi, se non hai un&apos;identità visiva coerente. Qui la SEO da sola non basta: risolve la domanda esistente, non crea desiderio.
                    </p>
                    <p className="mt-2">
                        <strong>Non ti serve nessuna delle due</strong> se il tuo prodotto non ha ancora mercato, o se il sito non ha un modo chiaro per essere contattato. Prima quello. In quel caso te lo diciamo, e non ti mandiamo un preventivo.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">SEO e realizzazione siti web vanno progettati insieme</h2>
                    <p>
                        L&apos;errore più costoso che vediamo: il sito viene fatto, è bellissimo, e poi si chiama qualcuno per &quot;fare la SEO&quot;. A quel punto metà del lavoro è rifare cose già fatte.
                    </p>
                    <p className="mt-4">
                        Un sito nato con la SEO dentro ha una struttura di pagine che rispecchia come le persone cercano, URL sensati, testi scritti per essere trovati oltre che letti, tempi di caricamento sotto controllo, e un tracciamento delle conversioni attivo dal primo giorno. Costa uguale farlo bene subito. Costa il doppio farlo dopo.
                    </p>
                    <p className="mt-4">
                        Se stai valutando la <Link href="/servizi/realizzazione-siti-web" className="text-yellow-400 hover:underline font-semibold">realizzazione di un sito a Nova Milanese o a Desio</Link>, la domanda giusta da fare a chi te lo propone non è &quot;quanto costa&quot; ma &quot;come decidete quali pagine fare&quot;. Se non sanno rispondere, ti stanno vendendo un vestito, non uno strumento di vendita.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">SEO per e-commerce: il caso specifico</h2>
                    <p>
                        Un e-commerce ha un problema che un sito vetrina non ha: centinaia o migliaia di pagine prodotto che competono tra loro, filtri che generano URL infinite, e schede prodotto copiate dal catalogo del fornitore — identiche a quelle di altri trenta rivenditori.
                    </p>
                    <p className="mt-4">
                        Nel settore dell&apos;e-commerce di elettronica di consumo, per il portale <strong>Yeppon.it</strong>, la nostra strategia di SEO tecnica e ottimizzazione dell&apos;architettura informativa delle categorie ha portato a una crescita del <strong>+380% del traffico organico</strong> nei primi 12 mesi di attività.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">SEO, Google Ads e social: come si tengono insieme</h2>
                    <p>
                        La SEO ha un difetto: è lenta. I primi segnali arrivano in due o tre mesi, i risultati solidi in sei o più. Per questo raramente ha senso farla da sola.
                    </p>
                    <p className="mt-4">Lo schema che funziona per una PMI:</p>

                    <div className="overflow-x-auto mt-6">
                        <table className="w-full text-left border-collapse border border-white/10 text-sm">
                            <thead>
                                <tr className="bg-white/10">
                                    <th className="p-4 border border-white/10 font-bold text-white">Canale</th>
                                    <th className="p-4 border border-white/10 font-bold text-white">A cosa serve</th>
                                    <th className="p-4 border border-white/10 font-bold text-white">Quando produce</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-4 border border-white/10 font-semibold text-white">
                                        <Link href="/servizi/ads" className="text-yellow-400 hover:underline">Google Ads</Link>
                                    </td>
                                    <td className="p-4 border border-white/10">Contatti subito, e test rapido di quali parole convertono</td>
                                    <td className="p-4 border border-white/10 text-yellow-400 font-mono">Giorni</td>
                                </tr>
                                <tr className="bg-white/5">
                                    <td className="p-4 border border-white/10 font-semibold text-white">
                                        <Link href="/servizi/seo" className="text-yellow-400 hover:underline">SEO</Link>
                                    </td>
                                    <td className="p-4 border border-white/10">Rendere gratuito e stabile ciò che con Ads paghi ogni volta</td>
                                    <td className="p-4 border border-white/10 text-yellow-400 font-mono">Mesi</td>
                                </tr>
                                <tr>
                                    <td className="p-4 border border-white/10 font-semibold text-white">
                                        <Link href="/servizi/social" className="text-yellow-400 hover:underline">Social</Link>
                                    </td>
                                    <td className="p-4 border border-white/10">Far conoscere e restare in testa a chi non ti cerca ancora</td>
                                    <td className="p-4 border border-white/10 text-yellow-400 font-mono">Continuo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Quanto costa una consulenza SEO in Brianza</h2>
                    <p>
                        I nostri servizi di consulenza partono da un&apos;audit tecnica iniziale una tantum di <strong>€600</strong>, mentre i progetti di ottimizzazione e posizionamento SEO continuativo mensile per le PMI locali partono da <strong>€900/mese</strong>.
                    </p>
                    <p className="mt-4">
                        Quello che possiamo dire senza numeri: diffida di due estremi. Sotto una certa soglia mensile nessuno può dedicarti tempo vero, e ti ritrovi con un report automatico ogni trenta giorni. Sopra una certa soglia, per una PMI locale, stai pagando struttura che non ti serve.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Come lavoriamo</h2>
                    <ol className="list-decimal pl-6 space-y-4 mt-4">
                        <li>
                            <strong>1. Analisi.</strong> Guardiamo dove sei: posizionamento attuale, stato tecnico del sito, cosa fanno i concorrenti, e soprattutto quali ricerche esistono davvero nel tuo mercato. Da qui esce un documento con priorità, non con centoventi problemi tutti uguali.
                        </li>
                        <li>
                            <strong>2. Sistemazione tecnica.</strong> Prima si tolgono gli ostacoli. Non ha senso scrivere contenuti su un sito che Google fatica a leggere.
                        </li>
                        <li>
                            <strong>3. Contenuti e SEO locale.</strong> Le pagine che rispondono agli intenti commerciali, il presidio su Nova Milanese e la Brianza, la struttura interna dei collegamenti.
                        </li>
                        <li>
                            <strong>4. Misurazione.</strong> Dashboard con i numeri che contano: quante richieste di contatto, da quali pagine, per quali ricerche. Non &quot;impression&quot; e &quot;visualizzazioni&quot;.
                        </li>
                    </ol>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 px-6 bg-white/5 border-y border-white/10">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-white text-center mb-16">Domande Frequenti</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: 'In quanto tempo si vedono i risultati?',
                                a: 'I primi movimenti di posizione in 2–3 mesi. Contatti in modo stabile, realisticamente, dal sesto mese in avanti. Su nicchie locali poco competitive può andare più veloce; su settori affollati serve più tempo.'
                            },
                            {
                                q: 'Lavorate solo con aziende di Nova Milanese?',
                                a: 'No, seguiamo clienti in tutta la Lombardia e fuori. Ma sul territorio di Monza e Brianza abbiamo un vantaggio pratico: possiamo vederci di persona, e per il lavoro sulla SEO locale conoscere il territorio conta.'
                            },
                            {
                                q: 'Ho già un sito. Va rifatto?',
                                a: 'Nella maggior parte dei casi no. Si interviene su struttura e contenuti. Se invece il sito è costruito su una tecnologia che Google non riesce a leggere, o è lentissimo su mobile, te lo diciamo subito — ma è la minoranza dei casi.'
                            },
                            {
                                q: 'La SEO serve ancora, con le risposte generate dall\'intelligenza artificiale?',
                                a: 'Sì, e cambia forma. I sistemi di AI costruiscono le risposte partendo dalle stesse fonti che Google considera autorevoli. Il lavoro di fondo — essere la pagina che risponde meglio a una domanda — è esattamente ciò che serve per essere citati anche lì. Quello che cambia è che valgono meno i contenuti generici e di più quelli con dati, esperienza diretta e posizioni chiare.'
                            },
                            {
                                q: 'Vi occupate anche di Google Ads e social?',
                                a: 'Sì. Vedi la sezione sull\'integrazione tra canali.'
                            }
                        ].map((faq, i) => (
                            <div key={i} className="bg-black border border-white/10 rounded-2xl p-6 hover:border-yellow-400/20 transition-colors">
                                <h3 className="text-white font-bold mb-3">{faq.q}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA FINALE */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-6">
                        Parliamone
                    </h2>
                    <p className="text-gray-300 mb-6">
                        Se stai cercando una consulenza SEO a Nova Milanese o in Monza Brianza, il primo passo è capire se ha senso — e a volte la risposta è no.
                    </p>
                    <p className="text-gray-400 mb-10">
                        Raccontaci in due righe cosa fai e cosa vorresti succedesse. Ti diciamo cosa vediamo, senza preventivo allegato.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/preventivo" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-black px-10 py-5 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-yellow-400/20">
                            Richiedi Preventivo Gratuito
                        </Link>
                        <a href="tel:+393401204651" className="text-yellow-400 font-bold hover:underline text-lg">
                            Chiama: 340 120 4651
                        </a>
                    </div>
                    <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
                        <Link href="/" className="hover:text-yellow-400 transition-colors">
                            ← Torna alla Homepage
                        </Link>
                        <Link href="/servizi/seo" className="hover:text-yellow-400 transition-colors">
                            Servizio SEO completo →
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

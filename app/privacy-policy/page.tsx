import type { Metadata } from 'next';
import { Mail, MapPin, Phone, FileText, Edit, Trash2, Ban, Pause, Package, Check, AlertTriangle, Lightbulb, Shield } from 'lucide-react';


export const metadata: Metadata = {
    title: 'Privacy Policy | W[r]Digital',
    description: 'Informativa sulla privacy e trattamento dei dati personali di W[r]Digital S.r.l.',
    robots: { index: false, follow: false },
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-[#FACC15]">Privacy</span> Policy
                </h1>
                <p className="text-gray-400 mb-12">
                    Ultimo aggiornamento: 6 Gennaio 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8">

                    {/* Chi Siamo */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Chi Siamo</h2>
                        <p className="text-gray-300 leading-relaxed">
                            L'indirizzo del nostro sito web è: <strong>https://www.wrdigital.it</strong>
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            <strong>WRDigital S.r.l.</strong> (di seguito "WRDigital" o "noi"), con sede legale in <strong>Via Paradiso, 5 - 20831 Seregno (MB)</strong>,
                            P.IVA <strong>IT10961410965</strong>, è il Titolare del trattamento dei dati personali raccolti tramite questo sito web.
                        </p>
                    </section>

                    {/* Informativa GDPR */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Informativa ai sensi del GDPR</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Ai sensi dell'art. 13 del D. Lgs. 196/2003 ("Codice Privacy") e dell'art. 13 del Regolamento UE n. 2016/679 ("GDPR"),
                            recante disposizioni a tutela delle persone e di altri soggetti rispetto al trattamento dei dati personali,
                            desideriamo informarLa che i dati personali da Lei forniti formeranno oggetto di trattamento nel rispetto
                            della normativa sopra richiamata e degli obblighi di riservatezza cui è tenuta la nostra Società.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Per "trattamento" si intende: qualsiasi operazione o insieme di operazioni, compiute con o senza l'ausilio di processi automatizzati,
                            come la raccolta, la registrazione, l'organizzazione, la strutturazione, la conservazione, l'adattamento, la consultazione,
                            l'uso, la comunicazione, la diffusione, la cancellazione o la distruzione dei dati.
                        </p>
                    </section>

                    {/* Modalità di Raccolta */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Modalità di Raccolta Dati</h2>

                        <h3 className="text-xl font-semibold mt-6 mb-3">1. Dati Raccolti Automaticamente</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Durante la navigazione, possono essere raccolte le seguenti informazioni, conservate nei file di log del server:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Indirizzo Internet Protocol (IP)</li>
                            <li>Tipo di browser e parametri del dispositivo</li>
                            <li>Nome dell'Internet Service Provider (ISP)</li>
                            <li>Data e orario di visita</li>
                            <li>Pagina web di provenienza (referral) e di uscita</li>
                            <li>Numero di click e interazioni</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-3">
                            <em>Questi dati sono utilizzati esclusivamente a fini statistici in forma aggregata.
                                L'indirizzo IP è utilizzato solo per fini di sicurezza e non viene incrociato con altri dati identificativi.</em>
                        </p>

                        <h3 className="text-xl font-semibold mt-6 mb-3">2. Dati Conferiti Volontariamente</h3>
                        <p className="text-gray-300 leading-relaxed mb-3">
                            Il sito raccoglie dati in caso di utilizzo volontario di servizi quali:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2">
                            <li>Moduli di contatto e richiesta preventivo</li>
                            <li>Iscrizione a newsletter</li>
                            <li>Commenti e form di comunicazione</li>
                        </ul>
                        <p className="text-gray-300 mt-3">
                            I dati raccolti includono: <strong>nome e cognome, indirizzo email, numero di telefono (facoltativo),
                                ragione sociale e settore di attività</strong>.
                        </p>
                    </section>

                    {/* Finalità del Trattamento */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Finalità del Trattamento</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            I Suoi dati personali verranno trattati per le seguenti finalità:
                        </p>
                        <div className="space-y-4">
                            <div className="border-l-4 border-[#FACC15] pl-4">
                                <h3 className="font-semibold text-lg">1. Finalità Istituzionali</h3>
                                <p className="text-gray-300">
                                    Archiviazione, elaborazione, fatturazione, gestione cliente, adempimenti contrattuali.
                                </p>
                            </div>
                            <div className="border-l-4 border-[#FACC15] pl-4">
                                <h3 className="font-semibold text-lg">2. Obblighi di Legge</h3>
                                <p className="text-gray-300">
                                    Adempimenti civilistici, fiscali, contabili e amministrativi.
                                </p>
                            </div>
                            <div className="border-l-4 border-[#FACC15] pl-4">
                                <h3 className="font-semibold text-lg">3. Supporto e Assistenza</h3>
                                <p className="text-gray-300">
                                    Supporto tecnico, informazione tecnica, assistenza post-vendita.
                                </p>
                            </div>
                            <div className="border-l-4 border-[#FACC15] pl-4">
                                <h3 className="font-semibold text-lg">4. Marketing (con consenso)</h3>
                                <p className="text-gray-300">
                                    Invio di newsletter, comunicazioni commerciali, offerte e iniziative via email (previo consenso esplicito).
                                </p>
                            </div>
                            <div className="border-l-4 border-[#FACC15] pl-4">
                                <h3 className="font-semibold text-lg">5. Profilazione e Statistiche</h3>
                                <p className="text-gray-300">
                                    Indagini di mercato, customer satisfaction, analisi aggregate (dati anonimi).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Base Giuridica */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Base Giuridica del Trattamento</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Il trattamento dei dati personali si basa su:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                            <li><strong>Art. 6, par. 1, lett. a) GDPR</strong>: Consenso dell'interessato</li>
                            <li><strong>Art. 6, par. 1, lett. b) GDPR</strong>: Esecuzione di un contratto o misure precontrattuali</li>
                            <li><strong>Art. 6, par. 1, lett. c) GDPR</strong>: Adempimento di obblighi legali</li>
                            <li><strong>Art. 6, par. 1, lett. f) GDPR</strong>: Interesse legittimo del titolare</li>
                        </ul>
                    </section>

                    {/* Conservazione */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Conservazione dei Dati</h2>
                        <p className="text-gray-300 leading-relaxed">
                            I dati personali vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti e,
                            in ogni caso, in conformità alle normative fiscali e civilistiche vigenti (generalmente 10 anni per dati contabili).
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            I dati raccolti per finalità di marketing saranno conservati fino alla revoca del consenso e comunque non oltre
                            <strong> 24 mesi dall'ultima interazione documentata</strong>.
                        </p>
                    </section>

                    {/* Diritti dell'Interessato */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">I Tuoi Diritti</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Ai sensi degli artt. 15-22 del GDPR, hai il diritto di:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><FileText size={18} className="text-[#FACC15]" /> Accesso</h3>
                                <p className="text-sm text-gray-400">Ottenere conferma dell'esistenza dei tuoi dati e riceverne copia</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Edit size={18} className="text-[#FACC15]" /> Rettifica</h3>
                                <p className="text-sm text-gray-400">Correggere dati inesatti o incompleti</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Trash2 size={18} className="text-[#FACC15]" /> Cancellazione</h3>
                                <p className="text-sm text-gray-400">Ottenere la cancellazione dei dati ("diritto all'oblio")</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Ban size={18} className="text-[#FACC15]" /> Opposizione</h3>
                                <p className="text-sm text-gray-400">Opporti al trattamento per motivi legittimi</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Pause size={18} className="text-[#FACC15]" /> Limitazione</h3>
                                <p className="text-sm text-gray-400">Richiedere la limitazione del trattamento</p>
                            </div>
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h3 className="font-semibold mb-2 flex items-center gap-2"><Package size={18} className="text-[#FACC15]" /> Portabilità</h3>
                                <p className="text-sm text-gray-400">Ricevere i dati in formato strutturato</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mt-6">
                            Puoi <strong>revocare il consenso</strong> in qualsiasi momento senza pregiudicare la liceità del trattamento
                            basato sul consenso prestato prima della revoca.
                        </p>
                    </section>

                    {/* Comunicazione e Diffusione */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Comunicazione e Diffusione</h2>
                        <p className="text-gray-300 leading-relaxed">
                            I dati personali non saranno diffusi e potranno essere comunicati esclusivamente a:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                            <li>Dipendenti e collaboratori di WRDigital, opportunamente autorizzati e formati</li>
                            <li>Fornitori di servizi tecnici (hosting, email marketing, CRM) come Responsabili del Trattamento</li>
                            <li>Consulenti fiscali, commercialisti e legali per adempimenti obbligatori</li>
                            <li>Autorità pubbliche e forze dell'ordine per obblighi di legge</li>
                        </ul>
                    </section>

                    {/* Sicurezza */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Sicurezza dei Dati</h2>
                        <p className="text-gray-300 leading-relaxed">
                            WRDigital adotta misure di sicurezza tecniche e organizzative adeguate per proteggere i dati personali da:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                            <li>Accesso non autorizzato</li>
                            <li>Divulgazione accidentale o illecita</li>
                            <li>Modifiche, perdite o distruzioni non autorizzate</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-4">
                            <em>Utilizziamo protocolli HTTPS, crittografia dei dati sensibili e backup giornalieri per garantire la massima sicurezza.</em>
                        </p>
                    </section>

                    {/* Cookie */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Utilizzo di Cookie</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Il sito utilizza cookie tecnici e analytics per migliorare l'esperienza di navigazione.
                            Per informazioni dettagliate, consulta la nostra <a href="/cookie-policy" className="text-[#FACC15] hover:underline font-semibold">Cookie Policy</a>.
                        </p>
                    </section>

                    {/* Reclami */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Reclami all'Autorità Garante</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Qualora ritenga che il trattamento sia illecito, ha il diritto di proporre reclamo all'Autorità Garante per
                            la Protezione dei Dati Personali o ad altra autorità di controllo competente:
                        </p>
                        <div className="mt-4 bg-black/30 p-4 rounded-xl">
                            <p className="text-gray-300"><strong>Garante per la Protezione dei Dati Personali</strong></p>
                            <p className="text-gray-400 text-sm">Piazza Venezia, 11 - 00187 Roma</p>
                            <p className="text-gray-400 text-sm">Tel: +39 06 696771</p>
                            <p className="text-gray-400 text-sm">Web: <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline">www.garanteprivacy.it</a></p>
                        </div>
                    </section>

                    {/* Contatti */}
                    <section className="bg-gradient-to-r from-[#FACC15]/10 to-transparent border border-[#FACC15]/30 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4">Contatti per la Privacy</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Per esercitare i tuoi diritti o per qualsiasi domanda riguardante il trattamento dei dati personali,
                            puoi contattarci ai seguenti recapiti:
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Mail size={24} className="text-[#FACC15] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href="mailto:privacy@wrdigital.it" className="text-[#FACC15] hover:underline">privacy@wrdigital.it</a>
                                    <span className="text-gray-400 text-sm block">oppure</span>
                                    <a href="mailto:info@wrdigital.it" className="text-[#FACC15] hover:underline">info@wrdigital.it</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={24} className="text-[#FACC15] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Indirizzo</p>
                                    <p className="text-gray-300">WRDigital S.r.l.</p>
                                    <p className="text-gray-300">Via Paradiso, 5</p>
                                    <p className="text-gray-300">20831 Seregno (MB) - Italia</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={24} className="text-[#FACC15] flex-shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold">Telefono</p>
                                    <a href="tel:+393401204651" className="text-[#FACC15] hover:underline">+39 340 120 4651</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Modifiche */}
                    <section className="text-center py-8">
                        <p className="text-gray-400 text-sm">
                            <em>
                                WRDigital si riserva il diritto di modificare o aggiornare la presente Privacy Policy.
                                La versione aggiornata sarà sempre disponibile su questa pagina con indicazione della data di ultimo aggiornamento.
                            </em>
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}

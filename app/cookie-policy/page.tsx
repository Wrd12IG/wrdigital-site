import type { Metadata } from 'next';
import { Settings, BarChart3, Target, Globe, Mail, Phone, AlertTriangle, Check } from 'lucide-react';


export const metadata: Metadata = {
    title: 'Cookie Policy | W[r]Digital',
    description: 'Informativa completa sull\'utilizzo dei cookie sul sito W[r]Digital',
    robots: { index: false, follow: false },
};

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-bold mb-4">
                    <span className="text-[#FACC15]">Cookie</span> Policy
                </h1>
                <p className="text-gray-400 mb-12">
                    Ultimo aggiornamento: 6 Gennaio 2026
                </p>

                <div className="prose prose-invert max-w-none space-y-8">

                    {/* Introduzione */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Cosa sono i Cookie</h2>
                        <p className="text-gray-300 leading-relaxed">
                            I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet, smartphone)
                            quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti web in modo più efficiente
                            e per fornire informazioni ai proprietari del sito.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            I cookie possono essere "persistenti" (rimangono sul dispositivo fino alla scadenza o cancellazione manuale)
                            o "di sessione" (vengono eliminati alla chiusura del browser). Possono essere di "prima parte"
                            (impostati dal sito che si sta visitando) o di "terza parte" (impostati da altri domini).
                        </p>
                    </section>

                    {/* Cookie Utilizzati */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Cookie Utilizzati su W[r]Digital</h2>

                        {/* Cookie Tecnici */}
                        <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-6 mb-6">
                            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <Settings size={32} className="text-green-500" />
                                1. Cookie Tecnici (Necessari)
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Questi cookie sono <strong>essenziali</strong> per il funzionamento del sito e <strong>non richiedono il consenso dell'utente</strong>
                                ai sensi del Provvedimento del Garante Privacy del 8 maggio 2014.
                            </p>

                            <div className="space-y-4 mt-6">
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <h4 className="font-semibold text-lg mb-2">next-auth.session-token</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="text-gray-400">Tipo:</span> <span className="text-white">HTTP, Persistente</span></div>
                                        <div><span className="text-gray-400">Durata:</span> <span className="text-white">30 giorni</span></div>
                                        <div className="col-span-2"><span className="text-gray-400">Scopo:</span> <span className="text-white">Gestione autenticazione utenti admin</span></div>
                                    </div>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl">
                                    <h4 className="font-semibold text-lg mb-2">cookie-consent</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="text-gray-400">Tipo:</span> <span className="text-white">Locale, Persistente</span></div>
                                        <div><span className="text-gray-400">Durata:</span> <span className="text-white">365 giorni</span></div>
                                        <div className="col-span-2"><span className="text-gray-400">Scopo:</span> <span className="text-white">Memorizza le preferenze sui cookie dell'utente</span></div>
                                    </div>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl">
                                    <h4 className="font-semibold text-lg mb-2">PHPSESSID / __Host-next-auth.csrf-token</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className="text-gray-400">Tipo:</span> <span className="text-white">Sessione</span></div>
                                        <div><span className="text-gray-400">Durata:</span> <span className="text-white">Fino alla chiusura del browser</span></div>
                                        <div className="col-span-2"><span className="text-gray-400">Scopo:</span> <span className="text-white">Mantenimento della sessione di navigazione e protezione CSRF</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cookie Analytics */}
                        <div className="bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/30 rounded-2xl p-6 mb-6">
                            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <BarChart3 size={32} className="text-blue-500" />
                                2. Cookie Analytics e Statistici
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                Utilizzati per raccogliere informazioni su come i visitatori utilizzano il sito.
                                <strong className="text-[#FACC15]"> Richiedono il tuo consenso esplicito.</strong>
                            </p>

                            <div className="space-y-4 mt-6">
                                <div className="bg-black/30 p-4 rounded-xl">
                                    <h4 className="font-semibold text-lg mb-2">Google Analytics (_ga, _gid, _gat)</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                        <div><span className="text-gray-400">Provider:</span> <span className="text-white">Google LLC</span></div>
                                        <div><span className="text-gray-400">Durata:</span> <span className="text-white">_ga: 2 anni, _gid: 24 ore</span></div>
                                        <div className="col-span-2"><span className="text-gray-400">Tipo:</span> <span className="text-white">Terza Parte, HTTP</span></div>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        <strong>Scopo:</strong> Analisi del traffico web, comportamento utenti, sorgenti di traffico,
                                        pagine più visitate. I dati sono aggregati e anonimi.
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2">
                                        <strong>Privacy Policy:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline">policies.google.com/privacy</a>
                                    </p>
                                </div>

                                <div className="bg-black/30 p-4 rounded-xl">
                                    <h4 className="font-semibold text-lg mb-2">Microsoft Clarity</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                        <div><span className="text-gray-400">Provider:</span> <span className="text-white">Microsoft Corporation</span></div>
                                        <div><span className="text-gray-400">Durata:</span> <span className="text-white">1 anno</span></div>
                                        <div className="col-span-2"><span className="text-gray-400">Tipo:</span> <span className="text-white">Terza Parte, HTTP</span></div>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        <strong>Scopo:</strong> Registrazione sessioni utente (heatmap, scroll depth, click tracking)
                                        per migliorare l'esperienza utente. I dati sensibili vengono mascherati automaticamente.
                                    </p>
                                    <p className="text-gray-400 text-sm mt-2">
                                        <strong>Privacy Policy:</strong> <a href="https://privacy.microsoft.com/privacystatement" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline">privacy.microsoft.com</a>
                                    </p>
                                </div>
                            </div>

                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-6">
                                <p className="text-sm text-gray-300">
                                    <AlertTriangle size={16} className="inline mr-1" /> <strong>Nota:</strong> Puoi gestire o disabilitare questi cookie tramite il banner di consenso
                                    o le impostazioni del tuo browser.
                                </p>
                            </div>
                        </div>

                        {/* Cookie di Marketing */}
                        <div className="bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/30 rounded-2xl p-6">
                            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                                <Target size={32} className="text-purple-500" />
                                3. Cookie di Marketing e Profilazione
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Attualmente <strong className="text-[#FACC15]">non utilizziamo cookie di marketing</strong> o profilazione di terze parti
                                (es. Facebook Pixel, LinkedIn Insight Tag, Google Ads Remarketing).
                            </p>
                            <p className="text-gray-400 text-sm mt-4">
                                <em>Nel caso in cui decidessimo di utilizzare tali cookie in futuro, aggiorneremo questa policy
                                    e richiederemo nuovamente il tuo consenso esplicito.</em>
                            </p>
                        </div>
                    </section>

                    {/* Gestione Cookie */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-6 text-[#FACC15]">Come Gestire i Cookie</h2>

                        <h3 className="text-xl font-semibold mb-4">1. Tramite il Banner di Consenso</h3>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Alla tua prima visita, vedrai un banner che ti permette di:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mb-6">
                            <li><strong>Accettare tutti i cookie</strong>: Include cookie tecnici e analytics</li>
                            <li><strong>Accettare solo i necessari</strong>: Solo cookie tecnici essenziali</li>
                            <li><strong>Personalizzare</strong>: Scegliere quali categorie abilitare</li>
                        </ul>

                        <h3 className="text-xl font-semibold mb-4">2. Attraverso le Impostazioni del Browser</h3>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Puoi gestire i cookie direttamente dal tuo browser:
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-black/30 p-4 rounded-xl">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Globe size={20} /> Google Chrome
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Impostazioni → Privacy e sicurezza → Cookie e altri dati dei siti
                                </p>
                                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer"
                                    className="text-[#FACC15] text-xs hover:underline mt-2 inline-block">
                                    Guida completa →
                                </a>
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Globe size={20} /> Mozilla Firefox
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Opzioni → Privacy e sicurezza → Cookie e dati dei siti web
                                </p>
                                <a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer"
                                    className="text-[#FACC15] text-xs hover:underline mt-2 inline-block">
                                    Guida completa →
                                </a>
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Globe size={20} /> Apple Safari
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Preferenze → Privacy → Gestisci dati siti web
                                </p>
                                <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer"
                                    className="text-[#FACC15] text-xs hover:underline mt-2 inline-block">
                                    Guida completa →
                                </a>
                            </div>

                            <div className="bg-black/30 p-4 rounded-xl">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <Globe size={20} /> Microsoft Edge
                                </h4>
                                <p className="text-sm text-gray-400">
                                    Impostazioni → Cookie e autorizzazioni siti → Cookie e dati del sito
                                </p>
                                <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer"
                                    className="text-[#FACC15] text-xs hover:underline mt-2 inline-block">
                                    Guida completa →
                                </a>
                            </div>
                        </div>

                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mt-6">
                            <p className="text-sm text-gray-300">
                                ⚠️ <strong>Attenzione:</strong> Disabilitare i cookie tecnici potrebbe compromettere alcune funzionalità del sito
                                (es. autenticazione, preferenze salvate).
                            </p>
                        </div>
                    </section>

                    {/* Do Not Track */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Opzione "Do Not Track"</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Alcuni browser offrono la funzione "Do Not Track" (DNT) che comunica ai siti web che non desideri essere tracciato.
                            Tuttavia, questa funzione non è standardizzata e molti siti (incluso il nostro) potrebbero non rispondere
                            a questi segnali in modo automatico.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            <strong>Il modo migliore</strong> per controllare i cookie è gestirli tramite il banner di consenso o
                            le impostazioni del browser.
                        </p>
                    </section>

                    {/* Plugin Opt-Out */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Plugin di Opt-Out per Google Analytics</h2>
                        <p className="text-gray-300 leading-relaxed mb-4">
                            Google offre un componente aggiuntivo per il browser che disabilita il tracciamento di Google Analytics
                            su tutti i siti web che visiti:
                        </p>
                        <a href="https://tools.google.com/dlpage/gaoptout"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#FACC15] text-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all">
                            Scarica il Plugin Opt-Out →
                        </a>
                    </section>

                    {/* Trasferimento Dati */}
                    <section>
                        <h2 className="text-3xl font-bold mb-4">Trasferimento Dati Extra-UE</h2>
                        <p className="text-gray-300 leading-relaxed">
                            Alcuni cookie di terze parti (Google Analytics, Microsoft Clarity) potrebbero comportare il trasferimento
                            di dati personali verso paesi extra-UE, inclusi gli Stati Uniti.
                        </p>
                        <p className="text-gray-300 leading-relaxed mt-4">
                            Questi trasferimenti avvengono sulla base di:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                            <li><strong>Decisioni di adeguatezza della Commissione Europea</strong> (ove applicabili)</li>
                            <li><strong>Clausole contrattuali standard (SCC)</strong> approvate dalla Commissione</li>
                            <li><strong>Garanzie adeguate</strong> fornite dai provider (es. Google, Microsoft)</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-4">
                            <em>Per maggiori dettagli, consulta le Privacy Policy di Google e Microsoft linkate sopra.</em>
                        </p>
                    </section>

                    {/* Modifiche */}
                    <section className="bg-white/5 border border-white/10 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4 text-[#FACC15]">Modifiche alla Cookie Policy</h2>
                        <p className="text-gray-300 leading-relaxed">
                            WRDigital si riserva il diritto di modificare questa Cookie Policy per adeguarla a nuove normative,
                            tecnologie o pratiche aziendali. Eventuali modifiche saranno comunicate tramite:
                        </p>
                        <ul className="list-disc pl-6 text-gray-300 space-y-2 mt-4">
                            <li>Aggiornamento di questa pagina con nuova data di revisione</li>
                            <li>Notifica tramite banner sul sito (per modifiche sostanziali)</li>
                            <li>Email (se hai fornito il tuo consenso alle comunicazioni)</li>
                        </ul>
                        <p className="text-gray-400 text-sm mt-4">
                            <em>Ti invitiamo a consultare periodicamente questa pagina per rimanere aggiornato.</em>
                        </p>
                    </section>

                    {/* Contatti */}
                    <section className="bg-gradient-to-r from-[#FACC15]/10 to-transparent border border-[#FACC15]/30 rounded-2xl p-8">
                        <h2 className="text-3xl font-bold mb-4">Hai Domande sui Cookie?</h2>
                        <p className="text-gray-300 leading-relaxed mb-6">
                            Per qualsiasi domanda o chiarimento riguardo all'utilizzo dei cookie, contattaci:
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail size={24} className="text-[#FACC15] flex-shrink-0" />
                                <div>
                                    <a href="mailto:privacy@wrdigital.it" className="text-[#FACC15] hover:underline font-semibold">privacy@wrdigital.it</a>
                                    <span className="text-gray-400 text-sm block">oppure</span>
                                    <a href="mailto:info@wrdigital.it" className="text-[#FACC15] hover:underline">info@wrdigital.it</a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={24} className="text-[#FACC15] flex-shrink-0" />
                                <a href="tel:+393401204651" className="text-[#FACC15] hover:underline">+39 340 120 4651</a>
                            </div>
                        </div>
                    </section>

                    {/* Link Utili */}
                    <section className="text-center py-8">
                        <h3 className="text-xl font-semibold mb-4">Link Correlati</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/privacy-policy" className="text-[#FACC15] hover:underline">Privacy Policy</a>
                            <span className="text-gray-600">•</span>
                            <a href="/" className="text-[#FACC15] hover:underline">Torna alla Home</a>
                            <span className="text-gray-600">•</span>
                            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-[#FACC15] hover:underline">Garante Privacy</a>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}

const axios = require('axios');
const Sitemapper = require('sitemapper');
require('dotenv').config(); // Load .env for configuration

// CONFIGURAZIONE
// Usa la variabile d'ambiente o fallback all'URL pubblico
const SITEMAP_URL = process.env.SITEMAP_URL || 'https://www.wrdigital.it/sitemap.xml';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MIN_SCORE_THRESHOLD = 90;

const sitemap = new Sitemapper({
    url: SITEMAP_URL,
    timeout: 15000 // 15 seconds
});

async function checkSEOPerformance() {
    console.log(`\n🚀 Avvio "Il Guardiano SEO"...`);

    if (!PAGESPEED_API_KEY) {
        console.warn("⚠️  ATTENZIONE: PAGESPEED_API_KEY non trovata nel file .env.");
        console.warn("    Le richieste potrebbero essere limitate o fallire.\n");
    }

    try {
        console.log(`📡 Scaricando sitemap da: ${SITEMAP_URL}`);

        // 1. Recupera tutte le URL dalla sitemap
        // sitemapper fetch returns { sites: [...] }
        const { sites } = await sitemap.fetch();

        if (!sites || sites.length === 0) {
            console.error("❌ Nessuna URL trovata nella sitemap. Verifica l'indirizzo.");
            return;
        }

        console.log(`🔍 Trovate ${sites.length} pagine da analizzare.\n`);

        for (const url of sites) {
            // Skip localhost for Google API calls
            if (url.includes('localhost') || url.includes('127.0.0.1')) {
                console.log(`⏭️  Skipping Local (Google non può accedere): ${url}`);
                continue;
            }

            console.log(`⚡ Analisi PageSpeed per: ${url}`);

            // 2. Chiama l'API di Google PageSpeed (Analisi Mobile)
            const keyParam = PAGESPEED_API_KEY ? `&key=${PAGESPEED_API_KEY}` : '';
            const psiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}${keyParam}&strategy=mobile&category=performance&category=accessibility`;

            try {
                const response = await axios.get(psiUrl);
                const lighthouse = response.data.lighthouseResult;

                if (!lighthouse) {
                    console.log(`   ❌ Nessun risultato Lighthouse ricevuto.`);
                    continue;
                }

                const perfScore = lighthouse.categories.performance.score * 100;
                const accessScore = lighthouse.categories.accessibility.score * 100;

                // Color output logic
                const perfColor = perfScore >= 90 ? '\x1b[32m' : (perfScore >= 50 ? '\x1b[33m' : '\x1b[31m');
                const resetColor = '\x1b[0m';

                console.log(`   📊 Performance: ${perfColor}${perfScore.toFixed(0)}${resetColor} | Accessibility: ${accessScore.toFixed(0)}`);

                // 3. Se il punteggio è basso, invia notifica su Telegram
                if (perfScore < MIN_SCORE_THRESHOLD) {
                    console.log(`   ⚠️  SOTTO SOGLIA (${MIN_SCORE_THRESHOLD})! Invio notifica...`);

                    if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
                        const message = `⚠️ *W[r]Digital SEO Alert* ⚠️\n\n🚨 *Performance Critica*\nPagina: ${url}\nPunteggio: *${perfScore.toFixed(0)}*\nSoglia: ${MIN_SCORE_THRESHOLD}\n\nIntervieni subito!`;

                        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
                            chat_id: TELEGRAM_CHAT_ID,
                            text: message,
                            parse_mode: 'Markdown'
                        });
                        console.log("   📨 Notifica Telegram inviata.");
                    } else {
                        console.log("   🚫 Telegram non configurato (TELEGRAM_TOKEN mancante).");
                    }
                }
            } catch (err) {
                console.error(`   ❌ Errore API Google: ${err.message}`);
                if (err.response && err.response.data && err.response.data.error) {
                    console.error(`      Dettaglio: ${err.response.data.error.message}`);
                }
            }

            // Breve pausa per non saturare il rate limit se non c'è API key
            if (!PAGESPEED_API_KEY) await new Promise(r => setTimeout(r, 1500));
        }
    } catch (error) {
        console.error('❌ Errore critico script:', error);
    }
    console.log("\n🏁 Monitoraggio completato.");
}

checkSEOPerformance();

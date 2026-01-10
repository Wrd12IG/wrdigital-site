# 🤖 Configurazione AI Assistant

## ⚠️ Problema Rilevato

L'AI Assistant è configurato correttamente nel codice, ma manca la chiave API OpenAI.

## ✅ Soluzione

### **Step 1: Ottieni API Key OpenAI**

1. Vai su https://platform.openai.com/api-keys
2. Fai login o crea un account
3. Click "Create new secret key"
4. Copia la chiave (inizia con `sk-...`)

### **Step 2: Aggiungi al .env.local**

Apri il file `.env.local` e aggiungi:

```bash
# OpenAI API Configuration
OPENAI_API_KEY=sk-la-tua-chiave-qui
```

### **Step 3: Riavvia Server**

```bash
# Ferma il server (Ctrl+C)
# Riavvia
npm run dev
```

## 🎯 Verifica Funzionamento

1. Vai su `/admin/editor`
2. Aggiungi un blocco testo
3. Scrivi del contenuto
4. Click "Migliora con AI"
5. Scegli un'azione (es: "Migliora")
6. ✅ Dovrebbe funzionare!

## 💰 Costi

**OpenAI GPT-4 Turbo**:
- Input: ~$0.01 per 1K tokens
- Output: ~$0.03 per 1K tokens

**Stima uso CMS**:
- ~500 tokens per richiesta
- ~$0.02 per richiesta
- Budget mensile suggerito: $10-20

## 🔧 File Coinvolti

```
app/api/cms/ai-assistant/route.ts  ← API route (già presente ✅)
components/cms/AIAssistant.tsx     ← UI component (già presente ✅)
.env.local                         ← Aggiungi OPENAI_API_KEY qui ❌
```

## 📝 Funzionalità AI Disponibili

Una volta configurato, avrai:

1. **Migliora** - Rende il testo più persuasivo
2. **Accorcia** - Versione concisa
3. **Espandi** - Aggiunge dettagli
4. **Ottimizza SEO** - Migliora per keyword
5. **Cambia Tono** - Professionale, amichevole, ecc.
6. **Traduci** - Inglese, spagnolo, francese, tedesco
7. **Genera Varianti** - 3 versioni per A/B test
8. **Meta Tags** - Title e description automatici

## 🚀 Alternative

Se non vuoi usare OpenAI, puoi:

### **Opzione 1: Anthropic Claude**
Modifica `route.ts` per usare Claude API

### **Opzione 2: Disabilita AI**
Commenta il componente AIAssistant nel BlockEditor

### **Opzione 3: Usa API Locale**
Installa Ollama e usa modelli locali

## ❓ FAQ

**Q: L'AI è obbligatorio?**
A: No, il CMS funziona perfettamente senza. È solo un helper opzionale.

**Q: Posso usare un altro modello?**
A: Sì, modifica `model: 'gpt-4-turbo-preview'` in `route.ts`

**Q: I dati sono sicuri?**
A: Sì, vengono inviati solo a OpenAI tramite HTTPS. Non vengono salvati.

**Q: Quanto costa al mese?**
A: Dipende dall'uso. Con 100 richieste/mese: ~$2-5

## 📞 Supporto

Se hai problemi:
1. Verifica che la chiave API sia corretta
2. Controlla i log del server
3. Verifica il saldo OpenAI
4. Controlla la console browser per errori

---

**Status Attuale**: ⚠️ **API Key Mancante**
**Azione Richiesta**: Aggiungi `OPENAI_API_KEY` in `.env.local`

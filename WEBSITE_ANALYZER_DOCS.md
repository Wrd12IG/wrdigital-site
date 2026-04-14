# 🎯 Funzionalità Analisi Siti Web Clienti - Documentazione

## Panoramica
Sistema completo di analisi automatica dei siti web dei clienti con integrazione nelle Success Stories.

## ✅ Funzionalità Implementate

### 1. **Analisi Automatica Siti Web** (`/api/admin/analyze-website`)
Estrae automaticamente da qualsiasi sito web:
- **Nome azienda** (da og:site_name, title, twitter:site)
- **Logo** (con priorità):
  1. JSON-LD / Schema.org Organization/LocalBusiness
  2. Open Graph Image (og:image)
  3. Twitter Card (twitter:image)
  4. Apple Touch Icon
  5. Tag `<img>` con class/alt/src contenenti "logo"
- **Descrizione** (da og:description, meta description)
- **Social Media** (Facebook, Instagram, LinkedIn, Twitter, YouTube, TikTok)
- **Colori brand** (da theme-color)
- **Favicon**

#### Tecnologie di Estrazione:
- ✅ **JSON-LD** (schema.org)
- ✅ **Open Graph Protocol**
- ✅ **Twitter Cards**
- ✅ **HTML Meta Tags**
- ✅ **Regex Pattern Matching**

---

### 2. **Interfaccia Admin Marquee** (Tab Clienti)

#### Funzionalità per Cliente:
1. **Campo URL**: Inserimento link sito del cliente
2. **Pulsante "🔍 Analizza Sito"**: Trigger estrazione automatica
3. **Auto-compilazione**:
   - Nome Brand
   - Descrizione
   - Logo (preview in tempo reale)
4. **Social Media Checkboxes**:
   - Grid responsive (2-3 colonne)
   - Selezione individuale per platform
   - Pulsante "Seleziona tutti / Deseleziona tutti"
   - Badge visivi con emoji e link cliccabili
5. **Toggle "Mostra in Success Stories"**:
   - Checkbox per controllo visibilità
   - Badge "✓ Attivo" quando selezionato
6. **Caricamento Manuale Logo** (fallback)

#### Campi Dati Cliente:
```typescript
{
    name: string;
    logo: string;
    url?: string;
    description?: string;
    socials?: Record<string, string>;  // { facebook: "https://...", instagram: "https://..." }
    showInSuccessStories?: boolean;
    selectedSocials?: string[];        // ["facebook", "instagram"]
}
```

---

### 4. **Generatore FAQ AI** (`/api/admin/faq-suggestions`)
Sistema di suggerimento automatico di Domande Frequenti basato su topic o keyword.

#### Funzionalità:
- **Analisi Topic**: Genera domande pertinenti per SEO, Social, Ads, Web Design, E-commerce.
- **Analisi Query**: Accetta una lista di keyword (es. da Search Console) e restituisce FAQ appropriate.
- **Mock Intelligente**: Simula un'analisi AI restituendo template curati manualmente per alta qualità.

---

## 📂 File Modificati/Creati

### File Creati:
1. **`/app/api/admin/analyze-website/route.ts`** - Endpoint analisi siti web
2. **`/app/api/success-stories/route.ts`** - Endpoint pubblico success stories
3. **`/app/api/admin/faq-suggestions/route.ts`** - Endpoint suggerimenti FAQ

### File Modificati:
1. **`/app/admin/page.tsx`**:
   - Aggiornato tipo `clientsList` con nuovi campi
   - Nuova UI con checkboxes social
   - Toggle success stories
   - Handler analisi migliorato con logging
   - Pannello FAQ Suggestions

---

## 🎨 UI/UX Features

### Design Patterns:
- **Checkboxes interattive** con stati visivi (purple-500/20 quando selezionate)
- **Grid responsive** per social media (2-3 colonne)
- **Badge dinamici** con emoji per ogni platform
- **Toggle gradient** per success stories (purple/blue gradient)
- **Loading states** (console.log per debugging)

### Accessibilità:
- Link esterni con `target="_blank"` e `rel="noopener noreferrer"`
- Labels cliccabili per checkboxes
- Colori contrastanti per stati attivi/inattivi

---

## 🚀 Come Usare

### Per l'Operatore Admin:

1. **Aggiungere Cliente**:
   ```
   1. Click "+ Aggiungi" nella tab Marquee
   2. Inserire URL sito cliente (es: https://airbnb.com)
   3. Click "🔍 Analizza Sito"
   4. Verificare dati estratti (nome, logo, social)
   5. Selezionare social da mostrare pubblicamente
   6. Spuntare "Mostra in Success Stories" se desiderato
   7. Click "💾 Salva"
   ```

2. **Gestire Social**:
   - Click su checkbox singoli per selezione individuale
   - "Seleziona tutti" per selezionare tutti contemporaneamente
   - Solo i social selezionati saranno visibili pubblicamente

3. **Generare FAQ**:
   - Andare nella tab "FAQ & Q&A"
   - Inserire Topic (es. "Web Design") o Lista Query
   - Cliccare su "Genera"
   - Aggiungere le domande suggerite con un click

### Per il Frontend:

```typescript
// Fetch success stories
const response = await fetch('/api/success-stories');
const { clients } = await response.json();

// Render
clients.map(client => (
    <div key={client.name}>
        <img src={client.logo} alt={client.name} />
        <h3>{client.name}</h3>
        <p>{client.description}</p>
        <div>
            {Object.entries(client.socials).map(([platform, url]) => (
                <a href={url} target="_blank">{platform}</a>
            ))}
        </div>
    </div>
))
```

---

## 🔧 Miglioramenti Futuri Suggeriti

1. **Cache**: Implementare cache per richieste ripetute allo stesso URL
2. **Webhook**: Notifica quando vengono aggiunti nuovi clienti
3. **Bulk Import**: Importazione multipla da CSV/Excel
4. **Real AI Integration**: Collegare API OpenAI reale invece di template statici
5. **Screenshot**: Salvare screenshot homepage del cliente
6. **Metrics**: Tracking performance siti analizzati (PageSpeed, Lighthouse)

---

## 📊 Statistiche Tecniche

- **Endpoints API**: 3 nuovi (`analyze-website`, `success-stories`, `faq-suggestions`)
- **Componenti UI**: 2 (`AdminPage`, `FAQSuggestionsPanel`)
- **Tipi TypeScript**: 3 nuovi campi aggiunti
- **Funzioni Helper**: Aggiornate con fallback intelligenti per description (H2, P)
- **Pattern Regex**: 9 (social media + logo detection)

---

## 🎯 Obiettivi Raggiunti

✅ Estrazione automatica logo (JSON-LD, Schema.org, OG, Twitter, Apple)  
✅ Filtri per scegliere quali social mostrare  
✅ Controllo operatore su visibilità Success Stories  
✅ Interfaccia intuitiva con checkboxes e toggle  
✅ API pubblica per integrazione frontend  
✅ Dati persistenti in JSON  
✅ Generazione FAQ basata su Keyword/Topic (Simulated AI)

---

**Implementato il 6 Gennaio 2026**  
**Versione 1.1**

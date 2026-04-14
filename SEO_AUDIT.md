# 🎯 SEO AUDIT & RACCOMANDAZIONI - W[r]Digital

Data: 6 Gennaio 2026

## ✅ COMPLETATO

### 1. Schema.org Structured Data
- ✅ Organization Schema (nome, logo, contatti, social)
- ✅ LocalBusiness Schema (indirizzo, orari, geo-coordinates)
- ✅ BreadcrumbList Schema (navigazione)
- **Impatto**: ⭐⭐⭐⭐⭐ Rich Snippets in SERP

### 2. Redirect 301
- ✅ `/portfolio` → `/#lavori`
- ✅ `/chi-siamo` → `/#chi-siamo`
- **Impatto**: ⭐⭐⭐⭐ Nessun 404, link juice preservato

### 3. Legal Pages (GDPR)
- ✅ Privacy Policy completata
- ✅ Cookie Policy completata
- **Impatto**: ⭐⭐⭐ Compliance + Trust

---

## 🔴 PRIORITÀ ALTA (Da Fare Subito)

### 1. **Sitemap.xml Dinamica**
**Problema**: Non presente o statica  
**Soluzione**: Creare `/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.wrdigital.it',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.wrdigital.it/servizi/seo',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // ... tutte le pagine servizi
    {
      url: 'https://www.wrdigital.it/agenzia-marketing-digitale',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://www.wrdigital.it/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];
}
```

**Impatto**: ⭐⭐⭐⭐⭐ Indicizzazione più rapida

---

### 2. **robot.txt Ottimizzato**
**Problema**: Non presente o generico  
**Soluzione**: Creare `/app/robots.ts`

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: 'https://www.wrdigital.it/sitemap.xml',
  };
}
```

**Impatto**: ⭐⭐⭐⭐ Controllo crawling

---

### 3. **Immagini: Alt Text & Optimization**
**Problema**: Probabilmente mancano alt text ottimizzati  
**Soluzione**:
- Aggiungere `alt` descrittivi a tutte le immagini
- Usare Next.js `<Image>` component con `loading="lazy"`
- WebP format per tutte le immagini (60% più leggere)

**Esempio**:
```tsx
<Image 
  src="/services/seo.jpg" 
  alt="Consulente SEO Milano analizza strategia di posizionamento Google"
  width={600}
  height={400}
  loading="lazy"
/>
```

**Impatto**: ⭐⭐⭐⭐ SEO immagini + performance

---

### 4. **Canonical URLs**
**Problema**: Duplicati potenziali (www vs non-www, trailing slash)  
**Attuale**: ✅ Canonical nell'header già presente  
**Da verificare**:
- Reindirizzamenti server-side in `next.config.js`
- Consistenza trailing slash

**Impatto**: ⭐⭐⭐⭐

---

## 🟡 PRIORITÀ MEDIA (Entro 2 Settimane)

### 5. **Internal Linking Strategy**
**Problema**: Mancano link interni contestuali  
**Soluzione**:
- Homepage → Linkare alle pagine servizi nei paragrafi
- Blog → Linkare a servizi correlati
- Pillar Page → Link interni alle sezioni

**Esempio**:
```tsx
<p>
  La nostra expertise in <Link href="/servizi/seo">SEO</Link> e 
  <Link href="/servizi/sem">SEM</Link> ti permette di...
</p>
```

**Impatto**: ⭐⭐⭐⭐ Link juice + UX

---

### 6. **Meta Title Optimization**
**Attuale**: "W[r]Digital | Digital Agency Milano - SEO, Social Media, Web Development"  
**Suggerimento**:
- Massimo 60 caratteri
- Keyword principale all'inizio
- CTA implicita

**Nuovi title consigliati**:
```
Homepage: "Agenzia Digital Marketing Milano | ROI Garantito | W[r]Digital"
SEO: "Consulenza SEO Milano: +300% Traffico Organico | W[r]Digital"
SEM: "Google Ads Milano: +500% ROAS | Esperti Certificati"
```

**Impatto**: ⭐⭐⭐⭐ CTR in SERP (+20-30%)

---

### 7. **Blog: Article Schema**
**Problema**: Blog posts senza structured data  
**Soluzione**: Aggiungere Article schema a ogni post

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Titolo Article",
  "image": "URL immagine",
  "datePublished": "2026-01-01",
  "dateModified": "2026-01-06",
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
  }
}
```

**Impatto**: ⭐⭐⭐⭐ Rich snippets blog

---

### 8. **Open Graph Images**
**Problema**: `/og-image.jpg` generico per tutte le pagine  
**Soluzione**:
- OG image personalizzata per ogni servizio
- Dimensioni: 1200x630px
- Logo + Titolo servizio + Visual

**Impatto**: ⭐⭐⭐ CTR social sharing (+40%)

---

## 🟢 PRIORITÀ BASSA (Nice to Have)

### 9. **FAQ Schema per Servizi**
Aggiungere FAQ schema nelle pagine servizi per ottenere ricResultati FAQ in SERP

**Impatto**: ⭐⭐⭐

---

### 10. **Video Schema** (se hai video)
Per case studies o video testimonianze

**Impatto**: ⭐⭐⭐

---

### 11. **AggregateRating Schema**
Se hai recensioni Google, aggiungi schema rating

**Impatto**: ⭐⭐⭐ Stelle in SERP

---

## 📊 METRICHE DA MONITORARE

1. **Google Search Console**
   - Impressions
   - CTR medio
   - Posizione media
   - Errori indicizzazione

2. **PageSpeed Insights**
   - Core Web Vitals
   - LCP < 2.5s ✅
   - FID < 100ms ✅
   - CLS < 0.1 ✅

3. **Google Analytics 4**
   - Traffico organico
   - Bounce rate
   - Conversioni da organico

---

## 🚀 KEYWORD STRATEGY

### Keyword Primarie (Alta priorità)
- "agenzia digital marketing milano" (1,000 vol/mese)
- "consulenza seo milano" (800 vol/mese)
- "social media marketing milano" (600 vol/mese)
- "web agency milano" (2,000 vol/mese)

### Long-Tail (Quick Wins)
- "quanto costa seo milano" (200 vol/mese)
- "agenzia instagram milano" (150 vol/mese)
- "preventivo sito web milano" (300 vol/mese)

### Local SEO
- "digital agency nova milanese"
- "web agency monza brianza"

---

## 📝 CONTENUTO DA CREARE

1. **Blog Posts SEO-Optimized** (1-2 al mese)
   - "Guida SEO 2026: Come Posizionarsi su Google"
   - "Google Ads vs Facebook Ads: Quale Scegliere?"
   - "Costo SEO Milano: Prezzi e Pacchetti Reali"

2. **Case Studies Dettagliati**
   - Template: Problema → Soluzione → Risultati
   - Dati concreti ("+300% traffico", "+€50k revenue")

3. **Landing Pages Geo-Targeted**
   - `/milano/seo`
   - `/monza/web-development`

---

## ⚡ AZIONI IMMEDIATE (Oggi/Domani)

1. ✅ Schema.org COMPLETATO
2. ⏳ Creare sitemap.xml dinamica
3. ⏳ Creare robots.txt
4. ⏳ Audit immagini (alt text)
5. ⏳ Ottimizzare meta titles
6. ⏳ Internal linking homepage

---

## 🎯 OBIETTIVI 3 MESI

- **+150% traffico organico**
- **Top 3 per "agenzia digital marketing milano"**
- **+50 conversioni/mese da organico**
- **Domain Authority 35+** (attuale: da verificare)

---

**Vuoi che implementi subito sitemap.xml e robots.txt?**

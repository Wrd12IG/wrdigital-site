---
description: Piano di Implementazione CMS W[r]Digital - SEO Native
---

# 🚀 W[r]Digital CMS - Piano di Implementazione

## Filosofia
Creare un CMS che sia:
- **SEO-Native**: Impossibile commettere errori tecnici SEO
- **Performance-First**: Codice pulito, immagini ottimizzate, zero bloat
- **Developer-Friendly**: Componenti modulari, TypeScript, API RESTful

---

## 📦 FASE 1: Fondamenta (Settimana 1-2)

### 1.1 Database Schema Esteso
```prisma
// Nuovi modelli da aggiungere a schema.prisma

model Block {
  id          String   @id @default(cuid())
  name        String   // Nome del blocco (es. "Hero Section")
  type        String   // bento-grid, text, image, cta, etc.
  content     Json     // Contenuto strutturato
  styles      Json?    // Stili applicati
  isGlobal    Boolean  @default(false) // Componente riutilizzabile
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  pages       PageBlock[]
}

model PageBlock {
  id        String   @id @default(cuid())
  pageId    String
  blockId   String
  order     Int      // Ordine nella pagina
  overrides Json?    // Override locali del blocco globale
  page      Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  block     Block    @relation(fields: [blockId], references: [id], onDelete: Cascade)
  @@unique([pageId, blockId])
}

model Media {
  id          String   @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int
  width       Int?
  height      Int?
  altText     String?
  webpUrl     String?  // URL versione WebP
  avifUrl     String?  // URL versione AVIF
  thumbnailUrl String?
  createdAt   DateTime @default(now())
}

model ABTest {
  id          String   @id @default(cuid())
  name        String
  pageId      String
  variantA    Json     // Contenuto variante A
  variantB    Json     // Contenuto variante B
  traffic     Int      @default(50) // % traffico su variante B
  conversions Json?    // { a: number, b: number }
  status      String   @default("draft") // draft, running, completed
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime @default(now())
}

model DynamicVariable {
  id        String   @id @default(cuid())
  key       String   @unique // {year}, {company_name}, etc.
  value     String
  autoUpdate Boolean  @default(false)
  formula   String?  // Per variabili calcolate
}
```

### 1.2 API Routes
- `/api/cms/blocks` - CRUD blocchi
- `/api/cms/media` - Upload con auto-conversione
- `/api/cms/ab-tests` - Gestione A/B test
- `/api/cms/variables` - Variabili dinamiche
- `/api/cms/interlinks` - Suggerimenti AI

---

## 📝 FASE 2: Editor Visuale (Settimana 3-4)

### 2.1 Bento-Grid Builder
- Libreria: `@dnd-kit/core` per drag & drop
- Griglia responsive con breakpoint preconfigurati
- Blocchi predefiniti: Hero, Text, Image, CTA, Testimonial, FAQ, Stats

### 2.2 Live Preview
- Iframe separato che riceve messaggi `postMessage`
- Toggle Mobile/Tablet/Desktop con dimensioni reali
- Sync in tempo reale senza refresh

### 2.3 Block Types
```typescript
type BlockType = 
  | 'bento-grid'
  | 'hero'
  | 'text-block'
  | 'image'
  | 'cta'
  | 'testimonials'
  | 'faq-accordion'
  | 'stats-counter'
  | 'video-embed'
  | 'code-snippet'
  | 'form'
  | 'spacer'
  | 'divider'
  | 'columns';
```

---

## 🖼️ FASE 3: Media Manager (Settimana 5)

### 3.1 Pipeline di Upload
1. Utente carica immagine
2. Sharp genera: WebP, AVIF, Thumbnail
3. Salvataggio su `/public/uploads/` o S3
4. Validazione Alt Text obbligatorio

### 3.2 API Media
```typescript
POST /api/cms/media
- Accetta: multipart/form-data
- Ritorna: { original, webp, avif, thumbnail, dimensions }

GET /api/cms/media
- Lista con paginazione e filtri

DELETE /api/cms/media/:id
- Soft delete con cleanup files
```

---

## 🔍 FASE 4: SEO Avanzato (Settimana 6)

### 4.1 Keyword Density Analyzer
- Conta occorrenze keyword target
- Suggerisce sinonimi e termini LSI
- Alert se densità > 3% (keyword stuffing)

### 4.2 Core Web Vitals Estimator
- Analisi peso immagini nella pagina
- Stima LCP basata su first contentful element
- Warning per font esterni o script bloccanti

### 4.3 Interlink Suggestions (AI)
- Endpoint: `/api/cms/interlinks`
- Input: Testo del nuovo articolo
- Output: Lista articoli correlati con anchor text suggeriti

---

## 🧪 FASE 5: A/B Testing (Settimana 7)

### 5.1 Logica di Splitting
```typescript
// Middleware per routing A/B
export function getABVariant(testId: string, userId: string): 'A' | 'B' {
  const hash = murmurhash(userId + testId);
  const test = await getTest(testId);
  return (hash % 100) < test.traffic ? 'B' : 'A';
}
```

### 5.2 Tracking Conversioni
- Event listener su CTA clicks
- Beacon API per non bloccare UX
- Dashboard con statistiche e significatività

---

## 🏷️ FASE 6: Variabili Dinamiche (Settimana 8)

### 6.1 Sistema di Parsing
```typescript
const DYNAMIC_VARS = {
  '{year}': () => new Date().getFullYear(),
  '{company}': () => 'W[r]Digital',
  '{today}': () => format(new Date(), 'dd MMMM yyyy', { locale: it }),
};

function parseVariables(text: string): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    const varDef = DYNAMIC_VARS[match] || dbVars[match];
    return varDef ? varDef() : match;
  });
}
```

---

## 📋 Checklist di Rilascio

### MVP (Minimo Viable Product)
- [ ] Schema DB aggiornato
- [ ] API Blocchi funzionante
- [ ] Editor base con drag & drop
- [ ] Media upload con WebP
- [ ] SEO Panel potenziato
- [ ] Preview responsive

### v1.0
- [ ] A/B Testing
- [ ] Interlink AI
- [ ] Variabili dinamiche
- [ ] Componenti globali
- [ ] Core Web Vitals dashboard

### v2.0
- [ ] Visual Builder avanzato
- [ ] Template library
- [ ] Multi-lingua
- [ ] Workflow approvazione
- [ ] Audit log

---

## 🛠️ Stack Tecnologico

| Componente | Tecnologia |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL + Prisma |
| Editor | Custom + @dnd-kit |
| Immagini | Sharp + next/image |
| Styling | CSS Modules + Tailwind utilities |
| State | Zustand |
| API | Next.js Route Handlers |
| AI | OpenAI API (interlinks) |

---

## Prossimi Passi Immediati

1. ✅ Aggiornare `schema.prisma` con nuovi modelli
2. ✅ Creare API `/api/cms/blocks`
3. ✅ Creare componente `BlockEditor`
4. ✅ Implementare Media Manager con Sharp
5. ✅ Potenziare SEO Panel con keyword density

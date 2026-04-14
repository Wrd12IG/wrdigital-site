# 🎨 Hero Block - Background Options

## ✨ Nuove Features Implementate

### 1️⃣ **Scelta Tipo Sfondo**
Due opzioni disponibili:
- 🖼️ **Immagine** (default)
- 🎨 **Colore**

### 2️⃣ **Modalità Immagine**
- ✅ Pulsante "Seleziona Immagine"
- ✅ Preview immagine selezionata
- ✅ Pulsante "X" per rimuovere
- ✅ Integrazione Media Library

### 3️⃣ **Modalità Colore**
- 🎨 **Color Picker** visuale
- ⌨️ **Input manuale** hex (#000000)
- 🌈 **Gradiente** opzionale (2 colori)
- 🎯 **5 Preset** pronti all'uso:
  - Nero
  - Blu Scuro
  - Verde Scuro
  - Viola
  - Rosso

---

## 🎯 Come Usare

### **Immagine di Sfondo**
```
1. Seleziona "🖼️ Immagine"
2. Click "Seleziona Immagine"
3. Scegli dalla Media Library
4. Preview appare automaticamente
5. Click "X" per rimuovere
```

### **Colore di Sfondo**
```
1. Seleziona "🎨 Colore"
2. Opzione A: Click color picker
3. Opzione B: Scrivi hex (#1e3a8a)
4. Opzione C: Click preset
```

### **Gradiente**
```
1. Modalità Colore attiva
2. Check "Usa Gradiente"
3. Scegli secondo colore
4. Gradiente automatico top→bottom
```

---

## 🎨 Preset Colors

| Nome | Hex | Uso |
|------|-----|-----|
| Nero | #000000 | Elegante, minimal |
| Blu Scuro | #1e3a8a | Corporate, tech |
| Verde Scuro | #065f46 | Natura, eco |
| Viola | #581c87 | Creativo, luxury |
| Rosso | #991b1b | Energia, urgenza |

---

## 🔧 Implementazione Tecnica

### **Nuovi Campi Block**
```typescript
{
  backgroundType: 'image' | 'color',
  backgroundColor: string,      // hex color
  gradientColor: string,        // hex color
  useGradient: boolean,
  backgroundImage: string,      // URL
  backgroundImageAlt: string
}
```

### **Rendering**
Il componente LivePreview deve gestire:
- `backgroundType === 'image'` → usa backgroundImage
- `backgroundType === 'color'` → usa backgroundColor
- `useGradient === true` → gradient CSS

---

## ✅ Risoluzione Problemi

### **Selezione Immagine**
Se non funziona:
1. Verifica che MediaLibrary sia configurata
2. Check console per errori
3. Verifica permessi Google Drive

### **Color Picker**
Browser supportati:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ⚠️ Fallback: input manuale

---

## 📝 Note

**Default**: Immagine (backward compatible)
**Persistenza**: Tutti i campi salvati in DB
**Preview**: Real-time nel dark preview mode

---

**Status**: ✅ **IMPLEMENTATO**
**Versione**: 3.1
**Data**: 2026-01-08

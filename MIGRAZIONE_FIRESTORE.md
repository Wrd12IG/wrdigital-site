# Migrazione da SQLite a Firestore

Il sito usa Prisma + SQLite, che su Vercel non è persistente (i lead non vengono salvati, le modifiche si perdono).
Questa migrazione sposta i dati su Firestore **senza toccare le pagine e le API**: `lib/prisma.ts` sceglie il backend
in base alla variabile `DB_BACKEND`.

| `DB_BACKEND` | Backend |
|---|---|
| (vuota) | SQLite via Prisma, come oggi |
| `firestore` | Firestore tramite l'adattatore in `lib/db/` |

Ogni modello Prisma diventa una collezione Firestore con lo stesso nome (`Lead`, `User`, `Page`, ...) e gli stessi id.

## 1. Crea il progetto Firebase
1. [console.firebase.google.com](https://console.firebase.google.com) → Aggiungi progetto.
2. Build → **Firestore Database** → Crea database → modalità **produzione**, regione `eur3` (Europa) o `europe-west8` (Milano).
3. Impostazioni progetto → **Account di servizio** → "Genera nuova chiave privata": scarica il JSON.
   Non metterlo mai nel repo (il repo è pubblico).

## 2. Regole di sicurezza
Tutti gli accessi passano dal server (Admin SDK). Applica `firestore.rules` (nega ogni accesso da browser):
```bash
npx firebase-tools deploy --only firestore:rules --project <ID_PROGETTO>
```
oppure incolla il contenuto del file in Firestore → Regole.

## 3. Importa i dati
Serve il file SQLite sorgente (`prisma/dev.db`, recuperabile dalla storia git, commit `0102ff4`).
```bash
export DATABASE_URL="file:$PWD/prisma/dev.db"
export FIREBASE_SERVICE_ACCOUNT="$(base64 -i ~/Downloads/chiave.json)"

npm run migrate:firestore -- --dry-run      # conta i record, non scrive
npm run migrate:firestore                   # importa (idempotente: riesegui pure)
```
Controlla in console che le collezioni abbiano i conteggi attesi (oggi: 106 record, tra cui 2 `User`, 23 `BlogPost`, 25 `Faq`).
**Gli utenti vanno importati prima di passare a Firestore**, altrimenti nessuno può entrare in `/area-clienti`.

## 4. Attiva su Vercel
Variabili d'ambiente (Production):
- `DB_BACKEND` = `firestore`
- `FIREBASE_SERVICE_ACCOUNT` = il JSON in base64 (come sopra), segnata come *sensitive*

Poi redeploy. Con `DB_BACKEND=firestore` lo script di build **non** esegue più `prisma db push` e `prisma db seed`.

## 5. Verifica
- `/api/admin/site-config` risponde 200 (oggi 500).
- Compila il form di contatto: nella collezione `Lead` compare il lead.
- Login in `/area-clienti`.

## Rollback
Rimuovi `DB_BACKEND` e rifai il deploy: si torna a SQLite.
Dopo la migrazione elimina il JSON dell'account di servizio dal tuo computer o conservalo in un password manager.

## Test
```bash
npm run test:db     # test dell'adattatore su un archivio in memoria
```

## Limiti noti
- Le query filtrano in memoria dopo aver letto la collezione (o dopo un filtro di uguaglianza): va benissimo per
  centinaia o poche migliaia di record. Se `Lead` crescerà molto, conviene spingere filtri e ordinamenti a Firestore.
- Nessuna transazione: vincoli `unique` e cascade sono verificati dall'adattatore, ma non in modo atomico.
- L'adattatore è stato testato su un archivio in memoria, **non** ancora su un Firestore reale: fai la prima prova su un progetto di test.
- Se cambi `prisma/schema.prisma`, aggiorna anche `lib/db/meta.ts`.

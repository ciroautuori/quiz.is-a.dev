# 🔍 Reference Repos — Ispirazione per Game & Layout

> Compagno di `CONTENT_GUIDELINES.md`. Quel file dice "da dove viene la
> risposta corretta di una card". Questo file dice "a chi guardare per
> migliorare meccaniche di gioco, motore Pyodide, PvP e sistema certificati".
>
> Stesso principio Tier 2 delle guidelines: licenza open, repo mantenuto,
> nessuna copia diretta di codice — solo studio di pattern e architettura,
> poi riscritti per il vostro stack (Next.js 15 + Pyodide WASM).
>
> Ultimo aggiornamento: luglio 2026 · Verificato con ricerca web in sessione

---

## 🏆 Leghe, streak, progressione (stile Duolingo)

### [`sanidhyy/duolingo-clone`](https://github.com/sanidhyy/duolingo-clone) — "Lingo"
Il più rilevante in assoluto per voi: **stack quasi identico** al vostro
(Next.js App Router, Tailwind, Drizzle ORM). Struttura da studiare:
- `actions/user-progress.ts` e `challenge-progress.ts` — pattern per XP,
  progressione per skill/track, server actions Next.js
- `components/quests.tsx`, `user-progress.tsx` — UI per obiettivi e streak
- `db/schema.ts` — schema dati per corso → unità → lezione → esercizio,
  adattabile al vostro Python Quest / TypeScript Lab / Git & GitHub
- Modali per "hearts/vite esaurite" (`use-hearts-modal.ts`) — pattern di
  gamification da adattare o scartare secondo la vostra filosofia (voi non
  avete "vite", ma la struttura del modale è riusabile per altri eventi)

### [`infojunkie/quizzical`](https://github.com/infojunkie/quizzical)
Più vecchio ma concettualmente pulito: motore di quiz ispirato a Duolingo
con skill-levels, punteggio più alto per risposte corrette al primo colpo,
e "jump out" verso un livello superiore tramite un quiz speciale sui
contenuti più difficili — pattern interessante per il vostro sistema di
leghe Bronze→Core-Dev se volete permettere "salti" di lega.

---

## 🐍 Motore d'esecuzione codice in-browser (Pyodide)

### [`pyodide/pyodide` — related-projects.md](https://github.com/pyodide/pyodide/blob/main/docs/project/related-projects.md)
Pagina ufficiale mantenuta da Pyodide stesso con l'elenco di progetti che lo
usano in produzione. Segnalo i più utili per voi:

- **[`react-py`](https://github.com/elilambnz/react-py)** — libreria che
  integra Pyodide in React con hook pronti (`usePython` ecc.). Se il vostro
  motore attuale è Pyodide "a mano", questo può semplificare molto il layer
  di integrazione con componenti React/Next.js.
- **PyCafe** — hosting/editing di app Python nel browser, utile per capire
  pattern di UX su sandboxing ed errori runtime mostrati all'utente.

### [`onlylonly/pyide`](https://github.com/onlylonly/pyide)
IDE Python browser-based con Pyodide + CodeMirror. Da studiare per:
- Gestione di `input()` in Python via SharedArrayBuffer + Service Worker
  (utile se mai voleste sfide che richiedono input interattivo)
- Split-view ridimensionabile editor/console, toggle tema chiaro/scuro
- Gestione pacchetti via `micropip` da UI — irrilevante per bug-hunting
  puro, ma utile se in futuro aggiungete sfide "scrivi codice da zero"

### [`amirtds/python_editor_wasm`](https://github.com/amirtds/python_editor_wasm)
Esempio minimale e leggibile Pyodide + CodeMirror, buono come riferimento
"pulito" se dovete rifare da zero il layer editor.

---

## ⚔️ PvP 1v1 real-time (bug-hunting duels)

### [`SaurabhJha19/Clash-of-Code`](https://github.com/SaurabhJha19/Clash-of-Code)
**Il più vicino concettualmente al vostro PvP.** Next.js frontend + Node/Express
+ Socket.io backend, licenza MIT. Cose da studiare:
- `backend/matchmaker.js` — coda e gestione stanze
- `backend/gameLogic.js` — meccaniche HP/ELO (loro usano un twist "fighting
  game": bug nel codice = danno). Anche solo per capire come strutturano lo
  stato di una partita in tempo reale
- `backend/piston.js` — driver di esecuzione codice sandboxato (usano
  [Piston](https://github.com/engineer-man/piston), un execution engine
  open source con supporto multi-linguaggio — alternativa o complemento a
  Pyodide se mai voleste eseguire anche TypeScript/altri linguaggi server-side)
- Sistema ELO per matchmaking — se volete leghe più "vive" di quelle a
  tier fissi

### [`Blank-09/Clash-of-Code`](https://github.com/Blank-09/Clash-of-Code)
Più semplice, ma interessante per le **varianti di modalità**: oltre alla
modalità "più veloce", hanno "Reverse Mode" (indovina il problema
dall'output) e "Smallest Mode" (risolvi con meno codice possibile) — idee
di game mode alternative al classico 1v1 bug-hunting.

### Nota tecnica: esecuzione codice sicura
Se il vostro PvP deve eseguire codice arbitrario dell'utente (non solo
multiple-choice), **non fatelo lato client con Pyodide per il PvP** — un
avversario potrebbe manomettere il risultato. Il pattern comune nei repo
sopra è eseguire lato server con un sandbox come Piston, o valutare solo
la risposta (indice scelto) e non codice libero, per le sfide PvP timed.

---

## 🏅 Certificati verificabili (SHA-256 + OpenBadge 2.0)

### [`luisgf/openbadgeslib`](https://github.com/luisgf/openbadgeslib)
Libreria Python più completa per il vostro caso d'uso: firma e verifica
badge in **OpenBadges 2.0 e 3.0**, con hashing SHA-256 salted del
destinatario esattamente come descritto nel vostro README. Supporta
firma di badge come immagini SVG/PNG con l'assertion incorporata.

### [`code4fukui/openbadge`](https://github.com/code4fukui/openbadge)
Alternativa più leggera (Deno, Ed25519/JWS invece di RSA) se preferite un
approccio più moderno alla firma crittografica. Include anche `chk.js` per
verificare l'hash SHA-256 salted di un destinatario contro il badge.

### Standard di riferimento (non repo, ma da conoscere)
- Specifica ufficiale Open Badges: mantenuta da **1EdTech** (ex IMS Global)
  — cercate "1EdTech Open Badges specification" per la versione corrente,
  dato che è passata da v2.0 a v3.0 (basata su W3C Verifiable Credentials)
- [`1EdTech/digital-credentials-public-validator`](https://github.com/1EdTech/digital-credentials-public-validator)
  — validator pubblico ufficiale, utile per testare che i badge che
  generate siano davvero conformi allo standard prima di promettere
  "verificati" agli utenti

---

## 📋 Come usare questo file

Stesso principio di `CONTENT_GUIDELINES.md`: questi repo sono **Tier 2**,
cioè ispirazione e pattern di codice reale, non "copia-incolla diretto".
Prima di adottare un pattern:

1. Verifica la licenza (tutti quelli sopra sono MIT o equivalente permissiva,
   ma controllatela sempre sul repo stesso perché può cambiare)
2. Riscrivi il pattern nel vostro stack, non copiare blocchi interi
3. Se un componente merita di essere quasi-copiato (es. una utility piccola
   e generica), citate il repo di origine in un commento nel codice

Quando chiedi ad Agy di implementare una nuova feature ispirata a uno di
questi repo, il prompt tipo è:

> Guarda come `[repo]` gestisce `[funzionalità specifica]` (link diretto al
> file, non solo al repo). Riscrivi il pattern per il nostro stack
> (Next.js 15 + [tecnologia locale]), non copiare il codice. Se il repo ha
> licenza incompatibile con MIT, dimmelo prima di procedere.

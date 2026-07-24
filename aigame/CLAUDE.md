# CLAUDE.md — quiz.is-a.dev

Istruzioni permanenti per Claude Code (e compatibili con Cursor `.cursorrules`
e Codex `AGENTS.md` — vedi nota in fondo) in questo repository.

## Regola non negoziabile sui contenuti

**Prima di creare, modificare o suggerire qualunque Quiz Card, leggi
`CONTENT_GUIDELINES.md` nella root del repo.** Non generare card a memoria.

In sintesi:
- Ogni card (risposta corretta + spiegazione) deve basarsi su una fonte
  **Tier 1** definita in CONTENT_GUIDELINES.md (docs ufficiali: Claude Docs,
  Claude Code Docs, MCP spec, Python/TS/Git docs ufficiali — non blog terzi).
- Per i track AI-native (Prompt Engineering, Tool Use, MCP, Claude Code,
  RAG) verifica sempre l'informazione con web search sulla documentazione
  ufficiale corrente, perché queste API cambiano rapidamente — non fidarti
  della tua conoscenza pregressa senza controllo.
- Codice ispirato a repo GitHub reali è ammesso solo se il repo è open
  license e attivo (criteri Tier 2 nel file guidelines) — cita sempre link
  + versione/commit.
- Ogni card nei nuovi track AI-native include il campo `source: { url, verifiedOn }`.
- Se non trovi una fonte Tier 1 che conferma la risposta, NON pubblicare la
  card — segnalala come bozza da verificare.

## Formato card

Segui esattamente lo schema esistente in `lib/content/initial_challenges.ts`
(vedi anche `sfide_typescript.ts`, `sfide_git.ts`) per id, title, track,
difficulty, code, options, correctAnswer, explanation. Non introdurre nuovi
campi al di fuori di `source` per i track AI-native.

## Quando generi un batch di nuove card

1. Cerca sul web la documentazione ufficiale più recente per l'argomento
   (Tier 1 da CONTENT_GUIDELINES.md).
2. Se ti serve un esempio di codice reale, cerca un repo Tier 2 pertinente
   (licenza open, manutenuto) e riscrivi l'esempio in una challenge originale
   — non copiare blocchi di codice protetti da copyright senza necessità,
   e non riprodurre call-out testuali di terzi verbatim.
3. Compila la card con `verifiedOn` alla data odierna.
4. Passa la checklist finale di CONTENT_GUIDELINES.md prima di aprire la PR.

---

### Nota per Cursor / Codex
Se stai usando Cursor, copia questo contenuto (o linka questo file) in
`.cursor/rules/content.mdc`. Se usi Codex/altri agenti compatibili con
`AGENTS.md`, duplica lo stesso contenuto in `AGENTS.md` nella root — molti
agenti leggono quel nome per convenzione. Il file sorgente di verità resta
comunque `CONTENT_GUIDELINES.md`.

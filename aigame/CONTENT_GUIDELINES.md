# 📚 Content Guidelines — quiz.is-a.dev

> Questo file è la **fonte di verità** per qualunque agente (Claude Code, Cursor,
> Codex, o umano) che genera, revisiona o approva contenuti su quiz.is-a.dev.
> Ogni nuova Quiz Card, ogni nuovo track, ogni spiegazione DEVE rispettare queste
> regole prima di essere mergiata.
>
> Ultimo aggiornamento: luglio 2026 · Owner: @ciroautuori

---

## 🎯 Perché esiste questo file

Il progetto è nato su Python / TypeScript / Git. Ma nel 2026 si programma
**con e per l'AI**: prompt engineering, tool use, agenti, MCP, context
engineering sono competenze professionali quanto sapere una list comprehension.

Il rischio è generare card "a memoria" o copiate da blog SEO che sembrano
autorevoli ma sono superficiali, obsolete o — peggio — sbagliate (è pieno di
articoli "guida 2026" scritti da content farm con statistiche inventate).
Questo file esiste per impedirlo.

**Regola zero: nessuna card entra nel repo senza una fonte verificabile e
verificata alla data odierna.**

---

## 🥇 Fonti Tier 1 — uniche fonti per "correctAnswer" e "explanation"

Solo queste fonti possono determinare qual è la risposta corretta di una card.
Sono documentazione ufficiale mantenuta dai maintainer del progetto/linguaggio/vendor.

### AI / LLM engineering (nuovo track)
- **Claude Platform Docs (Anthropic)** — https://platform.claude.com/docs
  - Prompt engineering: pagina unica `en/build-with-claude/prompt-engineering/claude-prompting-best-practices`
    (XML tags, ruoli, chain-of-thought ecc. sono **sezioni** di questa pagina,
    non URL a sé stanti — linka sempre l'ancora `#nome-sezione`, mai un path inventato)
  - Tool use / function calling: `en/agents-and-tools/tool-use/overview`
  - Extended thinking, context editing, citations: stesso dominio, altre sotto-sezioni
  - ⚠️ NON `docs.anthropic.com` — quel dominio fa redirect e non è la fonte canonica
- **Claude Code Docs** — https://code.claude.com/docs oppure https://docs.claude.com/en/docs/claude-code/
  (entrambi risolvono al motore doc corrente; verifica quale redirect ottieni
  con un fetch reale e cita quello, non un path "a sensazione")
  - CLAUDE.md/memory: `/docs/en/memory` · Skills: `/docs/en/skills` ·
    Subagents: `/docs/en/sub-agents` · Hooks: `/docs/en/hooks` · MCP: `/docs/en/mcp`
- **Model Context Protocol (spec ufficiale)** — https://modelcontextprotocol.io
  (architettura: `/docs/learn/architecture`, tools: sotto `/specification/<versione>/server/tools`
  — anche qui i path `/docs/concepts/...` fanno redirect: verificali col fetch, non a memoria)
- **Anthropic Engineering Blog** — https://www.anthropic.com/engineering
  (per pattern come "building effective agents", multi-agent research systems)
- **OpenAI Platform Docs** — https://platform.openai.com/docs (per confronto,
  quando una card è cross-vendor: function calling, structured outputs)
- **Google AI / Gemini Docs** — https://ai.google.dev/docs

> ⚠️ **Regola anti-hallucination sui link:** un URL "verificato" è solo quello
> per cui hai eseguito un fetch reale e letto il contenuto risultante in
> questa sessione. Costruire un path per analogia ("se XML tags è una
> sotto-pagina, allora system-prompts probabilmente lo è anche") NON conta
> come verifica, anche se il contenuto che ne deriveresti sarebbe corretto.
> Molte doc Anthropic moderne sono pagine lunghe e unificate con sezioni
> ancorate (`#sezione`), non un albero di URL per ogni sotto-argomento — non
> assumere una struttura a molte pagine solo perché era così in passato.
> Se il fetch fallisce o reindirizza, cita l'URL di destinazione reale
> (quello dopo il redirect), non quello richiesto.

### Linguaggi / tool "classici" (track esistenti)
- **Python** — https://docs.python.org/3/ (versione corrente stabile)
- **TypeScript** — https://www.typescriptlang.org/docs/handbook
- **Git** — https://git-scm.com/doc (man page ufficiali)
- **GitHub** — https://docs.github.com (Actions, PR workflow, ecc.)
- **MDN** — https://developer.mozilla.org (per JS/Web API quando servono da supporto)

**Regola pratica:** se la fonte non è un dominio da questa lista (o un suo
sotto-dominio ufficiale), NON può essere l'unica base per `correctAnswer`.

---

## 🥈 Fonti Tier 2 — contesto, ispirazione, "com'è usato nella realtà"

Repo GitHub open source, usabili per:
- Trovare esempi di codice reali da trasformare in bug-hunting challenge
- Capire pattern correnti (es. come un repo struttura un sistema multi-agente)
- Idee per nuove card — **mai** come unica prova della risposta corretta

Criteri minimi perché un repo sia citabile:
- Licenza open (MIT, Apache-2.0, BSD, ecc.) — mai codice proprietario senza permesso
- Segnali di manutenzione reale: attività negli ultimi 6 mesi, issue/PR gestite
- Preferire repo ufficiali di un'organizzazione (`anthropics/`, `openai/`,
  `microsoft/`, `python/`) o progetti community con adozione ampia e verificabile
  (stelle **e** attività, non solo stelle — repo gonfiati esistono)

Esempi di repo tier 2 utili oggi:
- `anthropics/claude-plugins-official` — pattern reali di Skills/plugin
- `anthropics/anthropic-cookbook` (o equivalente corrente) — esempi di tool use, RAG, agenti
- Repo ufficiali dei framework citati nel track TypeScript/Python quando servono
  esempi di codice reale, non solo documentazione

**Ogni card che cita un repo tier 2 deve includere link + commit/versione
di riferimento**, perché il codice di un repo cambia nel tempo.

---

## 🚫 Fonti NON ammesse come base di una card

- Blog "Guida definitiva 2026" senza affiliazione ufficiale, specialmente se:
  - citano statistiche precise senza link allo studio originale
  - non hanno un autore verificabile o un'organizzazione dietro
  - sono ottimizzati per SEO più che per accuratezza (titoli tipo
    "The Ultimate Guide to X in 2026" sono un segnale d'allarme, non una garanzia)
- Contenuto generato da AI senza revisione umana e senza fonte primaria citata
- Screenshot o citazioni di documentazione non più raggiungibile/verificabile
- Forum/Reddit/Discord come fonte primaria (ok come "idea", mai come "prova")

Quando in dubbio: se non riesci a trovare la stessa informazione anche sulla
doc ufficiale, la card non si pubblica finché non la trovi lì.

---

## 🧩 Nuovi track proposti — AI-native

Da affiancare ai track esistenti (Python Quest, TypeScript Lab, Git & GitHub),
seguendo lo stesso schema di `initial_challenges.ts`:

| Track | Focus | Fonte primaria |
|---|---|---|
| 🤖 **Prompt & Context Engineering** | Struttura prompt, XML tags, multishot, chain-of-thought, context window management | Claude Docs — prompt engineering |
| 🛠️ **Tool Use & Agenti** | Function calling, tool schemas, agentic loops, error handling in tool results | Claude Docs — tool use; Anthropic Engineering Blog |
| 🔌 **MCP (Model Context Protocol)** | Server/client MCP, tool discovery, auth, resource vs tool | modelcontextprotocol.io |
| 🧠 **Claude Code & AI-assisted Dev** | CLAUDE.md, Skills, Subagents, Hooks, permission modes | Claude Code Docs |
| 📐 **RAG & Retrieval** | Chunking, embedding, retrieval evaluation, citations | Documentazione vendor + paper/repo ufficiali quando serve |

Ogni nuova card in questi track segue **esattamente** il formato già in uso
in `initial_challenges.ts` (id, title, track, difficulty, code/snippet,
options, correctAnswer, explanation) — cambia solo il dominio, non la struttura.

**Campo aggiuntivo obbligatorio per i nuovi track AI-native:**
```typescript
{
  // ...campi esistenti...
  source: {
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
    verifiedOn: "2026-07-24" // data ISO in cui è stata controllata l'info
  }
}
```
Questo campo va aggiunto anche ai track classici quando la card riguarda un
comportamento specifico di una versione (es. una feature Python 3.13+), non
per fatti stabili da anni (es. "gli indici delle liste partono da 0").

---

## ✅ Checklist prima di aprire una PR con nuove card

0. **Hai fatto un fetch reale di ogni URL citato in questa sessione e letto
   il contenuto restituito?** Se un link è stato scritto per analogia con un
   altro path della stessa doc ("dovrebbe esistere anche questo"), non è
   verificato — fetchalo o cambialo con l'URL di destinazione reale.
1. La risposta corretta è verificabile su una fonte **Tier 1**? Link incluso?
2. Se ispirata a codice reale, il repo è **Tier 2** con licenza compatibile e link+versione?
3. Il campo `verifiedOn` è la data odierna (non copiata da un'altra card)?
4. L'explanation spiega il *perché*, non solo ripete l'opzione corretta?
5. Per i track AI-native: la card riflette il comportamento attuale del
   modello/tool citato, non un comportamento di una versione precedente?

Se una di queste risposte è "no" → la card resta in bozza, non si pubblica.

---

## 🔄 Manutenzione

Le API e i tool AI cambiano rapidamente. Ogni card nei track AI-native va
ricontrollata almeno ogni 3 mesi (issue automatica consigliata: "Verify
AI-native track sources — quarterly check"). Le card con `verifiedOn` più
vecchio di 6 mesi vanno segnalate per revisione prima di essere mostrate
come "aggiornate" in UI.

import { Challenge } from './types';

// Batch corretto — 24/07/2026
// Ogni URL sotto è stato verificato con un fetch reale in questa sessione
// (non costruito per analogia). Dove la doc Anthropic fa redirect, è citato
// l'URL di destinazione reale, non quello "logico".

export const AI_NATIVE_CHALLENGES: Challenge[] = [
  {
    id: 'prompt-1-1',
    trackId: 'prompt_engineering',
    chapter: 1,
    topic: 'XML Tag Structuring',
    difficulty: 'easy',
    question: 'Perché l\'uso di tag XML (es. <instructions>, <context>) è raccomandato da Anthropic nei prompt per Claude?',
    question_en: 'Why is using XML tags (e.g. <instructions>, <context>) recommended by Anthropic for Claude prompts?',
    question_es: '¿Por qué Anthropic recomienda el uso de etiquetas XML en las instrucciones de Claude?',
    code: `<instructions>\nAnalizza il seguente codice Python e trova eventuali vulnerabilità.\n</instructions>\n<code_to_review>\ndef login(user, pwd):\n    query = f"SELECT * FROM users WHERE user='{user}' AND pwd='{pwd}'"\n</code_to_review>`,
    options: [
      'Elimina le ambiguità separando chiaramente le istruzioni dai dati di input',
      'È l\'unico formato supportato per inviare codice alla API di Claude',
      'Riduce del 50% il numero di token consumati nella context window',
      'Disabilita automaticamente l\'esecuzione di tool non autorizzati'
    ],
    correctIndex: 0,
    hint: 'I tag XML impediscono che i dati di input vengano scambiati per istruzioni di sistema.',
    explanation: 'I tag XML strutturano il prompt consentendo al modello di distinguere senza ambiguità tra le istruzioni del prompt e i dati o codice su cui operare. Nomi di tag coerenti e descrittivi, e nesting quando il contenuto ha una gerarchia naturale, sono le best practice indicate.',
    explanation_en: 'XML tags explicitly separate system/user instructions from payload data, reducing misinterpretation especially when a prompt mixes instructions, context, examples, and variable inputs.',
    source: {
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#structure-prompts-with-xml-tags',
      verifiedOn: '2026-07-24'
    }
  },
  {
    id: 'prompt-2-1',
    trackId: 'prompt_engineering',
    chapter: 2,
    topic: 'System Prompts',
    difficulty: 'medium',
    question: 'Qual è il ruolo primario del System Prompt rispetto ai messaggi nel ruolo User in un\'integrazione LLM?',
    question_en: 'What is the primary role of the System Prompt compared to User messages in an LLM integration?',
    question_es: '¿Cuál es la función principal del System Prompt en comparación con los mensajes de usuario?',
    code: `const response = await anthropic.messages.create({\n  model: "claude-sonnet-5",\n  system: "Sei un senior code reviewer specializzato in sicurezza web e OWASP Top 10.",\n  messages: [{ role: "user", content: "Analizza questa API route." }]\n});`,
    options: [
      'Definire il ruolo, le regole di comportamento generali e i vincoli persistenti dell\'agente',
      'Fornire l\'unico luogo in cui è possibile definire le firme dei Tool/Function',
      'Sostituire la necessità di inviare la cronologia dei messaggi precedenti',
      'Aumentare la velocità di generazione dell\'output tramite caching obbligatorio'
    ],
    correctIndex: 0,
    hint: 'Imposta il contesto di sfondo e il tono dell\'assistente per l\'intera conversazione.',
    explanation: 'Il parametro `system` definisce il ruolo dell\'agente e ne orienta comportamento e tono per l\'intero caso d\'uso — anche una singola frase fa la differenza, secondo la guida ufficiale.',
    explanation_en: 'The system parameter sets a role that focuses Claude\'s behavior and tone for the use case; even a single sentence makes a measurable difference per official guidance.',
    source: {
      url: 'https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices#give-claude-a-role',
      verifiedOn: '2026-07-24'
    }
  },
  {
    id: 'mcp-1-1',
    trackId: 'mcp',
    chapter: 1,
    topic: 'Protocol & Transport',
    difficulty: 'medium',
    question: 'Su quale protocollo di messaggistica standard si basa lo strato fondamentale di comunicazione del Model Context Protocol (MCP)?',
    question_en: 'Which standard messaging protocol is the Model Context Protocol (MCP) base communication layer built on?',
    question_es: '¿En qué protocolo de mensajería estándar se basa la capa de comunicación de MCP?',
    code: `{\n  "jsonrpc": "2.0",\n  "id": 1,\n  "method": "tools/list",\n  "params": {}\n}`,
    options: [
      'JSON-RPC 2.0',
      'gRPC via Protocol Buffers',
      'GraphQL Queries & Mutations',
      'SOAP Envelope Messaging'
    ],
    correctIndex: 0,
    hint: 'Utilizza messaggi JSON strutturati con campi jsonrpc, id, method e params.',
    explanation: 'La data layer di MCP implementa un protocollo di scambio basato su JSON-RPC 2.0, che definisce struttura e semantica dei messaggi tra MCP host/client e MCP server; la transport layer (stdio o Streamable HTTP) trasporta questo stesso formato.',
    explanation_en: 'MCP\'s data layer implements a JSON-RPC 2.0 based exchange protocol; the transport layer (stdio or Streamable HTTP) carries this same message format regardless of mechanism.',
    source: {
      url: 'https://modelcontextprotocol.io/docs/learn/architecture',
      verifiedOn: '2026-07-24'
    }
  },
  {
    id: 'mcp-2-1',
    trackId: 'mcp',
    chapter: 2,
    topic: 'Tool Discovery',
    difficulty: 'hard',
    question: 'Nel Model Context Protocol (MCP), come fa l\'applicazione client a scoprire quali funzionalità o azioni sono esposte da un server MCP collegato?',
    question_en: 'In MCP, how does a client application discover available tools exposed by a connected MCP server?',
    question_es: 'En MCP, ¿cómo descubre la aplicación cliente las herramientas expuestas por un servidor MCP?',
    code: `// MCP Client Request\nconst response = await mcpClient.request({\n  method: "tools/list"\n});`,
    options: [
      'Inviando la richiesta JSON-RPC col metodo "tools/list" durante la fase di discovery',
      'Leggendo il file OpenAPI swagger.json dal server HTTP remoto',
      'Compilando un file manifest.json statico sul client prima della connessione',
      'Inviando una richiesta GET /api/v1/tools tramite REST endpoint'
    ],
    correctIndex: 0,
    hint: 'Si usa un metodo JSON-RPC nativo di discovery dei tool, che supporta paginazione.',
    explanation: 'Il metodo `tools/list` consente al client di interrogare il server MCP e ricevere l\'elenco dei tool disponibili con nome, descrizione e JSON Schema dei parametri (`inputSchema`); la richiesta supporta paginazione tramite `cursor`.',
    explanation_en: 'The `tools/list` RPC method dynamically discovers available tools along with their argument schemas, and supports pagination via a cursor parameter.',
    source: {
      url: 'https://modelcontextprotocol.io/specification/2025-06-18/server/tools',
      verifiedOn: '2026-07-24'
    }
  },
  {
    id: 'claudecode-1-1',
    trackId: 'claude_code',
    chapter: 1,
    topic: 'Project Guidelines (CLAUDE.md)',
    difficulty: 'easy',
    question: 'Qual è lo scopo del file CLAUDE.md nella radice di un repository di progetto quando si utilizza Claude Code o agenti AI compatibili?',
    question_en: 'What is the purpose of a CLAUDE.md file in a repository root when using Claude Code or compatible AI agents?',
    question_es: '¿Cuál es el propósito del archivo CLAUDE.md en la raíz de un repositorio?',
    code: `# CLAUDE.md\n## Build & Test Commands\n- npm test\n- npm run build\n\n## Code Style Guidelines\n- Usare HSL per i colori in CSS\n- Mantenere le funzioni prive di effetti collaterali`,
    options: [
      'Fornire istruzioni permanenti, comandi di build/test e regole di stile specifiche del progetto all\'agente AI',
      'Memorizzare le chiavi API private per l\'autenticazione col server Anthropic',
      'Generare automaticamente la documentazione HTML del codice ad ogni commit',
      'Sostituire completamente il file package.json o requirements.txt del progetto'
    ],
    correctIndex: 0,
    hint: 'Fornisce contesto persistente all\'agente per evitare che violi le convenzioni del progetto.',
    explanation: 'CLAUDE.md è un file markdown nella root del progetto che Claude Code legge a ogni sessione, usato per definire standard di codice, decisioni architetturali, librerie preferite e checklist di review. Claude Code costruisce anche "auto memory" nel tempo, salvando learning come comandi di build o insight di debug tra sessioni.',
    explanation_en: 'CLAUDE.md is read by Claude Code at the start of every session to set coding standards, architecture decisions, and review checklists; Claude Code also builds auto memory over time across sessions.',
    source: {
      url: 'https://code.claude.com/docs/en/overview#customize-with-instructions-skills-and-hooks',
      verifiedOn: '2026-07-24'
    }
  }
];

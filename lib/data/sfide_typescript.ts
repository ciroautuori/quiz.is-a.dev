import { Sfida } from '../types';

export const SFIDE_TYPESCRIPT: Sfida[] = [
  // Capitolo 1: Tipi Primitivi & Infezione
  {
    id: "ts-01",
    trackId: "typescript",
    capitolo: 1,
    argomento: "Tipi Primitivi",
    difficolta: "facile",
    domanda: "Qual è il tipo inferito per la variabile 'messaggio'?",
    codice: "let messaggio = 'Ciao TypeScript';",
    risposte: ["string", "any", "text", "String"],
    indice_corretto: 0,
    suggerimento: "TypeScript inferisce automaticamente il tipo dalle virgolette.",
    spiegazione: "In TypeScript le stringhe tra apici hanno il tipo primitivo 'string' (in minuscolo)."
  },
  {
    id: "ts-02",
    trackId: "typescript",
    capitolo: 1,
    argomento: "Annotazione esplicita",
    difficolta: "facile",
    domanda: "Come si annota esplicitamente il tipo numero per una variabile?",
    codice: "let punteggio: number = 100;",
    risposte: ["let punteggio: number = 100;", "let punteggio: int = 100;", "let number punteggio = 100;", "let punteggio = (number)100;"],
    indice_corretto: 0,
    suggerimento: "La sintassi di annotazione usa il carattere due punti (:).",
    spiegazione: "In TypeScript si scrive 'nome: tipo'. Il tipo per i numeri (interi e decimali) è 'number'."
  },
  {
    id: "ts-03",
    trackId: "typescript",
    capitolo: 1,
    argomento: "Boolean & Strict Type",
    difficolta: "facile",
    domanda: "Cosa succede se provi ad assegnare una stringa a una variabile booleana?",
    codice: "let attivo: boolean = true;\nattivo = 'sì';",
    risposte: ["Errore di compilazione TypeScript", "Funziona senza problemi", "La variabile diventa una stringa", "Lancia un'eccezione a runtime"],
    indice_corretto: 0,
    suggerimento: "TypeScript impedisce l'assegnazione di tipi incompatibili al momento della compilazione.",
    spiegazione: "TypeScript segnala 'Type string is not assignable to type boolean' durante la compilazione."
  },
  {
    id: "ts-04",
    trackId: "typescript",
    capitolo: 1,
    argomento: "Array Typings",
    difficolta: "facile",
    domanda: "Qual è la sintassi corretta per definire un array di soli numeri?",
    codice: "let numeri: number[] = [1, 2, 3];",
    risposte: ["number[]", "Array<number>", "Entrambe le risposte precedenti", "List<number>"],
    indice_corretto: 2,
    suggerimento: "Sia 'number[]' che 'Array<number>' sono sintassi valide ed equivalenti.",
    spiegazione: "In TypeScript si possono usare sia i parentesi quadre 'number[]' che il generico 'Array<number>'."
  },

  // Capitolo 2: Functions & Optional Parameters
  {
    id: "ts-05",
    trackId: "typescript",
    capitolo: 2,
    argomento: "Funzioni & Tipi",
    difficolta: "facile",
    domanda: "Come si definiscono i tipi dei parametri e del valore di ritorno in una funzione?",
    codice: "function somma(a: number, b: number): number {\n  return a + b;\n}",
    risposte: ["I parametri hanno tipo number e il ritorno è number", "Errore di sintassi", "Il ritorno è void", "I parametri sono di tipo any"],
    indice_corretto: 0,
    suggerimento: "Il tipo di ritorno si posiziona dopo le parentesi tonde dei parametri.",
    spiegazione: ": number dopo le parentesi indica che la funzione deve restituire un numero."
  },
  {
    id: "ts-06",
    trackId: "typescript",
    capitolo: 2,
    argomento: "Parametri Opzionali",
    difficolta: "media",
    domanda: "Quale simbolo rende un parametro opzionale in una funzione?",
    codice: "function saluta(nome: string, titolo?: string) {\n  console.log(titolo ? `${titolo} ${nome}` : nome);\n}",
    risposte: ["Il punto interrogativo (?)", "L'asterisco (*)", "Il punto esclamativo (!)", "La parola chiave optional"],
    indice_corretto: 0,
    suggerimento: "Aggiungendo ? dopo il nome del parametro si indica che può essere undefined.",
    spiegazione: "In 'titolo?: string', il tipo effettivo diventa 'string | undefined'."
  },
  {
    id: "ts-07",
    trackId: "typescript",
    capitolo: 2,
    argomento: "Void Return",
    difficolta: "facile",
    domanda: "Qual è il tipo di ritorno di una funzione che non restituisce alcun valore?",
    codice: "function logMessaggio(msg: string): void {\n  console.log(msg);\n}",
    risposte: ["void", "null", "undefined", "never"],
    indice_corretto: 0,
    suggerimento: "Significa 'vuoto' in inglese ed è comune nei metodi di log o side-effect.",
    spiegazione: "'void' indica che la funzione esegue istruzioni ma non restituisce un valore con return."
  },

  // Capitolo 3: Interfaces & Type Aliases
  {
    id: "ts-08",
    trackId: "typescript",
    capitolo: 3,
    argomento: "Interface",
    difficolta: "media",
    domanda: "Cosa definisce questa interfaccia per un oggetto Utente?",
    codice: "interface Utente {\n  readonly id: number;\n  nome: string;\n  email?: string;\n}",
    risposte: [
      "id non è modificabile, nome è obbligatorio, email è opzionale",
      "tutti i campi sono obbligatori e modificabili",
      "id è privato e non visibile fuori dall'oggetto",
      "email è di tipo string | null"
    ],
    indice_corretto: 0,
    suggerimento: "readonly blocca la riassegnazione, ? rende il campo opzionale.",
    spiegazione: "'readonly' impedisce modifiche dopo la creazione, nome è obbligatorio ed email? è opzionale."
  },
  {
    id: "ts-09",
    trackId: "typescript",
    capitolo: 3,
    argomento: "Type vs Interface",
    difficolta: "media",
    domanda: "Come si crea un alias di tipo (Type Alias) per una combinazione Union?",
    codice: "type Stato = 'pending' | 'success' | 'error';",
    risposte: [
      "type Stato = 'pending' | 'success' | 'error';",
      "interface Stato = 'pending' | 'success' | 'error';",
      "enum Stato = 'pending' | 'success' | 'error';",
      "union Stato = ['pending', 'success', 'error'];"
    ],
    indice_corretto: 0,
    suggerimento: "La parola chiave 'type' permette di definire anche Unioni di Literal Types.",
    spiegazione: "I 'type' alias consentono di unire tipi primitivi e literal types con la barra verticale (|)."
  },

  // Capitolo 4: Union, Intersection & Narrowing
  {
    id: "ts-10",
    trackId: "typescript",
    capitolo: 4,
    argomento: "Type Narrowing (typeof)",
    difficolta: "media",
    domanda: "Cosa fa il blocco 'typeof x === string' in questo codice?",
    codice: "function stampa(x: string | number) {\n  if (typeof x === 'string') {\n    console.log(x.toUpperCase());\n  } else {\n    console.log(x.toFixed(2));\n  }\n}",
    risposte: [
      "Rstringe (narrow) il tipo di x a 'string' all'interno dell'if e a 'number' nell'else",
      "Provoca un errore perché x può essere un numero",
      "Converte x in stringa prima dell'esecuzione",
      "Non ha alcun effetto sui controlli di tipo"
    ],
    indice_corretto: 0,
    suggerimento: "Il Type Narrowing permette a TypeScript di conoscere il tipo esatto dentro un blocco condizionale.",
    spiegazione: "Grazie al controllo typeof, TypeScript abilita i metodi delle stringhe (.toUpperCase()) solo nel ramo if."
  },
  {
    id: "ts-11",
    trackId: "typescript",
    capitolo: 4,
    argomento: "Intersection Types",
    difficolta: "difficile",
    domanda: "Quale tipo rappresenta l'unione di due interfacce con il simbolo &?",
    codice: "type Connesso = Persona & { token: string };",
    risposte: [
      "Un tipo che possiede tutte le proprietà di Persona E la proprietà token",
      "Un tipo che possiede o Persona o token",
      "Un errore di compilazione",
      "Un tipo con proprietà sovrascritte"
    ],
    indice_corretto: 0,
    suggerimento: "L'operatore & (Intersection) combina più tipi in un unico tipo risultante.",
    spiegazione: "L'intersezione (&) unisce i campi di Persona con { token: string } richiederà tutti i campi di entrambi."
  },

  // Capitolo 5: Generici (Generics)
  {
    id: "ts-12",
    trackId: "typescript",
    capitolo: 5,
    argomento: "Generics Base",
    difficolta: "difficile",
    domanda: "A cosa serve il parametro di tipo <T> in questa funzione?",
    codice: "function identita<T>(arg: T): T {\n  return arg;\n}",
    risposte: [
      "Permette alla funzione di accettare e restituire qualsiasi tipo mantenendo la corrispondenza dei tipi",
      "È una scorciatoia per sostituire T con 'any'",
      "Dichiara una variabile globale chiamata T",
      "Limita la funzione ai soli tipi numerici"
    ],
    indice_corretto: 0,
    suggerimento: "I Generics riutilizzano componenti preservando la type safety senza ricorrere ad 'any'.",
    spiegazione: "Se chiami identita<string>('test'), T diventa 'string' sia per l'argomento che per il ritorno."
  },
  {
    id: "ts-13",
    trackId: "typescript",
    capitolo: 5,
    argomento: "Generic Constraints (extends)",
    difficolta: "difficile",
    domanda: "Cosa indica la clausola 'extends { length: number }'?",
    codice: "function logLunghezza<T extends { length: number }>(arg: T): number {\n  return arg.length;\n}",
    risposte: [
      "T deve essere un tipo che possiede la proprietà 'length' numerica (es. string, array)",
      "T ereditera da una classe chiamata length",
      "La funzione funziona solo con numeri",
      "Senza extends l'argomento verrebbe convertito in stringa"
    ],
    indice_corretto: 0,
    suggerimento: "'extends' impone un vincolo (constraint) sul tipo generico.",
    spiegazione: "Il vincolo garantisce che qualsiasi tipo passato a T abbia la proprietà .length."
  },

  // Capitolo 6: Utility Types
  {
    id: "ts-14",
    trackId: "typescript",
    capitolo: 6,
    argomento: "Utility Type Partial",
    difficolta: "media",
    domanda: "Cosa fa l'Utility Type 'Partial<Utente>'?",
    codice: "interface Utente {\n  nome: string;\n  eta: number;\n}\ntype UtenteParziale = Partial<Utente>;",
    risposte: [
      "Rende tutti i campi dell'interfaccia Utente opzionali (?)",
      "Rende tutti i campi di Utente obbligatori",
      "Rende tutti i campi di Utente readonly",
      "Rimuove il primo campo dell'interfaccia"
    ],
    indice_corretto: 0,
    suggerimento: "Partial rende facoltative tutte le proprietà di un tipo.",
    spiegazione: "UtenteParziale equivale a { nome?: string; eta?: number; }."
  },
  {
    id: "ts-15",
    trackId: "typescript",
    capitolo: 6,
    argomento: "Utility Type Readonly",
    difficolta: "media",
    domanda: "Cosa comporta l'utilizzo di 'Readonly<T>'?",
    codice: "const config: Readonly<{ host: string }> = { host: 'localhost' };\nconfig.host = '127.0.0.1';",
    risposte: [
      "Errore di compilazione: Cannot assign to 'host' because it is a read-only property",
      "Funziona correttamente modificando la configurazione",
      "Il valore viene salvato in localStorage automaticamente",
      "L'oggetto viene congelato a runtime con Object.freeze"
    ],
    indice_corretto: 0,
    suggerimento: "Readonly vieta qualsiasi riassegnazione alle proprietà dell'oggetto.",
    spiegazione: "In TypeScript, Readonly<T> blocca le modifiche al momento della compilazione."
  },
  {
    id: "ts-16",
    trackId: "typescript",
    capitolo: 6,
    argomento: "Utility Type Pick & Omit",
    difficolta: "difficile",
    domanda: "Qual è la differenza tra Pick<T, K> e Omit<T, K>?",
    codice: "type SoloNome = Pick<Utente, 'nome'>;\ntype SenzaEmail = Omit<Utente, 'email'>;",
    risposte: [
      "Pick SELEZIONA solo le chiavi indicate; Omit ESCLUDE le chiavi indicate",
      "Pick converte in stringhe; Omit cancella il tipo",
      "Svolgono esattamente la stessa funzione",
      "Pick funziona solo sugli array; Omit sugli oggetti"
    ],
    indice_corretto: 0,
    suggerimento: "Pick = prendi solo queste; Omit = prendi tutte tranne queste.",
    spiegazione: "Pick costruisce un tipo estraendo K da T; Omit costruisce un tipo rimuovendo K da T."
  },

  // Capitolo 7: Enums & Unknown/Never
  {
    id: "ts-17",
    trackId: "typescript",
    capitolo: 7,
    argomento: "Enum in TypeScript",
    difficolta: "facile",
    domanda: "Qual è il valore predefinito del primo elemento in un Numeric Enum?",
    codice: "enum Ruolo {\n  Admin,\n  User,\n  Guest\n}\nconsole.log(Ruolo.Admin);",
    risposte: ["0", "1", "undefined", "'Admin'"],
    indice_corretto: 0,
    suggerimento: "Gli enum numerici contano da 0 se non specificato diversamente.",
    spiegazione: "In TypeScript gli enum numerici partono da 0. Ruolo.Admin è 0, Ruolo.User è 1, ecc."
  },
  {
    id: "ts-18",
    trackId: "typescript",
    capitolo: 7,
    argomento: "unknown vs any",
    difficolta: "difficile",
    domanda: "Perché è preferibile usare 'unknown' rispetto ad 'any'?",
    codice: "let dato: unknown = JSON.parse(str);\n// dato.metodo(); // Errore!\nif (typeof dato === 'string') console.log(dato.length);",
    risposte: [
      "unknown richiede un controllo di tipo prima di poter eseguire operazioni, prevenendo errori a runtime",
      "unknown è più veloce a runtime",
      "any non esiste più nelle versioni recenti di TypeScript",
      "unknown accetta solo valori nulli"
    ],
    indice_corretto: 0,
    suggerimento: "unknown è la variante 'type-safe' di any.",
    spiegazione: "Con unknown TypeScript ti costringe a fare Type Narrowing prima di accedere a metodi o proprietà."
  }
];

import { Concetto } from '../types';

export const CONCETTI_TYPESCRIPT: Concetto[] = [
  {
    nome: "ts_intro",
    trackId: "typescript",
    titolo: "Cos'è TypeScript",
    capitolo: 1,
    testo: "TypeScript è un superset con tipizzazione statica di JavaScript sviluppato da Microsoft. Tutto il codice JavaScript valido è anche codice TypeScript valido. Durante la compilazione, TypeScript rimuove tutte le annotazioni di tipo generando JavaScript puro per il browser o Node.js."
  },
  {
    nome: "ts_primitivi",
    trackId: "typescript",
    titolo: "Tipi Primitivi & Inferenza",
    capitolo: 1,
    testo: "I tipi primitivi principali sono string, number, boolean, null, undefined, e symbol. TypeScript è in grado di inferire automaticamente il tipo di una variabile dal valore assegnato inizialmente, eliminando la necessità di annotare sempre tutto."
  },
  {
    nome: "ts_interfacce",
    trackId: "typescript",
    titolo: "Interfacce (Interface)",
    capitolo: 2,
    testo: "Le interfacce definiscono la forma (shape) degli oggetti in TypeScript. Permettono di specificare quali proprietà devono essere presenti, quali sono opzionali (con ?) o in sola lettura (readonly). Le interfacce possono estendersi a vicenda con la parola chiave extends."
  },
  {
    nome: "ts_type_aliases",
    trackId: "typescript",
    titolo: "Type Aliases (type)",
    capitolo: 2,
    testo: "Un 'type' crea un nuovo nome per qualsiasi tipo, inclusi tipi primitivi, unioni (|), intersezioni (&) e tuple. A differenza delle interfacce, i tipi non possono essere riaperti per aggiungere nuovi campi (declaration merging)."
  },
  {
    nome: "ts_union_narrowing",
    trackId: "typescript",
    titolo: "Union Types & Type Narrowing",
    capitolo: 3,
    testo: "I tipi Union (|) consentono a un valore di essere uno tra più tipi (es: string | number). Il Type Narrowing è il processo con cui TypeScript stringe il tipo analizzando controlli condizionali come typeof, instanceof, 'in' oppure type guard personalizzate."
  },
  {
    nome: "ts_generics",
    trackId: "typescript",
    titolo: "Generici (Generics)",
    capitolo: 4,
    testo: "I Generici consentono di creare componenti, funzioni ed interfacce riutilizzabili che lavorano con una varietà di tipi senza perdere la Type Safety. Utilizzano parametri di tipo racchiusi tra parentesi angolari, come <T>."
  },
  {
    nome: "ts_utility_types",
    trackId: "typescript",
    titolo: "Utility Types",
    capitolo: 5,
    testo: "TypeScript fornisce strumenti integrati per la trasformazione dei tipi: Partial<T> (rende tutto opzionale), Required<T> (rende tutto obbligatorio), Readonly<T> (invariabile), Pick<T, K> (seleziona chiavi) e Omit<T, K> (rimuove chiavi)."
  },
  {
    nome: "ts_unknown_never",
    trackId: "typescript",
    titolo: "Unknown, Any & Never",
    capitolo: 6,
    testo: "any disabilita tutti i controlli di tipo (sconsigliato); unknown rappresenta qualsiasi valore ma richiede un type check prima dell'uso; never rappresenta il tipo di valori che non si verificano mai (es. funzioni che lanciano eccezioni o cicli infiniti)."
  }
];

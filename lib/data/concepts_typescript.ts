import { Concetto } from '../types';

export const CONCETTI_TYPESCRIPT: Concetto[] = [
  {
    nome: "ts_intro",
    trackId: "typescript",
    titolo: "Cos'è TypeScript",
    capitolo: 1,
    testo: "TypeScript è un superset con tipizzazione statica di JavaScript sviluppato da Microsoft. Tutto il codice JavaScript valido è anche codice TypeScript valido. Durante la compilazione, TypeScript rimuove tutte le annotazioni di tipo generando JavaScript puro per il browser o Node.js.",
    title_en: "What is TypeScript",
    text_en: "TypeScript is a statically typed superset of JavaScript developed by Microsoft. All valid JavaScript code is valid TypeScript code. During compilation, TypeScript strips type annotations to emit clean JavaScript for browsers or Node.js.",
    title_es: "¿Qué es TypeScript?",
    text_es: "TypeScript es un superset de JavaScript con tipado estático desarrollado por Microsoft. Todo código JS válido es también TypeScript válido. Al compilar, TypeScript elimina las anotaciones de tipo generando JavaScript puro."
  },
  {
    nome: "ts_primitivi",
    trackId: "typescript",
    titolo: "Tipi Primitivi & Inferenza",
    capitolo: 1,
    testo: "I tipi primitivi principali sono string, number, boolean, null, undefined, e symbol. TypeScript è in grado di inferire automaticamente il tipo di una variabile dal valore assegnato inizialmente, eliminando la necessità di annotare sempre tutto.",
    title_en: "Primitive Types & Type Inference",
    text_en: "The main primitive types are string, number, boolean, null, undefined, and symbol. TypeScript can infer a variable type automatically from its initial value.",
    title_es: "Tipos Primitivos e Inferencia",
    text_es: "Los tipos primitivos principales son string, number, boolean, null, undefined y symbol. TypeScript infiere automáticamente el tipo de una variable según su valor inicial."
  },
  {
    nome: "ts_interfacce",
    trackId: "typescript",
    titolo: "Interfacce (Interface)",
    capitolo: 2,
    testo: "Le interfacce definiscono la forma (shape) degli oggetti in TypeScript. Permettono di specificare quali proprietà devono essere presenti, quali sono opzionali (con ?) o in sola lettura (readonly). Le interfacce possono estendersi a vicenda con la parola chiave extends.",
    title_en: "Interfaces",
    text_en: "Interfaces define the shape of objects in TypeScript. They specify required, optional (?), or readonly properties and can be extended using the extends keyword.",
    title_es: "Interfaces",
    text_es: "Las interfaces definen la estructura de los objetos en TypeScript. Especifican propiedades obligatorias, opcionales (?) o de solo lectura (readonly) y se pueden extender con la palabra clave extends."
  },
  {
    nome: "ts_type_aliases",
    trackId: "typescript",
    titolo: "Type Aliases (type)",
    capitolo: 2,
    testo: "Un 'type' crea un nuovo nome per qualsiasi tipo, inclusi tipi primitivi, unioni (|), intersezioni (&) e tuple. A differenza delle interfacce, i tipi non possono essere riaperti per aggiungere nuovi campi (declaration merging).",
    title_en: "Type Aliases (type)",
    text_en: "A 'type' alias names any type, including primitives, unions (|), intersections (&), and tuples. Unlike interfaces, types cannot be reopened for declaration merging.",
    title_es: "Type Aliases (type)",
    text_es: "Un 'type' crea un nuevo nombre para cualquier tipo, incluidos primitivos, uniones (|), intersecciones (&) y tuplas."
  },
  {
    nome: "ts_union_narrowing",
    trackId: "typescript",
    titolo: "Union Types & Type Narrowing",
    capitolo: 3,
    testo: "I tipi Union (|) consentono a un valore di essere uno tra più tipi (es: string | number). Il Type Narrowing è il processo con cui TypeScript stringe il tipo analizzando controlli condizionali come typeof, instanceof, 'in' oppure type guard personalizzate.",
    title_en: "Union Types & Type Narrowing",
    text_en: "Union types (|) allow a value to be one of multiple types (e.g., string | number). Type Narrowing narrows down types using conditional checks like typeof or custom type guards.",
    title_es: "Union Types y Type Narrowing",
    text_es: "Los tipos Unión (|) permiten que un valor sea uno entre varios tipos. El Type Narrowing refina el tipo mediante comprobaciones condicionales como typeof o type guards."
  },
  {
    nome: "ts_generics",
    trackId: "typescript",
    titolo: "Generici (Generics)",
    capitolo: 4,
    testo: "I Generici consentono di creare componenti, funzioni ed interfacce riutilizzabili che lavoran con una varietà di tipi senza perdere la Type Safety. Utilizzano parametri di tipo racchiusi tra parentesi angolari, come <T>.",
    title_en: "Generics",
    text_en: "Generics allow creating reusable components, functions, and interfaces that work with a variety of types while preserving type safety using type parameters like <T>.",
    title_es: "Genéricos (Generics)",
    text_es: "Los Genéricos permiten crear componentes y funciones reutilizables que funcionan con múltiples tipos manteniendo la seguridad de tipos mediante parámetros como <T>."
  },
  {
    nome: "ts_utility_types",
    trackId: "typescript",
    titolo: "Utility Types",
    capitolo: 5,
    testo: "TypeScript fornisce strumenti integrati per la trasformazione dei tipi: Partial<T> (rende tutto opzionale), Required<T> (rende tutto obbligatorio), Readonly<T> (invariabile), Pick<T, K> (seleziona chiavi) e Omit<T, K> (rimuove chiavi).",
    title_en: "Utility Types",
    text_en: "TypeScript provides built-in utilities for type transformation: Partial<T>, Required<T>, Readonly<T>, Pick<T, K>, and Omit<T, K>.",
    title_es: "Tipos de Utilidad (Utility Types)",
    text_es: "TypeScript proporciona utilidades integradas para transformar tipos: Partial<T>, Required<T>, Readonly<T>, Pick<T, K> y Omit<T, K>."
  },
  {
    nome: "ts_unknown_never",
    trackId: "typescript",
    titolo: "Unknown, Any & Never",
    capitolo: 6,
    testo: "any disabilita tutti i controlli di tipo (sconsigliato); unknown rappresenta qualsiasi valore ma richiede un type check prima dell'uso; never rappresenta il tipo di valori che non si verificano mai (es. funzioni che lanciano eccezioni o cicli infiniti).",
    title_en: "Unknown, Any & Never",
    text_en: "any disables all type checks; unknown represents any value but requires type checking before use; never represents values that never occur.",
    title_es: "Unknown, Any y Never",
    text_es: "any deshabilita las verificaciones; unknown representa cualquier valor pero exige comprobación previa; never representa valores que nunca ocurren."
  }
];

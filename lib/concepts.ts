import { Concetto, TrackId, normalizeConcept } from './types';
import { CONCETTI_TYPESCRIPT } from './data/concepts_typescript';
import { CONCETTI_GIT } from './data/concepts_git';

export const CONCETTI_PYTHON: Concetto[] = [
  {
    nome: "programma",
    titolo: "Programma",
    capitolo: 1,
    testo: "Un programma è una sequenza di istruzioni che specifica come eseguire un calcolo. Il calcolo può essere matematico, simbolico o di elaborazione testo. I programmi sono scritti in un linguaggio di programmazione che il computer può interpretare.",
    title_en: "Program",
    text_en: "A program is a sequence of instructions specifying how to perform a computation (mathematical, symbolic, or text processing).",
    title_es: "Programa",
    text_es: "Un programa es una secuencia de instrucciones que especifica cómo realizar un cálculo matemático, simbólico o de procesamiento de texto."
  },
  {
    nome: "interprete",
    titolo: "Interprete Python",
    capitolo: 1,
    testo: "L'interprete Python è il programma che legge ed esegue il codice Python. Puoi usarlo in modalità interattiva (digitando comandi uno alla volta) o eseguendo script salvati in file con estensione .py",
    title_en: "Python Interpreter",
    text_en: "The Python interpreter reads and executes Python code interactively or from .py files.",
    title_es: "Intérprete de Python",
    text_es: "El intérprete de Python lee y ejecuta código de Python interactivamente o desde archivos .py."
  },
  {
    nome: "print",
    titolo: "Funzione print",
    capitolo: 1,
    testo: "print() è una funzione che visualizza output sullo schermo. Può stampare stringhe, numeri e altri valori. Esempio: print('Ciao mondo') visualizza Ciao mondo.",
    title_en: "print() Function",
    text_en: "print() outputs text, numbers, and variables to the screen.",
    title_es: "Función print()",
    text_es: "print() muestra texto, números y variables en la pantalla."
  },
  {
    nome: "variabile",
    titolo: "Variabile",
    capitolo: 2,
    testo: "Una variabile è un nome che si riferisce a un valore. È come un'etichetta che puoi attaccare a un dato per poterlo riutilizzare. Esempio: x = 5 crea una variabile x che contiene il valore 5.",
    title_en: "Variable",
    text_en: "A variable is a named reference that points to a stored value for reuse.",
    title_es: "Variable",
    text_es: "Una variable es un nombre de referencia que apunta a un valor almacenado."
  },
  {
    nome: "assegnazione",
    titolo: "Assegnazione",
    capitolo: 2,
    testo: "L'operatore = assegna un valore a una variabile. Non è un'uguaglianza matematica, ma un'istruzione che memorizza un valore. Esempio: nome = 'Mario' assegna la stringa 'Mario' alla variabile nome.",
    title_en: "Assignment",
    text_en: "The = operator assigns a value to a variable, storing it in memory.",
    title_es: "Asignación",
    text_es: "El operador = asigna un valor a una variable, guardándolo en memoria."
  },
  {
    nome: "tipo",
    titolo: "Tipo di dato",
    capitolo: 2,
    testo: "Ogni valore in Python ha un tipo che ne definisce le caratteristiche. I tipi principali sono: int (interi), float (decimali), str (stringhe), bool (booleani). Puoi usare type() per scoprire il tipo di un valore.",
    title_en: "Data Types",
    text_en: "Every Python value has a type (int, float, str, bool). Use type() to inspect types.",
    title_es: "Tipos de Datos",
    text_es: "Cada valor en Python tiene un tipo (int, float, str, bool). Usa type() para comprobarlo."
  },
  {
    nome: "intero",
    titolo: "Numero intero (int)",
    capitolo: 2,
    testo: "Gli interi sono numeri senza parte decimale, positivi o negativi. Esempi: 42, -7, 0. In Python gli interi possono essere arbitrariamente grandi.",
    title_en: "Integer (int)",
    text_en: "Integers are positive or negative numbers without a fractional part.",
    title_es: "Entero (int)",
    text_es: "Los enteros son números positivos o negativos sin parte decimal."
  },
  {
    nome: "float",
    titolo: "Numero decimale (float)",
    capitolo: 2,
    testo: "I float sono numeri con la virgola mobile (parte decimale). Esempi: 3.14, -0.5, 2.0. Attenzione: i float hanno precisione limitata.",
    title_en: "Floating Point (float)",
    text_en: "Floats are numbers with fractional decimal parts.",
    title_es: "Decimal (float)",
    text_es: "Los números float contienen parte decimal."
  },
  {
    nome: "stringa",
    titolo: "Stringa (str)",
    capitolo: 2,
    testo: "Una stringa è una sequenza di caratteri racchiusa tra virgolette. Puoi usare virgolette singole (' ') o doppie (\" \"). Esempio: 'Python' è una stringa di 6 caratteri.",
    title_en: "String (str)",
    text_en: "A string is a sequence of characters enclosed in single or double quotes.",
    title_es: "Cadena (str)",
    text_es: "Una cadena es una secuencia de caracteres entre comillas."
  },
  {
    nome: "booleano",
    titolo: "Booleano (bool)",
    capitolo: 2,
    testo: "I booleani rappresentano valori di verità: True (vero) o False (falso). Sono usati nelle condizioni e nei test logici.",
    title_en: "Boolean (bool)",
    text_en: "Booleans represent truth values: True or False.",
    title_es: "Booleano (bool)",
    text_es: "Los booleanos representan valores de verdad: True o False."
  },
  {
    nome: "operatore",
    titolo: "Operatore",
    capitolo: 2,
    testo: "Un operatore è un simbolo che esegue un'operazione su uno o più valori. Operatori aritmetici: + (addizione), - (sottrazione), * (moltiplicazione), / (divisione), // (divisione intera), % (resto), ** (potenza).",
    title_en: "Operators",
    text_en: "Operators perform mathematical or logical actions on values (+, -, *, /, //, %, **).",
    title_es: "Operadores",
    text_es: "Los operadores ejecutan acciones matemáticas o lógicas (+, -, *, /, //, %, **)."
  },
  {
    nome: "funzione",
    titolo: "Funzione",
    capitolo: 3,
    testo: "Una funzione è un blocco di codice riutilizzabile che esegue un compito specifico. Si definisce con def e si chiama usando il nome seguito da parentesi. Esempio: def saluta(): print('Ciao')",
    title_en: "Function",
    text_en: "A function is a reusable block of code defined with def that performs a specific task.",
    title_es: "Función",
    text_es: "Una función es un bloque de código reutilizable definido con def."
  },
  {
    nome: "parametro",
    titolo: "Parametro",
    capitolo: 3,
    testo: "Un parametro è una variabile elencata nella definizione di una funzione. Riceve il valore passato quando la funzione viene chiamata. Esempio: in def saluta(nome):, nome è un parametro.",
    title_en: "Parameter",
    text_en: "A parameter is a variable listed in a function definition receiving passed arguments.",
    title_es: "Parámetro",
    text_es: "Un parámetro es una variable definida en la firma de una función."
  },
  {
    nome: "valore_ritorno",
    titolo: "Valore di ritorno",
    capitolo: 3,
    testo: "Il valore di ritorno è il risultato prodotto da una funzione. Si specifica con l'istruzione return. Se non c'è return, la funzione restituisce None.",
    title_en: "Return Value",
    text_en: "The return value is the result output by a function using the return statement.",
    title_es: "Valor de Retorno",
    text_es: "El valor de retorno es el resultado devuelto por una función con return."
  },
  {
    nome: "condizione",
    titolo: "Condizione",
    capitolo: 5,
    testo: "Una condizione è un'espressione che valuta True o False. È usata nelle istruzioni if per decidere quale ramo eseguire. Esempio: x > 0 è una condizione.",
    title_en: "Condition",
    text_en: "A condition evaluates to True or False to control branching in if statements.",
    title_es: "Condición",
    text_es: "Una condición se evalúa como True o False para controlar declaraciones if."
  },
  {
    nome: "ciclo",
    titolo: "Ciclo (loop)",
    capitolo: 7,
    testo: "Un ciclo ripete un blocco di codice multiple volte. Python ha due tipi principali: while (ripete finché una condizione è vera) e for (itera su una sequenza).",
    title_en: "Loop",
    text_en: "A loop repeats a code block multiple times (for, while).",
    title_es: "Bucle (Loop)",
    text_es: "Un bucle repite un bloque de código varias veces (for, while)."
  },
  {
    nome: "lista",
    titolo: "Lista",
    capitolo: 10,
    testo: "Una lista è una sequenza ordinata e modificabile di elementi. Si crea con parentesi quadrate: [1, 2, 3]. Gli elementi sono accessibili tramite indice (partendo da 0).",
    title_en: "List",
    text_en: "A list is an ordered, mutable sequence of items created with brackets [].",
    title_es: "Lista",
    text_es: "Una lista es una secuencia ordenada y mutable de elementos entre corchetes []."
  },
  {
    nome: "dizionario",
    titolo: "Dizionario",
    capitolo: 11,
    testo: "Un dizionario è una collezione di coppie chiave-valore. Si crea con parentesi graffe: {'nome': 'Mario', 'età': 30}. Le chiavi devono essere immutabili.",
    title_en: "Dictionary",
    text_en: "A dictionary stores key-value pairs created with curly braces {}.",
    title_es: "Diccionario",
    text_es: "Un diccionario almacena pares clave-valor entre llaves {}."
  },
  {
    nome: "tupla",
    titolo: "Tupla",
    capitolo: 12,
    testo: "Una tupla è una sequenza ordinata e immutabile di elementi. Si crea con parentesi tonde: (1, 2, 3). Non può essere modificata dopo la creazione.",
    title_en: "Tuple",
    text_en: "A tuple is an ordered, immutable sequence of elements created with parentheses ().",
    title_es: "Tupla",
    text_es: "Una tupla es una secuencia ordenada e inmutable de elementos entre paréntesis ()."
  },
  {
    nome: "classe",
    titolo: "Classe e Oggetto",
    capitolo: 15,
    testo: "Una classe è un modello per creare oggetti. Definisce attributi e metodi comuni agli oggetti di quel tipo. Un oggetto è un'istanza di una classe. Si definisce con class NomeClasse:",
    title_en: "Class and Object",
    text_en: "A class is a blueprint for creating objects, defining attributes and methods.",
    title_es: "Clase y Objeto",
    text_es: "Una clase es una plantilla para crear objetos definiendo atributos y métodos."
  },
  {
    nome: "debug",
    titolo: "Debug ed Eccezioni",
    capitolo: 1,
    testo: "Il debug è il processo di individuazione e correzione degli errori nel codice (SyntaxError, NameError, TypeError, ecc.). In include leggere i messaggi di errore e ispezionare il flusso delle istruzioni.",
    title_en: "Debugging & Exceptions",
    text_en: "Debugging is finding and fixing errors (SyntaxError, NameError, TypeError) by reading tracebacks.",
    title_es: "Depuración y Excepciones",
    text_es: "Depurar es localizar y corregir errores leyendo mensajes de error en la consola."
  }
].map((c: any) => normalizeConcept({ ...c, trackId: c.trackId || 'python' }));

export const CONCETTI: Concetto[] = CONCETTI_PYTHON;

export function getConceptsForTrack(trackId: TrackId): Concetto[] {
  let list: Concetto[] = [];
  switch (trackId) {
    case 'typescript':
      list = CONCETTI_TYPESCRIPT;
      break;
    case 'git':
      list = CONCETTI_GIT;
      break;
    case 'python':
    default:
      list = CONCETTI_PYTHON;
      break;
  }
  return list.map((c) => normalizeConcept(c));
}

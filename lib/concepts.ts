import { Concetto, TrackId, normalizeConcept } from './types';
import { CONCETTI_TYPESCRIPT } from './data/concepts_typescript';
import { CONCETTI_GIT } from './data/concepts_git';

export const CONCETTI_PYTHON: Concetto[] = [
  {
    nome: "programma",
    titolo: "Programma",
    capitolo: 1,
    testo: "Un programma è una sequenza di istruzioni che specifica come eseguire un calcolo. Il calcolo può essere matematico, simbolico o di elaborazione testo. I programmi sono scritti in un linguaggio di programmazione che il computer può interpretare."
  },
  {
    nome: "interprete",
    titolo: "Interprete Python",
    capitolo: 1,
    testo: "L'interprete Python è il programma che legge ed esegue il codice Python. Puoi usarlo in modalità interattiva (digitando comandi uno alla volta) o eseguendo script salvati in file con estensione .py"
  },
  {
    nome: "print",
    titolo: "Funzione print",
    capitolo: 1,
    testo: "print() è una funzione che visualizza output sullo schermo. Può stampare stringhe, numeri e altri valori. Esempio: print('Ciao mondo') visualizza Ciao mondo."
  },
  {
    nome: "variabile",
    titolo: "Variabile",
    capitolo: 2,
    testo: "Una variabile è un nome che si riferisce a un valore. È come un'etichetta che puoi attaccare a un dato per poterlo riutilizzare. Esempio: x = 5 crea una variabile x che contiene il valore 5."
  },
  {
    nome: "assegnazione",
    titolo: "Assegnazione",
    capitolo: 2,
    testo: "L'operatore = assegna un valore a una variabile. Non è un'uguaglianza matematica, ma un'istruzione che memorizza un valore. Esempio: nome = 'Mario' assegna la stringa 'Mario' alla variabile nome."
  },
  {
    nome: "tipo",
    titolo: "Tipo di dato",
    capitolo: 2,
    testo: "Ogni valore in Python ha un tipo che ne definisce le caratteristiche. I tipi principali sono: int (interi), float (decimali), str (stringhe), bool (booleani). Puoi usare type() per scoprire il tipo di un valore."
  },
  {
    nome: "intero",
    titolo: "Numero intero (int)",
    capitolo: 2,
    testo: "Gli interi sono numeri senza parte decimale, positivi o negativi. Esempi: 42, -7, 0. In Python gli interi possono essere arbitrariamente grandi."
  },
  {
    nome: "float",
    titolo: "Numero decimale (float)",
    capitolo: 2,
    testo: "I float sono numeri con la virgola mobile (parte decimale). Esempi: 3.14, -0.5, 2.0. Attenzione: i float hanno precisione limitata."
  },
  {
    nome: "stringa",
    titolo: "Stringa (str)",
    capitolo: 2,
    testo: "Una stringa è una sequenza di caratteri racchiusa tra virgolette. Puoi usare virgolette singole (' ') o doppie (\" \"). Esempio: 'Python' è una stringa di 6 caratteri."
  },
  {
    nome: "booleano",
    titolo: "Booleano (bool)",
    capitolo: 2,
    testo: "I booleani rappresentano valori di verità: True (vero) o False (falso). Sono usati nelle condizioni e nei test logici."
  },
  {
    nome: "operatore",
    titolo: "Operatore",
    capitolo: 2,
    testo: "Un operatore è un simbolo che esegue un'operazione su uno o più valori. Operatori aritmetici: + (addizione), - (sottrazione), * (moltiplicazione), / (divisione), // (divisione intera), % (resto), ** (potenza)."
  },
  {
    nome: "funzione",
    titolo: "Funzione",
    capitolo: 3,
    testo: "Una funzione è un blocco di codice riutilizzabile che esegue un compito specifico. Si definisce con def e si chiama usando il nome seguito da parentesi. Esempio: def saluta(): print('Ciao')"
  },
  {
    nome: "parametro",
    titolo: "Parametro",
    capitolo: 3,
    testo: "Un parametro è una variabile elencata nella definizione di una funzione. Riceve il valore passato quando la funzione viene chiamata. Esempio: in def saluta(nome):, nome è un parametro."
  },
  {
    nome: "valore_ritorno",
    titolo: "Valore di ritorno",
    capitolo: 3,
    testo: "Il valore di ritorno è il risultato prodotto da una funzione. Si specifica con l'istruzione return. Se non c'è return, la funzione restituisce None."
  },
  {
    nome: "condizione",
    titolo: "Condizione",
    capitolo: 5,
    testo: "Una condizione è un'espressione che valuta True o False. È usata nelle istruzioni if per decidere quale ramo eseguire. Esempio: x > 0 è una condizione."
  },
  {
    nome: "ciclo",
    titolo: "Ciclo (loop)",
    capitolo: 7,
    testo: "Un ciclo ripete un blocco di codice multiple volte. Python ha due tipi principali: while (ripete finché una condizione è vera) e for (itera su una sequenza)."
  },
  {
    nome: "lista",
    titolo: "Lista",
    capitolo: 10,
    testo: "Una lista è una sequenza ordinata e modificabile di elementi. Si crea con parentesi quadrate: [1, 2, 3]. Gli elementi sono accessibili tramite indice (partendo da 0)."
  },
  {
    nome: "dizionario",
    titolo: "Dizionario",
    capitolo: 11,
    testo: "Un dizionario è una collezione di coppie chiave-valore. Si crea con parentesi graffe: {'nome': 'Mario', 'età': 30}. Le chiavi devono essere immutabili."
  },
  {
    nome: "tupla",
    titolo: "Tupla",
    capitolo: 12,
    testo: "Una tupla è una sequenza ordinata e immutabile di elementi. Si crea con parentesi tonde: (1, 2, 3). Non può essere modificata dopo la creazione."
  },
  {
    nome: "classe",
    titolo: "Classe e Oggetto",
    capitolo: 15,
    testo: "Una classe è un modello per creare oggetti. Definisce attributi e metodi comuni agli oggetti di quel tipo. Un oggetto è un'istanza di una classe. Si definisce con class NomeClasse:"
  },
  {
    nome: "debug",
    titolo: "Debug ed Eccezioni",
    capitolo: 1,
    testo: "Il debug è il processo di individuazione e correzione degli errori nel codice (SyntaxError, NameError, TypeError, ecc.). In include leggere i messaggi di errore e ispezionare il flusso delle istruzioni."
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



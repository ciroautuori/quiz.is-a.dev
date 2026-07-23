import { Sfida, TrackId, normalizeChallenge } from './types';
import { INITIAL_TYPESCRIPT_CHALLENGES, INITIAL_GIT_CHALLENGES } from './content/initial_challenges';

export const SFIDE_PYTHON: Sfida[] = [
  // --- BASI (Capitoli 1-2) ---

  {
    id: "bas-01",
    capitolo: 1,
    argomento: "Print",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print('Ciao')",
    risposte: ["Ciao", "'Ciao'", "Niente", "Error"],
    indice_corretto: 0,
    suggerimento: "print mostra il testo a schermo senza le virgolette.",
    spiegazione: "La funzione print() stampa la stringa 'Ciao' senza gli apici."
  },
  {
    id: "bas-02",
    capitolo: 1,
    argomento: "Type int",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(type(5))",
    risposte: ["<class 'int'>", "<class 'float'>", "5", "Error"],
    indice_corretto: 0,
    suggerimento: "5 è un numero intero.",
    spiegazione: "type(5) restituisce la classe int degli interi."
  },
  {
    id: "bas-03",
    capitolo: 1,
    argomento: "Type float",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(type(2.5))",
    risposte: ["<class 'float'>", "<class 'int'>", "2.5", "Error"],
    indice_corretto: 0,
    suggerimento: "2.5 è un numero decimale.",
    spiegazione: "I numeri decimali in Python appartengono alla classe float."
  },
  {
    id: "bas-04",
    capitolo: 1,
    argomento: "Type str",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(type('hi'))",
    risposte: ["<class 'str'>", "<class 'int'>", "hi", "Error"],
    indice_corretto: 0,
    suggerimento: "I testi racchiusi da apici sono stringhe.",
    spiegazione: "Tra apici è un oggetto della classe str."
  },
  {
    id: "bas-05",
    capitolo: 2,
    argomento: "Variabile",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "x = 5\nprint(x)",
    risposte: ["5", "x", "Error", "Niente"],
    indice_corretto: 0,
    suggerimento: "x contiene il valore 5.",
    spiegazione: "print(x) valuta la variabile x e ne stampa il valore 5."
  },
  {
    id: "bas-06",
    capitolo: 2,
    argomento: "Addizione",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(2 + 3)",
    risposte: ["5", "23", "Error", "Niente"],
    indice_corretto: 0,
    suggerimento: "L'operatore + esegue la somma algebrica.",
    spiegazione: "2 + 3 equivale a 5."
  },
  {
    id: "bas-07",
    capitolo: 2,
    argomento: "Sottrazione",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(10 - 4)",
    risposte: ["6", "14", "-6", "Error"],
    indice_corretto: 0,
    suggerimento: "L'operatore - sottrae il secondo numero dal primo.",
    spiegazione: "10 - 4 = 6."
  },
  {
    id: "bas-08",
    capitolo: 2,
    argomento: "Moltiplicazione",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(3 * 4)",
    risposte: ["12", "7", "34", "Error"],
    indice_corretto: 0,
    suggerimento: "* è l'operatore di moltiplicazione.",
    spiegazione: "3 * 4 = 12."
  },
  {
    id: "bas-09",
    capitolo: 2,
    argomento: "Divisione",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(10 / 2)",
    risposte: ["5.0", "5", "2.5", "Error"],
    indice_corretto: 0,
    suggerimento: "La divisione / in Python 3 restituisce sempre un float.",
    spiegazione: "10 / 2 calcola la divisione floating point e restituisce 5.0."
  },
  {
    id: "bas-10",
    capitolo: 2,
    argomento: "Commento",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "# commento\nprint('OK')",
    risposte: ["OK", "# commento", "Niente", "Error"],
    indice_corretto: 0,
    suggerimento: "I commenti con # vengono ignorati dall'interprete.",
    spiegazione: "L'interprete ignora la riga del commento ed esegue solo print('OK')."
  },
  {
    id: "bas-11",
    capitolo: 1,
    argomento: "Booleano",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(True)",
    risposte: ["True", "1", "False", "Error"],
    indice_corretto: 0,
    suggerimento: "True si scrive con la T maiuscola.",
    spiegazione: "True è il valore booleano vero."
  },
  {
    id: "bas-12",
    capitolo: 1,
    argomento: "None",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(None)",
    risposte: ["None", "null", "vuoto", "Error"],
    indice_corretto: 0,
    suggerimento: "None rappresenta l'assenza di valore.",
    spiegazione: "None è un tipo speciale in Python usati per rappresentare il valore nullo."
  },
  {
    id: "bas-13",
    capitolo: 2,
    argomento: "Assegnazione",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "a = 1\na = 2\nprint(a)",
    risposte: ["2", "1", "Error", "Niente"],
    indice_corretto: 0,
    suggerimento: "La seconda assegnazione sovrascrive la prima.",
    spiegazione: "a riceve prima 1, poi viene riassegnata a 2."
  },
  {
    id: "bas-14",
    capitolo: 2,
    argomento: "Print multiplo",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "print(1, 2)",
    risposte: ["1 2", "1,2", "12", "Error"],
    indice_corretto: 0,
    suggerimento: "I valori passati a print() vengono separati da uno spazio.",
    spiegazione: "print separa gli argomenti con uno spazio di default."
  },

  // --- FUNZIONI E CONDIZIONI (Capitoli 3-5) ---
  {
    id: "funz_01",
    capitolo: 3,
    argomento: "Funzioni base",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "def saluta():\n    print('Ciao')\n\nsaluta()",
    risposte: ["Ciao", "Niente", "Errore", "None"],
    indice_corretto: 0,
    suggerimento: "Chiamare una funzione esegue il suo blocco di codice.",
    spiegazione: "Definire la funzione la dichiara, ma chiamarla con saluta() esegue print('Ciao')."
  },
  {
    id: "funz_02",
    capitolo: 3,
    argomento: "Parametri",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "def saluta(nome):\n    print('Ciao', nome)\n\nsaluta('Mario')",
    risposte: ["Ciao Mario", "Ciao nome", "Errore"],
    indice_corretto: 0,
    suggerimento: "Il parametro nome riceve la stringa 'Mario'.",
    spiegazione: "Il valore 'Mario' viene assegnato al parametro nome all'interno di saluta()."
  },
  {
    id: "funz_03",
    capitolo: 3,
    argomento: "Return",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "def somma(a, b):\n    return a + b\n\nprint(somma(2, 3))",
    risposte: ["5", "Niente", "Errore"],
    indice_corretto: 0,
    suggerimento: "return restituisce il valore calcolato all'esterno.",
    spiegazione: "La funzione somma(2, 3) restituisce 5, che viene poi stampato."
  },
  {
    id: "funz_04",
    capitolo: 3,
    argomento: "Funzioni vuote",
    difficolta: "facile",
    domanda: "Cosa restituisce questa funzione?",
    codice: "def stampa_e_torna():\n    print('Ciao')\n\nrisultato = stampa_e_torna()\nprint(risultato)",
    risposte: ["None", "Ciao", "Errore"],
    indice_corretto: 0,
    suggerimento: "Le funzioni senza un istruzione return esplicita restituiscono None.",
    spiegazione: "In Python, se non c'è un return esplicito, la funzione restituisce automaticamente None."
  },
  {
    id: "cond-01",
    capitolo: 5,
    argomento: "If vero",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "if True:\n    print('Sì')",
    risposte: ["Sì", "Niente", "True", "Error"],
    indice_corretto: 0,
    suggerimento: "La condizione è sempre True.",
    spiegazione: "Se la condizione è True, il blocco indentato dell'if viene eseguito."
  },
  {
    id: "funz_06",
    capitolo: 3,
    argomento: "Precedenza operatori in funzioni",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "def calcola(x, y, z):\n    return x + y * z\n\nprint(calcola(2, 3, 4))",
    risposte: ["14", "20", "24"],
    indice_corretto: 0,
    suggerimento: "Ricorda la precedenza della moltiplicazione sulla somma.",
    spiegazione: "3 * 4 fa 12, e 2 + 12 fa 14."
  },
  {
    id: "funz_07",
    capitolo: 3,
    argomento: "Scope delle variabili",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "x = 10\n\ndef modifica():\n    x = 5\n    print(x, end=' ')\n\nmodifica()\nprint(x)",
    risposte: ["5 10", "5 5", "10 10"],
    indice_corretto: 0,
    suggerimento: "La variabile x dentro la funzione è una variabile locale.",
    spiegazione: "x dentro modifica() è locale e non sovrascrive la x globale. Stampa prima 5 e poi 10."
  },
  {
    id: "funz_08",
    capitolo: 3,
    argomento: "Return multiplo (Tupla)",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "def coord():\n    return 10, 20\n\nx, y = coord()\nprint(x + y)",
    risposte: ["30", "10, 20", "Errore"],
    indice_corretto: 0,
    suggerimento: "Return 10, 20 restituisce una tupla scompattata in x e y.",
    spiegazione: "coord() restituisce (10, 20), x diventa 10 e y 20, quindi x + y = 30."
  },
  {
    id: "cond-05",
    capitolo: 5,
    argomento: "Elif",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "x = 5\nif x > 10:\n    print('A')\nelif x > 3:\n    print('B')\nelse:\n    print('C')",
    risposte: ["B", "A", "C", "Niente"],
    indice_corretto: 0,
    suggerimento: "Valuta le condizioni in ordine sequenziale.",
    spiegazione: "5 non è > 10, ma 5 > 3 è True, quindi stampa 'B'."
  },
  {
    id: "cond-06",
    capitolo: 5,
    argomento: "Operatori logici",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "a = True\nb = False\nprint(a and b, a or b)",
    risposte: ["False True", "True False", "True True", "False False"],
    indice_corretto: 0,
    suggerimento: "and richiede entrambi True; or richiede che almeno uno sia True.",
    spiegazione: "True and False è False, mentre True or False è True."
  },

  // --- CICLI E STRINGHE (Capitoli 7-8) ---
  {
    id: "cicli_01",
    capitolo: 7,
    argomento: "Ciclo while",
    difficolta: "facile",
    domanda: "Quante volte viene stampato 'Ciao'?",
    codice: "i = 0\nwhile i < 3:\n    print('Ciao')\n    i += 1",
    risposte: ["3", "2", "4"],
    indice_corretto: 0,
    suggerimento: "i assume i valori 0, 1 e 2.",
    spiegazione: "Il ciclo itera con i=0, i=1 e i=2, quindi esattamente 3 volte."
  },
  {
    id: "cicli_02",
    capitolo: 7,
    argomento: "For con range",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "for i in range(3):\n    print(i, end=' ')",
    risposte: ["0 1 2", "1 2 3", "0 1 2 3"],
    indice_corretto: 0,
    suggerimento: "range(3) genera numeri da 0 fino a 2 (escluso il 3).",
    spiegazione: "range(3) produce i valori 0, 1, 2."
  },
  {
    id: "cicli_04",
    capitolo: 7,
    argomento: "Break nei cicli",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "for i in range(5):\n    if i == 2:\n        break\n    print(i, end=' ')",
    risposte: ["0 1", "0 1 2", "0 1 2 3 4"],
    indice_corretto: 0,
    suggerimento: "break interrompe immediatamente l'esecuzione del ciclo.",
    spiegazione: "Quando i vale 2, la condizione i==2 scatta ed esegue break, interrompendo il ciclo."
  },
  {
    id: "str_01",
    capitolo: 8,
    argomento: "Lunghezza stringa",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "print(len('Python'))",
    risposte: ["6", "5", "7"],
    indice_corretto: 0,
    suggerimento: "len() conta il numero di caratteri.",
    spiegazione: "La parola 'Python' è composta da 6 caratteri."
  },
  {
    id: "str_02",
    capitolo: 8,
    argomento: "Indice e Slicing",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "s = 'Python'\nprint(s[1:4])",
    risposte: ["yth", "Pyt", "ytho"],
    indice_corretto: 0,
    suggerimento: "s[1:4] prende i caratteri dall'indice 1 all'indice 3.",
    spiegazione: "In 'Python', indice 1 è 'y', 2 è 't', 3 è 'h'. L'indice finale 4 è escluso."
  },
  {
    id: "str_03",
    capitolo: 8,
    argomento: "Immutabilità delle stringhe",
    difficolta: "difficile",
    domanda: "Cosa succede eseguendo questo codice?",
    codice: "s = 'Python'\ns[0] = 'p'",
    risposte: ["Errore TypeError", "s diventa 'python'", "Niente, funziona"],
    indice_corretto: 0,
    suggerimento: "Le stringhe in Python non sono modificabili in-place.",
    spiegazione: "Le stringhe sono immutabili in Python, quindi assegnare a un indice genera un TypeError."
  },

  // --- LISTE, DIZIONARI, TUPLE (Capitoli 10-12) ---
  {
    id: "liste_02",
    capitolo: 10,
    argomento: "Indice liste",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "numeri = [10, 20, 30]\nprint(numeri[1])",
    risposte: ["20", "10", "30"],
    indice_corretto: 0,
    suggerimento: "Gli indici delle liste partono da 0.",
    spiegazione: "numeri[0] è 10, numeri[1] è 20."
  },
  {
    id: "liste_04",
    capitolo: 10,
    argomento: "Metodo append",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "numeri = [1, 2]\nnumeri.append(3)\nprint(numeri)",
    risposte: ["[1, 2, 3]", "[1, 2]", "[3]"],
    indice_corretto: 0,
    suggerimento: "append aggiunge un elemento in coda alla lista.",
    spiegazione: "append(3) modifica la lista aggiungendo 3 alla fine."
  },
  {
    id: "liste_11",
    capitolo: 10,
    argomento: "Riferimenti e copie",
    difficolta: "difficile",
    domanda: "Cosa stampa questo codice?",
    codice: "a = [1, 2]\nb = a\nb.append(3)\nprint(a)",
    risposte: ["[1, 2, 3]", "[1, 2]", "Errore"],
    indice_corretto: 0,
    suggerimento: "L'assegnazione b = a copia il riferimento all'oggetto, non la lista.",
    spiegazione: "Sia a che b puntano alla stessa lista in memoria. Modificando b si modifica a."
  },
  {
    id: "diz_01",
    capitolo: 11,
    argomento: "Dizionari",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "persona = {'nome': 'Anna', 'eta': 25}\nprint(persona['nome'])",
    risposte: ["Anna", "nome", "25", "KeyError"],
    indice_corretto: 0,
    suggerimento: "L'accesso avviene tramite chiave tra parentesi quadre.",
    spiegazione: "persona['nome'] restituisce il valore associato alla chiave 'nome', ovvero 'Anna'."
  },
  {
    id: "diz_02",
    capitolo: 11,
    argomento: "Metodo get",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "diz = {'a': 1, 'b': 2}\nprint(diz.get('c', 0))",
    risposte: ["0", "None", "KeyError", "c"],
    indice_corretto: 0,
    suggerimento: "get(chiave, default) restituisce default se la chiave non esiste.",
    spiegazione: "La chiave 'c' non esiste nel dizionario, quindi get() restituisce il fallback 0."
  },
  {
    id: "tupla_01",
    capitolo: 12,
    argomento: "Immutabilità della tupla",
    difficolta: "difficile",
    domanda: "Cosa succede eseguendo questo codice?",
    codice: "t = (1, 2, 3)\nt[0] = 99",
    risposte: ["Errore TypeError", "t diventa (99, 2, 3)", "Niente, funziona"],
    indice_corretto: 0,
    suggerimento: "Le tuple sono sequenze immutabili.",
    spiegazione: "In Python le tuple non si possono modificare dopo la loro creazione."
  },

  // --- CLASSI, OGGETTI ED ERRORI (Capitoli 14-17) ---
  {
    id: "classi_03",
    capitolo: 15,
    argomento: "Metodo __init__",
    difficolta: "facile",
    domanda: "Cosa stampa questo codice?",
    codice: "class Saluto:\n    def __init__(self, nome):\n        self.nome = nome\n\ns = Saluto('Mario')\nprint(s.nome)",
    risposte: ["Mario", "Saluto", "Errore"],
    indice_corretto: 0,
    suggerimento: "__init__ è il costruttore della classe.",
    spiegazione: "__init__ assegna 'Mario' all'attributo self.nome dell'istanza s."
  },
  {
    id: "classi_06",
    capitolo: 16,
    argomento: "Ereditarietà",
    difficolta: "media",
    domanda: "Cosa stampa questo codice?",
    codice: "class Animale:\n    def verso(self):\n        return '...'\n\nclass Cane(Animale):\n    def verso(self):\n        return 'Bau!'\n\nc = Cane()\nprint(c.verso())",
    risposte: ["Bau!", "...", "Errore"],
    indice_corretto: 0,
    suggerimento: "Cane eredita da Animale e ridefinisce verso().",
    spiegazione: "La classe figlia Cane sovrascrive il metodo verso() del genitore."
  },
  {
    id: "errori_01",
    capitolo: 1,
    argomento: "SyntaxError",
    difficolta: "difficile",
    domanda: "Che errore produce questo codice?",
    codice: "if True\n    print('Ciao')",
    risposte: ["SyntaxError", "NameError", "IndentationError"],
    indice_corretto: 0,
    suggerimento: "Osserva la mancanza dei due punti dopo l'if.",
    spiegazione: "In Python le istruzioni condizionali richiedono i due punti (:) prima del blocco."
  },
  {
    id: "errori_06",
    capitolo: 1,
    argomento: "ZeroDivisionError",
    difficolta: "difficile",
    domanda: "Che errore produce questo codice?",
    codice: "10 / 0",
    risposte: ["ZeroDivisionError", "ValueError", "TypeError"],
    indice_corretto: 0,
    suggerimento: "Dividere per zero non è consentito in matematica né in Python.",
    spiegazione: "La divisione per zero solleva l'eccezione ZeroDivisionError."
  },
  {
    id: "errori_07",
    capitolo: 1,
    argomento: "AttributeError",
    difficolta: "difficile",
    domanda: "Che errore produce questo codice?",
    codice: "'ciao'.uppercase()",
    risposte: ["AttributeError", "NameError", "TypeError"],
    indice_corretto: 0,
    suggerimento: "Il metodo delle stringhe in Python si chiama upper(), non uppercase().",
    spiegazione: "Invocare un metodo o attributo inesistente genera un AttributeError."
  }
].map((s: any) => normalizeChallenge({ ...s, trackId: s.trackId || 'python' }));

// Backward compatibility export
export const TUTTE_LE_SFIDE: Sfida[] = SFIDE_PYTHON;

export function getQuestionsForTrack(trackId: TrackId): Sfida[] {
  let list: Sfida[] = [];
  switch (trackId) {
    case 'typescript':
      list = INITIAL_TYPESCRIPT_CHALLENGES;
      break;
    case 'git':
      list = INITIAL_GIT_CHALLENGES;
      break;
    case 'python':
    default:
      list = SFIDE_PYTHON;
      break;
  }
  return list.map((q) => normalizeChallenge(q));
}

export function getAllQuestions(): Sfida[] {
  return [...SFIDE_PYTHON, ...INITIAL_TYPESCRIPT_CHALLENGES, ...INITIAL_GIT_CHALLENGES].map((q) => normalizeChallenge(q));
}



import { TrackId } from './types';

export interface CheckpointQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  question_en?: string;
  options_en?: string[];
  explanation_en?: string;
  question_es?: string;
  options_es?: string[];
  explanation_es?: string;
}

export interface Lesson {
  id: string;
  trackId: TrackId;
  chapter: number;
  title: string;
  summary: string;
  theory: string;
  codeExample: string;
  sandboxInitialCode: string;
  sandboxExpectedOutput?: string;
  checkpointQuiz: CheckpointQuiz;
  title_en?: string;
  summary_en?: string;
  theory_en?: string;
  title_es?: string;
  summary_es?: string;
  theory_es?: string;
}

export const LESSONS: Lesson[] = [
  // --- PYTHON TRACK ---
  {
    id: "py-l01",
    trackId: "python",
    chapter: 1,
    title: "1. Introduzione a Python & print()",
    summary: "Impara cos'è Python, come funziona la funzione print() e come visualizzare testo a schermo.",
    theory: `### Cos'è Python?
Python è un linguaggio di programmazione ad alto livello, interpretato e leggibile.

### La funzione \`print()\`
In Python la funzione \`print()\` viene usata per mostrare testo, numeri ed espressioni a schermo:
\`\`\`python
print("Ciao sviluppatore!")
print(42)
\`\`\`
I testi (stringhe) devono essere racchiusi da virgolette doppie (\`"\`) o singole (\`'\`).`,
    codeExample: `print("Benvenuto in DevQuest Python!")\nprint(10 + 5)`,
    sandboxInitialCode: `print("Scrivi il tuo primo programma Python!")`,
    sandboxExpectedOutput: "Scrivi il tuo primo programma Python!",
    checkpointQuiz: {
      question: "Cosa fa la funzione print('Ciao') in Python?",
      options: [
        "Stampa Ciao a schermo senza apici",
        "Genera un errore di sintassi",
        "Crea una variabile chiamata Ciao",
        "Esegue un calcolo matematico"
      ],
      correctIndex: 0,
      explanation: "print() valuta l'argomento passato e lo mostra in console eliminando i delimitatori di stringa.",
      question_en: "What does print('Hello') do in Python?",
      options_en: ["Prints Hello to the screen without quotes", "Generates a syntax error", "Creates a variable named Hello", "Executes a math calculation"],
      explanation_en: "print() displays the string content on screen without quote characters."
    },
    title_en: "1. Python Intro & print()",
    summary_en: "Learn what Python is, how print() works, and how to output text.",
    title_es: "1. Introducción a Python y print()",
    summary_es: "Aprende qué es Python y cómo usar la función print() para mostrar texto."
  },
  {
    id: "py-l02",
    trackId: "python",
    chapter: 2,
    title: "2. Variabili & Tipi di Dato (int, float, str)",
    summary: "Scopri come memorizzare dati nelle variabili e identificare i tipi numerici e di testo.",
    theory: `### Cosa sono le variabili?
Una variabile è un contenitore con un nome per memorizzare un valore in memoria.

\`\`\`python
eta = 25          # int (intero)
prezzo = 19.99     # float (decimale)
nome = "Alice"     # str (stringa)
\`\`\`

Python determina automaticamente il tipo di dato (tipizzazione dinamica). Puoi controllare il tipo con \`type()\`:
\`\`\`python
print(type(eta))  # <class 'int'>
\`\`\``,
    codeExample: `nome = "DevQuest"\npunti = 100\nprint(nome, "ha un punteggio di:", punti)`,
    sandboxInitialCode: `score = 50\nprint("Il tuo score è:", score)`,
    checkpointQuiz: {
      question: "Qual è il tipo della variabile x = 3.14?",
      options: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'bool'>"],
      correctIndex: 0,
      explanation: "I numeri con la virgola (punto decimale) appartengono alla classe float in Python.",
      question_en: "What is the type of variable x = 3.14?",
      options_en: ["<class 'float'>", "<class 'int'>", "<class 'str'>", "<class 'bool'>"],
      explanation_en: "Numbers with a decimal point belong to the float class in Python."
    },
    title_en: "2. Variables & Data Types",
    summary_en: "Store data in variables and learn primitive data types.",
    title_es: "2. Variables y Tipos de Datos",
    summary_es: "Guarda datos en variables y conoce los tipos primitivos."
  },
  {
    id: "py-l03",
    trackId: "python",
    chapter: 3,
    title: "3. Funzioni con def e return",
    summary: "Crea blocchi di codice riutilizzabili definendo funzioni personalizzate con parametri.",
    theory: `### Definire una funzione
Le funzioni ti permettono di riutilizzare il codice senza ripeterlo. Si definiscono con la parola chiave \`def\`:

\`\`\`python
def calcola_area(base, altezza):
    area = base * altezza
    return area

risultato = calcola_area(5, 4)
print(risultato)  # 20
\`\`\`

Il comando \`return\` restituisce il risultato al chiamante.`,
    codeExample: `def saluta(nome):\n    return "Ciao, " + nome + "!"\n\nprint(saluta("Developer"))`,
    sandboxInitialCode: `def somma(a, b):\n    return a + b\n\nprint(somma(10, 20))`,
    checkpointQuiz: {
      question: "Quale parola chiave si usa per restituire un valore da una funzione?",
      options: ["return", "def", "yield", "output"],
      correctIndex: 0,
      explanation: "L'istruzione return restituisce il valore al chiamante e termina l'esecuzione della funzione.",
      question_en: "Which keyword is used to return a value from a function?",
      options_en: ["return", "def", "yield", "output"],
      explanation_en: "The return statement returns the result value to the caller."
    },
    title_en: "3. Functions with def & return",
    summary_en: "Write reusable code blocks using custom functions with parameters.",
    title_es: "3. Funciones con def y return",
    summary_es: "Crea bloques de código reutilizables con funciones y parámetros."
  },

  // --- TYPESCRIPT TRACK ---
  {
    id: "ts-l01",
    trackId: "typescript",
    chapter: 1,
    title: "1. Introduzione a TypeScript & Tipi Primitivi",
    summary: "Scopri come TypeScript aggiunge la tipizzazione statica a JavaScript.",
    theory: `### Perché usare TypeScript?
TypeScript rileva gli errori prima di eseguire il codice al momento della compilazione.

\`\`\`typescript
let username: string = "Coder";
let age: number = 28;
let isActive: boolean = true;
\`\`\`

Se provi ad assegnare un numero a una variabile dichiarata come \`string\`, TypeScript segnalerà immediatamente un errore!`,
    codeExample: `let trackName: string = "TypeScript Lab";\nlet completedModules: number = 4;\nconsole.log(trackName, completedModules);`,
    sandboxInitialCode: `let devName: string = "DevQuest User";\nconsole.log("Hello TS", devName);`,
    checkpointQuiz: {
      question: "Come si annota il tipo numero in TypeScript?",
      options: ["let x: number = 10;", "let x: int = 10;", "let number x = 10;", "let x = (number)10;"],
      correctIndex: 0,
      explanation: "In TypeScript il tipo numerico per interi e decimali si definisce con ': number'.",
      question_en: "How do you explicitly annotate a number in TypeScript?",
      options_en: ["let x: number = 10;", "let x: int = 10;", "let number x = 10;", "let x = (number)10;"],
      explanation_en: "In TypeScript, the numeric primitive type is annotated using ': number'."
    },
    title_en: "1. TypeScript Intro & Primitive Types",
    summary_en: "Discover static typing and primitive annotations in TypeScript.",
    title_es: "1. Introducción a TypeScript y Tipos Primitivos",
    summary_es: "Descubre el tipado estático y los tipos primitivos en TypeScript."
  },
  {
    id: "ts-l02",
    trackId: "typescript",
    chapter: 2,
    title: "2. Interfaces & Type Aliases",
    summary: "Impara a modellare la struttura degli oggetti con le interfacce e i type aliases.",
    theory: `### Interfacce vs Types
Le interfacce descrivono la forma (shape) di un oggetto:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  role?: string; // opzionale
}

const u: User = { id: 1, name: "Mario" };
\`\`\``,
    codeExample: `interface Challenge {\n  id: string;\n  score: number;\n}\n\nconst c: Challenge = { id: "ts-101", score: 50 };\nconsole.log(c.id);`,
    sandboxInitialCode: `interface Player {\n  name: string;\n  level: number;\n}\nconst p: Player = { name: "Alex", level: 5 };\nconsole.log(p.name, p.level);`,
    checkpointQuiz: {
      question: "Come si dichiara una proprietà opzionale in una interface TypeScript?",
      options: ["Con il punto interrogativo (es. email?: string)", "Con la parola opzionale", "Con null", "Con il simbolo !"],
      correctIndex: 0,
      explanation: "Il punto interrogativo (?) dopo il nome del campo indica che la proprietà può essere omessa.",
      question_en: "How do you define an optional property in a TypeScript interface?",
      options_en: ["With a question mark (e.g. email?: string)", "With optional keyword", "With null", "With ! symbol"],
      explanation_en: "A question mark (?) after the property name marks it as optional."
    },
    title_en: "2. Interfaces & Type Aliases",
    summary_en: "Model object shapes and types using interfaces.",
    title_es: "2. Interfaces y Type Aliases",
    summary_es: "Modela la estructura de objetos con interfaces y types."
  },

  // --- GIT TRACK ---
  {
    id: "git-l01",
    trackId: "git",
    chapter: 1,
    title: "1. Flusso di Lavoro Git: init, add & commit",
    summary: "Impara il tracciamento versione con le tre aree fondamentali di Git.",
    theory: `### I 3 stati di Git
1. **Working Directory**: dove modifichi i file.
2. **Staging Area (Index)**: dove prepari gli elementi da registrare con \`git add\`.
3. **Repository Locale**: dove i commit salvano permanentemente gli snapshot con \`git commit\`.

\`\`\`bash
git init
git add index.html
git commit -m "feat: primo commit di progetto"
\`\`\``,
    codeExample: `git init\ngit add .\ngit commit -m "initial commit"`,
    sandboxInitialCode: `echo "git commit -m 'feat: setup project'"`,
    checkpointQuiz: {
      question: "Quale comando aggiunge le modifiche della Working Directory alla Staging Area?",
      options: ["git add <file>", "git commit", "git push", "git init"],
      correctIndex: 0,
      explanation: "git add sposta le modifiche nello stage in preparazione al commit successivo.",
      question_en: "Which command moves changes from Working Directory to Staging Area?",
      options_en: ["git add <file>", "git commit", "git push", "git init"],
      explanation_en: "git add stages modified files for the upcoming commit."
    },
    title_en: "1. Git Workflow: init, add & commit",
    summary_en: "Master local version control with Working Directory, Staging, and Commits.",
    title_es: "1. Flujo de Trabajo Git: init, add y commit",
    summary_es: "Aprende las 3 áreas de Git: Working Directory, Staging y Repositorio."
  },

  // --- DOCKER TRACK ---
  {
    id: "docker-l01",
    trackId: "docker",
    chapter: 1,
    title: "1. Fondamenti di Docker & Containerization",
    summary: "Impara la differenza tra Macchine Virtuali e Container Docker.",
    theory: `### Cos'è Docker?
Docker impacchetta il codice e le sue dipendenze in un **container** leggero ed isolato che può essere eseguito ovunque.

### Comandi base per Container
\`\`\`bash
docker run -d -p 8080:80 --name webserver nginx
docker ps
docker stop webserver
\`\`\`
- \`-d\`: esegue in background (detached).
- \`-p 8080:80\`: mppa la porta 8080 dell'host alla porta 80 del container.`,
    codeExample: `FROM nginx:alpine\nCOPY . /usr/share/nginx/html\nEXPOSE 80`,
    sandboxInitialCode: `echo "docker run -d -p 8080:80 nginx:alpine"`,
    checkpointQuiz: {
      question: "Quale flag del comando docker run esegue il container in background?",
      options: ["-d", "-b", "-g", "--background"],
      correctIndex: 0,
      explanation: "Il flag -d (o --detach) esegue il container in sottofondo rilasciando il terminale.",
      question_en: "Which flag in docker run executes the container in detached background mode?",
      options_en: ["-d", "-b", "-g", "--background"],
      explanation_en: "The -d flag runs the container detached in the background."
    },
    title_en: "1. Docker Fundamentals & Containers",
    summary_en: "Understand lightweight containerization vs Virtual Machines.",
    title_es: "1. Fundamentos de Docker y Contenedores",
    summary_es: "Aprende la diferencia entre Máquinas Virtuales y Contenedores Docker."
  },

  // --- POSTGRESQL TRACK ---
  {
    id: "pg-l01",
    trackId: "postgres",
    chapter: 1,
    title: "1. PostgreSQL SQL: SELECT, WHERE & JOINs",
    summary: "Interroga database relazionali con clausole di filtraggio e giunzioni tra tabelle.",
    theory: `### Query SQL & JOIN
PostgreSQL è un potente RDBMS relazionale basato sullo standard SQL.

\`\`\`sql
SELECT u.name, o.total, o.created_at
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
ORDER BY o.created_at DESC;
\`\`\`

### Tipi di JOIN principali
- **INNER JOIN**: solo record presenti in entrambe le tabelle.
- **LEFT JOIN**: tutti i record della tabella di sinistra + corrispondenze di destra.`,
    codeExample: `SELECT id, name, email FROM users WHERE active = true ORDER BY name ASC;`,
    sandboxInitialCode: `SELECT * FROM developers WHERE skill = 'Full-Stack';`,
    checkpointQuiz: {
      question: "Quale tipo di JOIN include tutti i record della tabella di sinistra indipendentemente da quella di destra?",
      options: ["LEFT JOIN", "INNER JOIN", "CROSS JOIN", "RIGHT JOIN"],
      correctIndex: 0,
      explanation: "LEFT JOIN mantiene tutte le righe della tabella sinistra e popola con NULL le colonne di destra senza match.",
      question_en: "Which JOIN includes all rows from the left table regardless of matches on the right?",
      options_en: ["LEFT JOIN", "INNER JOIN", "CROSS JOIN", "RIGHT JOIN"],
      explanation_en: "LEFT JOIN retains all rows from the left table."
    },
    title_en: "1. PostgreSQL SQL: SELECT, WHERE & JOINs",
    summary_en: "Query relational databases with conditions and table joins.",
    title_es: "1. PostgreSQL SQL: SELECT, WHERE y JOINs",
    summary_es: "Consulta bases de datos relacionales con filtros y giunciones."
  }
];

export function getLessonsForTrack(trackId: TrackId): Lesson[] {
  return LESSONS.filter((l) => l.trackId === trackId);
}

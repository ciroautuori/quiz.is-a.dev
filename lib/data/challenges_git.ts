import { Sfida } from '../types';

export const SFIDE_GIT: Sfida[] = [
  // Capitolo 1: Inizializzazione & Staging Area
  {
    id: "git-01",
    trackId: "git",
    capitolo: 1,
    argomento: "Inizializzazione Repository",
    difficolta: "facile",
    domanda: "Quale comando inizializza un nuovo repository Git nella cartella corrente?",
    codice: "$ git init",
    risposte: ["git init", "git start", "git new", "git create"],
    indice_corretto: 0,
    suggerimento: "Inizializza una nuova sottocartella nascosta .git.",
    spiegazione: "'git init' crea il repository Git vuoto creando la directory nascosta '.git'."
  },
  {
    id: "git-02",
    trackId: "git",
    capitolo: 1,
    argomento: "Staging Area (git add)",
    difficolta: "facile",
    domanda: "Quale comando aggiunge tutti i file modificati e nuovi alla Staging Area?",
    codice: "$ git add .",
    risposte: ["git add .", "git stage all", "git commit -a", "git save"],
    indice_corretto: 0,
    suggerimento: "Il punto (.) rappresenta la directory corrente.",
    spiegazione: "'git add .' (o 'git add -A') sposta tutte le modifiche correnti nella staging area pronte per il commit."
  },
  {
    id: "git-03",
    trackId: "git",
    capitolo: 1,
    argomento: "Status & Stato dei File",
    difficolta: "facile",
    domanda: "Quale comando mostra lo stato dei file (untracked, modified, staged)?",
    codice: "$ git status",
    risposte: ["git status", "git check", "git info", "git log -s"],
    indice_corretto: 0,
    suggerimento: "Mostra sia la Staging Area sia la Working Directory.",
    spiegazione: "'git status' fornisce una panoramica istantanea del branch corrente e dello stato dei file."
  },
  {
    id: "git-04",
    trackId: "git",
    capitolo: 1,
    argomento: "Creazione Commit",
    difficolta: "facile",
    domanda: "Come si crea un commit specificando direttamente il messaggio dalla riga di comando?",
    codice: "$ git commit -m \"Fix bug login\"",
    risposte: ["git commit -m \"messaggio\"", "git commit \"messaggio\"", "git save -m \"messaggio\"", "git push -m \"messaggio\""],
    indice_corretto: 0,
    suggerimento: "Il flag -m sta per 'message'.",
    spiegazione: "'-m' permette di inserire il messaggio di commit direttamente senza aprire l'editor di testo."
  },

  // Capitolo 2: Storia, Log & Diff
  {
    id: "git-05",
    trackId: "git",
    capitolo: 2,
    argomento: "Cronologia Commit (git log)",
    difficolta: "facile",
    domanda: "Quale comando mostra la cronologia dei commit in forma compatta su una sola riga?",
    codice: "$ git log --oneline",
    risposte: ["git log --oneline", "git history --short", "git list --one", "git commits -s"],
    indice_corretto: 0,
    suggerimento: "Il flag si chiama --oneline.",
    spiegazione: "'git log --oneline' mostra l'hash abbreviato a 7 caratteri e il messaggio di ogni commit."
  },
  {
    id: "git-06",
    trackId: "git",
    capitolo: 2,
    argomento: "Confronto Modifiche (git diff)",
    difficolta: "media",
    domanda: "Come si visualizzano le modifiche tra le righe modificate nella Working Directory e la Staging Area?",
    codice: "$ git diff",
    risposte: ["git diff", "git compare", "git status --diff", "git log -p"],
    indice_corretto: 0,
    suggerimento: "Per vedere le modifiche già staged si usa invece 'git diff --staged'.",
    spiegazione: "'git diff' senza parametri mostra le differenze non ancora aggiunte alla staging area."
  },

  // Capitolo 3: Branching & Merging
  {
    id: "git-07",
    trackId: "git",
    capitolo: 3,
    argomento: "Creazione e Switch Branch",
    difficolta: "media",
    domanda: "Qual è il comando moderno per creare e posizionarsi immediatamente su un nuovo branch?",
    codice: "$ git switch -c feature/login\n# oppure: git checkout -b feature/login",
    risposte: ["git switch -c nome-branch", "git branch --goto nome-branch", "git create branch nome-branch", "git new-branch nome-branch"],
    indice_corretto: 0,
    suggerimento: "Nelle versioni recenti di Git, 'switch -c' ha sostituito 'checkout -b'.",
    spiegazione: "'git switch -c' (o 'git checkout -b') crea il branch specificato e sposta HEAD su di esso."
  },
  {
    id: "git-08",
    trackId: "git",
    capitolo: 3,
    argomento: "Merge di Branch",
    difficolta: "media",
    domanda: "Per unire il branch 'feature' nel branch 'main', su quale branch devi trovarti prima di lanciare 'git merge feature'?",
    codice: "$ git switch main\n$ git merge feature",
    risposte: ["main", "feature", "Su un qualsiasi branch terzo", "Non ha importanza"],
    indice_corretto: 0,
    suggerimento: "Il merge unisce il ramo target NEL ramo in cui ti trovi attualmente.",
    spiegazione: "Devi prima spostarti sul ramo di destinazione ('main') e poi eseguire 'git merge feature'."
  },
  {
    id: "git-09",
    trackId: "git",
    capitolo: 3,
    argomento: "Risoluzione Conflitti",
    difficolta: "media",
    domanda: "Cosa indicano i marcatori '<<<<<<< HEAD' durante un merge conflict?",
    codice: "<<<<<<< HEAD\n  const x = 10;\n=======\n  const x = 20;\n>>>>>>> feature",
    risposte: [
      "Le modifiche presenti nel ramo corrente (HEAD) prima del divisore =======",
      "Un errore critico di memoria di Git",
      "Le modifiche provenienti dal ramo da unire",
      "I file da eliminare"
    ],
    indice_corretto: 0,
    suggerimento: "HEAD indica sempre il punto in cui ti trovi ora.",
    spiegazione: "Tra '<<<<<<< HEAD' e '=======' ci sono le righe del tuo ramo corrente; dopo '=======' ci sono quelle del ramo in arrivo."
  },

  // Capitolo 4: Undo, Reset, Revert & Stash
  {
    id: "git-10",
    trackId: "git",
    capitolo: 4,
    argomento: "Stash delle Modifiche",
    difficolta: "media",
    domanda: "Quale comando salva temporaneamente le modifiche non completate pulendo la working directory?",
    codice: "$ git stash\n# ...cambi branch...\n$ git stash pop",
    risposte: ["git stash", "git save-temp", "git hide", "git pause"],
    indice_corretto: 0,
    suggerimento: "Salva le modifiche in una pila (stack) temporanea.",
    spiegazione: "'git stash' accantona le modifiche locali non committate. Puoi ripristinarle in seguito con 'git stash pop'."
  },
  {
    id: "git-11",
    trackId: "git",
    capitolo: 4,
    argomento: "Revert vs Reset",
    difficolta: "difficile",
    domanda: "Qual è la differenza fondamentale tra 'git revert' e 'git reset'?",
    codice: "$ git revert HEAD  # crea un NUOVO commit che annulla il precedente\n$ git reset --hard HEAD~1 # CANCELLA la storia dei commit",
    risposte: [
      "git revert crea un nuovo commit opposto per annullare; git reset sposta indietro il puntatore ridiscrivendo la storia",
      "git revert cancella i file dal disco; git reset li ripristina",
      "git revert funziona solo su GitHub; git reset solo in locale",
      "Sono comandi sinonimi"
    ],
    indice_corretto: 0,
    suggerimento: "'revert' è sicuro sui branch condivisi perché non distrugge la cronologia dei commit.",
    spiegazione: "'git revert' crea un commit trasparente che inverte i cambiamenti. 'git reset' riscrive la storia del branch."
  },

  // Capitolo 5: Remote Repositories & GitHub
  {
    id: "git-12",
    trackId: "git",
    capitolo: 5,
    argomento: "Remote Origin",
    difficolta: "facile",
    domanda: "Come si collega un repository locale a un server remoto su GitHub?",
    codice: "$ git remote add origin https://github.com/utente/repo.git",
    risposte: [
      "git remote add origin <URL>",
      "git connect origin <URL>",
      "git github link <URL>",
      "git push --set-remote <URL>"
    ],
    indice_corretto: 0,
    suggerimento: "Il nome convenzionale per il server remoto principale è 'origin'.",
    spiegazione: "'git remote add origin <URL>' associa l'alias 'origin' all'indirizzo remoto specificato."
  },
  {
    id: "git-13",
    trackId: "git",
    capitolo: 5,
    argomento: "Push & Tracking Branch",
    difficolta: "facile",
    domanda: "Quale flag in 'git push -u origin main' imposta il tracciamento predefinito per i push futuri?",
    codice: "$ git push -u origin main",
    risposte: ["-u (o --set-upstream)", "-f (force)", "-m (message)", "-a (all)"],
    indice_corretto: 0,
    suggerimento: "-u imposta l'upstream tracking del branch.",
    spiegazione: "Il flag -u collegare il branch locale al ramo remoto origin/main, consentendo di fare successivamente solo 'git push'."
  },
  {
    id: "git-14",
    trackId: "git",
    capitolo: 5,
    argomento: "Pull Requests (PR) & Fetch",
    difficolta: "media",
    domanda: "Qual è la differenza tra 'git fetch' e 'git pull'?",
    codice: "$ git fetch # scarica le info dal remoto senza modificare i file locali\n$ git pull  # fa git fetch + git merge",
    risposte: [
      "git fetch scarica le novità senza applicarle; git pull scarica ed esegue il merge automaticamente",
      "git fetch elimina i branch remoti inutilizzati",
      "git pull invia i file locali; git fetch li scarica",
      "Non c'è alcuna differenza"
    ],
    indice_corretto: 0,
    suggerimento: "git pull = git fetch + git merge.",
    spiegazione: "'git fetch' aggiorna i puntatori remoti in modo sicuro. 'git pull' scarica e fonde subito le modifiche nel branch attivo."
  },

  // Capitolo 6: Workflows Avanzati & Cherry Pick
  {
    id: "git-15",
    trackId: "git",
    capitolo: 6,
    argomento: "Cherry Pick",
    difficolta: "difficile",
    domanda: "A cosa serve il comando 'git cherry-pick <hash-commit>'?",
    codice: "$ git cherry-pick a1b2c3d",
    risposte: [
      "Applica le modifiche di un singolo commit specifico al branch corrente",
      "Cancella un commit errato dal repository",
      "Visualizza chi ha scritto un determinato commit",
      "Esegue il rebase di tutti i commit"
    ],
    indice_corretto: 0,
    suggerimento: "'Cogliere la ciliegina' significa prelevare un solo commit mirato.",
    spiegazione: "'git cherry-pick' copia e riapplica un commit prescelto da qualsiasi branch sul ramo corrente."
  }
];

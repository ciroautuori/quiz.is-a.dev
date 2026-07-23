import { Concetto } from '../types';

export const CONCETTI_GIT: Concetto[] = [
  {
    nome: "git_intro",
    trackId: "git",
    titolo: "Sistema di Controllo Versione Distribuito",
    capitolo: 1,
    testo: "Git è un sistema di controllo versione distribuito ideato da Linus Torvalds. A differenza dei sistemi centralizzati, ogni sviluppatore possiede sul proprio computer una copia locale completa di tutta la storia del repository."
  },
  {
    nome: "git_3_stati",
    trackId: "git",
    titolo: "I 3 Stati di Git: Working, Staging & Repository",
    capitolo: 1,
    testo: "I file in Git vivono in 3 sezioni principali: 1) Working Directory (dove modifichi i file), 2) Staging Area o Index (dove prepari le modifiche da committare con 'git add'), 3) Repository locale (dove le modifiche vengono registrate in modo permanente con 'git commit')."
  },
  {
    nome: "git_commit_hash",
    trackId: "git",
    titolo: "Commit, DAG e SHA-1 Hash",
    capitolo: 2,
    testo: "Ogni commit rappresenta uno snapshot dello stato dell'intero progetto in un determinato momento. Ogni commit viene identificato in modo univoco da un codice hash (SHA-1/SHA-256) a 40 caratteri e punta al commit precedente (parent)."
  },
  {
    nome: "git_branching",
    trackId: "git",
    titolo: "Branching Leggero",
    capitolo: 3,
    testo: "In Git, un 'branch' non è una copia pesante di file, ma un semplice puntatore mobile a un commit. Creare o cambiare branch con 'git switch' o 'git checkout' richiede pochissimi millisecondi."
  },
  {
    nome: "git_merge_rebase",
    trackId: "git",
    titolo: "Merge vs Rebase",
    capitolo: 4,
    testo: "Il 'Merge' unisce la storia di due rami creando un commit di unione trasparente; il 'Rebase' ri-applica i commit del tuo branch in cima ad un altro branch, mantenendo una storia lineare e pulita."
  },
  {
    nome: "git_github_pr",
    trackId: "git",
    titolo: "GitHub, Remote & Pull Request",
    capitolo: 5,
    testo: "GitHub è la piattaforma cloud che ospita repository Git remoti. Una Pull Request (PR) è una proposta di modifica inviata al repository principale, consentendo code review, discussione ed esecuzione di test automatici (CI/CD) prima dell'unione."
  }
];

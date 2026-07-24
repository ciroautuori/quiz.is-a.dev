import { Concetto } from '../types';

export const CONCETTI_GIT: Concetto[] = [
  {
    nome: "git_intro",
    trackId: "git",
    titolo: "Sistema di Controllo Versione Distribuito",
    capitolo: 1,
    testo: "Git è un sistema di controllo versione distribuito ideato da Linus Torvalds. A differenza dei sistemi centralizzati, ogni sviluppatore possiede sul proprio computer una copia locale completa di tutta la storia del repository.",
    title_en: "Distributed Version Control System",
    text_en: "Git is a distributed version control system created by Linus Torvalds. Unlike centralized systems, every developer holds a full local clone of the entire repository history.",
    title_es: "Sistema de Control de Versiones Distribuido",
    text_es: "Git es un sistema de control de versiones distribuido creado por Linus Torvalds. Cada desarrollador posee una copia local completa de todo el historial del repositorio."
  },
  {
    nome: "git_3_stati",
    trackId: "git",
    titolo: "I 3 Stati di Git: Working, Staging & Repository",
    capitolo: 1,
    testo: "I file in Git vivono in 3 sezioni principali: 1) Working Directory (dove modifichi i file), 2) Staging Area o Index (dove prepari le modifiche da committare con 'git add'), 3) Repository locale (dove le modifiche vengono registrate in modo permanente con 'git commit').",
    title_en: "The 3 States of Git: Working, Staging & Repository",
    text_en: "Files in Git reside in 3 main areas: 1) Working Directory (where you edit files), 2) Staging Area / Index (prepared with 'git add'), 3) Local Repository (permanently recorded with 'git commit').",
    title_es: "Los 3 Estados de Git: Working, Staging y Repositorio",
    text_es: "Los archivos en Git residen en 3 secciones: 1) Working Directory (donde modificas archivos), 2) Staging Area / Index (preparado con 'git add'), 3) Repositorio Local (guardado con 'git commit')."
  },
  {
    nome: "git_commit_hash",
    trackId: "git",
    titolo: "Commit, DAG e SHA-1 Hash",
    capitolo: 2,
    testo: "Ogni commit rappresenta uno snapshot dello stato dell'intero progetto in un determinato momento. Ogni commit viene identificato in modo univoco da un codice hash (SHA-1/SHA-256) a 40 caratteri e punta al commit precedente (parent).",
    title_en: "Commit, DAG & SHA-1 Hash",
    text_en: "Each commit represents a snapshot of the entire project at a given moment. Each commit is uniquely identified by a 40-character hash (SHA-1) pointing to its parent commit.",
    title_es: "Commit, DAG y Hash SHA-1",
    text_es: "Cada commit representa una instantánea del proyecto. Cada commit se identifica de forma única mediante un código hash (SHA-1) apuntando a su commit anterior."
  },
  {
    nome: "git_branching",
    trackId: "git",
    titolo: "Branching Leggero",
    capitolo: 3,
    testo: "In Git, un 'branch' non è una copia pesante di file, ma un semplice puntatore mobile a un commit. Creare o cambiare branch con 'git switch' o 'git checkout' richiede pochissimi millisecondi.",
    title_en: "Lightweight Branching",
    text_en: "In Git, a branch is not a heavy copy of files, but a simple lightweight pointer to a commit. Switching branches with 'git switch' or 'git checkout' takes milliseconds.",
    title_es: "Ramas Ligeras (Branching)",
    text_es: "En Git, una rama no es una copia pesada de archivos, sino un puntero ligero a un commit. Cambiar de rama con 'git switch' o 'git checkout' tarda solo milisegundos."
  },
  {
    nome: "git_merge_rebase",
    trackId: "git",
    titolo: "Merge vs Rebase",
    capitolo: 4,
    testo: "Il 'Merge' unisce la storia di due rami creando un commit di unione trasparente; il 'Rebase' ri-applica i commit del tuo branch in cima ad un altro branch, mantenendo una storia lineare e pulita.",
    title_en: "Merge vs Rebase",
    text_en: "Merge combines the history of two branches by creating a merge commit; Rebase reapplies commits on top of another branch to keep history clean and linear.",
    title_es: "Merge vs Rebase",
    text_es: "Merge combina la historia de dos ramas creando un commit de unión; Rebase vuelve a aplicar los commits sobre otra rama manteniendo un historial lineal y limpio."
  },
  {
    nome: "git_github_pr",
    trackId: "git",
    titolo: "GitHub, Remote & Pull Request",
    capitolo: 5,
    testo: "GitHub è la piattaforma cloud che ospita repository Git remoti. Una Pull Request (PR) è una proposta di modifica inviata al repository principale, consentendo code review, discussione ed esecuzione di test automatici (CI/CD) prima dell'unione.",
    title_en: "GitHub, Remotes & Pull Requests",
    text_en: "GitHub is the cloud platform hosting remote Git repositories. A Pull Request (PR) proposes changes to a repository, enabling code review and CI/CD before merging.",
    title_es: "GitHub, Remotos y Pull Requests",
    text_es: "GitHub es la plataforma en la nube para repositorios remotos. Una Pull Request (PR) propone cambios al repositorio permitiendo la revisión de código y CI/CD antes de fusionar."
  }
];

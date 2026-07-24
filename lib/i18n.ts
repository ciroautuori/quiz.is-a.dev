export type Language = 'it' | 'en' | 'es';

export interface Translations {
  // Navigation & General
  appName: string;
  appTagline: string;
  playTab: string;
  learnTab: string;
  leaderboardTab: string;
  customQuestionsTab: string;
  aiTutorBtn: string;
  languageSelect: string;

  // Track Selector
  trackSelectorTitle: string;
  tracksAvailable: string;
  selectedTrack: string;
  completed: string;

  // Game Mode
  streak: string;
  streakTitle: string;
  streakSubtitle: string;
  question: string;
  of: string;
  chapter: string;
  difficulty: string;
  hint: string;
  showHint: string;
  hideHint: string;
  explainWithAI: string;
  submitAnswer: string;
  nextQuestion: string;
  correctAnswer: string;
  wrongAnswer: string;
  explanation: string;
  score: string;
  accuracy: string;
  restartTrack: string;
  trackCompletedTitle: string;
  trackCompletedDesc: string;

  // Difficulties
  facile: string;
  media: string;
  difficile: string;

  // Learn Mode
  learnTitle: string;
  learnSubtitle: string;
  searchPlaceholder: string;
  allChapters: string;
  noConceptsFound: string;
  askAiAboutConcept: string;

  // Leaderboard
  leaderboardTitle: string;
  leaderboardSubtitle: string;
  rank: string;
  player: string;
  date: string;
  noScoresYet: string;

  // Custom Questions
  customTitle: string;
  customSubtitle: string;
  addQuestionBtn: string;
  formTitle: string;
  trackLabel: string;
  chapterLabel: string;
  topicLabel: string;
  difficultyLabel: string;
  questionTextLabel: string;
  codeSnippetLabel: string;
  optionsLabel: string;
  correctOptionIndex: string;
  hintLabel: string;
  explanationLabel: string;
  saveQuestion: string;
  cancel: string;
  formTitleShort: string;
  topicPlaceholder: string;
  questionPlaceholder: string;
  solutionExplanation: string;
  codeOptional: string;
  publishNewChallenge: string;
  answerOptions: string;
  optionN: string;

  // Achievements
  achievementsTitle: string;
  unlockedBadges: string;
  locked: string;
  unlockedAt: string;

  // AI Tutor Agent
  aiTutorTitle: string;
  aiTutorSubtitle: string;
  aiTutorPlaceholder: string;
  aiSend: string;
  aiSuggestedPrompts: string;
  aiExplainCode: string;
  aiGiveHint: string;
  aiBreakdownConcept: string;
  aiThinking: string;
  aiErrorNoKey: string;
  aiErrorGeneric: string;

  // PWA & Mobile Install
  installApp: string;
  pwaBannerTitle: string;
  pwaBannerDesc: string;
  pwaIosInstructions: string;
  installed: string;

  // Radar & Zen Mode
  radarTitle: string;
  radarSubtitle: string;
  radarShort: string;
  radarCompetency: string;
  levelMaster: string;
  levelSenior: string;
  levelIntermediate: string;
  levelNovice: string;
  zenMode: string;
  exitZenMode: string;
  exitZenModeKey: string;
  zenModeTooltip: string;

  // Auth & Footer
  signIn: string;
  signOut: string;
  signInWithGoogleHint: string;
  signedIn: string;
  footerTitle: string;
  footerSubtitle: string;

  // GitHub Sync
  githubSyncTitle: string;
  githubSyncSubtitle: string;
  connectGithub: string;
  connectedAs: string;
  disconnectGithub: string;
  pushToGithub: string;
  syncingWithGithub: string;
  syncSuccess: string;
  syncSuccessDesc: string;
  repoNameLabel: string;
  challengesToPush: string;
  noCompletedChallengesToSync: string;
  openRepository: string;
  githubOauthHint: string;

  // Daily Goal & Challenge Filter
  dailyGoalTitle: string;
  dailyGoalReached: string;
  streakDays: string;
  goalCompletedMsg: string;
  goalZeroMsg: string;
  goalProgressMsg: string;
  goalRemainingMsg: string;
  goalExtraPractice: string;
  quickChallengeBtn: string;
  selectDailyGoal: string;
  filterSectionTitle: string;
  filterSubtitle: string;
  difficultyLevel: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  mixed: string;
  allLevels: string;
  chapterFilterLabel: string;
  allChaptersOption: string;
  searchKeyword: string;
  searchPlaceholderFilter: string;
  sortChallenges: string;
  sortCapAsc: string;
  sortCapDesc: string;
  sortDiffAsc: string;
  sortDiffDesc: string;
  questionsCountLabel: string;
  challengesFound: string;
  startMatchBtn: string;
  skillTreeTab: string;
  wasmSandbox: string;
  leaguesStreaks: string;
  pvpDuels: string;
  skillTreeMap: string;
  aiQuestGen: string;
  communityHub: string;
  analyticsRadar: string;
  certificateModalBtn: string;

  // Learn Mode Sandbox & Checkpoint
  theoryExplanation: string;
  liveSandboxTitle: string;
  executing: string;
  runCode: string;
  sandboxPlaceholder: string;
  verifyAnswer: string;
  correctAnswerMsg: string;
  wrongAnswerMsg: string;
  weeklyLeaderboard: string;
  generateAiQuestNow: string;
  newBadgeUnlocked: string;
  days: string;
  // Achievements Modal
  achievementsSubtitle: string;
  totalProgress: string;
  unlocked: string;
  progress: string;
  ofBadge: string;
  close: string;
  // AI Quest Generator
  questTopicLabel: string;
  questTopicPlaceholder: string;
  generating: string;
  // AI Tutor TTS
  toggleTts: string;
  clearChat: string;
  zeroMsgs: string;
  // Analytics Dashboard
  analyticsTitle: string;
  analyticsSubtitle: string;
  noDataTitle: string;
  noDataDesc: string;
  avgSpeed: string;
  totalXp: string;
  solvedQuests: string;
  skillRadarBreakdown: string;
  masteryLevel: string;
  personalAdvice: string;
  adviceBody: string;
  // Competency Radar Labels
  compSyntax: string;
  compControlFlow: string;
  compFunctions: string;
  compDataStructures: string;
  compOop: string;
  compAsync: string;
  // Certificate
  certificateTitle: string;
  certificateSubtitle: string;
  certThisAttests: string;
  certEditName: string;
  certPassedText: string;
  certIssueDate: string;
  certFooter: string;
  printPdf: string;
  markdownCopied: string;
  certificateShareLinkedin: string;
  // Challenge Filter descriptions
  filterBeginnerDesc: string;
  filterIntermediateDesc: string;
  filterAdvancedDesc: string;
  filterMixedDesc: string;
  resetFilters: string;
  filteredPreview: string;
  noFilteredResults: string;
  questionsShort: string;
  allShort: string;
  noChallengesFound: string;
  // Classroom
  classroomTitle: string;
  exportCsv: string;
  totalStudents: string;
  avgProgress: string;
  assignments: string;
  student: string;
  progressHeatmap: string;
  grade: string;
  // Code Sandbox
  pyodideReady: string;
  loadingWasm: string;
  copied: string;
  copy: string;
  outputConsole: string;
  resetCode: string;
  clearOutput: string;
  executionInProgress: string;
  runCodeWasm: string;
  noOutput: string;
  executionError: string;
  consoleOutput: string;
  // Command Palette
  cmdSearchPlaceholder: string;
  cmdsNotFound: string;
  navigate: string;
  select: string;
  // Community Hub
  communityTitle: string;
  communitySubtitle: string;
  createChallenge: string;
  searchCommunity: string;
  author: string;
  creatorBadge: string;
  noChallengesCriteria: string;
  clone: string;
  playNow: string;
  publishChallenge: string;
  responseOptions: string;
  // Custom Questions
  customLabTitle: string;
  customLabSubtitle: string;
  languageTrack: string;
  chapterLabelShort: string;
  topicLabelShort: string;
  difficultyLabelShort: string;
  questionTextLabelShort: string;
  codeSnippetOptional: string;
  responseOptionsLabel: string;
  optionLetter: string;
  usefulHint: string;
  detailedExplanation: string;
  saveQuestionLabel: string;
  noCustomQuestions: string;
  // Daily Goal
  streakActive: string;
  goalLabel: string;
  hideNotification: string;
  chooseGoal: string;
  challengesPerDay: string;
  editDailyGoal: string;
  // Game Mode
  correctAnswers: string;
  saveScoreLabel: string;
  nicknamePlaceholder: string;
  save: string;
  scoreSaved: string;
  changeFilters: string;
  results: string;
  timerOn: string;
  timerOff: string;
  exit: string;
  record: string;
  // General Home
  devQuestHub: string;
  devPlatform: string;
  heroDescription: string;
  startQuickQuest: string;
  availableTracks: string;
  selectTechHubHint: string;
  questsShort: string;
  questsPerDay: string;
  enterHub: string;
  fullstackRadar: string;
  communityFeed: string;
  globalLeaderboard: string;
  // Leagues
  currentLeague: string;
  currentStreak: string;
  youPlayer: string;
  youShort: string;
  promotionRelegation: string;
  // Learn Mode
  lessonPath: string;
  interactiveModule: string;
  lessonIndex: string;
  codeExample: string;
  checkpointQuiz: string;
  chapterLabelLearn: string;
  interactiveLesson: string;
  completedStatus: string;
  learnProgress: string;
  learnLessons: string;
  // Mobile Nav
  selectTechHub: string;
  enterArrow: string;
  homeLabel: string;
  hubsLabel: string;
  aiTutorLabel: string;
  leaderboardLabel: string;
  settingsLabel: string;
  // Navbar
  badgesAchievements: string;
  aiTutorNav: string;
  streakTooltip: string;
  // PvP Duel
  pvpTitle: string;
  pvpSubtitle: string;
  arenaTitle: string;
  arenaDesc: string;
  roomCodePlaceholder: string;
  searchingMatch: string;
  findMatch: string;
  tempsRimasto: string;
  victory: string;
  defeat: string;
  victoryDesc: string;
  defeatDesc: string;
  backToLobby: string;
  // Settings
  settingsTools: string;
  customizeExperience: string;
  interfaceLanguage: string;
  syntaxTheme: string;
  themeMocha: string;
  themeLatte: string;
  change: string;
  soundEffects: string;
  muted: string;
  active: string;
  enable: string;
  mute: string;
  githubSyncShort: string;
  openGitHubSync: string;
  activeStreak: string;
  unlockedBadgesLabel: string;
  viewBadges: string;
  githubSyncDesc: string;
  // Sidebar
  fullstackHub: string;
  communityHome: string;
  techHubs: string;
  proBadge: string;
  toolsCommunity: string;
  aiTutorAgent: string;
  githubSyncNav: string;
  settingsNav: string;
  // Skill Tree
  skillTreeTitle: string;
  skillTreeSubtitle: string;
  noModulesAvailable: string;
  unableLoadSkillTree: string;
  moduleDetails: string;
  startExercises: string;
  // Tech Hub
  quickChallenge: string;
  askAiDevBot: string;
  overview: string;
  playChallengeTab: string;
  progressStatus: string;
  challengesShort: string;
  educationalRef: string;
  completeTheory: string;
  lessonsSandbox: string;
  exploreTheory: string;
  filterableQuizzes: string;
  configQuizzes: string;
  trackInfo: string;
  technology: string;
  sandboxLanguage: string;
  totalQuestions: string;
  // Variable Inspector
  varInspectorTitle: string;
  interactiveLabel: string;
  inspectMemory: string;
  resetStep: string;
  prevStep: string;
  nextStep: string;
  codeExecution: string;
  memoryVariables: string;
  noVariables: string;
  scopeLocal: string;
  frameStatus: string;
  // GitHub Sync
  connecting: string;
  syncError: string;
  errorAuth: string;
  errorPopup: string;
  errorServer: string;
  errorUnexpected: string;
  // PWA / WASM
  wasmSandboxReady: string;
  loadingWasmCore: string;
  // Achievements carry-over
  unlockedStatus: string;
  progressLabel: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  it: {
    appName: "DevQuest",
    appTagline: "Laboratorio Multi-Track per Sviluppatori",
    playTab: "Gioca & Sfida",
    learnTab: "Modalità Impara",
    leaderboardTab: "Classifica",
    customQuestionsTab: "Crea Sfida",
    aiTutorBtn: "AI Tutor Agent",
    languageSelect: "Lingua",

    trackSelectorTitle: "Seleziona Linguaggio / Tecnologia",
    tracksAvailable: "Tracciati Disponibili",
    selectedTrack: "Tracciato Attivo",
    completed: "Completato",

    streak: "Streak",
    streakTitle: "Giorni di fila!",
    streakSubtitle: "Continua ad allenarti ogni giorno per mantenere la serie vincente.",
    question: "Domanda",
    of: "di",
    chapter: "Capitolo",
    difficulty: "Difficoltà",
    hint: "Suggerimento",
    showHint: "Mostra Suggerimento",
    hideHint: "Nascondi Suggerimento",
    explainWithAI: "Chiedi Spiegazione all'AI",
    submitAnswer: "Conferma Risposta",
    nextQuestion: "Prossima Sfida",
    correctAnswer: "Risposta Corretta!",
    wrongAnswer: "Risposta Errata!",
    explanation: "Spiegazione",
    score: "Punteggio",
    accuracy: "Precisione",
    restartTrack: "Ricomincia Tracciato",
    trackCompletedTitle: "Complimenti! Tracciato Completato!",
    trackCompletedDesc: "Hai superato tutte le sfide di questo tracciato. Puoi ripassare o provare un altro tracciato!",

    facile: "Facile",
    media: "Media",
    difficile: "Difficile",

    learnTitle: "Modalità Impara",
    learnSubtitle: "Esplora i concetti chiave con schede teoriche e spiegazioni interattive",
    searchPlaceholder: "Cerca un concetto (es. tipo, funzione, commit)...",
    allChapters: "Tutti i Capitoli",
    noConceptsFound: "Nessun concetto trovato con i filtri correnti.",
    askAiAboutConcept: "Chiedi approfondimento all'AI",

    leaderboardTitle: "Classifica Migliori Punteggi",
    leaderboardSubtitle: "La hall of fame dei campioni di DevQuest",
    rank: "Posizione",
    player: "Giocatore",
    date: "Data",
    noScoresYet: "Nessun punteggio registrato finora. Gioca per entrare in classifica!",

    customTitle: "Crea le Tue Sfide",
    customSubtitle: "Aggiungi quiz personalizzati per te o da condividere con altri sviluppatori",
    addQuestionBtn: "Nuova Domanda",
    formTitle: "Aggiungi una nuova sfida personalizzata",
    trackLabel: "Tracciato / Tecnologia",
    chapterLabel: "Capitolo",
    topicLabel: "Argomento",
    difficultyLabel: "Difficoltà",
    questionTextLabel: "Testo della Domanda",
    codeSnippetLabel: "Codice di Esempio (Opzionale)",
    optionsLabel: "Opzioni di Risposta (4 scelte)",
    correctOptionIndex: "Indice Risposta Corretta (0 - 3)",
    hintLabel: "Suggerimento",
    explanationLabel: "Spiegazione della Soluzione",
    saveQuestion: "Salva Sfida",
    cancel: "Annulla",
    formTitleShort: "Aggiungi una Sfida",
    topicPlaceholder: "es. Funzioni, Interface, Commit",
    questionPlaceholder: "es. Cosa stampa questo codice Python?",
    solutionExplanation: "Spiegazione della soluzione",
    codeOptional: "Snippet di codice (opzionale)...",
    publishNewChallenge: "Pubblica Nuova Sfida Community",
    answerOptions: "Opzioni di Risposta:",
    optionN: "Opzione",

    achievementsTitle: "Badge e Traguardi Sbloccati",
    unlockedBadges: "Badge Sbloccati",
    locked: "Bloccato",
    unlockedAt: "Sbloccato il",

    aiTutorTitle: "DevBot • AI Tutor Assistant",
    aiTutorSubtitle: "Powered by Gemini 3.6 Flash - Il tuo mentore di programmazione personale",
    aiTutorPlaceholder: "Chiedi spiegazioni su un concetto, chiedi un indizio o fai una domanda di codice...",
    aiSend: "Invia",
    aiSuggestedPrompts: "Prompt veloci consigliati:",
    aiExplainCode: "Spiega questo codice passo per passo",
    aiGiveHint: "Dammi un indizio senza svelare la risposta",
    aiBreakdownConcept: "Spiegami il concetto fondamentale dietro questa domanda",
    aiThinking: "DevBot sta elaborando la risposta...",
    aiErrorNoKey: "Per utilizzare l'AI Tutor, imposta la chiave GEMINI_API_KEY nel menu Secrets o Impostazioni.",
    aiErrorGeneric: "Si è verificato un errore durante la comunicazione con l'AI Tutor.",

    installApp: "Installa App",
    pwaBannerTitle: "Installa DevQuest sul tuo dispositivo",
    pwaBannerDesc: "Accedi con un tocco dalla schermata Home, persino offline!",
    pwaIosInstructions: "Per installare su iOS: tocca il pulsante Condividi in Safari e seleziona 'Aggiungi alla schermata Home'.",
    installed: "App Installata!",

    radarTitle: "Mappa delle Competenze & Radar",
    radarSubtitle: "Analisi visiva della padronanza sui tracciati Python, TypeScript e Git",
    radarShort: "Python · TS · Git",
    radarCompetency: "Dev Competency Radar",
    levelMaster: "Maestro",
    levelSenior: "Senior",
    levelIntermediate: "Intermedio",
    levelNovice: "Novizio",
    zenMode: "Modalità Zen",
    exitZenMode: "Esci dalla Modalità Zen",
    exitZenModeKey: "Esci dalla Modalità Zen (Esc)",
    zenModeTooltip: "Nascondi distrazioni per concentrarti solo sulla scheda attiva",

    signIn: "Accedi",
    signOut: "Disconnetti",
    signInWithGoogleHint: "Accedi con Google per sincronizzare i tuoi progressi nel cloud",
    signedIn: "Accreditato",
    footerTitle: "DevQuest • Piattaforma Sviluppatori Multi-Tracciato",
    footerSubtitle: "Impara Python, TypeScript e Git / GitHub con tutoring AI interattivo",

    githubSyncTitle: "Sincronizza con GitHub",
    githubSyncSubtitle: "Connetti il tuo account GitHub via OAuth e pubblica le sfide completate come repository di codice",
    connectGithub: "Connetti Account GitHub",
    connectedAs: "Connesso come",
    disconnectGithub: "Disconnetti GitHub",
    pushToGithub: "Pubblica Repository GitHub",
    syncingWithGithub: "Sincronizzazione in corso...",
    syncSuccess: "Sincronizzazione Completata!",
    syncSuccessDesc: "Le tue sfide completate sono state pubblicate con successo su GitHub.",
    repoNameLabel: "Nome Repository GitHub",
    challengesToPush: "Sfide da sincronizzare",
    noCompletedChallengesToSync: "Completa almeno una sfida per poterla sincronizzare su GitHub!",
    openRepository: "Apri Repository GitHub",
    githubOauthHint: "Autenticazione sicura tramite OAuth ufficiale di GitHub. Nessuna password salvata.",

    dailyGoalTitle: "Obiettivo Giornaliero",
    dailyGoalReached: "Obiettivo Raggiunto! 🎉",
    streakDays: "giorni streak",
    goalCompletedMsg: "Complimenti! Hai completato le tue {goal} sfide giornaliere.",
    goalZeroMsg: "Non hai ancora completato nessuna sfida oggi!",
    goalProgressMsg: "Hai completato {count} su {goal} sfide oggi!",
    goalRemainingMsg: "Ti mancano ancora {count} domande per completare il tuo obiettivo.",
    goalExtraPractice: "Hai già mantenuto attiva la tua streak. Vuoi continuare a fare pratica?",
    quickChallengeBtn: "Sfida Veloce ({count} domande)",
    selectDailyGoal: "Scegli il tuo obiettivo giornaliero:",
    filterSectionTitle: "Filtra & Configura le Sfide",
    filterSubtitle: "Seleziona la difficoltà, gli argomenti e ordina i quesiti prima di giocare",
    difficultyLevel: "Livello di Difficoltà",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzato",
    mixed: "Miste",
    allLevels: "Tutti i Livelli",
    chapterFilterLabel: "Capitolo",
    allChaptersOption: "Tutti i Capitoli",
    searchKeyword: "Cerca per Parola Chiave",
    searchPlaceholderFilter: "es. print, list, dict, class...",
    sortChallenges: "Ordina Sfide",
    sortCapAsc: "Ordina per Capitolo (Crescente 1 → 15)",
    sortCapDesc: "Ordina per Capitolo (Decrescente 15 → 1)",
    sortDiffAsc: "Ordina per Difficoltà (Facile → Difficile)",
    sortDiffDesc: "Ordina per Difficoltà (Difficile → Facile)",
    questionsCountLabel: "Quante domande vuoi in questa sessione?",
    challengesFound: "Sfide Trovate:",
    startMatchBtn: "Inizia Partita con {count} Sfide Selezionate",
    skillTreeTab: "Competenze",
    wasmSandbox: "WASM Sandbox",
    leaguesStreaks: "Leghe & Streaks",
    pvpDuels: "Duelli PvP",
    skillTreeMap: "Mappa Competenze",
    aiQuestGen: "Generatore Quest AI",
    communityHub: "Community Hub",
    analyticsRadar: "Radar Analisi",
    certificateModalBtn: "Certificato ID",

    theoryExplanation: "Spiegazione Teorica",
    liveSandboxTitle: "Sandbox di Codice Live (Esegui e Sperimenta)",
    executing: "Esecuzione...",
    runCode: "Esegui Codice",
    sandboxPlaceholder: "Scrivi o modifica il codice qui...",
    verifyAnswer: "Verifica Risposta",
    correctAnswerMsg: "Risposta Esatta! Lezione Completata 🎉",
    wrongAnswerMsg: "Risposta Errata. Riprova!",
    weeklyLeaderboard: "Classifica Settimanale",
    generateAiQuestNow: "Genera Sfida AI Ora",
    newBadgeUnlocked: "Nuovo Badge Sbloccato!",
    days: "giorni",
    achievementsSubtitle: "Completa le sfide e mantieni la streak per sbloccare i badge",
    totalProgress: "Progresso Totale Medaglie: ",
    unlocked: "sbloccati",
    progress: "Progresso:",
    ofBadge: "di",
    close: "Chiudi",
    questTopicLabel: "Argomento Specifico o Punto Debole:",
    questTopicPlaceholder: "es. List Comprehension, Asyncio, Decoratori...",
    generating: "Generazione in corso...",
    toggleTts: "Attiva/Disattiva Lettura Vocale",
    clearChat: "Pulisci chat",
    zeroMsgs: "Nessun messaggio. Inizia a chattare con DevBot!",
    analyticsTitle: "Dashboard Analitica & Competence Radar",
    analyticsSubtitle: "Analisi delle prestazioni di codifica, accuratezza e punti di forza",
    noDataTitle: "Dati non disponibili",
    noDataDesc: "Gioca qualche partita per generare le tue statistiche.",
    avgSpeed: "Velocità Media",
    totalXp: "XP Totali",
    solvedQuests: "Sfide Risolte",
    skillRadarBreakdown: "Grafico Radar Competenze Per Dominio",
    masteryLevel: "Livello di Padroneggiamento",
    personalAdvice: "Consiglio Personalizzato dell'AI Tutor:",
    adviceBody: "Hai un'eccellente precisione nella sintassi base (92%), ma ti consigliamo di allenare maggiormente Async, Decoratori e OOP.",
    compSyntax: 'Sintassi & Tipi',
    compControlFlow: 'Controllo Flusso',
    compFunctions: 'Funzioni & Scope',
    compDataStructures: 'Strutture Dati',
    compOop: 'Programmazione OOP',
    compAsync: 'Async & Decoratori',
    certificateTitle: "Certificato Ufficiale di Maestria",
    certificateSubtitle: "Export Digital Badge e Verificabilità QR",
    certThisAttests: "Si attesta con la presente che",
    certEditName: "Clicca per modificare il tuo nome",
    certPassedText: "ha superato con successo il 100% delle sfide pratiche e dei test di sintassi nel percorso ufficiale:",
    certIssueDate: "Data Rilascio",
    certFooter: "Supporta l'esportazione in PDF, OpenBadge 2.0 e la condivisione social.",
    printPdf: "Stampa",
    markdownCopied: "Markdown copiata negli appunti! Incollala nel tuo README di GitHub.",
    certificateShareLinkedin: "Ho appena conseguito il Certificato Ufficiale {trackName} su DevQuest! ID verificato: {hash}",
    filterBeginnerDesc: "Sintassi base, tipi & print",
    filterIntermediateDesc: "Liste, cicli & funzioni",
    filterAdvancedDesc: "Dizionari, classi & errori",
    filterMixedDesc: "Mix casuale equilibrato",
    resetFilters: "Azzera Filtri",
    filteredPreview: "Anteprima sfide filtrate",
    noFilteredResults: "Nessuna sfida trovata con i filtri attuali. Prova a modificare le opzioni o azzerare la ricerca.",
    questionsShort: "Domande",
    allShort: "Tutte",
    noChallengesFound: "Nessuna Sfida Trovata",
    classroomTitle: "Portale Classe & Studenti",
    exportCsv: "Esporta CSV",
    totalStudents: "Studenti Totali",
    avgProgress: "Progresso Medio",
    assignments: "Compiti Completati",
    student: "Studente",
    progressHeatmap: "Mappa di Progresso",
    grade: "Voto",
    pyodideReady: "Pyodide WASM Ready",
    loadingWasm: "Loading WASM Core...",
    copied: "Copiato",
    copy: "Copia",
    outputConsole: "Output Console",
    resetCode: "Reset Codice",
    clearOutput: "Pulisci",
    executionInProgress: "Esecuzione in corso...",
    runCodeWasm: "Esegui Codice (WASM)",
    noOutput: "(Nessun output)",
    executionError: "Errore esecuzione",
    consoleOutput: "Output Console:",
    cmdSearchPlaceholder: "Cerca comandi o seleziona un'azione... (es. WASM, Skill Tree, Theme)",
    cmdsNotFound: "Nessun comando trovato per",
    navigate: "Naviga",
    select: "Seleziona",
    communityTitle: "Community Challenge Hub (UGC)",
    communitySubtitle: "Crea sfide, condividi test case con gli sviluppatori della community e vota i quiz più astuti!",
    createChallenge: "Crea Nuova Sfida",
    searchCommunity: "Cerca sfide create dalla community...",
    author: "Autore:",
    creatorBadge: "Creator Badge",
    noChallengesCriteria: "Non ci sono sfide che corrispondono ai tuoi criteri. Prova a creare una nuova sfida!",
    clone: "Clona",
    playNow: "Gioca Ora",
    publishChallenge: "Pubblica Nuova Sfida Community",
    responseOptions: "Opzioni di Risposta:",
    customLabTitle: "Laboratorio Domande Personalizzate",
    customLabSubtitle: "Crea le tue sfide Python e integrarle subito nel gioco",
    languageTrack: "Linguaggio / Tracciato",
    chapterLabelShort: "Capitolo",
    topicLabelShort: "Argomento",
    difficultyLabelShort: "Difficoltà",
    questionTextLabelShort: "Testo della Domanda",
    codeSnippetOptional: "Codice Python (opzionale)",
    responseOptionsLabel: "Opzioni di Risposta (seleziona quella corretta)",
    optionLetter: "Opzione",
    usefulHint: "Indizio utile",
    detailedExplanation: "Spiegazione dettagliata",
    saveQuestionLabel: "Salva Domanda",
    noCustomQuestions: "Nessuna domanda personalizzata creata. Clicca \"Nuova Domanda\" per aggiungere i tuoi quesiti Python!",
    streakActive: "Streak Attiva:",
    goalLabel: "Obiettivo:",
    hideNotification: "Nascondi Notifica",
    chooseGoal: "Scegli il tuo obiettivo giornaliero:",
    challengesPerDay: "sfide/giorno",
    editDailyGoal: "Modifica Obiettivo Giornaliero",
    correctAnswers: "Risposte Esatte",
    saveScoreLabel: "Salva il tuo punteggio in Classifica",
    nicknamePlaceholder: "Inserisci il tuo nome (es. Dev)",
    save: "Salva",
    scoreSaved: "Punteggio salvato con successo per",
    changeFilters: "Cambia Filtri",
    results: "Risultati",
    timerOn: "Timer ON",
    timerOff: "Timer OFF",
    exit: "Esci",
    record: "Rec:",
    devQuestHub: "DevQuest Full-Stack Hub 2026",
    devPlatform: "DevQuest • Developer Platform",
    heroDescription: "Padroneggia il Full-Stack moderno: Python, TypeScript, Git/GitHub, Docker e PostgreSQL. Impara con lezioni interattive, sandbox in-browser e sfide competitive!",
    startQuickQuest: "Inizia Sfida Rapida",
    availableTracks: "Tracciati Tecnici Disponibili (5)",
    selectTechHubHint: "Seleziona una tecnologia per entrare nell'Hub dedicato",
    questsShort: "Sfide",
    questsPerDay: "{count} sfide/giorno",
    enterHub: "Entra Hub",
    fullstackRadar: "Full-Stack Competency Radar",
    communityFeed: "Community Feed & Discussioni",
    globalLeaderboard: "Classifica Globale →",
    currentLeague: "Lega Corrente",
    currentStreak: "Serie Attuale",
    youPlayer: "Tu (Player)",
    youShort: "Tu",
    promotionRelegation: "Promozione: 500 XP | Retrocessione: < 100 XP",
    lessonPath: "Percorso Lezioni",
    interactiveModule: "Modulo di apprendimento interattivo basato su",
    lessonIndex: "Indice delle Lezioni",
    codeExample: "Esempio di Codice:",
    checkpointQuiz: "Quiz Checkpoint",
    chapterLabelLearn: "Capitolo",
    interactiveLesson: "Lezione Interattiva",
    completedStatus: "Completata",
    learnProgress: "Progresso",
    learnLessons: "Lezioni",
    selectTechHub: "Seleziona Tech Hub (5)",
    enterArrow: "Entra →",
    homeLabel: "Home",
    hubsLabel: "Hubs (5)",
    aiTutorLabel: "AI Tutor",
    leaderboardLabel: "Leaderboard",
    settingsLabel: "Settings",
    badgesAchievements: "Badge e Traguardi",
    aiTutorNav: "AI Tutor",
    streakTooltip: "Serie di giorni consecutivi",
    pvpTitle: "PvP Code Duels (1v1 Arena)",
    pvpSubtitle: "Sfida il Cyber-Bot a chi risolve prima il bug di codice!",
    arenaTitle: "Arena CyberDuel 1v1",
    arenaDesc: "Metti alla prova i tuoi riflessi di debugging. Rispondi più velocemente dell'avversario prima che scada il tempo!",
    roomCodePlaceholder: "Codice (vuoto per creare)",
    searchingMatch: "Ricerca in corso...",
    findMatch: "Trova Partita PvP ⚔️",
    tempsRimasto: "Tempo Rimasto:",
    victory: "VITTORIA SCHIACCIANTE!",
    defeat: "SCONFITTA IN ARENA!",
    victoryDesc: "Hai sconfitto il CyberBot guadagnando +100 XP e +25 Trofei per la tua Lega!",
    defeatDesc: "Il CyberBot ha avuto la meglio in questa tornata. Riprova e perfeziona la tua velocità!",
    backToLobby: "Torna in Lobby ⚔️",
    settingsTools: "Impostazioni & Strumenti",
    customizeExperience: "Personalizza la tua esperienza su DevQuest",
    interfaceLanguage: "Lingua Interfaccia / Language",
    syntaxTheme: "Tema Sintassi:",
    themeMocha: "Catppuccin Mocha (Scuro)",
    themeLatte: "Catppuccin Latte (Chiaro)",
    change: "Cambia",
    soundEffects: "Effetti Sonori:",
    muted: "Disattivati",
    active: "Attivi",
    enable: "Attiva",
    mute: "Disattiva",
    githubSyncShort: "Sincronizzazione GitHub",
    openGitHubSync: "Apri Sincronizzazione GitHub",
    activeStreak: "Streak Attiva:",
    unlockedBadgesLabel: "Badge Sbloccati:",
    viewBadges: "Vedi Badge",
    githubSyncDesc: "Pubblica le sfide completate direttamente sul tuo account GitHub tramite OAuth ufficiale.",
    fullstackHub: "Full-Stack Developer Hub",
    communityHome: "Community Home",
    techHubs: "Tech Hubs (5)",
    proBadge: "PRO",
    toolsCommunity: "Strumenti & Community",
    aiTutorAgent: "AI Tutor Agent",
    githubSyncNav: "GitHub Sync",
    settingsNav: "Impostazioni",
    skillTreeTitle: "Skill Tree ad Albero Nodale (Percorso RPG)",
    skillTreeSubtitle: "Visualizza i nodi di competenza, sblocca nuovi moduli e padroneggia la sintassi passo dopo passo.",
    noModulesAvailable: "Nessun modulo disponibile",
    unableLoadSkillTree: "Impossibile caricare l'albero delle competenze.",
    moduleDetails: "Dettagli Modulo: Capitolo",
    startExercises: "Avvia Esercizi Capitolo",
    quickChallenge: "Sfida Rapida",
    askAiDevBot: "Chiedi a DevBot IA",
    overview: "Panoramica",
    playChallengeTab: "Gioca & Sfida",
    progressStatus: "Stato di Avanzamento",
    challengesShort: "Sfide",
    educationalRef: "Riferimento didattico principale:",
    completeTheory: "Completa lezioni teoriche nella scheda Impara ed esegui checkpoint quiz per avanzare di livello.",
    lessonsSandbox: "Lezioni & Code Sandbox",
    exploreTheory: "Esplora la teoria passo-passo ed esegui codice reale in-browser.",
    filterableQuizzes: "Sfide Quiz Filtrabili",
    configQuizzes: "Configura sessioni di test per argomento e difficoltà per guadagnare XP.",
    trackInfo: "Info Tracciato",
    technology: "Tecnologia:",
    sandboxLanguage: "Linguaggio Sandbox:",
    totalQuestions: "Totale Domande:",
    varInspectorTitle: "Variable Inspector & Debugger Step-by-Step",
    interactiveLabel: "Interactive",
    inspectMemory: "Ispeziona lo stato della memoria e delle variabili ad ogni riga di codice",
    resetStep: "Reset al primo step",
    prevStep: "Passo Prev",
    nextStep: "Passo Succ",
    codeExecution: "Esecuzione Codice",
    memoryVariables: "Ispettore Memoria & Variabili",
    noVariables: "Nessuna variabile allocata a questo punto dell'esecuzione.",
    scopeLocal: "Scope: Local / Function",
    frameStatus: "Frame Status: Active",
    connecting: "Connessione in corso...",
    syncError: "Errore Sincronizzazione",
    errorAuth: "Abilita i popup per il sito per consentire l'autenticazione con GitHub.",
    errorPopup: "Impossibile contattare il server per l'autenticazione GitHub.",
    errorServer: "Configurazione GitHub OAuth mancante sul server.",
    errorUnexpected: "Errore imprevisto durante la sincronizzazione.",
    wasmSandboxReady: "Python 3.11 WASM",
    loadingWasmCore: "Loading WASM Core...",
    unlockedStatus: "Sbloccato",
    progressLabel: "Progresso:"
  },

  en: {
    appName: "DevQuest",
    appTagline: "Multi-Track Developer Lab",
    playTab: "Play & Challenge",
    learnTab: "Learn Mode",
    leaderboardTab: "Leaderboard",
    customQuestionsTab: "Create Challenge",
    aiTutorBtn: "AI Tutor Agent",
    languageSelect: "Language",

    trackSelectorTitle: "Select Language / Technology",
    tracksAvailable: "Available Tracks",
    selectedTrack: "Active Track",
    completed: "Completed",

    streak: "Streak",
    streakTitle: "Day Streak!",
    streakSubtitle: "Keep practicing daily to maintain your winning streak.",
    question: "Question",
    of: "of",
    chapter: "Chapter",
    difficulty: "Difficulty",
    hint: "Hint",
    showHint: "Show Hint",
    hideHint: "Hide Hint",
    explainWithAI: "Ask AI Explanation",
    submitAnswer: "Submit Answer",
    nextQuestion: "Next Challenge",
    correctAnswer: "Correct Answer!",
    wrongAnswer: "Incorrect Answer!",
    explanation: "Explanation",
    score: "Score",
    accuracy: "Accuracy",
    restartTrack: "Restart Track",
    trackCompletedTitle: "Congratulations! Track Completed!",
    trackCompletedDesc: "You passed all challenges in this track. Review concepts or explore another track!",

    facile: "Easy",
    media: "Medium",
    difficile: "Hard",

    learnTitle: "Learn Mode",
    learnSubtitle: "Explore key coding concepts with concise theory cards and interactive explanations",
    searchPlaceholder: "Search for a concept (e.g. type, function, commit)...",
    allChapters: "All Chapters",
    noConceptsFound: "No concepts matched your search.",
    askAiAboutConcept: "Ask AI to elaborate",

    leaderboardTitle: "Top Score Leaderboard",
    leaderboardSubtitle: "The DevQuest Hall of Fame",
    rank: "Rank",
    player: "Player",
    date: "Date",
    noScoresYet: "No scores recorded yet. Play a round to join the leaderboard!",

    customTitle: "Create Custom Challenges",
    customSubtitle: "Add custom quizzes for yourself or to share with other developers",
    addQuestionBtn: "New Question",
    formTitle: "Add a new custom challenge",
    trackLabel: "Track / Technology",
    chapterLabel: "Chapter",
    topicLabel: "Topic",
    difficultyLabel: "Difficulty",
    questionTextLabel: "Question Text",
    codeSnippetLabel: "Code Snippet (Optional)",
    optionsLabel: "Answer Choices (4 options)",
    correctOptionIndex: "Correct Option Index (0 - 3)",
    hintLabel: "Hint",
    explanationLabel: "Solution Explanation",
    saveQuestion: "Save Challenge",
    cancel: "Cancel",
    formTitleShort: "Add a Challenge",
    topicPlaceholder: "e.g. Functions, Interface, Commit",
    questionPlaceholder: "e.g. What does this Python code print?",
    solutionExplanation: "Solution Explanation",
    codeOptional: "Code snippet (optional)...",
    publishNewChallenge: "Publish New Community Challenge",
    answerOptions: "Answer Options:",
    optionN: "Option",

    achievementsTitle: "Badges & Achievements",
    unlockedBadges: "Unlocked Badges",
    locked: "Locked",
    unlockedAt: "Unlocked on",

    aiTutorTitle: "DevBot • AI Tutor Assistant",
    aiTutorSubtitle: "Powered by Gemini 3.6 Flash - Your personal coding mentor",
    aiTutorPlaceholder: "Ask for code explanations, request a hint, or ask a coding question...",
    aiSend: "Send",
    aiSuggestedPrompts: "Quick suggested prompts:",
    aiExplainCode: "Explain this code step-by-step",
    aiGiveHint: "Give me a hint without giving away the answer",
    aiBreakdownConcept: "Explain the core concept behind this question",
    aiThinking: "DevBot is thinking...",
    aiErrorNoKey: "To use the AI Tutor, configure GEMINI_API_KEY in the Secrets menu.",
    aiErrorGeneric: "An error occurred while communicating with the AI Tutor.",

    installApp: "Install App",
    pwaBannerTitle: "Install DevQuest on your device",
    pwaBannerDesc: "One-tap access directly from your Home screen, even offline!",
    pwaIosInstructions: "To install on iOS: tap the Share button in Safari and select 'Add to Home Screen'.",
    installed: "App Installed!",

    radarTitle: "Proficiency Radar Map",
    radarSubtitle: "Visual proficiency breakdown across Python, TypeScript & Git",
    radarShort: "Python · TS · Git",
    radarCompetency: "Dev Competency Radar",
    levelMaster: "Master",
    levelSenior: "Senior",
    levelIntermediate: "Intermediate",
    levelNovice: "Novice",
    zenMode: "Zen Mode",
    exitZenMode: "Exit Zen Mode",
    exitZenModeKey: "Exit Zen Mode (Esc)",
    zenModeTooltip: "Hide distractions to focus entirely on the active challenge card",

    signIn: "Sign In",
    signOut: "Sign Out",
    signInWithGoogleHint: "Sign in with Google to sync your progress to the cloud",
    signedIn: "Signed In",
    footerTitle: "DevQuest • Multi-Track Developer Platform",
    footerSubtitle: "Learn Python, TypeScript & Git / GitHub with interactive AI tutoring",

    githubSyncTitle: "Sync with GitHub",
    githubSyncSubtitle: "Connect your GitHub account via OAuth and push completed challenges as a code repository",
    connectGithub: "Connect GitHub Account",
    connectedAs: "Connected as",
    disconnectGithub: "Disconnect GitHub",
    pushToGithub: "Push to GitHub",
    syncingWithGithub: "Syncing with GitHub...",
    syncSuccess: "Sync Complete!",
    syncSuccessDesc: "Your completed challenges have been successfully pushed to GitHub.",
    repoNameLabel: "GitHub Repository Name",
    challengesToPush: "Challenges ready to sync",
    noCompletedChallengesToSync: "Complete at least one challenge to sync it to GitHub!",
    openRepository: "Open GitHub Repository",
    githubOauthHint: "Secure authentication via official GitHub OAuth. No passwords stored.",

    dailyGoalTitle: "Daily Goal",
    dailyGoalReached: "Goal Reached! 🎉",
    streakDays: "day streak",
    goalCompletedMsg: "Congrats! You completed your {goal} daily challenges.",
    goalZeroMsg: "You haven't completed any challenges today!",
    goalProgressMsg: "You completed {count} of {goal} challenges today!",
    goalRemainingMsg: "You still need {count} more questions to complete your goal.",
    goalExtraPractice: "You already kept your streak active. Want to keep practicing?",
    quickChallengeBtn: "Quick Challenge ({count} questions)",
    selectDailyGoal: "Choose your daily goal:",
    filterSectionTitle: "Filter & Configure Challenges",
    filterSubtitle: "Select difficulty, topics, and sort questions before playing",
    difficultyLevel: "Difficulty Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    mixed: "Mixed",
    allLevels: "All Levels",
    chapterFilterLabel: "Chapter",
    allChaptersOption: "All Chapters",
    searchKeyword: "Search by Keyword",
    searchPlaceholderFilter: "e.g., print, list, dict, class...",
    sortChallenges: "Sort Challenges",
    sortCapAsc: "Sort by Chapter (Ascending 1 → 15)",
    sortCapDesc: "Sort by Chapter (Descending 15 → 1)",
    sortDiffAsc: "Sort by Difficulty (Easy → Hard)",
    sortDiffDesc: "Sort by Difficulty (Hard → Easy)",
    questionsCountLabel: "How many questions do you want in this session?",
    challengesFound: "Challenges Found:",
    startMatchBtn: "Start Match with {count} Selected Challenges",
    skillTreeTab: "Skills",
    wasmSandbox: "WASM Sandbox",
    leaguesStreaks: "Leagues & Streaks",
    pvpDuels: "PvP Duels",
    skillTreeMap: "Skill Tree",
    aiQuestGen: "AI Quest Gen",
    communityHub: "Community Hub",
    analyticsRadar: "Analytics Radar",
    certificateModalBtn: "Certificate ID",

    theoryExplanation: "Theory Explanation",
    liveSandboxTitle: "Live Code Sandbox (Run & Experiment)",
    executing: "Executing...",
    runCode: "Run Code",
    sandboxPlaceholder: "Write or edit code here...",
    verifyAnswer: "Check Answer",
    correctAnswerMsg: "Correct Answer! Lesson Completed 🎉",
    wrongAnswerMsg: "Incorrect Answer. Try again!",
    weeklyLeaderboard: "Weekly Leaderboard",
    generateAiQuestNow: "Generate AI Quest Now",
    newBadgeUnlocked: "New Badge Unlocked!",
    days: "days",
    achievementsSubtitle: "Complete challenges and maintain your streak to unlock badges",
    totalProgress: "Total Badge Progress: ",
    unlocked: "unlocked",
    progress: "Progress:",
    ofBadge: "of",
    close: "Close",
    questTopicLabel: "Specific Topic or Weak Point:",
    questTopicPlaceholder: "e.g. List Comprehension, Asyncio, Decorators...",
    generating: "Generating...",
    toggleTts: "Toggle TTS",
    clearChat: "Clear chat",
    zeroMsgs: "No messages yet. Start chatting with DevBot!",
    analyticsTitle: "Analytics Dashboard & Competence Radar",
    analyticsSubtitle: "Analysis of coding performance, accuracy, and strengths",
    noDataTitle: "Data Not Available",
    noDataDesc: "Play a few challenges to generate your stats.",
    avgSpeed: "Avg Speed",
    totalXp: "Total XP",
    solvedQuests: "Solved Quests",
    skillRadarBreakdown: "Skill Radar Breakdown",
    masteryLevel: "Mastery Level",
    personalAdvice: "AI Tutor Personal Advice:",
    adviceBody: "You have excellent precision in basic syntax (92%), but we recommend practicing Async & Decorators and OOP topics.",
    compSyntax: 'Syntax & Types',
    compControlFlow: 'Control Flow',
    compFunctions: 'Functions & Scope',
    compDataStructures: 'Data Structures',
    compOop: 'OOP Programming',
    compAsync: 'Async & Decorators',
    certificateTitle: "Official Certificate of Mastery",
    certificateSubtitle: "Digital Badge Export & QR Verification",
    certThisAttests: "This is to certify that",
    certEditName: "Click to edit your name",
    certPassedText: "has successfully passed 100% of the practical challenges and syntax tests in the official track:",
    certIssueDate: "Issue Date",
    certFooter: "Supports PDF export, OpenBadge 2.0 and social sharing.",
    printPdf: "Print / PDF",
    markdownCopied: "Markdown copied to clipboard! Paste it into your GitHub README.",
    certificateShareLinkedin: "I just earned the Official {trackName} Certificate on DevQuest! Verified ID: {hash}",
    filterBeginnerDesc: "Basic syntax, types & print",
    filterIntermediateDesc: "Lists, loops & functions",
    filterAdvancedDesc: "Dictionaries, classes & errors",
    filterMixedDesc: "Balanced random mix",
    resetFilters: "Reset Filters",
    filteredPreview: "Filtered challenges preview",
    noFilteredResults: "No challenges found with current filters. Try changing options or resetting search.",
    questionsShort: "Questions",
    allShort: "All",
    noChallengesFound: "No Challenges Found",
    classroomTitle: "Classroom Portal",
    exportCsv: "Export CSV",
    totalStudents: "Total Students",
    avgProgress: "Avg Progress",
    assignments: "Assignments",
    student: "Student",
    progressHeatmap: "Progress Heatmap",
    grade: "Grade",
    pyodideReady: "Pyodide WASM Ready",
    loadingWasm: "Loading WASM Core...",
    copied: "Copied",
    copy: "Copy",
    outputConsole: "Output Console",
    resetCode: "Reset Code",
    clearOutput: "Clear",
    executionInProgress: "Running...",
    runCodeWasm: "Run Code (WASM)",
    noOutput: "(No output)",
    executionError: "Execution error",
    consoleOutput: "Console Output:",
    cmdSearchPlaceholder: "Search commands or select an action... (e.g. WASM, Skill Tree, Theme)",
    cmdsNotFound: "No commands found for",
    navigate: "Navigate",
    select: "Select",
    communityTitle: "Community Challenge Hub (UGC)",
    communitySubtitle: "Create challenges, share test cases with community developers and vote for the cleverest quizzes!",
    createChallenge: "Create New Challenge",
    searchCommunity: "Search community challenges...",
    author: "Author:",
    creatorBadge: "Creator Badge",
    noChallengesCriteria: "No challenges match your criteria. Try creating a new one!",
    clone: "Clone",
    playNow: "Play Now",
    publishChallenge: "Publish New Community Challenge",
    responseOptions: "Response Options:",
    customLabTitle: "Custom Questions Lab",
    customLabSubtitle: "Create your Python challenges and integrate them into the game",
    languageTrack: "Language / Track",
    chapterLabelShort: "Chapter",
    topicLabelShort: "Topic",
    difficultyLabelShort: "Difficulty",
    questionTextLabelShort: "Question Text",
    codeSnippetOptional: "Code Snippet (optional)",
    responseOptionsLabel: "Response Options (select the correct one)",
    optionLetter: "Option",
    usefulHint: "Useful hint",
    detailedExplanation: "Detailed explanation",
    saveQuestionLabel: "Save Question",
    noCustomQuestions: "No custom questions created. Click \"New Question\" to add your Python questions!",
    streakActive: "Active Streak:",
    goalLabel: "Goal:",
    hideNotification: "Hide Notification",
    chooseGoal: "Choose your daily goal:",
    challengesPerDay: "challenges/day",
    editDailyGoal: "Edit Daily Goal",
    correctAnswers: "Correct Answers",
    saveScoreLabel: "Save your score in Leaderboard",
    nicknamePlaceholder: "Enter your nickname (e.g. Dev)",
    save: "Save",
    scoreSaved: "Score saved successfully for",
    changeFilters: "Change Filters",
    results: "Results",
    timerOn: "Timer ON",
    timerOff: "Timer OFF",
    exit: "Exit",
    record: "Rec:",
    devQuestHub: "DevQuest Full-Stack Hub 2026",
    devPlatform: "DevQuest • Developer Platform",
    heroDescription: "Master modern full-stack development: Python, TypeScript, Git/GitHub, Docker, and PostgreSQL. Learn with interactive lessons, in-browser sandbox, and competitive challenges!",
    startQuickQuest: "Start Quick Quest",
    availableTracks: "Available Tech Tracks (5)",
    selectTechHubHint: "Select a technology to enter its dedicated Hub",
    questsShort: "Quests",
    questsPerDay: "{count} quests/day",
    enterHub: "Enter Hub",
    fullstackRadar: "Full-Stack Competency Radar",
    communityFeed: "Community Feed & Discussions",
    globalLeaderboard: "Global Leaderboard →",
    currentLeague: "Current League",
    currentStreak: "Current Streak",
    youPlayer: "You (Player)",
    youShort: "You",
    promotionRelegation: "Promotion: 500 XP | Relegation: < 100 XP",
    lessonPath: "Lesson Path",
    interactiveModule: "Interactive learning module based on",
    lessonIndex: "Lesson Index",
    codeExample: "Code Example:",
    checkpointQuiz: "Checkpoint Quiz",
    chapterLabelLearn: "Chapter",
    interactiveLesson: "Interactive Lesson",
    completedStatus: "Completed",
    learnProgress: "Progress",
    learnLessons: "Lessons",
    selectTechHub: "Select Tech Hub (5)",
    enterArrow: "Enter →",
    homeLabel: "Home",
    hubsLabel: "Hubs (5)",
    aiTutorLabel: "AI Tutor",
    leaderboardLabel: "Leaderboard",
    settingsLabel: "Settings",
    badgesAchievements: "Badges & Achievements",
    aiTutorNav: "AI Tutor",
    streakTooltip: "Consecutive days streak",
    pvpTitle: "PvP Code Duels (1v1 Arena)",
    pvpSubtitle: "Challenge the Cyber-Bot to see who debugs the fastest!",
    arenaTitle: "Arena CyberDuel 1v1",
    arenaDesc: "Test your debugging reflexes. Answer faster than your opponent before time runs out!",
    roomCodePlaceholder: "Room Code (leave empty to create)",
    searchingMatch: "Searching...",
    findMatch: "Find PvP Match ⚔️",
    tempsRimasto: "Time Remaining:",
    victory: "CRUSHING VICTORY!",
    defeat: "ARENA DEFEAT!",
    victoryDesc: "You defeated the CyberBot earning +100 XP and +25 Trophies for your League!",
    defeatDesc: "The CyberBot got the better of you this round. Try again and improve your speed!",
    backToLobby: "Back to Lobby ⚔️",
    settingsTools: "Settings & Tools",
    customizeExperience: "Customize your DevQuest experience",
    interfaceLanguage: "Interface Language",
    syntaxTheme: "Syntax Theme:",
    themeMocha: "Catppuccin Mocha (Dark)",
    themeLatte: "Catppuccin Latte (Light)",
    change: "Change",
    soundEffects: "Sound Effects:",
    muted: "Muted",
    active: "Active",
    enable: "Enable",
    mute: "Mute",
    githubSyncShort: "GitHub Sync",
    openGitHubSync: "Open GitHub Sync",
    activeStreak: "Active Streak:",
    unlockedBadgesLabel: "Unlocked Badges:",
    viewBadges: "View Badges",
    githubSyncDesc: "Publish completed challenges directly to your GitHub account via official OAuth.",
    fullstackHub: "Full-Stack Developer Hub",
    communityHome: "Community Home",
    techHubs: "Tech Hubs (5)",
    proBadge: "PRO",
    toolsCommunity: "Tools & Community",
    aiTutorAgent: "AI Tutor Agent",
    githubSyncNav: "GitHub Sync",
    settingsNav: "Settings",
    skillTreeTitle: "Nodal Skill Tree (RPG Path)",
    skillTreeSubtitle: "View competency nodes, unlock new modules and master syntax step by step.",
    noModulesAvailable: "No Modules Available",
    unableLoadSkillTree: "Unable to load skill tree.",
    moduleDetails: "Module Details: Chapter",
    startExercises: "Start Chapter Exercises",
    quickChallenge: "Quick Challenge",
    askAiDevBot: "Ask AI DevBot",
    overview: "Overview",
    playChallengeTab: "Play & Challenge",
    progressStatus: "Progress Status",
    challengesShort: "Challenges",
    educationalRef: "Main educational reference:",
    completeTheory: "Complete theory lessons in the Learn tab and run checkpoint quizzes to level up.",
    lessonsSandbox: "Lessons & Code Sandbox",
    exploreTheory: "Explore theory step-by-step and run real code in-browser.",
    filterableQuizzes: "Filterable Quiz Challenges",
    configQuizzes: "Configure quiz sessions by topic and difficulty to earn XP.",
    trackInfo: "Track Info",
    technology: "Technology:",
    sandboxLanguage: "Sandbox Language:",
    totalQuestions: "Total Questions:",
    varInspectorTitle: "Variable Inspector & Debugger Step-by-Step",
    interactiveLabel: "Interactive",
    inspectMemory: "Inspect memory and variable state at each line of code",
    resetStep: "Reset to first step",
    prevStep: "Prev Step",
    nextStep: "Next Step",
    codeExecution: "Code Execution",
    memoryVariables: "Memory & Variables Inspector",
    noVariables: "No variables allocated at this point in execution.",
    scopeLocal: "Scope: Local / Function",
    frameStatus: "Frame Status: Active",
    connecting: "Connecting...",
    syncError: "Sync Error",
    errorAuth: "Enable popups for this site to authenticate with GitHub.",
    errorPopup: "Unable to contact the server for GitHub authentication.",
    errorServer: "GitHub OAuth configuration missing on the server.",
    errorUnexpected: "Unexpected error during synchronization.",
    wasmSandboxReady: "Python 3.11 WASM",
    loadingWasmCore: "Loading WASM Core...",
    unlockedStatus: "Unlocked",
    progressLabel: "Progress:"
  },

  es: {
    appName: "DevQuest",
    appTagline: "Laboratorio Multi-Ruta para Desarrolladores",
    playTab: "Jugar y Desafío",
    learnTab: "Modo Aprender",
    leaderboardTab: "Clasificación",
    customQuestionsTab: "Crear Desafío",
    aiTutorBtn: "Agente AI Tutor",
    languageSelect: "Idioma",

    trackSelectorTitle: "Selecciona Lenguaje / Tecnología",
    tracksAvailable: "Rutas Disponibles",
    selectedTrack: "Ruta Activa",
    completed: "Completado",

    streak: "Racha",
    streakTitle: "¡Días seguidos!",
    streakSubtitle: "Sigue practicando a diario para mantener tu racha ganadora.",
    question: "Pregunta",
    of: "de",
    chapter: "Capítulo",
    difficulty: "Dificultad",
    hint: "Pista",
    showHint: "Mostrar Pista",
    hideHint: "Ocultar Pista",
    explainWithAI: "Pedir Explicación a la IA",
    submitAnswer: "Confirmar Respuesta",
    nextQuestion: "Siguiente Desafío",
    correctAnswer: "¡Respuesta Correcta!",
    wrongAnswer: "¡Respuesta Incorrecta!",
    explanation: "Explicación",
    score: "Puntuación",
    accuracy: "Precisión",
    restartTrack: "Reiniciar Ruta",
    trackCompletedTitle: "¡Felicidades! ¡Ruta Completada!",
    trackCompletedDesc: "Has superado todos los desafíos de esta ruta. ¡Repasa o prueba otra ruta!",

    facile: "Fácil",
    media: "Media",
    difficile: "Difícil",

    learnTitle: "Modo Aprender",
    learnSubtitle: "Explora conceptos clave con tarjetas teóricas y explicaciones interactivas",
    searchPlaceholder: "Buscar un concepto (ej. tipo, función, commit)...",
    allChapters: "Todos los Capítulos",
    noConceptsFound: "No se encontraron conceptos con los filtros actuales.",
    askAiAboutConcept: "Pedir profundización a la IA",

    leaderboardTitle: "Tabla de Clasificación",
    leaderboardSubtitle: "El Salón de la Fama de DevQuest",
    rank: "Puesto",
    player: "Jugador",
    date: "Fecha",
    noScoresYet: "Sin puntuaciones aún. ¡Juega para entrar en la clasificación!",

    customTitle: "Crea tus Propios Desafíos",
    customSubtitle: "Añade cuestionarios personalizados para ti o para compartir",
    addQuestionBtn: "Nueva Pregunta",
    formTitle: "Añadir un nuevo desafío personalizado",
    trackLabel: "Ruta / Tecnología",
    chapterLabel: "Capítulo",
    topicLabel: "Tema",
    difficultyLabel: "Dificultad",
    questionTextLabel: "Texto de la Pregunta",
    codeSnippetLabel: "Código de Ejemplo (Opcional)",
    optionsLabel: "Opciones de Respuesta (4 opciones)",
    correctOptionIndex: "Índice de Opción Correcta (0 - 3)",
    hintLabel: "Pista",
    explanationLabel: "Explicación de la Solución",
    saveQuestion: "Guardar Desafío",
    cancel: "Cancelar",
    formTitleShort: "Añadir un Desafío",
    topicPlaceholder: "ej. Funciones, Interfaz, Commit",
    questionPlaceholder: "ej. ¿Qué imprime este código Python?",
    solutionExplanation: "Explicación de la solución",
    codeOptional: "Fragmento de código (opcional)...",
    publishNewChallenge: "Publicar Nuevo Desafío Comunitario",
    answerOptions: "Opciones de Respuesta:",
    optionN: "Opción",

    achievementsTitle: "Insignias y Logros",
    unlockedBadges: "Insignias Desbloqueadas",
    locked: "Bloqueado",
    unlockedAt: "Desbloqueado el",

    aiTutorTitle: "DevBot • Asistente IA Tutor",
    aiTutorSubtitle: "Impulsado por Gemini 3.6 Flash - Tu mentor personal de programación",
    aiTutorPlaceholder: "Pide explicaciones de código, solicita una pista o haz una pregunta...",
    aiSend: "Enviar",
    aiSuggestedPrompts: "Prompts rápidos recomendados:",
    aiExplainCode: "Explícame este código paso a paso",
    aiGiveHint: "Dame una pista sin revelar la respuesta",
    aiBreakdownConcept: "Explícame el concepto fundamental detrás de esta pregunta",
    aiThinking: "DevBot está pensando...",
    aiErrorNoKey: "Para usar el IA Tutor, configura GEMINI_API_KEY en el menú de Secretos.",
    aiErrorGeneric: "Ocurrió un error al comunicarse con el IA Tutor.",

    installApp: "Instalar App",
    pwaBannerTitle: "Instala DevQuest en tu dispositivo",
    pwaBannerDesc: "¡Acceso con un toque directamente desde tu pantalla de inicio!",
    pwaIosInstructions: "Para instalar en iOS: toca el botón Compartir en Safari y selecciona 'Añadir a pantalla de inicio'.",
    installed: "¡App Instalada!",

    radarTitle: "Mapa de Competencias Radar",
    radarSubtitle: "Análisis visual de competencia en Python, TypeScript y Git",
    radarShort: "Python · TS · Git",
    radarCompetency: "Dev Competency Radar",
    levelMaster: "Maestro",
    levelSenior: "Senior",
    levelIntermediate: "Intermedio",
    levelNovice: "Novato",
    zenMode: "Modo Zen",
    exitZenMode: "Salir del Modo Zen",
    exitZenModeKey: "Salir del Modo Zen (Esc)",
    zenModeTooltip: "Oculta distracciones para concentrarte solo en la tarjeta activa",

    signIn: "Iniciar Sesión",
    signOut: "Cerrar Sesión",
    signInWithGoogleHint: "Inicia sesión con Google para sincronizar tus progresos en la nube",
    signedIn: "Autenticado",
    footerTitle: "DevQuest • Plataforma Desarrolladores Multi-Ruta",
    footerSubtitle: "Aprende Python, TypeScript y Git / GitHub con tutoría IA interactiva",

    githubSyncTitle: "Sincronizar con GitHub",
    githubSyncSubtitle: "Conecta tu cuenta de GitHub mediante OAuth y publica tus desafíos completados como repositorio de código",
    connectGithub: "Conectar Cuenta GitHub",
    connectedAs: "Conectado como",
    disconnectGithub: "Desconectar GitHub",
    pushToGithub: "Publicar en GitHub",
    syncingWithGithub: "Sincronizando con GitHub...",
    syncSuccess: "¡Sincronización Completada!",
    syncSuccessDesc: "Tus desafíos completados se han publicado con éxito en GitHub.",
    repoNameLabel: "Nombre del Repositorio en GitHub",
    challengesToPush: "Desafíos listos para sincronizar",
    noCompletedChallengesToSync: "¡Completa al menos un desafío para poder sincronizarlo en GitHub!",
    openRepository: "Abrir Repositorio en GitHub",
    githubOauthHint: "Autenticación segura a través de OAuth oficial de GitHub. Sin contraseñas guardadas.",

    dailyGoalTitle: "Objetivo Diario",
    dailyGoalReached: "¡Objetivo Alcanzado! 🎉",
    streakDays: "días de racha",
    goalCompletedMsg: "¡Felicidades! Completaste tus {goal} desafíos diarios.",
    goalZeroMsg: "¡Aún no has completado ningún desafío hoy!",
    goalProgressMsg: "¡Has completato {count} de {goal} desafíos hoy!",
    goalRemainingMsg: "Te faltan {count} preguntas para completar tu objetivo diario.",
    goalExtraPractice: "Ya mantuviste tu racha activa. ¿Quieres seguir practicando?",
    quickChallengeBtn: "Desafío Rápido ({count} preguntas)",
    selectDailyGoal: "Elige tu objetivo diario:",
    filterSectionTitle: "Filtrar y Configurar Desafíos",
    filterSubtitle: "Selecciona dificultad, temas y ordena preguntas antes de jugar",
    difficultyLevel: "Nivel de Dificultad",
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
    mixed: "Mezclados",
    allLevels: "Todos los Niveles",
    chapterFilterLabel: "Capítulo",
    allChaptersOption: "Todos los Capítulos",
    searchKeyword: "Buscar por Palabra Clave",
    searchPlaceholderFilter: "ej. print, list, dict, class...",
    sortChallenges: "Ordenar Desafíos",
    sortCapAsc: "Ordenar por Capítulo (Ascendente 1 → 15)",
    sortCapDesc: "Ordenar por Capítulo (Descendente 15 → 1)",
    sortDiffAsc: "Ordenar por Dificultad (Fácil → Difícil)",
    sortDiffDesc: "Ordenar por Dificultad (Difícil → Fácil)",
    questionsCountLabel: "¿Cuántas preguntas quieres en esta sesión?",
    challengesFound: "Desafíos Encontrados:",
    startMatchBtn: "Iniciar Partida con {count} Desafíos Seleccionados",
    skillTreeTab: "Competencias",
    wasmSandbox: "WASM Sandbox",
    leaguesStreaks: "Ligas y Rachas",
    pvpDuels: "Duelos PvP",
    skillTreeMap: "Mapa de Competencias",
    aiQuestGen: "Generador Quest IA",
    communityHub: "Centro de Comunidad",
    analyticsRadar: "Radar de Análisis",
    certificateModalBtn: "ID de Certificado",

    theoryExplanation: "Explicación Teórica",
    liveSandboxTitle: "Sandbox de Código Live (Ejecuta y Experimenta)",
    executing: "Ejecutando...",
    runCode: "Ejecutar Código",
    sandboxPlaceholder: "Escribe o modifica el código aquí...",
    verifyAnswer: "Verificar Respuesta",
    correctAnswerMsg: "¡Respuesta Correcta! Lección Completada 🎉",
    wrongAnswerMsg: "Respuesta Incorrecta. ¡Inténtalo de nuevo!",
    weeklyLeaderboard: "Clasificación Semanal",
    generateAiQuestNow: "Generar Desafío IA Ahora",
    newBadgeUnlocked: "¡Nueva Insignia Desbloqueada!",
    days: "días",
    achievementsSubtitle: "Completa desafíos y mantén tu racha para desbloquear insignias",
    totalProgress: "Progreso Total de Insignias: ",
    unlocked: "desbloqueado",
    progress: "Progreso:",
    ofBadge: "de",
    close: "Cerrar",
    questTopicLabel: "Tema Específico o Punto Débil:",
    questTopicPlaceholder: "ej. List Comprehension, Asyncio, Decoradores...",
    generating: "Generando...",
    toggleTts: "Activar/Desactivar TTS",
    clearChat: "Limpiar chat",
    zeroMsgs: "No hay mensajes todavía. ¡Empieza a chatear con DevBot!",
    analyticsTitle: "Panel de Análisis y Radar de Competencias",
    analyticsSubtitle: "Análisis de rendimiento de codificación, precisión y fortalezas",
    noDataTitle: "Datos No Disponibles",
    noDataDesc: "Juega algunos desafíos para generar tus estadísticas.",
    avgSpeed: "Velocidad Promedio",
    totalXp: "XP Total",
    solvedQuests: "Desafíos Resueltos",
    skillRadarBreakdown: "Desglose del Radar de Habilidades",
    masteryLevel: "Nivel de Maestría",
    personalAdvice: "Consejo Personal del Tutor IA:",
    adviceBody: "Tienes excelente precisión en sintaxis básica (92%), pero recomendamos practicar Async & Decorators y POO.",
    compSyntax: 'Sintaxis y Tipos',
    compControlFlow: 'Control de Flujo',
    compFunctions: 'Funciones y Alcance',
    compDataStructures: 'Estructuras de Datos',
    compOop: 'Programación POO',
    compAsync: 'Async y Decoradores',
    certificateTitle: "Certificado Oficial de Maestría",
    certificateSubtitle: "Exportación de Insignia Digital y Verificación QR",
    certThisAttests: "Por la presente se certifica que",
    certEditName: "Haz clic para editar tu nombre",
    certPassedText: "ha superado exitosamente el 100% de los desafíos prácticos y pruebas de sintaxis en el recorrido oficial:",
    certIssueDate: "Fecha de Emisión",
    certFooter: "Compatible con exportación PDF, OpenBadge 2.0 y redes sociales.",
    printPdf: "Imprimir / PDF",
    markdownCopied: "¡Markdown copiado al portapapeles! Pégalo en tu README de GitHub.",
    certificateShareLinkedin: "¡Acabo de obtener el Certificado Oficial {trackName} en DevQuest! ID verificado: {hash}",
    filterBeginnerDesc: "Sintaxis básica, tipos y print",
    filterIntermediateDesc: "Listas, bucles y funciones",
    filterAdvancedDesc: "Diccionarios, clases y errores",
    filterMixedDesc: "Mezcla aleatoria equilibrada",
    resetFilters: "Restablecer Filtros",
    filteredPreview: "Vista previa de desafíos filtrados",
    noFilteredResults: "No se encontraron desafíos con los filtros actuales. Intenta cambiar opciones o restablecer la búsqueda.",
    questionsShort: "Preguntas",
    allShort: "Todo",
    noChallengesFound: "No se Encontraron Desafíos",
    classroomTitle: "Portal de Aula",
    exportCsv: "Exportar CSV",
    totalStudents: "Total Estudiantes",
    avgProgress: "Progreso Promedio",
    assignments: "Tareas",
    student: "Estudiante",
    progressHeatmap: "Mapa de Calor de Progreso",
    grade: "Calificación",
    pyodideReady: "Pyodide WASM Listo",
    loadingWasm: "Cargando Núcleo WASM...",
    copied: "Copiado",
    copy: "Copiar",
    outputConsole: "Consola de Salida",
    resetCode: "Restablecer Código",
    clearOutput: "Limpiar",
    executionInProgress: "Ejecutando...",
    runCodeWasm: "Ejecutar Código (WASM)",
    noOutput: "(Sin salida)",
    executionError: "Error de ejecución",
    consoleOutput: "Salida de Consola:",
    cmdSearchPlaceholder: "Buscar comandos o seleccionar una acción... (ej. WASM, Árbol de Habilidades, Tema)",
    cmdsNotFound: "No se encontraron comandos para",
    navigate: "Navegar",
    select: "Seleccionar",
    communityTitle: "Centro de Desafíos Comunitarios (UGC)",
    communitySubtitle: "¡Crea desafíos, comparte casos de prueba con desarrolladores de la comunidad y vota los quizzes más ingeniosos!",
    createChallenge: "Crear Nuevo Desafío",
    searchCommunity: "Buscar desafíos comunitarios...",
    author: "Autor:",
    creatorBadge: "Insignia de Creador",
    noChallengesCriteria: "Ningún desafío coincide con tus criterios. ¡Intenta crear uno nuevo!",
    clone: "Clonar",
    playNow: "Jugar Ahora",
    publishChallenge: "Publicar Nuevo Desafío Comunitario",
    responseOptions: "Opciones de Respuesta:",
    customLabTitle: "Laboratorio de Preguntas Personalizadas",
    customLabSubtitle: "Crea tus desafíos de Python e intégralos en el juego",
    languageTrack: "Idioma / Ruta",
    chapterLabelShort: "Capítulo",
    topicLabelShort: "Tema",
    difficultyLabelShort: "Dificultad",
    questionTextLabelShort: "Texto de la Pregunta",
    codeSnippetOptional: "Fragmento de Código (opcional)",
    responseOptionsLabel: "Opciones de Respuesta (selecciona la correcta)",
    optionLetter: "Opción",
    usefulHint: "Pista útil",
    detailedExplanation: "Explicación detallada",
    saveQuestionLabel: "Guardar Pregunta",
    noCustomQuestions: "No hay preguntas personalizadas creadas. ¡Haz clic en \"Nueva Pregunta\" para añadir tus preguntas de Python!",
    streakActive: "Racha Activa:",
    goalLabel: "Meta:",
    hideNotification: "Ocultar Notificación",
    chooseGoal: "Elige tu meta diaria:",
    challengesPerDay: "desafíos/día",
    editDailyGoal: "Editar Meta Diaria",
    correctAnswers: "Respuestas Correctas",
    saveScoreLabel: "Guardar tu puntuación en la Clasificación",
    nicknamePlaceholder: "Introduce tu apodo (ej. Dev)",
    save: "Guardar",
    scoreSaved: "Puntuación guardada correctamente para",
    changeFilters: "Cambiar Filtros",
    results: "Resultados",
    timerOn: "Temporizador ON",
    timerOff: "Temporizador OFF",
    exit: "Salir",
    record: "Rec:",
    devQuestHub: "DevQuest Centro Full-Stack 2026",
    devPlatform: "DevQuest • Plataforma para Desarrolladores",
    heroDescription: "Domina el desarrollo full-stack moderno: Python, TypeScript, Git/GitHub, Docker y PostgreSQL. ¡Aprende con lecciones interactivas, sandbox en el navegador y desafíos competitivos!",
    startQuickQuest: "Iniciar Desafío Rápido",
    availableTracks: "Rutas Técnicas Disponibles (5)",
    selectTechHubHint: "Selecciona una tecnología para entrar en su Centro dedicado",
    questsShort: "Desafíos",
    questsPerDay: "{count} desafíos/día",
    enterHub: "Entrar al Centro",
    fullstackRadar: "Radar de Competencias Full-Stack",
    communityFeed: "Feed de la Comunidad y Discusiones",
    globalLeaderboard: "Clasificación Global →",
    currentLeague: "Liga Actual",
    currentStreak: "Racha Actual",
    youPlayer: "Tú (Jugador)",
    youShort: "Tú",
    promotionRelegation: "Ascenso: 500 XP | Descenso: < 100 XP",
    lessonPath: "Ruta de Lecciones",
    interactiveModule: "Módulo de aprendizaje interactivo basado en",
    lessonIndex: "Índice de Lecciones",
    codeExample: "Ejemplo de Código:",
    checkpointQuiz: "Examen de Control",
    chapterLabelLearn: "Capítulo",
    interactiveLesson: "Lección Interactiva",
    completedStatus: "Completado",
    learnProgress: "Progreso",
    learnLessons: "Lecciones",
    selectTechHub: "Seleccionar Centro Técnico (5)",
    enterArrow: "Entrar →",
    homeLabel: "Inicio",
    hubsLabel: "Centros (5)",
    aiTutorLabel: "Tutor IA",
    leaderboardLabel: "Clasificación",
    settingsLabel: "Configuración",
    badgesAchievements: "Insignias y Logros",
    aiTutorNav: "Tutor IA",
    streakTooltip: "Racha de días consecutivos",
    pvpTitle: "Duelos de Código PvP (Arena 1v1)",
    pvpSubtitle: "¡Desafía al Cyber-Bot para ver quién depura más rápido!",
    arenaTitle: "Arena CyberDuelo 1v1",
    arenaDesc: "Pon a prueba tus reflejos de depuración. ¡Responde más rápido que tu oponente antes de que se acabe el tiempo!",
    roomCodePlaceholder: "Código de Sala (dejar vacío para crear)",
    searchingMatch: "Buscando...",
    findMatch: "Buscar Partida PvP ⚔️",
    tempsRimasto: "Tiempo Restante:",
    victory: "¡VICTORIA ARROLLADORA!",
    defeat: "¡DERROTA EN LA ARENA!",
    victoryDesc: "¡Derrotaste al CyberBot ganando +100 XP y +25 Trofeos para tu Liga!",
    defeatDesc: "El CyberBot te ha superado esta ronda. ¡Inténtalo de nuevo y mejora tu velocidad!",
    backToLobby: "Volver al Lobby ⚔️",
    settingsTools: "Configuración y Herramientas",
    customizeExperience: "Personaliza tu experiencia DevQuest",
    interfaceLanguage: "Idioma de Interfaz",
    syntaxTheme: "Tema de Sintaxis:",
    themeMocha: "Catppuccin Mocha (Oscuro)",
    themeLatte: "Catppuccin Latte (Claro)",
    change: "Cambiar",
    soundEffects: "Efectos de Sonido:",
    muted: "Silenciado",
    active: "Activo",
    enable: "Activar",
    mute: "Silenciar",
    githubSyncShort: "Sincronización GitHub",
    openGitHubSync: "Abrir Sincronización GitHub",
    activeStreak: "Racha Activa:",
    unlockedBadgesLabel: "Insignias Desbloqueadas:",
    viewBadges: "Ver Insignias",
    githubSyncDesc: "Publica los desafíos completados directamente en tu cuenta de GitHub mediante OAuth oficial.",
    fullstackHub: "Centro de Desarrollador Full-Stack",
    communityHome: "Inicio de la Comunidad",
    techHubs: "Centros Técnicos (5)",
    proBadge: "PRO",
    toolsCommunity: "Herramientas y Comunidad",
    aiTutorAgent: "Agente Tutor IA",
    githubSyncNav: "Sincronización GitHub",
    settingsNav: "Configuración",
    skillTreeTitle: "Árbol de Habilidades Nodal (Ruta RPG)",
    skillTreeSubtitle: "Visualiza nodos de competencia, desbloquea nuevos módulos y domina la sintaxis paso a paso.",
    noModulesAvailable: "No hay Módulos Disponibles",
    unableLoadSkillTree: "No se puede cargar el árbol de habilidades.",
    moduleDetails: "Detalles del Módulo: Capítulo",
    startExercises: "Iniciar Ejercicios del Capítulo",
    quickChallenge: "Desafío Rápido",
    askAiDevBot: "Preguntar a AI DevBot",
    overview: "Resumen",
    playChallengeTab: "Jugar y Desafiar",
    progressStatus: "Estado de Progreso",
    challengesShort: "Desafíos",
    educationalRef: "Referencia educativa principal:",
    completeTheory: "Completa las lecciones de teoría en la pestaña Aprender y realiza exámenes de control para subir de nivel.",
    lessonsSandbox: "Lecciones y Sandbox de Código",
    exploreTheory: "Explora la teoría paso a paso y ejecuta código real en el navegador.",
    filterableQuizzes: "Desafíos de Quiz Filtrables",
    configQuizzes: "Configura sesiones de quiz por tema y dificultad para ganar XP.",
    trackInfo: "Información de Ruta",
    technology: "Tecnología:",
    sandboxLanguage: "Idioma del Sandbox:",
    totalQuestions: "Total de Preguntas:",
    varInspectorTitle: "Inspector de Variables y Depurador Paso a Paso",
    interactiveLabel: "Interactivo",
    inspectMemory: "Inspecciona la memoria y el estado de las variables en cada línea de código",
    resetStep: "Restablecer al primer paso",
    prevStep: "Paso Anterior",
    nextStep: "Siguiente Paso",
    codeExecution: "Ejecución de Código",
    memoryVariables: "Inspector de Memoria y Variables",
    noVariables: "No hay variables asignadas en este punto de la ejecución.",
    scopeLocal: "Ámbito: Local / Función",
    frameStatus: "Estado del Marco: Activo",
    connecting: "Conectando...",
    syncError: "Error de Sincronización",
    errorAuth: "Habilita las ventanas emergentes para este sitio para autenticarte con GitHub.",
    errorPopup: "No se puede contactar al servidor para la autenticación de GitHub.",
    errorServer: "Falta la configuración de OAuth de GitHub en el servidor.",
    errorUnexpected: "Error inesperado durante la sincronización.",
    wasmSandboxReady: "Python 3.11 WASM",
    loadingWasmCore: "Cargando Núcleo WASM...",
    unlockedStatus: "Desbloqueado",
    progressLabel: "Progreso:"
  }
};

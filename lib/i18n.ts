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
    days: "giorni"
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
    days: "days"
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
    days: "días"
  }
};

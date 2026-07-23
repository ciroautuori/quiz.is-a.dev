import { NextRequest, NextResponse } from 'next/server';

interface SyncChallengePayload {
  id: string;
  trackId: string;
  titolo: string;
  difficolta: string;
  domanda: string;
  codiceIniziale?: string;
  soluzioneFormattata?: string;
  spiegazione?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, repoName = 'devquest-solutions', challenges = [] } = body;

    if (!token) {
      return NextResponse.json({ error: 'OAuth Access Token mancante' }, { status: 401 });
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'DevQuest-App',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // 1. Get authenticated user
    const userRes = await fetch('https://api.github.com/user', { headers });
    if (!userRes.ok) {
      return NextResponse.json({ error: 'Token GitHub non valido o scaduto.' }, { status: 401 });
    }
    const userData = await userRes.json();
    const username = userData.login;

    // 2. Check if repository exists or create it
    const repoRes = await fetch(`https://api.github.com/repos/${username}/${repoName}`, { headers });
    let repoUrl = `https://github.com/${username}/${repoName}`;

    if (repoRes.status === 404) {
      // Create repository
      const createRes = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: repoName,
          description: '🚀 Soluzioni e sfide completate su DevQuest (Python, TypeScript, Git)',
          private: false,
          auto_init: true,
        }),
      });

      if (!createRes.ok) {
        const createErr = await createRes.json();
        return NextResponse.json({ 
          error: `Impossibile creare il repository: ${createErr.message || 'Errore permessi'}` 
        }, { status: 500 });
      }
      const newRepo = await createRes.json();
      repoUrl = newRepo.html_url;
      // Wait briefly for init commit
      await new Promise((r) => setTimeout(r, 1500));
    }

    // Helper to commit a file
    const commitFile = async (filePath: string, fileContent: string, commitMessage: string) => {
      // Check existing SHA
      let sha: string | undefined;
      try {
        const getFileRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, { headers });
        if (getFileRes.ok) {
          const fileData = await getFileRes.json();
          sha = fileData.sha;
        }
      } catch (err) {
        // file doesn't exist yet
      }

      const contentBase64 = Buffer.from(fileContent, 'utf-8').toString('base64');

      const putRes = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${filePath}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: commitMessage,
          content: contentBase64,
          ...(sha ? { sha } : {}),
        }),
      });

      return putRes.ok;
    };

    let syncedCount = 0;

    // 3. Commit challenges as files
    for (const item of (challenges as SyncChallengePayload[])) {
      const ext = item.trackId === 'python' ? 'py' : item.trackId === 'typescript' ? 'ts' : 'sh';
      const filename = `challenge_${item.id.replace(/[^a-zA-Z0-9_-]/g, '_')}.${ext}`;
      const folder = item.trackId || 'general';
      const fullPath = `${folder}/${filename}`;

      const commentPrefix = item.trackId === 'python' || item.trackId === 'git' ? '#' : '//';

      const fileContent = `${commentPrefix} ========================================================
${commentPrefix} DevQuest Challenge: ${item.titolo || item.id}
${commentPrefix} Track: ${item.trackId.toUpperCase()} | Difficoltà: ${item.difficolta || 'Normal'}
${commentPrefix} ========================================================
${commentPrefix} Domanda:
${commentPrefix} ${item.domanda ? item.domanda.replace(/\n/g, `\n${commentPrefix} `) : 'N/A'}

${item.codiceIniziale || `${commentPrefix} Nessun codice iniziale necessario`}

${commentPrefix} --- Spiegazione e Note Soluzione ---
${commentPrefix} ${item.spiegazione ? item.spiegazione.replace(/\n/g, `\n${commentPrefix} `) : 'Completato con successo!'}
`;

      const success = await commitFile(fullPath, fileContent, `Add DevQuest solution: ${item.titolo || item.id}`);
      if (success) syncedCount++;
    }

    // 4. Generate & Commit README.md
    const readmeContent = `# 🎯 DevQuest - Coding Challenge Repository

Repository di soluzioni e progressi sincronizzati da **[DevQuest](https://devquest.app)**.

## 📊 Summary
- **Totale Sfide Sincronizzate:** ${syncedCount}
- **Ultimo Aggiornamento:** ${new Date().toLocaleDateString('it-IT')}

## 🚀 Track Coperti
- 🐍 **Python**: Sfide su funzioni, tipi di dati, OOP e logica
- ⚡ **TypeScript**: Tipi avanzati, generics, interfacce e dom
- 🌿 **Git & GitHub**: Branching, rebase, merges e workflow team

---
*Generato automaticamente con la funzionalità Sync with GitHub di DevQuest.*
`;

    await commitFile('README.md', readmeContent, 'Update DevQuest README.md summary');

    return NextResponse.json({
      success: true,
      repoUrl,
      filesSynced: syncedCount,
      username,
    });
  } catch (err: any) {
    console.error('GitHub Sync API error:', err);
    return NextResponse.json({ error: err.message || 'Errore durante la sincronizzazione con GitHub' }, { status: 500 });
  }
}

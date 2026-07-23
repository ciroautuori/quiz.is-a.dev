<div align="center">

# 🎮 quiz.is-a.dev

> **The open-source multi-track developer game & quiz lab — Learn Python, TypeScript, Git & AI through interactive challenges, 1v1 PvP duels, and team vibe-coding.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/ciroautuori/quiz.is-a.dev?style=social)](https://github.com/ciroautuori/quiz.is-a.dev/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/ciroautuori/quiz.is-a.dev)](https://github.com/ciroautuori/quiz.is-a.dev/commits/main)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![WASM Engine](https://img.shields.io/badge/Pyodide-WASM-blue)](https://pyodide.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Vibe Coding](https://img.shields.io/badge/Vibe%20Coding-Community--Driven-purple.svg)](#-vibe-coding--team-learning)

[🌐 Live App](https://quiz.is-a.dev) · [💬 Discord Community](https://discord.gg/is-a-dev-830872854677422150) · [⭐ Star this Repo](https://github.com/ciroautuori/quiz.is-a.dev)

</div>

---

## 🎯 Why Quiz?

Learning to code shouldn't feel like reading documentation alone. **`quiz.is-a.dev`** turns programming logic into a competitive, multiplayer lab:

- 🐍 **Multi-Track Mastery**: Python debugging, TypeScript type gymnastics, and Git/GitHub terminal workflows.
- ⚡ **100% Client-Side Pyodide WASM**: Execute and test real Python code inside your browser — zero backend delay, 100% private.
- ⚔️ **Real-Time 1v1 PvP Duels**: 60-second bug-hunting battles against fellow developers (or AI bots).
- 🏆 **Duolingo-Style Leagues**: 6 weekly tiers (Bronze to Core-Dev) with Sunday promotions & relegations.
- 🧠 **AI Tutor (Gemini + Voice TTS)**: Built-in AI pair programmer explaining tracebacks with step-by-step vocal hints.
- 📜 **Verified Cryptographic Certificates**: Earn SHA-256 verified badges & OpenBadge 2.0 JSON metadata for your LinkedIn/GitHub.

---

## 🎮 Learning Tracks

| Track | Level Range | Focus Areas |
|---|---|---|
| 🐍 **Python Quest** | Beginner → Senior | Syntax, Data Structures, OOP, AsyncIO, Memory, Algorithm Optimization |
| 📘 **TypeScript Lab** | Novice → Wizard | Generics, Conditional Types, Utility Types, Type Narrowing, Async/Await |
| 🐙 **Git & GitHub** | Novice → DevOps | Rebase vs Merge, Cherry-pick, Stash, Conflict Resolution, Actions & Workflows |

---

## 🤝 Vibe-Coding & Team Learning

We believe in **Vibe-Coding**: building, experimenting, and solving problems together with AI assistance and peer collaboration.

### How to get involved:

1. **Add new Quiz Cards**: Add your favorite bug-hunting questions or interview challenges in under 2 minutes (see below).
2. **Build Features Together**: Pick an open issue, pair-program with Cursor/Claude Code/Codex, and submit a PR!
3. **Host Team Duels**: Use `quiz.is-a.dev` during tech meetups or study groups for live 1v1 PvP coding competitions.

---

## ⚡ How to Add a New Challenge Card (2-Minute PR)

1. Open `lib/content/initial_challenges.ts` (or `sfide_typescript.ts` / `sfide_git.ts`)
2. Add your question object:

```typescript
{
  id: "py-custom-01",
  title: "Mutable Default Arguments",
  track: "python",
  difficulty: "medium",
  code: `def append_to(element, target=[]):\n    target.append(element)\n    return target`,
  options: [
    "Modifies shared list across function calls",
    "Creates a new list every call",
    "Raises TypeError",
    "Returns None"
  ],
  correctAnswer: 0,
  explanation: "Default parameter values are evaluated once when the function is defined, not when called."
}
```

3. Open a Pull Request! 🎉

---

## 🚀 Quick Start (Local Setup)

```bash
# Clone the repository
git clone https://github.com/ciroautuori/quiz.is-a.dev.git
cd quiz.is-a.dev

# Install dependencies
bun install   # or npm install

# Start local dev server
bun dev       # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Setup

```bash
# Build and run with Docker Compose
docker compose up -d --build
```

Access the app on `http://localhost:4242`.

---

## 📜 License

Distributed under the **MIT License**. Free for everyone forever. See [`LICENSE`](./LICENSE) for details.

---

<p align="center">
  <b>⭐ Star this repository if you believe developer education should be free, fun, and open-source!</b>
</p>

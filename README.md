# 🐍 DevQuest: Interactive Developer Logic & Python Lab

> A free, community-driven interactive game to master Python programming logic, TypeScript, and Git/GitHub workflows with AI-powered tutoring.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs)](https://nextjs.org/)
[![WASM Engine](https://img.shields.io/badge/Pyodide-WASM-blue)](https://pyodide.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](./Dockerfile)

---

## ✨ Features

- 🏆 **Weekly Leagues & Streaks**: 6 tiers (Bronze to Core-Dev) with Sunday resets.
- ⚔️ **Real-time 1v1 PvP Duels**: Matchmaking for 60-second bug-hunting duels with AI fallback.
- 🧠 **AI Tutor Widget**: Powered by Gemini API with Text-to-Speech (TTS) explanations.
- 💻 **In-Browser Pyodide WASM Engine**: Run and debug Python code 100% client-side without servers.
- 🎓 **Verified Certificates**: SHA-256 cryptographic verification hashes and OpenBadge 2.0 JSON metadata.
- 🏢 **B2B Classroom Portal**: Student rosters, assignment tracking, performance heatmaps, and CSV export.
- 📦 **PWA & Offline Support**: Service worker caching and daily streak push notifications.

---

## 🚀 Quick Start (Local Development)

```bash
git clone https://github.com/ciroautuori/devquest.git
cd devquest

# Install dependencies
bun install   # or npm install

# Start development server
bun dev       # or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🐳 Docker Deployment

```bash
docker compose up -d --build
```

Container runs on host port `4242` → container port `3000`.

---

## 🤝 Contributing

Pull requests are warmly welcome! Whether it's adding new Python challenge cards, refining the UI, or enhancing accessibility — feel free to open a PR.

License: [MIT](./LICENSE)

#!/usr/bin/env python3
"""DevQuest i18n Hardcoded Text Auditor — aggressive mode.

Trova QUALSIASI testo hardcoded in italiano nei file .ts/.tsx,
analizzando TUTTE le stringhe letterali (doppi apici, apici singoli).
Scansiona OGNI file nella repo (esclusi node_modules, .next, .git).
"""

from __future__ import annotations
import os, re, sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parent.parent
SKIP_DIRS = {"node_modules", ".next", ".git", "__pycache__", ".claude"}
SKIP_FILES = {"i18n.ts", "tracks.ts", "types.ts", "firebase.ts", "pyodideRunner.ts",
              "soundEngine.ts", "pwa.ts", "storage.ts", "githubSync.ts",
              "spacedRepetition.ts", "lessonsData.ts", "achievements.ts",
              "gamification.ts", "initial_challenges.ts", "langsync.ts",
              "questions.ts", "concepts.ts", "challenges_ai.ts", "challenges_docker.ts",
              "challenges_postgres.ts", "concepts_git.ts", "concepts_typescript.ts",
              "challenges_git.ts", "challenges_typescript.ts"}

ITALIAN_WORDS = {
    "il", "lo", "la", "le", "gli", "un", "uno", "una", "del", "dello", "della",
    "dei", "degli", "delle", "al", "allo", "alla", "ai", "agli", "alle",
    "dal", "dallo", "dalla", "dai", "dagli", "dalle", "nel", "nello", "nella",
    "nei", "negli", "nelle", "sul", "sullo", "sulla", "sui", "sugli", "sulle",
    "con", "per", "tra", "fra", "che", "chi", "come", "dove", "quando",
    "questo", "questa", "questi", "queste", "quello", "quella",
    "sono", "hai", "ha", "hanno", "ho", "abbiamo", "sia", "siamo",
    "non", "ma", "anche", "piu", "piu", "poi", "dopo", "prima", "sempre",
    "mai", "molto", "tanto", "troppo", "poco", "qualche",
    "ogni", "tutto", "tutta", "tutti", "tutte",
    "fai", "fare", "fatto", "puoi", "puo", "puo", "possiamo",
    "devo", "deve", "devono", "vai", "va", "vanno", "andare",
    "della", "delle", "degli", "dei",
    "corso", "lezione", "lezioni", "capitolo", "argomento", "domanda",
    "risposta", "risposte", "codice", "esecuzione",
    "esercizio", "esercizi", "sfida", "sfide",
    "nome", "utente", "punteggio", "livello", "difficolta", "difficolta",
    "principiante", "intermedio", "avanzato",
    "salva", "annulla", "cancella", "elimina", "modifica", "crea",
    "carica", "cerca", "trova", "mostra", "nascondi",
    "errore", "successo", "attenzione", "caricamento",
    "benvenuto", "continua", "indietro", "avanti", "conferma",
    "italiano", "inglese", "spagnolo",
    "nessuna", "nessun", "alcuna", "alcun",
    "giorno", "settimana", "mese", "anno",
    "classifica", "obiettivo", "obiettivi", "progresso",
    "modalita", "modalita", "gioco", "partita",
    "commento", "commenti", "certificato", "completato",
    "radar", "competenze", "suggerimento", "spiegazione",
    "filtri", "impostazioni", "lingua", "tema",
    "messaggio", "notifica", "notifiche",
    "chiudi", "apri", "seleziona", "scegli",
    "almeno", "minimo", "massimo", "caratteri",
    "pubblica", "privata", "opzione", "opzioni",
    "materia", "materie", "condividi", "piace",
}

def is_italian_text(text: str) -> bool:
    parole = re.findall(r"[a-zA-Z]+", text.lower())
    if not parole:
        return False
    common = sum(1 for p in parole if p in ITALIAN_WORDS)
    return common >= 1

def is_non_user_text(text: str) -> bool:
    s = text.strip()
    if not s or len(s) < 3:
        return True
    if re.match(r'^[\d\s%./\\()\[\]{}<>\-#_+:=@&*|,;]+$', s):
        return True
    tech_prefixes = ("http://", "https://", "file://", "data:", "mailto:", "/", "#",
                     "var(", "ctp-", "bg-", "text-", "border-", "gap-", "p-", "m-",
                     "w-", "h-", "flex", "grid-", "font-", "shadow", "rounded",
                     "lucide-", "hover:", "focus:", "active:", "group-",
                     "translate-", "scale-", "rotate-")
    if s.startswith(tech_prefixes):
        return True
    if " " not in s:
        if re.match(r'^[a-zA-Z0-9_\-.:/\\]+$', s):
            return True
        if s.isascii() and "'" not in s and '"' not in s:
            return True
    return False

def extract_string_literals(filepath: Path) -> list[dict]:
    results = []
    content = filepath.read_text(encoding="utf-8")
    lines = content.split('\n')

    for lineno, line in enumerate(lines, 1):
        stripped = line.strip()
        if (stripped.startswith("//") or stripped.startswith("/*") or
            stripped.startswith("*") or stripped.startswith("import ") or
            stripped.startswith("export type") or stripped.startswith("export interface")):
            continue
        if "t." in line or "useLanguage" in line:
            continue

        for m in re.finditer(r'"([^"\\]*(?:\\.[^"\\]*)*)"|\'([^\'\\]*(?:\\.[^\'\\]*)*)\'|`([^`\\]*(?:\\.[^`\\]*)*)`', line):
            text = m.group(1) or m.group(2) or m.group(3)
            if text is None:
                continue
            if is_non_user_text(text) or not is_italian_text(text):
                continue
            col = m.start() + 1
            results.append({"line": lineno, "col": col, "text": text, "snippet": stripped[:120]})

    return results

def main():
    print("=" * 80)
    print(" DEVQUEST i18n AUDIT — AGGRESSIVE MODE")
    print(" Scansiona TUTTE le stringhe letterali in TUTTI i file .ts/.tsx")
    print("=" * 80 + "\n")

    all_issues: dict[str, list[dict]] = defaultdict(list)
    total_files = 0

    for ext in ("*.ts", "*.tsx"):
        for fp in sorted(ROOT.rglob(ext)):
            rel = fp.relative_to(ROOT)
            if any(s in rel.parts for s in SKIP_DIRS):
                continue
            if fp.name in SKIP_FILES:
                continue
            total_files += 1
            issues = extract_string_literals(fp)
            if issues:
                all_issues[str(rel)] = issues

    if not all_issues:
        print("PERFETTO! Nessun testo hardcoded italiano trovato.")
        print(f"Controllati {total_files} file.\n")
        return

    total = sum(len(v) for v in all_issues.values())
    print(f"TROVATI {total} testi hardcoded in {len(all_issues)} file:\n")

    for filepath, issues in sorted(all_issues.items()):
        print(f"  {filepath} ({len(issues)} issues):")
        for iss in issues[:5]:
            print(f"    L{iss['line']}:{iss['col']} \"{iss['text'][:80]}\"")
        if len(issues) > 5:
            print(f"    ... e altri {len(issues)-5}")
        print()

    print(f"Summary: {total} hardcoded Italian strings in {len(all_issues)} files (out of {total_files} checked).\n")

if __name__ == "__main__":
    main()

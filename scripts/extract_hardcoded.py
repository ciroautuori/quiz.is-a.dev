"""Estrae TUTTO il testo hardcoded dai file .ts/.tsx e produce un JSON."""
from __future__ import annotations
import json
import os
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent

def extract_all(filepath: Path) -> list[dict]:
    content = filepath.read_text(encoding="utf-8")
    results = []

    # Pattern ternario multi-riga
    for m in re.finditer(
        r"""language\s*===\s*'en'\s*\?\s*'([^']*?)'\s*:\s*language\s*===\s*'es'\s*\?\s*'([^']*?)'\s*:\s*'([^']*?)'""",
        content,
    ):
        it = m.group(3).strip()
        if 3 <= len(it) <= 200:
            results.append({
                "type": "ternary", "en": m.group(1), "es": m.group(2), "it": it,
                "match": m.group(0),
            })

    # Pattern ternario con graffe (template literal)
    for m in re.finditer(
        r"""language\s*===\s*'en'\s*\?\s*`([^`]*?)`\s*:\s*language\s*===\s*'es'\s*\?\s*`([^`]*?)`\s*:\s*`([^`]*?)`""",
        content,
    ):
        it = m.group(3).strip()
        if 3 <= len(it) <= 200:
            results.append({
                "type": "ternary_tpl", "en": m.group(1), "es": m.group(2), "it": it,
                "match": m.group(0),
            })

    # t.key || fallback
    for m in re.finditer(r"t\.(\w+)\s*\|\|\s*'([^']+)'", content):
        it = m.group(2).strip()
        if 3 <= len(it) <= 200:
            results.append({
                "type": "t_fallback", "key": m.group(1), "it": it,
                "match": m.group(0),
            })

    return results


def main():
    all_texts = []
    extensions = ["*.ts", "*.tsx"]
    for ext in extensions:
        for filepath in sorted(REPO.rglob(ext)):
            rel = filepath.relative_to(REPO)
            skip_dirs = {"node_modules", ".next", ".git", "__pycache__", ".claude"}
            if any(s in rel.parts for s in skip_dirs):
                continue
            texts = extract_all(filepath)
            for t in texts:
                t["file"] = str(rel)
            all_texts.extend(texts)

    # Raggruppa per testo unico
    seen = set()
    unique = []
    for t in all_texts:
        it = t["it"]
        if it not in seen:
            seen.add(it)
            unique.append(t)

    print(f"Trovati {len(all_texts)} testi hardcoded in totale")
    print(f"Testi unici: {len(unique)}")
    
    out = {"unique_texts": unique, "all_texts": all_texts}
    outfile = REPO / "scripts" / "hardcoded_texts.json"
    outfile.write_text(json.dumps(out, indent=2, ensure_ascii=False))
    print(f"\nJSON salvato in {outfile}")
    
    # Stampa riepilogo per file
    from collections import Counter
    file_counts = Counter(t["file"] for t in all_texts)
    print("\nRiepilogo per file:")
    for f, c in sorted(file_counts.items(), key=lambda x: -x[1]):
        print(f"  {f}: {c}")


if __name__ == "__main__":
    main()

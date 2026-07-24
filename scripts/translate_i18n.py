#!/usr/bin/env python3
"""
DevQuest Translation Script (Gemini 3.1)
==========================================
Traduce le sfide IT→EN, IT→ES usando Gemini 3.1 Flash Lite.

Uso:
  python3 scripts/translate_i18n.py
"""

import os, re, json, sys, time

from google import genai

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY')
if not GEMINI_API_KEY:
    print("❌ GEMINI_API_KEY non trovata.")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)
MODEL = 'gemini-3.1-flash-lite'

FILES = [
    'lib/questions.ts',
    'lib/data/challenges_typescript.ts',
    'lib/data/challenges_git.ts',
]

RE_DOMANDA = re.compile(r'domanda:\s*"((?:[^"\\]|\\.)*)"')
RE_SUGGERIMENTO = re.compile(r'suggerimento:\s*"((?:[^"\\]|\\.)*)"')
RE_SPIEGAZIONE = re.compile(r'spiegazione:\s*"((?:[^"\\]|\\.)*)"')
RE_ID_DQ = re.compile(r'id:\s*"([^"]+)"')
RE_ID_SQ = re.compile(r"id:\s*'([^']+)'")


def extract_risposte(text):
    """Estrae valori da risposte: [\"a\", \"b\", ...] con bracket bilanciati."""
    m = re.search(r'risposte:\s*\[', text)
    if not m:
        return []
    start = m.end()
    depth = 1
    i = start
    in_str = None
    while i < len(text) and depth > 0:
        ch = text[i]
        if in_str:
            if ch == '\\':
                i += 2
                continue
            if ch == in_str:
                in_str = None
            i += 1
            continue
        if ch in ('"', "'"):
            in_str = ch
            i += 1
            continue
        if ch == '[':
            depth += 1
        elif ch == ']':
            depth -= 1
        i += 1
    inner = text[start:i-1]
    pat = re.compile(r'"((?:[^"\\]|\\.)*)"')
    return [g for g in pat.findall(inner) if g.strip()]


def extract_id(block):
    m = RE_ID_DQ.search(block)
    if m:
        return m.group(1)
    m = RE_ID_SQ.search(block)
    return m.group(1) if m else 'unk'


def extract_challenges(filepath):
    rel = os.path.relpath(filepath, ROOT_DIR)
    challenges = []
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    i = 0
    while i < len(content):
        brace = content.find('{', i)
        if brace == -1:
            break

        in_str = None
        depth = 0
        j = brace
        while j < len(content):
            ch = content[j]
            if in_str:
                if ch == '\\':
                    j += 2
                    continue
                if ch == in_str:
                    in_str = None
                j += 1
                continue
            if ch in ('"', "'"):
                in_str = ch
                j += 1
                continue
            if ch == '{':
                depth += 1
                j += 1
                continue
            if ch == '}':
                depth -= 1
                j += 1
                if depth == 0:
                    break
                continue
            j += 1

        block = content[brace:j]
        i = j

        if 'domanda' not in block:
            continue

        dom_m = RE_DOMANDA.search(block)
        if not dom_m:
            continue

        cid = extract_id(block)
        domanda = dom_m.group(1)
        sug_m = RE_SUGGERIMENTO.search(block)
        spi_m = RE_SPIEGAZIONE.search(block)
        suggerimento = sug_m.group(1) if sug_m else ''
        spiegazione = spi_m.group(1) if spi_m else ''
        risposte = extract_risposte(block)

        challenges.append({
            'id': cid,
            'domanda': domanda,
            'risposte': risposte,
            'suggerimento': suggerimento,
            'spiegazione': spiegazione,
            'block': block,
        })

    print(f"  → {rel}: {len(challenges)} challenges trovate")
    return challenges


def translate_batch(challenges, target_lang):
    lang_name = {'en': 'English', 'es': 'Spanish'}[target_lang]
    items = [{'id': c['id'], 'domanda': c['domanda'],
              'risposte': c['risposte'], 'suggerimento': c['suggerimento'],
              'spiegazione': c['spiegazione']} for c in challenges]

    prompt = (
        f"Translate these programming challenges from Italian to {lang_name}. "
        f"Keep code/variable names unchanged. "
        f"Return ONLY a JSON array where each object has: id, "
        f"domanda_{target_lang}, risposte_{target_lang} (array), "
        f"suggerimento_{target_lang}, spiegazione_{target_lang}\n"
        f"DO NOT wrap in markdown.\n\n"
        + json.dumps(items, ensure_ascii=False, indent=2)
    )

    for attempt in range(3):
        try:
            resp = client.models.generate_content(
                model=MODEL,
                contents=prompt,
                config={'temperature': 0.1, 'max_output_tokens': 8192},
            )
            text = resp.text.strip()
            if '```json' in text:
                text = text.split('```json')[1].split('```')[0].strip()
            elif '```' in text:
                text = text.split('```')[1].split('```')[0].strip()
            parsed = json.loads(text)
            return parsed if isinstance(parsed, list) else [parsed]
        except Exception as e:
            print(f"    ⚠️  Tentativo {attempt+1}: {e}")
            time.sleep(5)
    return []


def escape_ts(s):
    return s.replace("\\", "\\\\").replace('"', '\\"').replace('\n', '\\n')


def fmt_arr(items):
    return '[' + ', '.join(f'"{escape_ts(v)}"' for v in items) + ']'


def process_file(filepath):
    rel = os.path.relpath(filepath, ROOT_DIR)
    print(f"\n📁 {rel}")
    challenges = extract_challenges(filepath)
    if not challenges:
        print("  ✅ Nessuna traduzione necessaria.")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        orig = f.read()

    all_trans = {'en': {}, 'es': {}}

    for lang_code, lang_name in [('en', 'English'), ('es', 'Spanish')]:
        print(f"\n  🌐 Traduco in {lang_name} ({len(challenges)} sfide)...")
        for i in range(0, len(challenges), 3):
            batch = challenges[i:i+3]
            ids = [c['id'] for c in batch]
            print(f"    Batch {i//3+1}/{(len(challenges)+2)//3}: {', '.join(ids)}")
            results = translate_batch(batch, lang_code)
            for r in results:
                cid = r.get('id', '')
                all_trans[lang_code][cid] = r
            time.sleep(2)

    modified = orig
    count = 0
    for ch in challenges:
        cid = ch['id']
        en = all_trans['en'].get(cid, {})
        es = all_trans['es'].get(cid, {})
        old_block = ch['block']

        new_lines = []
        field_map = [
            ('domanda_en', en.get('domanda_en')),
            ('domanda_es', es.get('domanda_es')),
            ('risposte_en', en.get('risposte_en')),
            ('risposte_es', es.get('risposte_es')),
            ('suggerimento_en', en.get('suggerimento_en')),
            ('suggerimento_es', es.get('suggerimento_es')),
            ('spiegazione_en', en.get('spiegazione_en')),
            ('spiegazione_es', es.get('spiegazione_es')),
        ]
        for fname, fval in field_map:
            if not fval and fval != 0:
                continue
            if isinstance(fval, list):
                new_lines.append(f'    {fname}: {fmt_arr(fval)},')
            else:
                new_lines.append(f'    {fname}: "{escape_ts(str(fval))}",')

        if not new_lines:
            print(f"    ⚠️  {cid}: traduzione non ricevuta")
            continue

        lines = old_block.split('\n')
        last_idx = len(lines) - 1
        while last_idx >= 0 and lines[last_idx].strip() in ('},', '}', ''):
            last_idx -= 1
        insert_at = last_idx + 1
        new_block = '\n'.join(lines[:insert_at] + new_lines + lines[insert_at:])
        modified = modified.replace(old_block, new_block, 1)
        count += 1
        print(f"    ✅ {cid}: +{len(new_lines)} campi")

    with open(filepath + '.bak', 'w', encoding='utf-8') as f:
        f.write(orig)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(modified)
    print(f"  💾 {rel}: {count}/{len(challenges)} aggiornate")


def main():
    print("=" * 70)
    print(" 🌐 DEVQUEST IT→EN/ES con Gemini 3.1 Flash Lite")
    print("=" * 70)
    for f in FILES:
        fp = os.path.join(ROOT_DIR, f)
        if os.path.exists(fp):
            process_file(fp)
    print("\n✅ TRADUZIONE COMPLETATA!")


if __name__ == '__main__':
    main()
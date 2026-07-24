#!/usr/bin/env python3
import os, re, json, sys, time
from google import genai

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
client = genai.Client(api_key=os.environ['GEMINI_API_KEY'])

FILES = [
    'lib/challenges_docker.ts',
    'lib/challenges_postgres.ts',
    'lib/challenges_ai.ts',
]

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_challenge_blocks(content):
    """Return list of block strings that have an 'id' field."""
    blocks = []
    i = 0
    while True:
        brace = content.find('{', i)
        if brace == -1: break
        depth = 0; in_str = None; j = brace
        while j < len(content):
            ch = content[j]
            if in_str:
                if ch == '\\': j += 2; continue
                if ch == in_str: in_str = None; j += 1; continue
                j += 1; continue
            if ch in ('"', "'"): in_str = ch; j += 1; continue
            if ch == '{': depth += 1; j += 1; continue
            if ch == '}':
                depth -= 1; j += 1
                if depth == 0: break
                continue
            j += 1
        block = content[brace:j]
        i = j
        if re.search(rf'\bid\s*:\s*[\'"]', block):
            blocks.append(block)
    return blocks

def get_val(block, name):
    m = re.search(rf'{name}\s*:\s*"((?:[^"\\]|\\.)*)"', block)
    if m: return m.group(1)
    m = re.search(rf"{name}\s*:\s*'((?:[^'\\]|\\.)*)'", block)
    return m.group(1) if m else None

def has_field(block, name):
    return bool(re.search(rf'\b{name}\s*:', block))

def translate(items, target_lang, field_name):
    lang_name = {'en': 'English', 'es': 'Spanish'}[target_lang]
    prompt = (
        f"Translate these from Italian to {lang_name}. "
        f"Return ONLY a JSON array with 'id' and '{field_name}'. "
        f"Keep code/variables/tags unchanged. No markdown.\n\n"
        + json.dumps(items, ensure_ascii=False, indent=2)
    )
    for attempt in range(3):
        try:
            resp = client.models.generate_content(
                model='gemini-3.1-flash-lite',
                contents=prompt,
                config={'temperature': 0.1, 'max_output_tokens': 4096},
            )
            text = resp.text.strip()
            if '```json' in text:
                text = text.split('```json')[1].split('```')[0].strip()
            elif '```' in text:
                text = text.split('```')[1].split('```')[0].strip()
            return {r['id']: r[field_name] for r in json.loads(text)}
        except Exception as e:
            print(f"  tentativo {attempt+1}: {e}")
            time.sleep(5)
    return {}

def insert_field(content, anchor_name, new_field, value):
    """Insert `new_field: 'value'` after the anchor field line, using regex to locate it."""
    # Find the anchor field's position
    # We look for `anchor_name:` followed by a quoted string value (possibly multi-line but unlikely)
    # Using a regex that captures the whole line including trailing comma
    pat = re.compile(r'(\s+)' + re.escape(anchor_name) + r'\s*:\s*('
                     r'"((?:[^"\\]|\\.)*)"'
                     r'|'
                     r"'((?:[^'\\]|\\.)*)'"
                     r'),?\n')
    m = pat.search(content)
    if not m:
        # try without trailing comma
        pat = re.compile(r'(\s+)' + re.escape(anchor_name) + r'\s*:\s*('
                         r'"((?:[^"\\]|\\.)*)"'
                         r'|'
                         r"'((?:[^'\\]|\\.)*)'"
                         r')\s*\n')
        m = pat.search(content)
    if not m:
        return content, False
    indent = m.group(1)
    full_match = m.group(0)
    # escape value for TS string (single quotes, preserve inner)
    esc_val = value.replace('\\', '\\\\').replace("'", "\\'")
    insertion = f'{indent}{new_field}: \'{esc_val}\',\n'
    content = content.replace(full_match, full_match + insertion, 1)
    return content, True

def run(rel_path):
    path = os.path.join(ROOT_DIR, rel_path)
    content = read_file(path)
    blocks = extract_challenge_blocks(content)
    print(f"\n📁 {rel_path} ({len(blocks)} challenges)")

    for lang, suffix, field in [('es', 'es', 'hint'),
                                ('es', 'es', 'explanation'),
                                ('en', 'en', 'hint')]:
        target = f'{field}_{suffix}'
        if field == 'hint' and suffix == 'en' and 'ai' not in rel_path:
            continue

        need = []
        for b in blocks:
            cid = get_val(b, 'id')
            it_val = get_val(b, field)
            if it_val and not has_field(b, target):
                need.append({'id': cid, field: it_val})

        if not need:
            print(f"  {target}: nessuno mancante")
            continue

        print(f"  {target}: {len(need)} da tradurre")
        flag = {'en': '🇬🇧', 'es': '🇪🇸'}[lang]
        print(f"  {flag} traduco...")
        res = translate(need, lang, target)

        for item in need:
            cid = item['id']
            if cid not in res: continue
            # Determine anchor: for ES, prefer field_en if exists; for EN, use field
            if lang == 'es' and any(get_val(b, f'{field}_en') for b in blocks if get_val(b, 'id') == cid):
                anchor = f'{field}_en'
            else:
                anchor = field
            content, ok = insert_field(content, anchor, target, res[cid])
            if ok:
                print(f"    ✅ +{target} {cid}")
            else:
                print(f"    ⚠️ {cid}: {anchor} non trovato")
            # re-parse after each insertion to keep blocks fresh
            blocks = extract_challenge_blocks(content)

    write_file(path, content)
    print(f"  💾 salvato")

def main():
    print("=" * 60)
    print(" TRADUZIONE HINT/EXPLANATION MANCANTI")
    print("=" * 60)
    for f in FILES:
        run(f)
    print("\n✅ COMPLETATO!")

if __name__ == '__main__':
    main()

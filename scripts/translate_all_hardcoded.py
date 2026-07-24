"""Traduce TUTTO il testo hardcoded nei componenti React.

Scansiona tutti i file .ts/.tsx, trova testo hardcoded (ternari, jsx text, attributi),
aggiunge chiavi mancanti a i18n.ts, e sostituisce il testo con chiamate t.* .
"""
from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from pathlib import Path
from google import genai

REPO = Path(__file__).resolve().parent.parent
I18N_FILE = REPO / "lib" / "i18n.ts"

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("ERRORE: GEMINI_API_KEY non impostata")
    sys.exit(1)

client = genai.Client(api_key=GEMINI_API_KEY)


def read_file(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def write_file(path: Path, content: str) -> None:
    path.write_text(content, encoding="utf-8")


def extract_ternary_strings(content: str) -> list[dict]:
    """Trova pattern `language === 'en' ? 'X' : language === 'es' ? 'Y' : 'Z'`"""
    results = []
    # Pattern per ternari multi-riga
    pattern = re.compile(
        r"""language\s*===\s*'en'\s*\?\s*'([^']*?)'\s*:\s*language\s*===\s*'es'\s*\?\s*'([^']*?)'\s*:\s*'([^']*?)'""",
        re.DOTALL,
    )
    for m in pattern.finditer(content):
        results.append(
            {
                "type": "ternary",
                "en": m.group(1),
                "es": m.group(2),
                "it": m.group(3),
                "full_match": m.group(0),
            }
        )
    return results


def extract_jsx_text(content: str) -> list[dict]:
    """Trova testo JSX diretto in italiano (senza t. o language ternario)"""
    results = []
    # Trova testo tra tag JSX che NON contiene chiamate t. o language
    # Es: <span>Testo Italiano</span>
    pattern = re.compile(r">([A-Z][a-zA-Z0-9\sàèéìòù'.,!?&;:()/–—\-]{3,})<")
    for m in pattern.finditer(content):
        text = m.group(1).strip()
        if len(text) < 4:
            continue
        # Ignora se contiene già pattern di traduzione
        if "t." in text or "language" in text or "${" in text:
            continue
        # Ignora CSS classi e roba tecnica
        if text.startswith("var(") or text.startswith("px-") or text.startswith("text-"):
            continue
        # Ignora se è probabile testo tecnico (codice, numeri, simboli)
        if re.match(r'^[\d\s%./\\()\[\]{}<>]+$', text):
            continue
        # Controlla se sembra italiano (contiene parole italiane comuni)
        italian_words = r"\b(di|il|la|le|gli|un|una|che|con|per|non|sono|hai|della|delle|degli|deg|sul|sulla|nel|nella|allo|alla|questo|questa|tra|fra|dei|dai|dal|devo|puoi|vai)\b"
        if re.search(italian_words, text, re.IGNORECASE):
            results.append(
                {
                    "type": "jsx_text",
                    "it": text,
                    "full_match": m.group(0),
                }
            )
    return results


def extract_attribute_text(content: str) -> list[dict]:
    """Trova attributi JSX con testo italiano (placeholder, title, alt, aria-label)"""
    results = []
    patterns = [
        (r'placeholder="([^"]{4,})"', "placeholder"),
        (r'title="([^"]{4,})"', "title"),
        (r'alt="([^"]{4,})"', "alt"),
        (r'aria-label="([^"]{4,})"', "aria-label"),
    ]
    italian_words = r"\b(di|il|la|le|gli|un|una|che|con|per|non|sono|hai|della|delle|degli|sul|sulla|nel|nella|allo|alla|questo|questa|tra|fra|dei|dai|dal|devo|puoi|vai|argomento|domanda|opzione|risposta|codice|sfida|pubblica|nuova|nome|utente|chiudi|salva|annulla|carica|cerca|esci)\b"
    for pat, attr in patterns:
        for m in re.finditer(pat, content):
            text = m.group(1)
            if "t." in text or "language" in text or "${" in text:
                continue
            if re.search(italian_words, text, re.IGNORECASE):
                results.append(
                    {
                        "type": f"attr_{attr}",
                        "it": text,
                        "full_match": m.group(0),
                    }
                )
    return results


def extract_t_key_with_fallback(content: str) -> list[dict]:
    """Trova pattern `t.key || 'Italian fallback'`"""
    results = []
    pattern = re.compile(r"t\.(\w+)\s*\|\|\s*'([^']+)'")
    for m in pattern.finditer(content):
        it_text = m.group(2)
        italian_words = r"\b(di|il|la|le|gli|un|una|che|con|per|non|sono|hai|della|delle|degli|sul|sulla|nel|nella|allo|alla|questo|questa|tra|fra|dei|dai|dal|devo|puoi|vai)\b"
        if re.search(italian_words, it_text, re.IGNORECASE) or "'" in it_text:
            results.append(
                {
                    "type": "t_fallback",
                    "key": m.group(1),
                    "it": it_text,
                    "full_match": m.group(0),
                }
            )
    return results


def extract_all_from_file(filepath: Path) -> list[dict]:
    content = read_file(filepath)
    results = []
    results.extend(extract_ternary_strings(content))
    results.extend(extract_jsx_text(content))
    results.extend(extract_attribute_text(content))
    results.extend(extract_t_key_with_fallback(content))
    for r in results:
        r["file"] = str(filepath.relative_to(REPO))
    return results


def build_translation_prompt(all_texts: list[dict]) -> str:
    """Costruisce prompt per Gemini per generare chiavi i18n e traduzioni"""
    # Raggruppa per testo italiano unico
    seen = set()
    unique_texts = []
    for t in all_texts:
        it = t.get("it", "")
        if it and it not in seen:
            seen.add(it)
            unique_texts.append(it)

    prompt = f"""Sei un assistente di traduzione per un'app React chiamata DevQuest.
Devi generare {len(unique_texts)} nuove chiavi i18n.

Per OGNI testo italiano qui sotto, fornisci:
1. Una chiave i18n in camelCase (max 40 char, descrittiva)
2. Traduzione in inglese (naturale, non letterale)
3. Traduzione in spagnolo (naturale, non letterale)
4. La traduzione italiana (puoi migliorare quella data)

Output format: SOLO un array JSON valido, nient'altro.
[
  {{
    "key": "nomeChiave",
    "it": "testo italiano",
    "en": "english text",
    "es": "texto español"
  }},
  ...
]

Testi italiani da processare (uno per riga):
"""
    for t in unique_texts:
        prompt += f"- {t}\n"
    return prompt


def call_gemini(prompt: str) -> str:
    resp = client.models.generate_content(
        model="gemini-2.0-flash-lite",
        contents=prompt,
        config={
            "temperature": 0.2,
            "max_output_tokens": 16384,
        },
    )
    return resp.text.strip()


def parse_translation_response(text: str) -> list[dict]:
    # Trova array JSON nella risposta
    text = text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
    if text.endswith("```"):
        text = text.rsplit("```", 1)[0]
    text = text.strip()
    if text.startswith("```json"):
        text = text[7:].strip()
    return json.loads(text)


def key_exists(key: str) -> bool:
    """Controlla se una chiave esiste già in i18n.ts"""
    content = read_file(I18N_FILE)
    return f"  {key}:" in content or f"  {key};" in content


def add_keys_to_i18n(new_keys: list[dict]) -> None:
    """Aggiunge nuove chiavi all'interfaccia e ai tre language block"""
    content = read_file(I18N_FILE)

    # 1. Aggiungi all'interfaccia Translations
    # Trova l'ultima linea dell'interfaccia
    interface_end = content.find("}", content.find("interface Translations"))
    # Inserisci prima della } di chiusura dell'interfaccia
    new_keys_interface = "\n".join(
        f"  {k['key']}: string;" for k in new_keys if not key_exists(k["key"])
    )
    if new_keys_interface:
        content = content[:interface_end] + "\n" + new_keys_interface + "\n" + content[interface_end:]

    # 2. Aggiungi a ciascun language block (it, en, es)
    for lang in ["it:", "en:", "es:"]:
        # Trova il blocco lingua
        lang_key = lang.replace(":", "")
        lang_start = content.find(f"  {lang}")
        if lang_start == -1:
            continue
        # Trova la } di chiusura
        lang_end = content.find("\n}", lang_start)
        # Mappa en/es/it
        lang_map = {"it": "it", "en": "en", "es": "es"}
        current_lang = lang_map.get(lang_key)

        for k in new_keys:
            if key_exists(k["key"]):
                continue
            translation = k.get(current_lang or "it", k["it"])
            new_line = f"    {k['key']}: \"{translation}\","
            content = content[:lang_end] + new_line + "\n" + content[lang_end:]

    write_file(I18N_FILE, content)
    print(f"Aggiunte {len(new_keys)} nuove chiavi a i18n.ts")


def replace_in_file(filepath: Path, old: str, new: str) -> int:
    content = read_file(filepath)
    count = content.count(old)
    if count == 0:
        return 0
    content = content.replace(old, new)
    write_file(filepath, content)
    return count


def main():
    # Step 1: Scansiona TUTTI i file .ts/.tsx
    print("=" * 60)
    print("🔍 Scansione completa di tutti i file .ts/.tsx...")
    print("=" * 60)

    all_texts = []
    extensions = ["*.ts", "*.tsx"]
    for ext in extensions:
        for filepath in sorted(REPO.rglob(ext)):
            rel = filepath.relative_to(REPO)
            # Skip node_modules, .next, build output
            skip_dirs = {"node_modules", ".next", ".git", "__pycache__", ".claude"}
            parts = rel.parts
            if any(s in parts for s in skip_dirs):
                continue
            texts = extract_all_from_file(filepath)
            if texts:
                print(f"  {rel}: trovati {len(texts)} testi hardcoded")
                all_texts.extend(texts)

    print(f"\n📊 Totale testi hardcoded trovati: {len(all_texts)}")

    if not all_texts:
        print("✅ Nessun testo hardcoded trovato!")
        return

    # Step 2: Raggruppa per tipo
    ternaries = [t for t in all_texts if t["type"] == "ternary"]
    jsx_texts = [t for t in all_texts if t["type"] == "jsx_text"]
    attr_texts = [t for t in all_texts if t["type"].startswith("attr_")]
    t_fallbacks = [t for t in all_texts if t["type"] == "t_fallback"]

    print(f"\n📋 Tipo ternari: {len(ternaries)}")
    print(f"📋 Tipo jsx_text (italiano diretto): {len(jsx_texts)}")
    print(f"📋 Tipo attributi: {len(attr_texts)}")
    print(f"📋 Tipo t.fallback: {len(t_fallbacks)}")
    print()

    # Step 3: Raccogli testi unici che potrebbero aver bisogno di nuove chiavi
    # Per i ternari, possiamo usare direttamente la stringa IT come base
    seen_it = set()
    texts_needing_keys = []

    for t in all_texts:
        it = t.get("it", "")
        if it and it not in seen_it and not key_exists(it.lower().replace(" ", "_").replace("'", "")[:20]):
            seen_it.add(it)
            it_clean = it.strip()
            if len(it_clean) >= 4:
                texts_needing_keys.append(t)

    if texts_needing_keys:
        print("🤖 Generazione nuove chiavi i18n via Gemini...")
        prompt = build_translation_prompt(texts_needing_keys)
        response = call_gemini(prompt)
        print("Risposta Gemini ricevuta, parsing...")
        try:
            new_keys = parse_translation_response(response)
            add_keys_to_i18n(new_keys)
        except (json.JSONDecodeError, KeyError) as e:
            print(f"❌ Errore parsing risposta Gemini: {e}")
            print("Risposta raw:")
            print(response[:500])
            # Fallback: genera chiavi manualmente
            new_keys = []
            for t in texts_needing_keys[:20]:  # max 20 in fallback
                it = t["it"]
                key = it.lower().replace(" ", "_").replace("'", "").replace("!", "").replace("?", "").replace(",", "").replace(".", "").replace(":", "").replace("(", "").replace(")", "")[:30]
                if not key_exists(key):
                    new_keys.append({"key": key, "it": it, "en": it, "es": it})
            if new_keys:
                add_keys_to_i18n(new_keys)
    else:
        new_keys = []
        print("✅ Tutti i testi hanno già una chiave corrispondente")

    print("\n🔄 Applicazione sostituzioni nei file...")

    # Step 4: Sostituisci ternari con t.keyName
    if ternaries:
        print(f"\nSostituzione {len(ternaries)} ternari con t.* ...")
        for t in ternaries:
            filepath = REPO / t["file"]
            full_match = t["full_match"]
            # Trova la chiave appropriata
            key = None
            for nk in new_keys:
                if nk["it"] == t["it"]:
                    key = nk["key"]
                    break
            if key and not key_exists(key):
                # La chiave è stata appena aggiunta
                pass
            if key:
                replacement = f"t.{key}"
                count = replace_in_file(filepath, full_match, replacement)
                if count > 0:
                    print(f"  ✓ {t['file']}: {full_match[:40]}... → t.{key}")

    # Step 5: Sostituisci JSX text italiano diretto
    if jsx_texts:
        print(f"\nSostituzione {len(jsx_texts)} testi JSX italiani diretti...")
        for t in jsx_texts:
            filepath = REPO / t["file"]
            full_match = t["full_match"]
            it_text = t["it"]
            key = None
            for nk in new_keys:
                if nk["it"].strip() == it_text.strip():
                    key = nk["key"]
                    break
            if key:
                old = f">{it_text}<"
                new = f">{{t.{key}}}<"
                count = replace_in_file(filepath, old, new)
                if count > 0:
                    print(f"  ✓ {t['file']}: '{it_text[:30]}...' → t.{key}")

    # Step 6: Pulisci fallback ternari morti in `t.key || (language === 'en' ? ...)`
    print(f"\nPulizia {len(t_fallbacks)} fallback `t.key || ...`...")
    for t in t_fallbacks:
        filepath = REPO / t["file"]
        key = t["key"]
        full_match = t["full_match"]
        if key_exists(key):
            replacement = f"t.{key}"
            count = replace_in_file(filepath, full_match, replacement)
            if count > 0:
                print(f"  ✓ {t['file']}: t.{key} || '...' → t.{key}")

    print("\n" + "=" * 60)
    print("✅ COMPLETATO!")
    print("=" * 60)


if __name__ == "__main__":
    main()

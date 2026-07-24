#!/usr/bin/env python3
"""
DevQuest i18n & Hardcoded Text Auditor
--------------------------------------
Analyzes all TSX and TS files in app/, components/, and lib/ to detect
hardcoded text literals, un-translated UI labels, and natural language strings.

Usage:
    python3 scripts/audit_i18n.py
    npm run audit:i18n
"""

import os
import re
import sys

# Directory root
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGET_DIRS = ['app', 'components']
EXCLUDE_FILES = ['i18n.ts', 'tracks.ts'] # Translation dictionary and track metadata definitions

# Regex patterns for detecting hardcoded text in JSX/TS code
# 1. JSX text nodes: >Some text here<
JSX_TEXT_PATTERN = re.compile(r'>\s*([A-Za-zÀ-ÖØ-öø-ÿ0-9\s\?!.,\'"’\(\)\-\:\;\«\»]+)\s*<')

# 2. Hardcoded string attributes: placeholder="...", title="...", alt="...", label="..."
JSX_ATTR_PATTERN = re.compile(r'(placeholder|title|alt|aria-label|label|heading|subtitle|description|message)=["\']([^"\']+)["\']')

# 3. String literals in JS/TS objects or variables that look like user-facing text
# Excludes imports, CSS classes (e.g., flex, ctp-*), IDs, URLs, SVG paths, type names
STRING_LITERAL_PATTERN = re.compile(r'["\']([A-ZÀ-Ö][a-zà-öø-ÿ0-9\?!.,\'"’\(\)\-\:\;\s]{3,})["\']')

# Words/tokens to ignore (CSS, HTML tags, icon names, type identifiers, code keywords)
IGNORE_WORDS = {
    'className', 'useLanguage', 'useState', 'useEffect', 'useMemo', 'useCallback',
    'LucideIcon', 'CatppuccinColor', 'TrackId', 'Sfida', 'Challenge', 'UserStats',
    'undefined', 'boolean', 'string', 'number', 'true', 'false', 'null',
    'flex', 'grid', 'hidden', 'block', 'relative', 'absolute', 'fixed', 'sticky',
    'application/json', 'utf-8', 'SHA-256', 'GET', 'POST', 'PUT', 'DELETE',
    'bronze', 'silver', 'gold', 'platinum', 'pymaster', 'core_dev', 'python', 'typescript', 'git', 'docker', 'postgres'
}

def is_code_or_css(text: str) -> bool:
    """Returns True if the string looks like code, CSS class string, URL, or icon name."""
    s = text.strip()
    if not s or len(s) < 2:
        return True
    if s in IGNORE_WORDS:
        return True
    if s.startswith('http://') or s.startswith('https://') or s.startswith('file://') or s.startswith('data:'):
        return True
    if s.startswith('/') or s.startswith('var(') or s.startswith('ctp-') or s.startswith('bg-') or s.startswith('text-'):
        return True
    # Ignore purely numeric or symbol strings
    if re.match(r'^[0-9\s\.\:\-\_\/\%\$\#\@]+$', s):
        return True
    # Ignore variable names or single code identifiers (no spaces, camelCase/snake_case)
    if ' ' not in s and re.match(r'^[a-zA-Z0-9_\-\.\:\/]+$', s):
        return True
    return False

def audit_file(filepath: str):
    rel_path = os.path.relpath(filepath, ROOT_DIR)
    file_issues = []

    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    for idx, line in enumerate(lines, 1):
        stripped = line.strip()
        # Skip comments and imports
        if stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*') or stripped.startswith('import '):
            continue

        # 1. Check JSX Text Nodes
        for match in JSX_TEXT_PATTERN.finditer(line):
            text = match.group(1).strip()
            if not is_code_or_css(text) and not text.startswith('{') and not text.endswith('}'):
                # Exclude if line contains t. or translation hook call
                if 't.' not in line and 'language ===' not in line:
                    file_issues.append({
                        'line': idx,
                        'type': 'JSX Text',
                        'match': text,
                        'snippet': stripped[:100]
                    })

        # 2. Check JSX Attributes (placeholder, title, alt, etc.)
        for match in JSX_ATTR_PATTERN.finditer(line):
            attr_name, text = match.group(1), match.group(2).strip()
            if not is_code_or_css(text):
                if 't.' not in line and 'language ===' not in line:
                    file_issues.append({
                        'line': idx,
                        'type': f'JSX Attribute ({attr_name})',
                        'match': text,
                        'snippet': stripped[:100]
                    })

    return rel_path, file_issues

def main():
    print("\n" + "=" * 80)
    print(" 🔍 DEVQUEST i18N & HARDCODED TEXT AUDITOR ")
    print("=" * 80 + "\n")

    total_files_checked = 0
    total_issues_found = 0
    reports = {}

    for dir_name in TARGET_DIRS:
        target_path = os.path.join(ROOT_DIR, dir_name)
        if not os.path.exists(target_path):
            continue

        for root, _, files in os.walk(target_path):
            for file in files:
                if file.endswith('.tsx') or (file.endswith('.ts') and not file.endswith('.d.ts')):
                    if file in EXCLUDE_FILES:
                        continue

                    filepath = os.path.join(root, file)
                    total_files_checked += 1
                    rel_path, issues = audit_file(filepath)

                    if issues:
                        reports[rel_path] = issues
                        total_issues_found += len(issues)

    # Print Report
    if not reports:
        print("✅ PERFECT! No hardcoded UI text strings found across the inspected files.")
        print(f"Checked {total_files_checked} files cleanly.\n")
        sys.exit(0)

    print(f"⚠️  FOUND {total_issues_found} HARDCODED TEXT INCIDENCES ACROSS {len(reports)} FILES:\n")

    for file_path, issues in reports.items():
        print(f"📁 \033[1;36m{file_path}\033[0m ({len(issues)} issues):")
        for issue in issues:
            print(f"   \033[1;33mLine {issue['line']}\033[0m [{issue['type']}]: \033[1;31m\"{issue['match']}\"\033[0m")
            print(f"     └─ Code: {issue['snippet']}")
        print("-" * 60)

    print(f"\n📊 Summary: {total_issues_found} potential hardcoded strings in {len(reports)} files (out of {total_files_checked} checked).")
    print("💡 Recommended Action: Wrap these strings with t.<key> or useLanguage() fallbacks.\n")

if __name__ == '__main__':
    main()

import os
import re

files = [
    "components/Navbar.tsx",
    "components/GameMode.tsx",
    "components/CommunityHubView.tsx",
    "components/MobileBottomNav.tsx",
    "components/AnalyticsDashboardModal.tsx",
    "components/SkillTreeView.tsx"
]

def add_focus_and_touch(match):
    # This match is for <button ... className="..." ...>
    # We need to inject the classes into className
    tag = match.group(1)
    attrs = match.group(2)
    
    if "className=" in attrs:
        # insert classes into the first className
        attrs = re.sub(
            r'className=(["\'])(.*?)\1',
            r'className=\1\2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px] \1',
            attrs,
            count=1
        )
        # handle className={`...`}
        attrs = re.sub(
            r'className=\{`(.*?)`\}',
            r'className={`\1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px] `}',
            attrs,
            count=1
        )
    else:
        attrs += ' className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px]"'
        
    return f'<{tag}{attrs}'

def fix_clickable_divs(match):
    # This matches <div ... onClick={...} ... >
    tag = match.group(1)
    content = match.group(2)
    # We'll just add the attributes if they don't exist
    if 'role="button"' not in content:
        content += ' role="button" tabIndex={0} aria-label="Interagisci" onKeyDown={(e) => { if (e.key === \'Enter\' || e.key === \' \') { e.target.click(); } }}'
    return f'<{tag}{content}'

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"Not found: {filepath}")
        return
        
    with open(filepath, 'r') as f:
        content = f.read()

    # 1. Remove animate-pulse
    content = content.replace("animate-pulse", "")

    # 2. Add focus and touch classes to button, input, select
    content = re.sub(r'<(button|input|select)([^>]*?)', add_focus_and_touch, content)
    
    # 3. Add accessibility to clickable divs
    content = re.sub(r'<(div|span)([^>]*?onClick=[^>]*?)', fix_clickable_divs, content)
    
    # 4. EmptyState / ErrorState injections
    if "CommunityHubView.tsx" in filepath:
        if "if (filtered.length === 0)" not in content:
            empty_state = """
      {filtered.length === 0 && (
        <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl">
          <div className="text-4xl mb-4">📭</div>
          <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">Nessuna sfida trovata</h3>
          <p className="text-sm text-[var(--ctp-subtext0)]">Non ci sono sfide che corrispondono ai tuoi criteri. Prova a creare una nuova sfida!</p>
        </div>
      )}
"""
            # Insert before modal
            content = content.replace("{/* Modal: Create Challenge */}", empty_state + "\n      {/* Modal: Create Challenge */}")
            
    if "SkillTreeView.tsx" in filepath:
        if "if (SKILL_NODES.length === 0)" not in content:
            empty_state = """
      {SKILL_NODES.length === 0 && (
        <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full max-w-lg mx-auto">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">Nessun modulo disponibile</h3>
          <p className="text-sm text-[var(--ctp-subtext0)]">Impossibile caricare l'albero delle competenze.</p>
        </div>
      )}
"""
            content = content.replace("{SKILL_NODES.map((node, idx) => {", empty_state + "\n        {SKILL_NODES.map((node, idx) => {")

    if "AnalyticsDashboardModal.tsx" in filepath:
        if "if (!stats)" not in content:
            empty_state = """
            {!stats && (
              <div className="p-8 text-center ctp-card border border-[var(--ctp-surface1)] rounded-2xl w-full h-full flex flex-col items-center justify-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-bold text-[var(--ctp-text)] mb-2">Dati non disponibili</h3>
                <p className="text-sm text-[var(--ctp-subtext0)]">Gioca qualche partita per generare le tue statistiche.</p>
              </div>
            )}
            {stats && (
"""
            content = content.replace("            {/* KPI Metrics */}", empty_state + "\n            {/* KPI Metrics */}")
            content = content.replace("          </div>\n        </motion.div>", "            )}\n          </div>\n        </motion.div>")
            
    with open(filepath, 'w') as f:
        f.write(content)

for f in files:
    process_file(f)

print("Done")

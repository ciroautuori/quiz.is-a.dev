import re
import os

def fix_navbar():
    with open("components/Navbar.tsx", "r") as f:
        content = f.read()

    # Fix double className in tags
    # <button className="focus-visible:..." ... className="..."
    content = re.sub(
        r'(<(?:button|input|select))\s+className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-\[var\(--ctp-mauve\)\] min-h-\[44px\] min-w-\[44px\]"(.*?className=["`].*?["`])',
        r'\1\2', # wait, this just removes the focus-visible from the bad injection. Let me instead merge them.
        content,
        flags=re.DOTALL
    )

    # Let's write a better cleaner that fixes double classNames
    def merge_classnames(match):
        tag = match.group(0)
        # Find all className attributes
        classnames = re.findall(r'className=(["`])(.*?)\1', tag, flags=re.DOTALL)
        if len(classnames) > 1:
            merged = " ".join([c[1].strip() for c in classnames])
            # remove all classNames
            tag = re.sub(r'\s*className=(["`]).*?\1', '', tag, flags=re.DOTALL)
            # add merged
            return f'{tag.rstrip(">")} className="{merged}">'
        return tag

    content = re.sub(r'<(button|input|select)[^>]*>', merge_classnames, content, flags=re.DOTALL)

    # Fix onClick= role="button" ... {() => ...}
    content = re.sub(
        r'onClick=\s*role="button".*?onKeyDown=\{.*?\}\s*(\{.*?\})',
        r'onClick=\1 role="button" tabIndex={0} aria-label="Interagisci" onKeyDown={(e) => { if (e.key === \'Enter\' || e.key === \' \') { e.target.click(); } }}',
        content,
        flags=re.DOTALL
    )

    with open("components/Navbar.tsx", "w") as f:
        f.write(content)


def fix_analytics():
    with open("components/AnalyticsDashboardModal.tsx", "r") as f:
        content = f.read()

    # Fix double classNames just in case
    def merge_classnames(match):
        tag = match.group(0)
        classnames = re.findall(r'className=(["`])(.*?)\1', tag, flags=re.DOTALL)
        if len(classnames) > 1:
            merged = " ".join([c[1].strip() for c in classnames])
            tag = re.sub(r'\s*className=(["`]).*?\1', '', tag, flags=re.DOTALL)
            return f'{tag.rstrip(">")} className="{merged}">'
        return tag

    content = re.sub(r'<(button|input|select)[^>]*>', merge_classnames, content, flags=re.DOTALL)

    with open("components/AnalyticsDashboardModal.tsx", "w") as f:
        f.write(content)

fix_navbar()
fix_analytics()

for file in ["components/GameMode.tsx", "components/CommunityHubView.tsx", "components/MobileBottomNav.tsx", "components/SkillTreeView.tsx"]:
    with open(file, "r") as f:
        content = f.read()
    
    def merge_classnames(match):
        tag = match.group(0)
        classnames = re.findall(r'className=(["`])(.*?)\1', tag, flags=re.DOTALL)
        if len(classnames) > 1:
            merged = " ".join([c[1].strip() for c in classnames])
            tag = re.sub(r'\s*className=(["`]).*?\1', '', tag, flags=re.DOTALL)
            return f'{tag.rstrip(">")} className="{merged}">'
        return tag

    content = re.sub(r'<(button|input|select)[^>]*>', merge_classnames, content, flags=re.DOTALL)

    content = re.sub(
        r'onClick=\s*role="button".*?onKeyDown=\{.*?\}\s*(\{.*?\})',
        r'onClick=\1 role="button" tabIndex={0} aria-label="Interagisci" onKeyDown={(e) => { if (e.key === \'Enter\' || e.key === \' \') { e.target.click(); } }}',
        content,
        flags=re.DOTALL
    )
    with open(file, "w") as f:
        f.write(content)


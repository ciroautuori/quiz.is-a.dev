const fs = require('fs');

const filesToFix = [
  'components/CommunityHubView.tsx',
  'components/GameMode.tsx',
  'components/MobileBottomNav.tsx',
  'components/SkillTreeView.tsx'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find elements with two className attributes.
    // A simple approach: remove `className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px] min-w-[44px]"`
    // and `className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ctp-mauve)] min-h-[44px]"`
    // if there is another className in the same tag.
    
    content = content.replace(/className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-\[var\(--ctp-mauve\)\][^"]*"\s*/g, '');
    
    // Also remove any remaining duplicates manually if the regex didn't catch them
    // Actually, let's just do a generic deduplication of className attributes per tag if they are simple.
    
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed classNames');

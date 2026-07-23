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
    content = content.replace(/className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-\[var\(--ctp-mauve\)\][^"]*"\s*/g, '');
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed classNames');

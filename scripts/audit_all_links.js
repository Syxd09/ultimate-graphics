const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';
const allLinks = new Set();
const linkSources = {};

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  const data = JSON.parse(fs.readFileSync(path.join(rawDir, file), 'utf8'));
  const full = (data.mainHtml || '') + (data.scripts || '');
  
  const hrefRegex = /href="([^"#\?]+)(?:\?[^"]*)?(?:#[^"]*)?"/g;
  let match;
  while ((match = hrefRegex.exec(full)) !== null) {
    const link = match[1];
    allLinks.add(link);
    if (!linkSources[link]) linkSources[link] = [];
    if (!linkSources[link].includes(file)) linkSources[link].push(file);
  }
}

console.log('--- ALL UNIQUE LINKS FOUND IN RAW DATA ---');
Array.from(allLinks).sort().forEach(l => {
  console.log(`${l} (in: ${linkSources[l].slice(0, 3).join(', ')}${linkSources[l].length > 3 ? '...' : ''})`);
});


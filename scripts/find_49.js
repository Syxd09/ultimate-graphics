const fs = require('fs');
const path = require('path');

function search(dir, str) {
  for (const f of fs.readdirSync(dir)) {
    if (['node_modules', '.next', '.git'].includes(f)) continue;
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) search(p, str);
    else if (f.endsWith('.json') || f.endsWith('.mjs') || f.endsWith('.tsx') || f.endsWith('.ts')) {
      const txt = fs.readFileSync(p, 'utf8');
      if (txt.includes(str)) {
        console.log(str, 'found in', p);
      }
    }
  }
}

search('E:/mattis/public/sites', '4.9');
search('E:/mattis/app', '4.9');
search('E:/mattis/public/sites', 'trustpilot');
search('E:/mattis/app', 'trustpilot');


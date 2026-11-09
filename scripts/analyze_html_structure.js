const fs = require('fs');

const home = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8'));
const full = home.mainHtml + home.scripts;

console.log('Total combined length:', full.length);
console.log('Contains id="main":', full.includes('id="main"'));

// Let's find all script tags and non-script regions in full
let pos = 0;
const scripts = [];
const nonScripts = [];

const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let lastIndex = 0;

while ((match = scriptRegex.exec(full)) !== null) {
  if (match.index > lastIndex) {
    nonScripts.push({
      start: lastIndex,
      end: match.index,
      length: match.index - lastIndex,
      snippet: full.slice(lastIndex, lastIndex + 80).replace(/\n/g, ' ')
    });
  }
  scripts.push({
    start: match.index,
    end: scriptRegex.lastIndex,
    length: match[0].length,
    tag: match[0].slice(0, 80).replace(/\n/g, ' ')
  });
  lastIndex = scriptRegex.lastIndex;
}

if (lastIndex < full.length) {
  nonScripts.push({
    start: lastIndex,
    end: full.length,
    length: full.length - lastIndex,
    snippet: full.slice(lastIndex, lastIndex + 80).replace(/\n/g, ' ')
  });
}

console.log('\n--- NON-SCRIPT BLOCKS ---');
nonScripts.forEach((b, i) => {
  console.log(`Block ${i}: start=${b.start}, end=${b.end}, len=${b.length}`);
  console.log(`   Sample: ${b.snippet}`);
});

console.log('\n--- SCRIPT BLOCKS ---');
scripts.forEach((s, i) => {
  console.log(`Script ${i}: start=${s.start}, end=${s.end}, len=${s.length}`);
  console.log(`   Tag: ${s.tag}`);
});


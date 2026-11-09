const fs = require('fs');

const home = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8'));
const full = home.mainHtml + home.scripts;

console.log('--- Block 5 Content (687765 to 689093) ---');
console.log(full.slice(687765, 689093));

console.log('\n--- What comes around 689093 ---');
console.log(full.slice(689000, 689200));

console.log('\n--- Where is the closing tag for id="main" ---');
// id="main" is the root element. Let's find where it ends.
// In Framer, <div id="main" ...> ... </div> is followed by badge container or scripts.
const badgeIdx = full.indexOf('__framer-badge-container');
console.log('badgeIdx:', badgeIdx);
console.log('Before badge:', full.slice(badgeIdx - 100, badgeIdx));


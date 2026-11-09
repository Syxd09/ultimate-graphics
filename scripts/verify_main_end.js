const fs = require('fs');

const home = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8'));
const full = (home.mainHtml || '') + (home.scripts || '');
const animIdx = full.indexOf('<script>var animator=');

console.log('Last 200 chars before animIdx:');
console.log(full.slice(animIdx - 200, animIdx));


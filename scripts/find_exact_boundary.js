const fs = require('fs');

const home = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8'));
const full = home.mainHtml + home.scripts;

// Let's find animator script
const animIdx = full.indexOf('<script>var animator=');
console.log('animator index:', animIdx);
console.log('Before animator (150 chars):');
console.log(full.slice(animIdx - 150, animIdx));

// Let's check where the svg-templates is
const svgIdx = full.indexOf('id="svg-templates"');
console.log('svg-templates index:', svgIdx);
const svgDivStart = full.lastIndexOf('<div', svgIdx);
console.log('svg-templates starts at:', svgDivStart);
console.log('Before svg-templates (150 chars):');
console.log(full.slice(svgDivStart - 150, svgDivStart));

// Let's check where svg-templates ends
const svgEnd = full.lastIndexOf('</div>');
console.log('svg-templates ends at:', svgEnd + 6);
console.log('After svgEnd (150 chars):');
console.log(full.slice(svgEnd + 6, svgEnd + 200));


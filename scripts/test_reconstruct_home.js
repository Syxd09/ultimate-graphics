const fs = require('fs');

const home = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8'));
const full = (home.mainHtml || '') + (home.scripts || '');

const animIdx = full.indexOf('<script>var animator=');
const handoverIdx = full.indexOf('__framer__handoverData');
const scriptEnd = full.indexOf('</script>', handoverIdx) + 9;

const svgIdx = full.indexOf('id="svg-templates"');
const svgStart = full.lastIndexOf('<div', svgIdx);
const svgEnd = full.lastIndexOf('</div>') + 6;

const cleanMain = full.slice(0, animIdx).trim();
const cleanScripts = full.slice(animIdx, scriptEnd).trim();
const cleanSvg = full.slice(svgStart, svgEnd).trim();

const completeMainHtml = cleanMain + '\n' + cleanSvg;

console.log('cleanMain length:', cleanMain.length);
console.log('cleanMain starts with:', cleanMain.slice(0, 50));
console.log('cleanMain ends with:', cleanMain.slice(-50));

console.log('cleanSvg length:', cleanSvg.length);
console.log('cleanSvg starts with:', cleanSvg.slice(0, 50));
console.log('cleanSvg ends with:', cleanSvg.slice(-50));

console.log('cleanScripts length:', cleanScripts.length);
console.log('cleanScripts starts with:', cleanScripts.slice(0, 50));
console.log('cleanScripts ends with:', cleanScripts.slice(-50));

// Check if any non-script is in cleanScripts
const nonScriptInScripts = cleanScripts.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').trim();
console.log('Any non-script in cleanScripts length:', nonScriptInScripts.length);
if (nonScriptInScripts.length > 0) {
  console.log('Sample non-script in cleanScripts:', nonScriptInScripts.slice(0, 200));
}


const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  const filePath = path.join(rawDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const full = (data.mainHtml || '') + (data.scripts || '');
  
  const animIdx = full.indexOf('<script>var animator=');
  if (animIdx === -1) {
    console.log(`[WARN] ${file} does not have animator script!`);
    continue;
  }
  
  const handoverIdx = full.indexOf('__framer__handoverData');
  let scriptEnd = -1;
  if (handoverIdx !== -1) {
    scriptEnd = full.indexOf('</script>', handoverIdx) + 9;
  } else {
    // If no handover data, find last script tag
    scriptEnd = full.lastIndexOf('</script>') + 9;
  }
  
  const cleanMain = full.slice(0, animIdx).trim();
  const cleanScripts = full.slice(animIdx, scriptEnd).trim();
  
  let cleanSvg = '';
  const svgIdx = full.indexOf('id="svg-templates"');
  if (svgIdx !== -1) {
    const svgStart = full.lastIndexOf('<div', svgIdx);
    const svgEnd = full.lastIndexOf('</div>') + 6;
    cleanSvg = full.slice(svgStart, svgEnd).trim();
  }
  
  const endsWithDiv = cleanMain.endsWith('</div>');
  console.log(`${file}: cleanMain=${cleanMain.length} (ends with </div>: ${endsWithDiv}), svgs=${cleanSvg.length}, scripts=${cleanScripts.length}`);
}


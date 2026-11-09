const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  const data = JSON.parse(fs.readFileSync(path.join(rawDir, file), 'utf8'));
  const full = (data.mainHtml || '') + (data.scripts || '');
  
  // Find animator
  const animIdx = full.indexOf('<script>var animator=');
  // Find handover end
  const handoverIdx = full.indexOf('__framer__handoverData');
  let scriptEnd = -1;
  if (handoverIdx !== -1) {
    scriptEnd = full.indexOf('</script>', handoverIdx) + 9;
  }
  
  // Find svg-templates
  const svgIdx = full.indexOf('id="svg-templates"');
  let svgStart = -1;
  let svgEnd = -1;
  if (svgIdx !== -1) {
    svgStart = full.lastIndexOf('<div', svgIdx);
    svgEnd = full.lastIndexOf('</div>') + 6;
  }
  
  console.log(`${file}:`);
  console.log(`   full: ${full.length}`);
  console.log(`   animIdx: ${animIdx}, scriptEnd: ${scriptEnd}, svgStart: ${svgStart}, svgEnd: ${svgEnd}`);
}


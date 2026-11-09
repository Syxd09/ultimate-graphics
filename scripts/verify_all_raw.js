const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json')) continue;
  const data = JSON.parse(fs.readFileSync(path.join(rawDir, file), 'utf8'));
  const full = data.mainHtml + data.scripts;
  
  const hasMainOpen = full.includes('id="main"');
  const hasSvgTemplates = full.includes('id="svg-templates"');
  const hasBundle = full.includes('data-framer-bundle="main"');
  const hasHandover = full.includes('__framer__handoverData');
  
  console.log(`${file}: length=${full.length}, main=${hasMainOpen}, svgs=${hasSvgTemplates}, bundle=${hasBundle}, handover=${hasHandover}`);
}


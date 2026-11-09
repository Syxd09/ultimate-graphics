const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  const filePath = path.join(rawDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const full = (data.mainHtml || '') + (data.scripts || '');
  
  // Find where svg-templates starts (if any)
  let svgStart = -1;
  let svgEnd = -1;
  const svgIdx = full.indexOf('id="svg-templates"');
  if (svgIdx !== -1) {
    svgStart = full.lastIndexOf('<div', svgIdx);
    svgEnd = full.lastIndexOf('</div>') + 6;
  }
  
  // The HTML part before scripts:
  // The first script that is NOT an inline form script.
  // We know Framer scripts start around <script>var animator= or <script src="/scripts/lenis.min.js"> or <script>try{if(localStorage.getItem("__framer_
  let scriptBoundary = full.indexOf('<script>var animator=');
  if (scriptBoundary === -1) {
    scriptBoundary = full.indexOf('<script src="/scripts/lenis.min.js">');
  }
  // Check if there are scripts before animator (like lenis or framer_variant) right after the main div
  const lastDivBefore = full.lastIndexOf('</div>', scriptBoundary);
  const mainEnd = lastDivBefore + 6;
  
  const cleanMain = full.slice(0, mainEnd).trim();
  const cleanSvg = svgStart !== -1 ? full.slice(svgStart, svgEnd).trim() : '';
  const cleanScripts = svgStart !== -1 ? full.slice(mainEnd, svgStart).trim() : full.slice(mainEnd).trim();
  
  console.log(`${file}:`);
  console.log(`   cleanMain: ${cleanMain.length} chars (starts with ${cleanMain.slice(0, 15)}... ends with ...${cleanMain.slice(-15)})`);
  console.log(`   cleanSvg: ${cleanSvg.length}`);
  console.log(`   cleanScripts: ${cleanScripts.length} chars (starts with ${cleanScripts.slice(0, 20)}... ends with ...${cleanScripts.slice(-20)})`);
}


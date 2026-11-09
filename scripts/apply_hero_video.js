const fs = require('fs');
const path = require('path');

// 1. Update AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs
const agsFile = 'E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs';
let agsCode = fs.readFileSync(agsFile, 'utf8');
if (agsCode.includes('/assets/YUc1UMqfu6cFqEbpKpI1dpKqoes.mp4')) {
  agsCode = agsCode.replace(
    /\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4(?:\?v=\d+)?/g,
    '/assets/laser-cutting-hero.mp4?v=laser_20261110'
  );
  fs.writeFileSync(agsFile, agsCode, 'utf8');
  console.log('[1] Updated AGS0...mjs with laser-cutting-hero.mp4');
} else {
  console.log('[1] Note: /assets/YUc1UMqfu6cFqEbpKpI1dpKqoes.mp4 not found in AGS0...mjs');
}

// 2. Update script_main.fMOsSwwF.mjs import version
const scriptMainFile = 'E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/script_main.fMOsSwwF.mjs';
let scriptMainCode = fs.readFileSync(scriptMainFile, 'utf8');
if (scriptMainCode.includes('AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=')) {
  scriptMainCode = scriptMainCode.replace(
    /AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY\.Bj3MjilI\.mjs\?v=[a-zA-Z0-9_]+/g,
    'AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=laser_hero_v1'
  );
  fs.writeFileSync(scriptMainFile, scriptMainCode, 'utf8');
  console.log('[2] Updated script_main...mjs import query param to laser_hero_v1');
}

// 3. Update lib/raw-data.ts
const rawDataFile = 'E:/mattis/lib/raw-data.ts';
let rawDataCode = fs.readFileSync(rawDataFile, 'utf8');
rawDataCode = rawDataCode
  .replace(
    /\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4(?!\?)/g,
    '/assets/laser-cutting-hero.mp4?v=laser_20261110'
  )
  .replace(
    /\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4\?v=2/g,
    '/assets/laser-cutting-hero.mp4?v=laser_20261110'
  )
  .replace(
    /script_main\.fMOsSwwF\.mjs\?v=signage_2hr_v3/g,
    'script_main.fMOsSwwF.mjs?v=laser_hero_v1'
  );
fs.writeFileSync(rawDataFile, rawDataCode, 'utf8');
console.log('[3] Updated lib/raw-data.ts');

// 4. Update next.config.mjs
const nextConfigFile = 'E:/mattis/next.config.mjs';
let nextConfigCode = fs.readFileSync(nextConfigFile, 'utf8');
if (!nextConfigCode.includes('/assets/laser-cutting-hero.mp4')) {
  const insertTarget = '      {\n        source: "/assets/YUc1UMqfu6cFqEbpKpI1dpKqoes.mp4",';
  const newHeader = `      {\n        source: "/assets/laser-cutting-hero.mp4",\n        headers: [\n          {\n            key: "Cache-Control",\n            value: "no-store, no-cache, must-revalidate",\n          },\n          {\n            key: "Accept-Ranges",\n            value: "bytes",\n          },\n          {\n            key: "Access-Control-Allow-Origin",\n            value: "*",\n          },\n          {\n            key: "Access-Control-Allow-Methods",\n            value: "GET, HEAD, OPTIONS",\n          },\n          {\n            key: "Access-Control-Allow-Headers",\n            value: "Range, Origin, Content-Type, Accept",\n          },\n        ],\n      },\n`;
  nextConfigCode = nextConfigCode.replace(insertTarget, newHeader + insertTarget);
  fs.writeFileSync(nextConfigFile, nextConfigCode, 'utf8');
  console.log('[4] Updated next.config.mjs with laser-cutting-hero.mp4 headers');
} else {
  console.log('[4] next.config.mjs already has laser-cutting-hero.mp4');
}

console.log('All hero video replacements executed successfully.');


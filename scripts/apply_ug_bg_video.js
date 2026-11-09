const fs = require('fs');

// 1. Update AGS0...mjs
const agsFile = 'E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs';
let agsCode = fs.readFileSync(agsFile, 'utf8');
agsCode = agsCode.replace(
  /\/assets\/(?:laser-cutting-hero|YUc1UMqfu6cFqEbpKpI1dpKqoes)\.mp4(?:\?[^`"']+)?/g,
  '/assets/ug-background-video.mp4?v=ug_bg_v2'
);
fs.writeFileSync(agsFile, agsCode, 'utf8');
console.log('[1] Updated AGS0...mjs with ug-background-video.mp4?v=ug_bg_v2');

// 2. Update script_main.fMOsSwwF.mjs
const scriptMainFile = 'E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/script_main.fMOsSwwF.mjs';
let scriptMainCode = fs.readFileSync(scriptMainFile, 'utf8');
scriptMainCode = scriptMainCode.replace(
  /AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY\.Bj3MjilI\.mjs\?v=[a-zA-Z0-9_]+/g,
  'AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=ug_bg_v2'
);
fs.writeFileSync(scriptMainFile, scriptMainCode, 'utf8');
console.log('[2] Updated script_main...mjs query param to ug_bg_v2');

// 3. Update lib/raw-data.ts
const rawDataFile = 'E:/mattis/lib/raw-data.ts';
let rawDataCode = fs.readFileSync(rawDataFile, 'utf8');
rawDataCode = rawDataCode
  .replace(
    /\/assets\/(?:laser-cutting-hero|YUc1UMqfu6cFqEbpKpI1dpKqoes)\.mp4(?:\?[^"'\s]+)?/g,
    '/assets/ug-background-video.mp4?v=ug_bg_v2'
  )
  .replace(
    /script_main\.fMOsSwwF\.mjs\?v=[a-zA-Z0-9_]+/g,
    'script_main.fMOsSwwF.mjs?v=ug_bg_v2'
  );
fs.writeFileSync(rawDataFile, rawDataCode, 'utf8');
console.log('[3] Updated lib/raw-data.ts');

// 4. Update next.config.mjs
const nextConfigFile = 'E:/mattis/next.config.mjs';
let nextConfigCode = fs.readFileSync(nextConfigFile, 'utf8');
if (!nextConfigCode.includes('/assets/ug-background-video.mp4')) {
  const insertTarget = '      {\n        source: "/assets/laser-cutting-hero.mp4",';
  const newHeader = `      {\n        source: "/assets/ug-background-video.mp4",\n        headers: [\n          {\n            key: "Cache-Control",\n            value: "no-store, no-cache, must-revalidate",\n          },\n          {\n            key: "Accept-Ranges",\n            value: "bytes",\n          },\n          {\n            key: "Access-Control-Allow-Origin",\n            value: "*",\n          },\n          {\n            key: "Access-Control-Allow-Methods",\n            value: "GET, HEAD, OPTIONS",\n          },\n          {\n            key: "Access-Control-Allow-Headers",\n            value: "Range, Origin, Content-Type, Accept",\n          },\n        ],\n      },\n`;
  nextConfigCode = nextConfigCode.replace(insertTarget, newHeader + insertTarget);
  fs.writeFileSync(nextConfigFile, nextConfigCode, 'utf8');
  console.log('[4] Updated next.config.mjs with ug-background-video.mp4 headers');
} else {
  console.log('[4] next.config.mjs already has ug-background-video.mp4');
}

// 5. Update reconstruct_all_raw_pages.js
const reconstructFile = 'E:/mattis/scripts/reconstruct_all_raw_pages.js';
let reconstructCode = fs.readFileSync(reconstructFile, 'utf8');
reconstructCode = reconstructCode.replace(
  /\/assets\/(?:laser-cutting-hero|YUc1UMqfu6cFqEbpKpI1dpKqoes)\.mp4(?:\?[^"'\s]+)?/g,
  '/assets/ug-background-video.mp4?v=ug_bg_v2'
);
fs.writeFileSync(reconstructFile, reconstructCode, 'utf8');
console.log('[5] Updated reconstruct_all_raw_pages.js');

console.log('All updates complete.');


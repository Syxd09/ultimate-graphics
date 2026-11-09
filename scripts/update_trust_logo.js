const fs = require('fs');

// 1. Update AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs
const ags0Path = 'public/sites/3g9GswFgsc7j265E0PdXzi/AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs';
let ags0 = fs.readFileSync(ags0Path, 'utf8');

// Replace image source
ags0 = ags0.replaceAll('/images/zEI0hdyA7XwBgF3OgjoRGPVMk.jpg?width=397&height=400', '/images/ug-monogram-gradient.jpg?width=397&height=400&v=ug_monogram_v1');

// Replace SVG string
const svgRegex = /svg:`<svg width="52" height="25" viewBox="0 0 52 25" fill="none" xmlns="http:\/\/www\.w3\.org\/2000\/svg">[\s\S]*?<\/svg>\s*`/g;
if (svgRegex.test(ags0)) {
  ags0 = ags0.replace(svgRegex, 'svg:`<svg width="0" height="0"></svg>`');
  console.log('[AGS0] SVG replaced with empty svg');
} else {
  console.log('[AGS0] Warning: svgRegex did not match');
}

// Update CSS rules in AGS0
const oldCss1 = '.framer-bJAYi .framer-tp2f93 { flex: none; height: 27px; position: relative; width: 56px; z-index: 2; }';
if (ags0.includes(oldCss1)) {
  ags0 = ags0.replace(oldCss1, '.framer-bJAYi .framer-tp2f93 { display: none !important; }');
  console.log('[AGS0] oldCss1 replaced');
} else {
  console.log('[AGS0] Warning: oldCss1 not found');
}

const oldCss2 = '.framer-bJAYi .framer-1r7f32 { -webkit-filter: brightness(0.74); bottom: 0px; filter: brightness(0.74); flex: none; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; z-index: 1; }';
if (ags0.includes(oldCss2)) {
  ags0 = ags0.replace(oldCss2, '.framer-bJAYi .framer-1r7f32 { -webkit-filter: none; bottom: 0px; filter: none; flex: none; left: 0px; overflow: visible; position: absolute; right: 0px; top: 0px; z-index: 1; }');
  console.log('[AGS0] oldCss2 replaced');
} else {
  console.log('[AGS0] Warning: oldCss2 not found');
}

fs.writeFileSync(ags0Path, ags0, 'utf8');
console.log('[AGS0] Successfully updated');

// 2. Update script_main.fMOsSwwF.mjs
const scriptMainPath = 'public/sites/3g9GswFgsc7j265E0PdXzi/script_main.fMOsSwwF.mjs';
let scriptMain = fs.readFileSync(scriptMainPath, 'utf8');
if (scriptMain.includes('AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=ug_bg_v2')) {
  scriptMain = scriptMain.replace('AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=ug_bg_v2', 'AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs?v=ug_logo_v3');
  console.log('[script_main] Updated AGS0 cache query to v3');
} else {
  console.log('[script_main] Warning: AGS0 import target string not matched');
}
fs.writeFileSync(scriptMainPath, scriptMain, 'utf8');

// 3. Update app/_raw/home.json
const homePath = 'app/_raw/home.json';
let home = fs.readFileSync(homePath, 'utf8');

// Replace image source
home = home.replaceAll('/images/zEI0hdyA7XwBgF3OgjoRGPVMk.jpg?width=397&amp;height=400', '/images/ug-monogram-gradient.jpg?width=397&amp;height=400&amp;v=ug_monogram_v1');
home = home.replaceAll('/images/zEI0hdyA7XwBgF3OgjoRGPVMk.jpg', '/images/ug-monogram-gradient.jpg?v=ug_monogram_v1');

// Update CSS rules in home.json
const homeCss1 = '.framer-bJAYi .framer-tp2f93{z-index:2;flex:none;width:56px;height:27px;position:relative}';
if (home.includes(homeCss1)) {
  home = home.replace(homeCss1, '.framer-bJAYi .framer-tp2f93{display:none!important}');
  console.log('[home.json] homeCss1 replaced');
}

const homeCss2 = '.framer-bJAYi .framer-1r7f32{filter:brightness(.74);z-index:1;flex:none;position:absolute;inset:0;overflow:visible}';
if (home.includes(homeCss2)) {
  home = home.replace(homeCss2, '.framer-bJAYi .framer-1r7f32{filter:none;z-index:1;flex:none;position:absolute;inset:0;overflow:visible}');
  console.log('[home.json] homeCss2 replaced');
}

const homeCss3 = '.framer-bJAYi .framer-tp2f93{width:52px;height:25px}';
if (home.includes(homeCss3)) {
  home = home.replace(homeCss3, '.framer-bJAYi .framer-tp2f93{display:none!important}');
  console.log('[home.json] homeCss3 replaced');
}

// In home.json svg-2098037606_341 definition
const idx = home.lastIndexOf('svg-2098037606_341');
if (idx !== -1) {
  const startSvg = home.lastIndexOf('<svg', idx);
  const endSvg = home.indexOf('</svg>', idx) + '</svg>'.length;
  console.log('[home.json] Found SVG definition between', startSvg, endSvg);
  home = home.slice(0, startSvg) + '<svg width=\\"0\\" height=\\"0\\" viewBox=\\"0 0 0 0\\" id=\\"svg-2098037606_341\\"></svg>' + home.slice(endSvg);
  console.log('[home.json] svg-2098037606_341 emptied');
} else {
  console.log('[home.json] Warning: svg-2098037606_341 not found');
}

fs.writeFileSync(homePath, home, 'utf8');
console.log('[home.json] Successfully updated');

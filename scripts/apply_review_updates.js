const fs = require('fs');

// 1. Update AGS0 mjs
const mjsPath = 'E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs';
let mjs = fs.readFileSync(mjsPath, 'utf8');

if (!mjs.includes('https://www.trustpilot.com/')) {
  console.error('trustpilot link not found in AGS0');
} else {
  mjs = mjs.replace('https://www.trustpilot.com/', 'https://g.page/r/CWCJQgHfoJUPEAE/review');
  console.log('Replaced trustpilot with Google Review URL in AGS0');
}

// Replace end:4.9 with end:4.6 for AxLZC3JTd
const axIdx = mjs.indexOf('AxLZC3JTd');
if (axIdx !== -1) {
  const axSub = mjs.slice(axIdx, axIdx + 500);
  if (axSub.includes('end:4.9')) {
    const updatedSub = axSub.replace('end:4.9', 'end:4.6');
    mjs = mjs.slice(0, axIdx) + updatedSub + mjs.slice(axIdx + 500);
    console.log('Replaced end:4.9 with end:4.6 in AxLZC3JTd');
  } else {
    console.log('end:4.9 not found in AxLZC3JTd window');
  }
}

fs.writeFileSync(mjsPath, mjs, 'utf8');

// 2. Update home.json
const homePath = 'E:/mattis/app/_raw/home.json';
let home = fs.readFileSync(homePath, 'utf8');

// Update trustpilot link in home.json
if (home.includes('https://www.trustpilot.com/')) {
  home = home.replace(
    'href=\\"https://www.trustpilot.com/\\"',
    'href=\\"https://g.page/r/CWCJQgHfoJUPEAE/review\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"'
  );
  // Also any plain href without escaped quotes if any
  home = home.replace('https://www.trustpilot.com/', 'https://g.page/r/CWCJQgHfoJUPEAE/review');
  console.log('Replaced trustpilot with Google Review link in home.json');
}

// Update the 0.0 or 4.9 in the review rating container in home.json
const clutchIdx = home.indexOf('Average client rating on Google');
if (clutchIdx !== -1) {
  const sub = home.slice(clutchIdx, clutchIdx + 1200);
  const updatedSub = sub.replace(/<span>0\.0<\/span>/g, '<span>4.6</span>')
                        .replace(/<span>4\.9<\/span>/g, '<span>4.6</span>');
  home = home.slice(0, clutchIdx) + updatedSub + home.slice(clutchIdx + 1200);
  console.log('Updated review counter spans in home.json to 4.6');
}

fs.writeFileSync(homePath, home, 'utf8');

console.log('Done updating AGS0 and home.json');


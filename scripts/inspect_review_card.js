const fs = require('fs');

const mjs = fs.readFileSync('E:/mattis/public/sites/3g9GswFgsc7j265E0PdXzi/AGS0_XhMtJMPGE6ApB706BFQIqEiRY8hTTsq768smNY.Bj3MjilI.mjs', 'utf8');

// Find all matches for trustpilot in AGS0
let idx = 0;
while ((idx = mjs.indexOf('trustpilot', idx)) !== -1) {
  console.log('trustpilot in AGS0 at', idx, ':', mjs.slice(idx - 100, idx + 100));
  idx += 10;
}

// Check AxLZC3JTd (counter)
idx = 0;
while ((idx = mjs.indexOf('AxLZC3JTd', idx)) !== -1) {
  console.log('AxLZC3JTd at', idx, ':', mjs.slice(idx - 50, idx + 150));
  idx += 10;
}


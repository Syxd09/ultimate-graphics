const fs = require('fs');

const home = fs.readFileSync('E:/mattis/app/_raw/home.json', 'utf8');

// Find all matches for trustpilot in home.json
let idx = 0;
while ((idx = home.indexOf('trustpilot', idx)) !== -1) {
  console.log('trustpilot in home.json at', idx, ':', home.slice(idx - 100, idx + 100));
  idx += 10;
}

// Find matches around Clutch
idx = 0;
while ((idx = home.indexOf('Clutch', idx)) !== -1) {
  console.log('Clutch in home.json at', idx, ':', home.slice(idx - 50, idx + 400));
  idx += 10;
}


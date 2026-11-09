const fs = require('fs');

const file = 'E:/mattis/app/_raw/home.json';
let content = fs.readFileSync(file, 'utf8');

// Replace <span>2</span> without HR before bespoke quotes with <span>2</span><span>HR</span>
const idx = content.indexOf('bespoke signage quotes');
if (idx !== -1) {
  let before = content.slice(0, idx);
  let after = content.slice(idx);
  
  // Replace the two occurrences of <span>2</span> in that card container
  before = before.replace(
    /letter-spacing:-0\.07em\\"><span>2<\/span><\/div><\/div>/g,
    'letter-spacing:-0.07em\\"><span>2</span><span style=\\"color:var(--token-8bc48ec1-e739-449f-9808-c21f0169d1a2, rgb(255, 255, 255))\\">HR</span></div></div>'
  );
  
  fs.writeFileSync(file, before + after, 'utf8');
  console.log('Successfully updated 2 to 2HR in home.json');
} else {
  console.log('bespoke signage quotes not found');
}


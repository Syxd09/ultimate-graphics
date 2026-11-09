const fs = require('fs');

const blog = JSON.parse(fs.readFileSync('E:/mattis/app/_raw/blog.json', 'utf8'));
const full = (blog.mainHtml || '') + (blog.scripts || '');

const hrefRegex = /href="([^"#\?]+)(?:\?[^"]*)?(?:#[^"]*)?"/g;
let match;
const links = new Set();
while ((match = hrefRegex.exec(full)) !== null) {
  links.add(match[1]);
}
console.log('Links in blog.json:', Array.from(links));


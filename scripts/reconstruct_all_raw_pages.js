const fs = require('fs');
const path = require('path');

const rawDir = 'E:/mattis/app/_raw';

function sanitizeHtml(html) {
  if (!html) return html;

  let s = html
    // Root & 404
    .replace(/href="(?:\.\/|\.\.\/)?404"/g, 'href="/"')
    .replace(/href="\.\/"/g, 'href="/"')
    .replace(/href="\.\.\/"/g, 'href="/"')

    // Main navigation
    .replace(/href="(?:\.\/|\.\.\/)?work"/g, 'href="/work"')
    .replace(/href="(?:\.\/|\.\.\/)?about"/g, 'href="/about"')
    .replace(/href="(?:\.\/|\.\.\/)?contact"/g, 'href="/contact"')
    .replace(/href="(?:\.\/|\.\.\/)?blog"/g, 'href="/blog"')

    // Legal
    .replace(/href="(?:\.\/|\.\.\/)?(?:legal\/)?terms-of-service"/g, 'href="/legal/terms-of-service"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:legal\/)?privacy-policy"/g, 'href="/legal/privacy-policy"')

    // Work case studies
    .replace(/href="(?:\.\/|\.\.\/)?(?:work\/)?box-mode"/g, 'href="/work/box-mode"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:work\/)?johny-nashville"/g, 'href="/work/johny-nashville"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:work\/)?nomad-stays"/g, 'href="/work/nomad-stays"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:work\/)?stackline"/g, 'href="/work/stackline"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:work\/)?we-run-brand"/g, 'href="/work/we-run-brand"')

    // Blog articles
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?why-cheap-signage-fails-—-and-what-to-do-instead"/g, 'href="/blog/architectural-signage-specifications-guide"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?fleet-vehicle-branding-commercial-vans-and-trucks"/g, 'href="/blog/commercial-fleet-branding-maintenance"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?materials-guide-brass-stainless-steel-aluminum-signage"/g, 'href="/blog/fiber-laser-vs-waterjet-metal-signage"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?architectural-wayfinding-directional-signage-guide"/g, 'href="/blog/architectural-wayfinding-directional-signage-guide"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?led-illumination-front-lit-vs-halo-lit-channel-letters"/g, 'href="/blog/led-illumination-front-lit-vs-halo-lit-channel-letters"')
    .replace(/href="(?:\.\/|\.\.\/)?(?:blog\/)?storefront-transformation-5-signs-that-elevate-foot-traffic"/g, 'href="/blog/storefront-transformation-5-signs-that-elevate-foot-traffic"')

    // Contact info & social links
    .replace(/mailto:hello@mattertudio\.com/g, 'mailto:hello@ultimategraphics.com')
    .replace(/tel:555-400-0123/g, 'tel:+442079460192')
    .replace(/https:\/\/x\.com\/bynneh/g, 'https://x.com/ultimategraphics')
    .replace(/https:\/\/framer\.link\/bynneh/g, 'https://ultimategraphics.com')
    .replace(/https:\/\/templifica\.com\/?/g, 'https://ultimategraphics.com')
    .replace(/https:\/\/www\.trustpilot\.com\/?/g, 'https://g.page/r/CWCJQgHfoJUPEAE/review')

    // Media caching & stream safety
    .replace(/https:\/\/framerusercontent\.com\/assets\/Upkc3M9FymIbhcQFUfu8txagv8\.mp4/g, '/assets/Upkc3M9FymIbhcQFUfu8txagv8.mp4?v=2')
    .replace(/\/assets\/Upkc3M9FymIbhcQFUfu8txagv8\.mp4(?!\?)/g, '/assets/Upkc3M9FymIbhcQFUfu8txagv8.mp4?v=2')
    .replace(/https:\/\/framerusercontent\.com\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4/g, '/assets/ug-background-video.mp4?v=ug_bg_v2')
    .replace(/\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4(?!\?)/g, '/assets/ug-background-video.mp4?v=ug_bg_v2')
    .replace(/\/assets\/YUc1UMqfu6cFqEbpKpI1dpKqoes\.mp4\?v=2/g, '/assets/ug-background-video.mp4?v=ug_bg_v2');

  return s;
}

for (const file of fs.readdirSync(rawDir)) {
  if (!file.endsWith('.json') || file === 'manifest.json') continue;
  const filePath = path.join(rawDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const full = (data.mainHtml || '') + (data.scripts || '');

  // 1. Find svg-templates (if present)
  let svgStart = -1;
  let svgEnd = -1;
  const svgIdx = full.indexOf('id="svg-templates"');
  if (svgIdx !== -1) {
    svgStart = full.lastIndexOf('<div', svgIdx);
    svgEnd = full.lastIndexOf('</div>', full.indexOf('<!-- Start of bodyEnd -->') !== -1 ? full.indexOf('<!-- Start of bodyEnd -->') : full.length) + 6;
  }

  // 2. Find clean boundary of <div id="main">
  let scriptBoundary = full.indexOf('<script>var animator=');
  if (scriptBoundary === -1) {
    scriptBoundary = full.indexOf('<script src="/scripts/lenis.min.js">');
  }
  if (scriptBoundary === -1) {
    scriptBoundary = full.indexOf('<script>try{if(localStorage.getItem("__framer_');
  }

  const lastDivBefore = full.lastIndexOf('</div>', scriptBoundary);
  const mainEnd = lastDivBefore + 6;

  let cleanMain = full.slice(0, mainEnd).trim();
  let cleanSvg = svgStart !== -1 ? full.slice(svgStart, svgEnd).trim() : '';
  let cleanScripts = svgStart !== -1 ? full.slice(mainEnd, svgStart).trim() : full.slice(mainEnd).trim();

  // Combine cleanMain and cleanSvg into complete mainHtml
  let newMainHtml = cleanSvg ? `${cleanMain}\n${cleanSvg}` : cleanMain;

  // Sanitize all links and content
  newMainHtml = sanitizeHtml(newMainHtml);

  // Bust cache on script_main
  cleanScripts = cleanScripts.replace(
    /\/sites\/3g9GswFgsc7j265E0PdXzi\/script_main\.fMOsSwwF\.mjs(?!\?)/g,
    '/sites/3g9GswFgsc7j265E0PdXzi/script_main.fMOsSwwF.mjs?v=signage_2hr_v3'
  );

  const updatedData = {
    ...data,
    mainHtml: newMainHtml,
    scripts: cleanScripts
  };

  fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf8');
  console.log(`Successfully reconstructed ${file}: mainHtml=${newMainHtml.length}, scripts=${cleanScripts.length}`);
}


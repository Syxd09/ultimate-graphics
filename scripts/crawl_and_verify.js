const visited = new Set();
const queue = ['/'];
const brokenLinks = [];
const externalLinks = new Set();

async function crawl() {
  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visited.has(currentPath)) continue;
    visited.add(currentPath);

    try {
      const res = await fetch('http://localhost:3000' + currentPath, { redirect: 'follow' });
      if (res.status >= 400) {
        brokenLinks.push({ path: currentPath, status: res.status });
        continue;
      }

      const html = await res.text();
      const hrefRegex = /href="([^"#\s>]+)(?:\?[^"]*)?(?:#[^"]*)?"/g;
      let match;

      while ((match = hrefRegex.exec(html)) !== null) {
        let link = match[1];

        // Skip non-HTTP / non-relative
        if (link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('javascript:')) {
          continue;
        }

        if (link.startsWith('http://') || link.startsWith('https://')) {
          externalLinks.add(link);
          continue;
        }

        // Relative link normalization
        if (!link.startsWith('/')) {
          link = '/' + link;
        }

        // Remove trailing slash for comparison if not root
        if (link.length > 1 && link.endsWith('/')) {
          link = link.slice(0, -1);
        }

        // Skip asset links like /assets/, /images/, /logos/, /sites/, /favicon
        if (link.startsWith('/assets') || link.startsWith('/images') || link.startsWith('/logos') || link.startsWith('/sites') || link.startsWith('/fonts') || link.startsWith('/styles') || link.startsWith('/favicon')) {
          continue;
        }

        if (!visited.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }
    } catch (err) {
      brokenLinks.push({ path: currentPath, error: err.message });
    }
  }

  console.log('\n--- CRAWL COMPLETE ---');
  console.log('Total internal pages checked:', visited.size);
  console.log('Visited pages:', Array.from(visited));
  console.log('External links found:', Array.from(externalLinks));
  console.log('Broken links count:', brokenLinks.length);
  if (brokenLinks.length > 0) {
    console.log('Broken links:', brokenLinks);
  } else {
    console.log('ZERO BROKEN INTERNAL LINKS FOUND ACROSS ENTIRE WEBSITE!');
  }
}

crawl();


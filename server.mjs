import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm'
};

function resolveFilePath(reqUrl) {
  let cleanUrl = reqUrl.split('?')[0].split('#')[0];
  try {
    cleanUrl = decodeURIComponent(cleanUrl);
  } catch (e) {}

  if (cleanUrl === '/' || cleanUrl === '') {
    return path.join(__dirname, 'index.html');
  }

  let filePath = path.join(__dirname, cleanUrl);

  // 1. Exact file match
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }

  // 2. Directory with index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) return indexPath;
  }

  // 3. Try appending .html
  if (fs.existsSync(filePath + '.html') && fs.statSync(filePath + '.html').isFile()) {
    return filePath + '.html';
  }

  // 4. Try inside directory + index.html
  const subIndex = path.join(filePath, 'index.html');
  if (fs.existsSync(subIndex)) {
    return subIndex;
  }

  // 5. Special fallback for images/assets with complex names
  const baseName = path.basename(cleanUrl);
  if (cleanUrl.startsWith('/images/')) {
    const imgTry = path.join(__dirname, 'images', baseName);
    if (fs.existsSync(imgTry)) return imgTry;
  }
  if (cleanUrl.startsWith('/assets/')) {
    const assetTry = path.join(__dirname, 'assets', baseName);
    if (fs.existsSync(assetTry)) return assetTry;
  }

  return null;
}

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const resolved = resolveFilePath(req.url);

  if (!resolved) {
    // 404 fallback to 404.html or basic 404
    const notFoundPath = path.join(__dirname, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPath).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(resolved).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const stat = fs.statSync(resolved);
  const totalSize = stat.size;

  // Handle Range Requests for Video Streaming (.mp4, .webm)
  const range = req.headers.range;
  if (range && (ext === '.mp4' || ext === '.webm')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;
    const chunksize = end - start + 1;

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    fs.createReadStream(resolved, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': totalSize,
      'Cache-Control': 'public, max-age=3600'
    });
    fs.createReadStream(resolved).pipe(res);
  }
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`\n=============================================================`);
    console.log(`✨ Ultimate Graphics® — Premier Signage, Fabrication & Print Solutions`);
    console.log(`🌐 Server running at: http://localhost:${port}/`);
    console.log(`📱 Work Showcase:     http://localhost:${port}/work`);
    console.log(`📖 Journal / Blog:    http://localhost:${port}/blog`);
    console.log(`👥 About Studio:      http://localhost:${port}/about`);
    console.log(`📬 Contact Page:      http://localhost:${port}/contact`);
    console.log(`🚀 Lenis Smooth Scrolling: Enabled`);
    console.log(`=============================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, attempting port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

const DEFAULT_PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;
startServer(DEFAULT_PORT);


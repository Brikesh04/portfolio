const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 45678;
const HOST = '127.0.0.1';

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
<html>
<body>
  <div id="status">Loading...</div>
  <img id="img" src="/me.avif" style="max-width: 100%; height: auto;" />
  <script>
    const img = document.getElementById('img');
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        
        const container = document.createElement('pre');
        container.id = 'result';
        container.style.wordBreak = 'break-all';
        container.style.whiteSpace = 'pre-wrap';
        container.innerText = dataUrl;
        document.body.appendChild(container);
        
        document.getElementById('status').innerText = 'Done';
      } catch (e) {
        document.getElementById('status').innerText = 'Error: ' + e.message;
      }
    };
    img.onerror = () => {
      document.getElementById('status').innerText = 'Failed to load image';
    };
  </script>
</body>
</html>`);
  } else if (req.url === '/me.avif') {
    const filePath = path.join(__dirname, 'public/assets/images/profile/me.avif');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/avif' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});

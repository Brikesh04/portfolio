const fs = require('fs');
const path = require('path');

const avifPath = path.join(__dirname, 'public/assets/images/profile/me.avif');
const htmlPath = path.join(__dirname, 'convert.html');

try {
  const avifBase64 = fs.readFileSync(avifPath).toString('base64');
  
  const htmlContent = `<!DOCTYPE html>
<html>
<body>
  <div id="status">Loading...</div>
  <img id="img" src="data:image/avif;base64,${avifBase64}" style="max-width: 100%; height: auto;" />
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
</html>`;

  fs.writeFileSync(htmlPath, htmlContent);
  console.log('Successfully generated convert.html with inline base64 AVIF');
} catch (err) {
  console.error('Error generating convert.html:', err.message);
  process.exit(1);
}

const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'js');

const files = [
  { url: 'https://lukebaffait.fr/assets/images/art/Untitled1.png', name: 'Untitled1.png' },
  { url: 'https://lukebaffait.fr/assets/images/art/Untitled2.png', name: 'Untitled2.png' }
];

files.forEach(file => {
  const filePath = path.join(dir, file.name);
  const fileStream = fs.createWriteStream(filePath);
  https.get(file.url, response => {
    if (response.statusCode === 200) {
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${file.name}`);
      });
    } else {
      console.error(`Failed to download ${file.name}: Status ${response.statusCode}`);
    }
  }).on('error', err => {
    console.error(`Error downloading ${file.name}:`, err.message);
  });
});

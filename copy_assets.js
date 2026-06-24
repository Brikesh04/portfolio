const fs = require('fs');
const path = require('path');

const srcDir = '/Users/brikesh/Downloads/lukebaffait.fr/lukebaffait.fr/assets/images/hero sequence';
const destDir = '/Users/brikesh/anti gravity/Brikesh Portfolio/public/assets/images/hero sequence';

function copyFolderRecursiveSync(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      const curTarget = path.join(target, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, curTarget);
      } else {
        fs.copyFileSync(curSource, curTarget);
      }
    });
  }
}

try {
  if (fs.existsSync(srcDir)) {
    copyFolderRecursiveSync(srcDir, destDir);
    console.log('Successfully copied hero sequence folder!');
  } else {
    console.error('Source directory does not exist:', srcDir);
  }
} catch (err) {
  console.error('Error copying folder:', err.message);
}

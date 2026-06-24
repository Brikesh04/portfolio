const fs = require('fs');
const path = require('path');

const src = '/Users/brikesh/Downloads/lukebaffait.fr/lukebaffait.fr/assets/images/hero sequence/0001.jpg';
const dest = '/Users/brikesh/anti gravity/Brikesh Portfolio/public/assets/images/hero_sequence_0001.jpg';

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied 0001.jpg as hero_sequence_0001.jpg!');
  } else {
    console.error('Source file does not exist:', src);
  }
} catch (err) {
  console.error('Error copying file:', err.message);
}

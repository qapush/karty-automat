const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const inputFilePath = path.join(__dirname, 'ids_images.txt');
const foundMoreFile = path.join(__dirname, 'found-more.txt');

// Read IDs from input file
const ids = fs.readFileSync(inputFilePath, 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(Boolean);

// Get list of image filenames without extension
const imageFiles = fs.readdirSync(imagesDir)
  .map(file => path.parse(file).name);

// Find missing IDs
const missingIds = ids.filter(id => !imageFiles.includes(id));

// Save missing IDs to found-more.txt
fs.writeFileSync(foundMoreFile, missingIds.join('\n'));

console.log(`Missing IDs saved to ${foundMoreFile}`);

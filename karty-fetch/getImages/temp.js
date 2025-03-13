const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const idsFilePath = path.join(__dirname, 'ids_images.txt');
const outputFilePath = path.join(__dirname, 'analysis.txt');

// Read IDs from ids_images.txt
const idsSet = new Set(
  fs.readFileSync(idsFilePath, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
);

// Read filenames from /images/ (removing extensions)
const imageFiles = fs.readdirSync(imagesDir).map(file => path.parse(file).name);

// Identify duplicate images
const imageCount = {};
imageFiles.forEach(id => {
  imageCount[id] = (imageCount[id] || 0) + 1;
});
const duplicateImages = Object.keys(imageCount).filter(id => imageCount[id] > 1);

// Identify extra images (exist in /images/ but not in ids_images.txt)
const extraImages = imageFiles.filter(id => !idsSet.has(id));

// Identify missing images (exist in ids_images.txt but not in /images/)
const missingImages = [...idsSet].filter(id => !imageFiles.includes(id));

// Generate report
const report = [
  `Total files in /images/: ${imageFiles.length}`,
  `Total unique images in /images/: ${Object.keys(imageCount).length}`,
  `Total duplicate images in /images/: ${duplicateImages.length}`,
  `Total IDs in ids_images.txt: ${idsSet.size}`,
  `Total extra images in /images/ (not in ids_images.txt): ${extraImages.length}`,
  `Total missing images (in ids_images.txt but not in /images/): ${missingImages.length}`,
  `\nDuplicate images:\n${duplicateImages.join('\n') || 'None'}`,
  `\nExtra images (not in ids_images.txt):\n${extraImages.join('\n') || 'None'}`,
  `\nMissing images (in ids_images.txt but not in /images/):\n${missingImages.join('\n') || 'None'}`,
];

// Save analysis to file
fs.writeFileSync(outputFilePath, report.join('\n'));

console.log(`Analysis saved to analysis.txt`);

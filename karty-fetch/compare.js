const fs = require('fs');

// Load IDs from ids.txt
function loadIDs(filename) {
  const data = fs.readFileSync(filename, 'utf-8');
  return data
    .split('\n')
    .map((id) => id.trim())
    .filter((id) => id);
}

// Load items from decoration_results.json
function loadItems(filename) {
  const data = fs.readFileSync(filename, 'utf-8');
  return JSON.parse(data);
}

// Check if all IDs in ids.txt exist in decoration_results.json
function checkIDs(ids, items) {
  const itemIds = new Set(items.map((item) => item.id));
  return ids.filter((id) => !itemIds.has(id));
}

const ids = loadIDs('ids.txt');
const items = loadItems('decoration_results.json');
const missingIds = checkIDs(ids, items);

if (missingIds.length === 0) {
  console.log('All IDs in ids.txt are present in decoration_results.json');
} else {
  console.log('Missing IDs:', missingIds);
}

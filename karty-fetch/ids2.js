const { log } = require('console');
const fs = require('fs');
const path = require('path');

// Folder containing .psd files
const folderPath = 'Z:\\BIBLIOTEKA\\ELEMENTY\\ZIMA\\PODSTAWY WIZUALIZACJI\\BG_KARTY\\KARTY_AUTOMAT\\dekoracje';

// File names
const ids1File = 'ids_1.txt';
const ids2File = 'ids_2.txt';

// Step 1: Read .psd filenames from folder and strip extensions
function getPsdFileIds() {
    const files = fs.readdirSync(folderPath);

    // Filter .psd files and strip extensions
    const ids = files
        .filter(file => path.extname(file).toLowerCase() === '.psd')
        .map(file => path.basename(file, '.psd'));
    const idset = new Set(ids);
    // console.log(idset);
    
    return idset; // Convert to Set for uniqueness
}

// Step 2: Generate ids_2.txt with unique entries not in ids_1.txt
function generateIds2File() {
    // Get the IDs from the .psd files in the folder
    const folderIds = getPsdFileIds();

    // Read ids_1.txt, if it exists, and create a Set of IDs from it
    let ids1 = new Set();
    if (fs.existsSync(ids1File)) {
        ids1 = new Set(fs.readFileSync(ids1File, 'utf-8').split('\r\n').filter(Boolean));
    }

    console.log(ids1);
    

    // Filter folder IDs to keep only those not in ids_1.txt
    const uniqueIds = Array.from(folderIds).filter(id => !ids1.has(id));

    // Write the unique IDs to ids_2.txt
    fs.writeFileSync(ids2File, uniqueIds.join('\n'), 'utf-8');
    console.log(`Created ${ids2File} with ${uniqueIds.length} entries (unique to folder and not in ${ids1File}).`);
}

// Run the function
generateIds2File();

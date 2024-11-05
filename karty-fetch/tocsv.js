// Import the required module
import fs from 'fs';
import path from 'path';

// Function to read JSON and generate a CSV file
async function generateCsvFromJson() {
  try {
    // Read and parse JSON file
    const data = JSON.parse(fs.readFileSync(path.resolve('decoration_results.json'), 'utf8'));

    // Extract CSV header and rows
    const header = 'ID,Nazwa\n';
    const rows = data
      .map((item) => `${item.id},"${item.decorationData.nazwa}"`)
      .join('\n');

    // Combine header and rows for the CSV content
    const csvContent = header + rows;

    // Write CSV content to a file
    fs.writeFileSync('Dekoracje.csv', csvContent, 'utf8');

    console.log('CSV file generated successfully as Dekoracje.csv');
  } catch (error) {
    console.error('Error generating CSV file:', error);
  }
}

// Run the function
generateCsvFromJson();
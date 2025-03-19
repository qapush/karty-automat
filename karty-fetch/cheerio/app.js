const axios = require('axios');
const cheerio = require('cheerio');
const { setTimeout } = require('node:timers/promises');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://192.168.1.5/stany/index.php';

// Input file path
const inputFilePath = path.join(__dirname, 'ids.txt');

// Output file path for JSON results
const outputFilePath = path.join(__dirname, 'decoration_results.json');

// Read IDs from file
const ids = fs
  .readFileSync(inputFilePath, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

// Function to get random delay
function getRandomDelay(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to fetch decoration data from a page URL using cheerio
async function fetchDecorationData(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const srednica = $('#wartosc_srednica').text().trim();
    const dlugosc = $('#wartosc_dlugosc').text().trim();
    const szerokosc = $('#wartosc_szerokosc').text().trim();
    const wysokosc = $('#wartosc_wysokosc').text().trim();
    const led = $('#wartosc_i_led').text().trim();
    const moc = $('#wartosc_moc').text().trim();
    const nazwa = $('#wartosc_nazwa').text().trim();

    return {
      nazwa,
      szerokosc: srednica || szerokosc || 0,
      wysokosc,
      glebokosc: srednica || dlugosc,
      led,
      moc,
    };
  } catch (error) {
    console.error(`Error fetching data for URL ${url}:`, error);
    return null;
  }
}

// Function to fetch data for a given ID
async function fetchDataForId(id) {
  const mainPageUrl = `${baseUrl}?s%5BIdProduktu%5D=${id}&s%5Bfstel.Data%5D=&s%5Bfstareid.Data%5D=&s%5BKod%5D=&s%5BNazwa%5D=&m=134&d=ASC&sort=&listaGrup=000+-+OSWIETLENIE_ZEW_STRING`;

  console.log(`Fetching data for ID ${id}`);

  try {
    const response = await axios.get(mainPageUrl);
    const $ = cheerio.load(response.data);

    const isChecked = $('#widokZerowych').prop('checked');

    // Click the checkbox if it is unchecked (Simulate checkbox check in case it's unchecked)
    if (!isChecked) {
      // Normally we would simulate clicking here, but cheerio is not interactive like Puppeteer
      console.log(`Checkbox unchecked for ID ${id}, but can't click with cheerio`);
    }

    // Find the link corresponding to the ID
    const targetLink = $('a').filter((i, el) => $(el).text().trim() === id).attr('href');
    if (!targetLink) {
      console.warn(`No link found for ID ${id}`);
      return null;
    }

    const fullUrl = `http://192.168.1.5/stany/${targetLink}`;
    const decorationData = await fetchDecorationData(fullUrl);
    return { id, decorationData };
  } catch (error) {
    console.error(`Error fetching data for ID ${id}:`, error);
    return null;
  }
}

// Function to fetch data for all IDs and save to JSON
async function fetchDataForAllIds() {
  // Ensure the output file starts as an empty array if it doesn't exist
  if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
  }

  for (const id of ids) {
    const data = await fetchDataForId(id);
    if (data) {
      // Append data to the JSON file
      const currentData = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
      currentData.push(data);
      fs.writeFileSync(outputFilePath, JSON.stringify(currentData, null, 2));

      console.log(`Updated JSON file with data for ID ${id}`);
    }

    // Add another random delay between each ID fetch
    await setTimeout(getRandomDelay());
  }
}

fetchDataForAllIds();

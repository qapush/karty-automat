const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');
const fs = require('fs');
const path = require('path');

puppeteer.use(StealthPlugin());

const baseUrl = 'http://192.168.1.5/stany/index.php';

// Input file path
const inputFilePath = path.join(__dirname, 'ids_2.txt');

// Output file path for JSON results
const outputFilePath = path.join(__dirname, 'decoration_results_2.json');

// Read IDs from file
const ids = fs
  .readFileSync(inputFilePath, 'utf8')
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean);

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0.2 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
];

function getRandomDelay(min = 1000, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchDecorationData(page, url) {
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  const srednica = await page.$eval('#wartosc_srednica', (el) => el.textContent.trim());
  const dlugosc = await page.$eval('#wartosc_dlugosc', (el) => el.textContent.trim());
  const szerokosc = await page.$eval('#wartosc_szerokosc', (el) => el.textContent.trim());
  const wysokosc = await page.$eval('#wartosc_wysokosc', (el) => el.textContent.trim());
  const led = await page.$eval('#wartosc_i_led', (el) => el.textContent.trim());
  const moc = await page.$eval('#wartosc_moc', (el) => el.textContent.trim());
  const nazwa = await page.$eval('#wartosc_nazwa', (el) => el.textContent.trim());

  return {
    nazwa,
    szerokosc: srednica || szerokosc || 0,
    wysokosc,
    glebokosc: srednica || dlugosc,
    led,
    moc,
  };
}

async function fetchDataForId(browser, id) {
  const page = await browser.newPage();
  const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
  await page.setUserAgent(randomUserAgent);

  const mainPageUrl = `${baseUrl}?s%5BIdProduktu%5D=${id}&s%5Bfstel.Data%5D=&s%5Bfstareid.Data%5D=&s%5BKod%5D=&s%5BNazwa%5D=&m=134&d=ASC&sort=&listaGrup=000+-+OSWIETLENIE_ZEW_STRING`;

  console.log(`Fetching data for ID ${id}`);

  await page.goto(mainPageUrl, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForSelector('#widokZerowych', { timeout: 60000 });

  const isChecked = await page.$eval('#widokZerowych', (checkbox) => checkbox.checked);

  // Click the checkbox if it is unchecked
  if (!isChecked) {
    await page.click('#widokZerowych');
    await setTimeout(getRandomDelay()); // Add delay if needed after clicking
  }

  // Add a random delay before the next action
  await setTimeout(getRandomDelay());

  const links = await page.$$eval('a', (anchors) =>
    anchors.map((anchor) => ({
      text: anchor.textContent.trim(),
      href: anchor.getAttribute('href'),
    })),
  );
  console.log(links);

  const targetLink = links.find((link) => link.text === id);
  if (!targetLink) {
    console.warn(`No link found for ID ${id}`);
    await page.close();
    return null;
  }

  const fullUrl = `http://192.168.1.5/stany/${targetLink.href}`;
  const decorationData = await fetchDecorationData(page, fullUrl);
  await page.close();

  return { id, decorationData };
}

async function fetchDataForAllIds() {
  const browser = await puppeteer.launch({ headless: false });

  // Ensure the output file starts as an empty array if it doesn't exist
  if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
  }

  for (const id of ids) {
    const data = await fetchDataForId(browser, id);
    if (data) {
      // Log the fetched data
      //   console.log(`Fetched data for ID ${id}:`, data);

      // Append data to the JSON file
      const currentData = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
      currentData.push(data);
      fs.writeFileSync(outputFilePath, JSON.stringify(currentData, null, 2));

      console.log(`Updated JSON file with data for ID ${id}`);
    }

    // Add another random delay between each ID fetch
    await setTimeout(getRandomDelay());
  }

  await browser.close();
}

fetchDataForAllIds();

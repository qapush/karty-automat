const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { setTimeout } = require('node:timers/promises');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

puppeteer.use(StealthPlugin());

const baseUrl = 'http://192.168.1.5/stany/index.php';
const inputFilePath = path.join(__dirname, 'found-more.txt');
const outputFilePath = path.join(__dirname, 'decoration_results.json');
const imagesDir = path.join(__dirname, 'images');
const foundFile = path.join(__dirname, 'found.txt');
const notFoundFile = path.join(__dirname, 'not-found.txt');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

const ids = fs.readFileSync(inputFilePath, 'utf8').split('\n').map(line => line.trim()).filter(Boolean);

const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0.2 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
];

function getRandomDelay(min = 600, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchImage(page, id) {
  try {
    await setTimeout(getRandomDelay());
    const imageUrl = await page.$eval('#obraz img', img => img.src);
    const imagePath = path.join(imagesDir, `${id}.jpg`);
    
    const response = await axios({
      url: imageUrl,
      responseType: 'stream',
    });
    
    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);
    
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    console.log(`Image saved for ID ${id}`);
    fs.appendFileSync(foundFile, id + '\n');
  } catch (error) {
    console.warn(`No image found for ID ${id}`);
    fs.appendFileSync(notFoundFile, id + '\n');
  }
}

async function fetchDecorationData(page, url, id) {
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await setTimeout(getRandomDelay());


  await fetchImage(page, id);
  return;
}

async function fetchDataForId(browser, id) {
  const page = await browser.newPage();
  await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);

  const mainPageUrl = `${baseUrl}?s%5BIdProduktu%5D=${id}`;
  console.log(`Fetching data for ID ${id}`);

  await page.goto(mainPageUrl, { waitUntil: 'networkidle0', timeout: 60000 });
  await setTimeout(getRandomDelay());

  await page.waitForSelector('#widokZerowych', { timeout: 60000 }).catch(() => {});

  const isChecked = await page.$eval('#widokZerowych', checkbox => checkbox.checked).catch(() => false);
  if (!isChecked) {
    await page.click('#widokZerowych');
    await setTimeout(getRandomDelay());
  }

  await setTimeout(getRandomDelay());

  const links = await page.$$eval('a', anchors => anchors.map(anchor => ({
    text: anchor.textContent.trim(),
    href: anchor.getAttribute('href'),
  })));

  const targetLink = links.find(link => link.text === id);
  if (!targetLink) {
    console.warn(`No link found for ID ${id}`);
    await page.close();
    return null;
  }

  await setTimeout(getRandomDelay());

  const fullUrl = `http://192.168.1.5/stany/${targetLink.href}`;
  const decorationData = await fetchDecorationData(page, fullUrl, id);
  await page.close();

  return { id, decorationData };
}

async function fetchDataForAllIds() {
  const browser = await puppeteer.launch({ headless: false });

  if (!fs.existsSync(outputFilePath)) {
    fs.writeFileSync(outputFilePath, JSON.stringify([]));
  }

  for (const id of ids) {
    const data = await fetchDataForId(browser, id);
    if (data) {
      const currentData = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
      currentData.push(data);
      fs.writeFileSync(outputFilePath, JSON.stringify(currentData, null, 2));
      console.log(`Updated JSON file with data for ID ${id}`);
    }
    await setTimeout(getRandomDelay());
  }

  await browser.close();
}

fetchDataForAllIds();

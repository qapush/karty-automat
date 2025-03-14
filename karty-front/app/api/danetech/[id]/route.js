// const baseUrl = 'http://localhost:20290';


import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { setTimeout } from 'node:timers/promises';

puppeteer.use(StealthPlugin());

const baseUrl = 'http://localhost:20290';
// const baseUrl = 'http://192.168.1.5/stany/index.php';

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0.2 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
];

function getRandomDelay(min = 2000, max = 5000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchDecorationData(page, url) {
    console.log(`Navigating to decoration page: ${url}`);
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });

    const extractText = async (selector) => {
        try {
            console.log(`Extracting text from: ${selector}`);
            const element = await page.$(selector);
            return element ? (await page.evaluate((el) => el.textContent?.trim(), element)) : 'N/A';
        } catch (error) {
            console.warn(`Failed to extract text from ${selector}:`, error);
            return 'N/A';
        }
    };

    return {
        nazwa: await extractText('#wartosc_nazwa'),
        szerokosc: (await extractText('#wartosc_srednica')) || (await extractText('#wartosc_szerokosc')) || '0',
        wysokosc: await extractText('#wartosc_wysokosc'),
        glebokosc: (await extractText('#wartosc_srednica')) || (await extractText('#wartosc_dlugosc')) || '0',
        led: await extractText('#wartosc_i_led'),
        moc: await extractText('#wartosc_moc'),
    };
}

async function fetchDataForId(id) {
    console.log(`Starting browser session for ID: ${id}`);
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    await page.setUserAgent(randomUserAgent);

    const mainPageUrl = `${baseUrl}?s%5BIdProduktu%5D=${id}&m=134&d=ASC&sort=&listaGrup=000+-+OSWIETLENIE_ZEW_STRING`;
    console.log(`Navigating to: ${mainPageUrl}`);

    try {
        await page.goto(mainPageUrl, { waitUntil: 'domcontentloaded', timeout: 90000 });
        console.log('Page loaded successfully.');

        console.log('Waiting for selector #widokZerowych...');
        const exists = await page.$('#widokZerowych');
        if (!exists) {
            console.warn('Selector #widokZerowych not found!');
            await browser.close();
            return null;
        }

        const isChecked = await page.$eval('#widokZerowych', (checkbox) => checkbox.checked);
        if (!isChecked) {
            console.log('Checkbox is unchecked. Clicking...');
            await page.click('#widokZerowych');
            await setTimeout(getRandomDelay());
        }

        console.log('Extracting links...');
        const links = await page.$$eval('a', (anchors) =>
            anchors.map((anchor) => ({
                text: anchor.textContent?.trim() || '',
                href: anchor.getAttribute('href') || '',
            }))
        );

        const targetLink = links.find((link) => link.text === id);
        if (!targetLink) {
            console.warn(`No link found for ID ${id}`);
            await browser.close();
            return null;
        }

        const fullUrl = `http://192.168.1.5/stany/${targetLink.href}`;
        console.log(`Following link: ${fullUrl}`);
        const decorationData = await fetchDecorationData(page, fullUrl);

        console.log(`Data extracted for ID ${id}:`, decorationData);
        await browser.close();
        return { id, decorationData };
    } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        await browser.close();
        return null;
    }
}

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        console.log(`Received request to scrape data for ID: ${id}`);

        const res = await fetchDataForId(id);
        if (!res) {
            console.warn(`No data found for ID ${id}`);
            return new Response(JSON.stringify({ success: false, message: 'No data found' }), { status: 404 });
        }

        console.log(`Successfully scraped data for ID: ${id}`);
        return new Response(JSON.stringify({ success: true, data: res }), { status: 200 });
    } catch (error) {
        console.error(`Unexpected error: ${error.message}`);
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}

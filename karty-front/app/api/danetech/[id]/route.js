import axios from 'axios';
import * as cheerio from 'cheerio';

// const baseUrl = 'http://localhost:20290';
const baseUrl = process.env.STANY_URL;

async function fetchDecorationData(html) {
    const $ = cheerio.load(html);

    const extractText = (selector) => $(selector).text().trim() || 'N/A';

    return {
        nazwa: extractText('#wartosc_nazwa'),
        szerokosc: extractText('#wartosc_srednica') || extractText('#wartosc_szerokosc') || '0',
        wysokosc: extractText('#wartosc_wysokosc'),
        glebokosc: extractText('#wartosc_srednica') || extractText('#wartosc_dlugosc') || '0',
        led: extractText('#wartosc_i_led'),
        moc: extractText('#wartosc_moc'),
    };
}

async function fetchDataForId(id) {
    try {
        const mainPageUrl = `${baseUrl}?widokZerowych=tak&widokTylkoTyp=all&widokZerowychStan=ustaw&widokTylkoProduktyStan=ustaw&widokNiezarezerwowaneWCalosciStan=ustaw&m=134&d=ASC&sort=&s%5BIdProduktu%5D=${id}&s%5BKod%5D=&s%5BNazwa%5D=`;
        console.log(`Fetching: ${mainPageUrl}`);

        const response = await axios.get(mainPageUrl);
        const $ = cheerio.load(response.data);

        
        
        
        if (!$('#widokZerowych').length) {
            console.warn('Selector #widokZerowych not found!');
            return null;
        }

        const targetLink = $('a').filter((_, el) => $(el).text().trim() === id).attr('href');
        if (!targetLink) {
            console.warn(`No link found for ID ${id}`);
            return null;
        }

        const fullUrl = `http://192.168.1.5/stany/${targetLink}`;
        console.log(`Following link: ${fullUrl}`);

        const detailResponse = await axios.get(fullUrl);
        const decorationData = await fetchDecorationData(detailResponse.data);

        console.log(`Data extracted for ID ${id}:`, decorationData);
        return { id, decorationData };
    } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
        return null;
    }
}

export async function GET(req, { params }) {
    try {
        const { id } = await params;
        console.log(`Received request to scrape data for ID: ${id}`);

        const res = await fetchDataForId(id);
        if (!res) {
            return new Response(JSON.stringify({ success: false, message: 'No data found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: res }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
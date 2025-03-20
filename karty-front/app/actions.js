'use server';

// GET TECH DATA FROM ENOVA

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const baseUrl = 'http://192.168.1.5/stany';

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

export async function getTechData (id) {
    try {
        console.log(`Received request to scrape data for ID: ${id}`);

        const res = await fetchDataForId(id);
        if (!res) {
            return { success: false, message: 'No data found' };
        }

        return { success: true, data: res };
    } catch (error) {
        return { success: false, error: error.message };
    }
}


// DEEPL TRANSLATION

export const getTranslation = async (titles, locale) => {

    const deepKey = process.env.DEEPL_KEY;
    
    const data = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${deepKey}`
        },
        body: JSON.stringify({
            text: [titles?.pl?.title.replace('\n', ' ')],
            target_lang: locale.toUpperCase(), 
            source_lang:"PL"
        })
    })

    if(!data.ok) {
        
        const res = await data.json();
    }
    
    
    if(data.ok) {
        const res = await data.json();
        console.log(res);
        return res;
    }
}


// LOGS

export async function logs() {
  // Path to the PM2 log file
  const logFilePath = path.resolve(process.env.HOME, '.pm2', 'logs', 'dekoracje-out.log');

  try {
    // Read the log file synchronously
    const logs = fs.readFileSync(logFilePath, 'utf8');
    return logs;
  } catch (error) {
    console.error('Error reading log file:', error);
    return { error: 'Failed to read PM2 logs' };
  }
}

// ERRORS

export async function errors() {
  // Path to the PM2 log file
  const logFilePath = path.resolve(process.env.HOME, '.pm2', 'logs', 'dekoracje-error.log');

  try {
    // Read the log file synchronously
    const logs = fs.readFileSync(logFilePath, 'utf8');
    return logs;
  } catch (error) {
    console.error('Error reading log file:', error);
    return { error: 'Failed to read PM2 logs' };
  }
}
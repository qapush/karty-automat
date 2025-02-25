import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises'; // Use promises API to handle async file reading

const prisma = new PrismaClient();

async function addDekoracjaEntries(dekoracjaArray) {
  for (const dekoracja of dekoracjaArray) {
    try {
      // Convert necessary fields to match the expected data types
      const szerokosc = parseFloat(dekoracja.decorationData.szerokosc) || 0;
      const wysokosc = parseFloat(dekoracja.decorationData.wysokosc) || 0;
      const glebokosc = parseFloat(dekoracja.decorationData.glebokosc) || 0;
      const ilosc_led = parseInt(dekoracja.decorationData.led, 10) || 0;
      const moc = parseFloat(dekoracja.decorationData.moc) || 0;

      // Create a new Dekoracja entry without cechy or przewagi relationships
      await prisma.dekoracja.create({
        data: {
          id: parseInt(dekoracja.id, 10), // Manually set the ID
          szerokosc,
          wysokosc,
          glebokosc,
          moc,
          ilosc_led,
          tlumaczenia: {
            create: [
              {
                tytul: dekoracja.decorationData.nazwa,
                kod_jezyka: 'pl', // Adjust language code as needed
              },
            ],
          },
        },
      });

      console.log(`Added Dekoracja with ID: ${dekoracja.id}`);
    } catch (error) {
      console.error(`Error adding Dekoracja with ID: ${dekoracja.id}`, error);
    }
  }
}

async function main() {
  try {
    // Read and parse JSON data from the file
    const data = await fs.readFile('./decoration_results_2.json', 'utf-8');
    const dekoracjaArray = JSON.parse(data);

    // Call the function with parsed data
    await addDekoracjaEntries(dekoracjaArray);
  } catch (error) {
    console.error('Error reading or parsing decoration_results.json:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the main function
main();

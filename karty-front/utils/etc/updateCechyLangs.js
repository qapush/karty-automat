import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';


const prisma = new PrismaClient();

async function updateTranslations(csvFilePath) {
  const records = [];

  // Step 1: Read CSV file
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        records.push(row);
      })
      .on('end', resolve)
      .on('error', reject);
  });

  

  // Step 2: Process each row
  for (const record of records) {

    const id = record[Object.keys(record)[0]]; // Get the first column value as ID
    const fr = record['FR'];
    const pl = record['FR'];
    const de = record['DE'];

    // Check if 'fr' translation exists
    const existingFr = await prisma.cechyTlumaczenie.findFirst({
      where: { cecha_id: id, kod_jezyka: 'fr' },
    });

    // Check if 'de' translation exists
    const existingDe = await prisma.cechyTlumaczenie.findFirst({
      where: { cecha_id: id, kod_jezyka: 'de' },
    });

    // Step 3: Insert or update translations for 'fr'
    if (fr) {
      if (existingFr) {
        await prisma.cechyTlumaczenie.update({
          where: { id: existingFr.id },
          data: { nazwa: fr },
        });
      } else {
        await prisma.cechyTlumaczenie.create({
          data: { nazwa: fr, kod_jezyka: 'fr', cecha: { connect: { id } } },
        });
      }
    }

    // Step 4: Insert or update translations for 'de'
    if (de) {
      if (existingDe) {
        await prisma.cechyTlumaczenie.update({
          where: { id: existingDe.id },
          data: { nazwa: de },
        });
      } else {
        await prisma.cechyTlumaczenie.create({
          data: { nazwa: de, kod_jezyka: 'de', cecha: { connect: { id } } },
        });
      }
    }
  }

  console.log('French and German translations updated successfully!');
}

// Run the script






updateTranslations('V:/BIBLIOTEKA/ELEMENTY/ZIMA/PODSTAWY WIZUALIZACJI/BG_KARTY/KARTY_AUTOMAT/assets/CECHY/cechy-translation.csv')
.catch((err) => console.error('Error updating translations:', err))
.finally(() => prisma.$disconnect());
import { PrismaClient } from '@prisma/client';

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

// Example data array
const dekoracjaArray = [
  {
    id: '130001',
    decorationData: {
      nazwa: 'ŚNIEŻYNKA',
      szerokosc: '0',
      wysokosc: '3.1',
      glebokosc: '0',
      led: '700',
      moc: '78.8',
    },
  },
  {
    id: '130002',
    decorationData: {
      nazwa: 'ORNAMENT ZE ŚNIEŻYNKĄ',
      szerokosc: '0',
      wysokosc: '2.2',
      glebokosc: '0',
      led: '700',
      moc: '58',
    },
  },
];

// Run the function
addDekoracjaEntries(dekoracjaArray)
  .catch((error) => console.error('Error:', error))
  .finally(async () => {
    await prisma.$disconnect();
  });

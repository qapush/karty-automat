import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// pages/api/dekoracje.js
import { fetchDecorations } from '@/lib/fetchDecorations'; // Adjust the import path as necessary

export async function GET(req) {
  const languageCode = req.headers.get('accept-language') || 'pl'; // Default to Polish if no language header
  const dekoracjeResponse = await fetchDecorations(languageCode);

  // Check if the response is okay
  if (!dekoracjeResponse.ok) {
    return new Response('Failed to fetch decorations', { status: 500 });
  }

  return dekoracjeResponse; // This will return the decorations as a response
}

export async function POST(request) {
    const { id, tytul, typ_dekoracji, szerokosc, wysokosc, glebokosc, moc, ilosc_led, jezyk, przewagi, cechy } = await request.json();
  
    try {
      // Create the decoration first
      const newDekoracja = await prisma.dekoracja.create({
        data: {
          id,
          typ_dekoracji: {
            connect: { id: typ_dekoracji }, // Connect the TypDekoracji by its ID
          },
          szerokosc,
          wysokosc,
          glebokosc,
          moc,
          ilosc_led,
          // Create connections with selected cechy and przewagi
          cechy: {
            create: cechy.map((cechaId) => ({
              cecha: { connect: { id: cechaId } }, // Connect each feature by ID
            })),
          },
          przewagi: {
            create: przewagi.map((przewagaId) => ({
              przewaga: { connect: { id: przewagaId } }, // Connect each advantage by ID
            })),
          },
        },
      });
  
      // Now create the translation for the decoration
      const newTranslation = await prisma.dekoracjaTlumaczenie.create({
        data: {
          dekoracja_id: newDekoracja.id,
          tytul,
          kod_jezyka: jezyk,
        },
      });
  
      return new Response(JSON.stringify({ decoration: newDekoracja, translation: newTranslation }), { status: 201 });
    } catch (error) {
      console.error('Error creating decoration:', error);
      return new Response('Failed to create decoration', { status: 500 });
    }
  }

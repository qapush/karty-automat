import { PrismaClient } from '@prisma/client';
import { revalidatePath } from "next/cache";

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

export async function POST(req) {
  try {
    const requestData = await req.json();
    const id = requestData.id;
    const locale = requestData.locale;    
    const title = requestData.titles[locale].title;
    const typ = requestData.typ; // id typu dekoracji z TypDekoracji
    const cechy = requestData.cechy; // array of id cech z Cechy
    const przewagi = requestData.przewagi; // array of przewagi cech z Przewagi
    const led = requestData.led;
    const power = requestData.power;
    const szerokosc = requestData.szerokosc;
    const wysokosc = requestData.wysokosc;
    const glebokosc = requestData.glebokosc;

    if (id) {
      const existingDekoracja = await prisma.dekoracja.findUnique({
        where: { id: parseInt(id) },
      });

      if (existingDekoracja) {
        return new Response(JSON.stringify({ error: "Dekoracja o takim ID już istnieje" }), {
          status: 409,
        });
      }
    }

    // Create a new dekoracja
    const newDekoracja = await prisma.dekoracja.create({
      data: {
        id: Number(id),
        szerokosc: Number(szerokosc),
        wysokosc: Number(wysokosc),
        glebokosc: Number(glebokosc),
        moc: Number(power),
        ilosc_led: Number(led),
        typ_dekoracji: typ ? { connect: { id: typ } } : undefined,
      },
    });

    // Create entries in the DekoracjaCechy table
    if (cechy && cechy.length > 0) {
      const cechyData = cechy.map((cechaId) => ({
        dekoracja_id: newDekoracja.id,
        cecha_id: cechaId,
      }));
      await prisma.dekoracjaCechy.createMany({
        data: cechyData,
      });
    }

    // Create entries in the DekoracjaPrzewagi table
    if (przewagi && przewagi.length > 0) {
      const przewagiData = przewagi.map((przewagaId) => ({
        dekoracja_id: newDekoracja.id,
        przewaga_id: przewagaId,
      }));
      await prisma.dekoracjaPrzewagi.createMany({
        data: przewagiData,
      });
    }

    // Create a new translation entry in the DekoracjaTlumaczenie table
    await prisma.dekoracjaTlumaczenie.create({
      data: {
        dekoracja_id: newDekoracja.id,
        kod_jezyka: locale,
        tytul: title,
      },
    });

    revalidatePath('/dekoracje');
    console.log(`Pomyślnie dodano ID ${id}`);
    return new Response(JSON.stringify({message: `Pomyślnie dodano ID ${id}`, id}), { status: 201 });

    
  } catch (err) {
    console.error("Error creating dekoracja:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}

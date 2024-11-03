import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = await params;
  console.log(id);

  try {
    // Fetch the dekoracja by ID
    const dekoracja = await prisma.dekoracja.findUnique({
      where: { id: parseInt(id) },
      include: {
        tlumaczenia: true,
        typ_dekoracji: {
          include: { tlumaczenia: true }
        },
        cechy: {
          include: { cecha: { include: { tlumaczenia: true } } }
        },
        przewagi: {
          include: { przewaga: { include: { tlumaczenia: true } } }
        }
      }
    });

    // If not found, return 404
    if (!dekoracja) {
      return new Response(JSON.stringify({ error: 'Dekoracja not found' }), { status: 404 });
    }

    const cleanDekoracja = {
      id: dekoracja.id,
      title: dekoracja.tlumaczenia[0].tytul,
      subtitle: dekoracja.typ_dekoracji.tlumaczenia[0].nazwa,
      led: dekoracja.ilosc_led,
      power: dekoracja.moc,
      przewagi: dekoracja.przewagi.map( i => {
        return i.przewaga.tlumaczenia[0].nazwa
      }),
      cechy: dekoracja.cechy.map( i => {
        return i.cecha.tlumaczenia[0].nazwa
      }),

    };

    // Return the clean data as JSON
    return new Response(JSON.stringify(cleanDekoracja), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

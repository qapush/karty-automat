import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  const { id } = params;

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

    // Prepare a "clean" object that safely checks for optional fields
    const cleanDekoracja = {
      id: dekoracja.id,
      title: dekoracja.tlumaczenia?.[0]?.tytul || "Untitled",
      subtitle: dekoracja.typ_dekoracji?.tlumaczenia?.[0]?.nazwa || "No subtitle",
      led: dekoracja.ilosc_led || 0,
      power: dekoracja.moc || 0,
      przewagi: dekoracja.przewagi?.map(i => i.przewaga?.tlumaczenia?.[0]?.nazwa || "Unnamed Advantage") || [],
      cechy: dekoracja.cechy?.map(i => i.cecha?.tlumaczenia?.[0]?.nazwa || "Unnamed Feature") || [],
      szerokosc: dekoracja.szerokosc || 0,
      wysokosc: dekoracja.wysokosc || 0,
      glebokosc: dekoracja.glebokosc || 0
    };

    // Return the clean data as JSON
    return new Response(JSON.stringify(cleanDekoracja), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}


export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedDekoracja = await prisma.dekoracja.update({
      where: { id: parseInt(id) },
      data: {
        szerokosc: parseFloat(data.szerokosc),
        wysokosc: parseFloat(data.wysokosc),
        glebokosc: parseFloat(data.glebokosc),
        moc: parseFloat(data.power),
        ilosc_led: parseInt(data.led),
        tlumaczenia: {
          update: {
            where: { dekoracja_id: parseInt(id) },
            data: { tytul: data.title },
          },
        },
        typ_dekoracji: {
          update: {
            where: { id: data.subtitle },
            data: { nazwa: data.subtitle },
          },
        },
      },
    });

    return new Response(JSON.stringify(updatedDekoracja), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to update Dekoracja" }),
      { status: 500 }
    );
  }
}

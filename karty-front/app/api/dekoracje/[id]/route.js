import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(request, props) {

  
  const locale = request.nextUrl.searchParams.get('locale') || 'pl';
  
  const params = await props.params;
  const { id } = params;

  try {
    // Fetch the dekoracja by ID
    const dekoracja = await prisma.dekoracja.findUnique({
      where: { id: parseInt(id) },
      include: {
        tlumaczenia: true, // Ensure this is included
        typ_dekoracji: {
          include: { tlumaczenia: true },
        },
        cechy: {
          include: { cecha: { include: { tlumaczenia: true } } },
        },
        przewagi: {
          include: { przewaga: { include: { tlumaczenia: true } } },
        },
      },
    });

    // If not found, return 404
    if (!dekoracja) {
      return new Response(JSON.stringify({ error: "Dekoracja not found" }), {
        status: 404,
      });
    }

    // Prepare a "clean" object that safely checks for optional fields
    const cleanDekoracja = {
      id: dekoracja.id,
      title: { tlumaczenia: dekoracja.tlumaczenia || "Untitled" },
      subtitle:
        dekoracja.typ_dekoracji?.tlumaczenia?.[0]?.nazwa || "No subtitle",
      led: dekoracja.ilosc_led || 0,
      power: dekoracja.moc || 0,
      przewagi:
        dekoracja.przewagi?.map(
          (i) => i.przewaga.slug
        ) || [],
      cechy:
        dekoracja.cechy?.map(
          (i) => i.cecha?.tlumaczenia?.find( i => i.kod_jezyka === locale)?.nazwa || "Unnamed Feature"
        ) || [],
      szerokosc: dekoracja.szerokosc || 0,
      wysokosc: dekoracja.wysokosc || 0,
      glebokosc: dekoracja.glebokosc || 0,
    };

    // Return the clean data as JSON
    return new Response(JSON.stringify(cleanDekoracja), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}


export async function PUT(req, props) {
  const params = await props.params;

  try {
    const id = params.id; // id dekoracji z Dekoracja
    const requestData = await req.json();
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

    // Найти существующую запись с переводом

    const tlumaczenie = await prisma.dekoracjaTlumaczenie.findFirst({
      where: { 
        kod_jezyka: locale, 
        dekoracja_id: Number(id) 
      }
    });

    // Обновление основной таблицы Dekoracja
    const updatedDekoracja = await prisma.dekoracja.update({
      where: { id: Number(id) },
      data: {
        szerokosc: Number(szerokosc),
        wysokosc: Number(wysokosc),
        glebokosc: Number(glebokosc),
        moc: Number(power),
        ilosc_led: Number(led),
        typ_dekoracji: typ ? { connect: { id: typ } } : undefined,
      },
    });

    // Update the `cechy` relationships in the join table
    // Delete existing entries in the DekoracjaCechy table for this dekoracja
    await prisma.dekoracjaCechy.deleteMany({
      where: { dekoracja_id: parseInt(id) },
    });

    // Create new entries in the DekoracjaCechy table
    if (cechy && cechy.length > 0) {
      const cechyData = cechy.map((cechaId) => ({
        dekoracja_id: parseInt(id),
        cecha_id: cechaId,
      }));
      await prisma.dekoracjaCechy.createMany({
        data: cechyData,
      });
    }

    // Update the `przewagi` relationships in the join table
    // Delete existing entries in the DekoracjaPrzewagi table for this dekoracja
    await prisma.dekoracjaPrzewagi.deleteMany({
      where: { dekoracja_id: parseInt(id) },
    });

    // Create new entries in the DekoracjaPrzewagi table
    if (przewagi && przewagi.length > 0) {
      const przewagiData = przewagi.map((przewagaId) => ({
        dekoracja_id: parseInt(id),
        przewaga_id: przewagaId,
      }));
      await prisma.dekoracjaPrzewagi.createMany({
        data: przewagiData,
      });
    }

    // Обновление названия в таблице DekoracjaTlumaczenie
    if (tlumaczenie) {
      await prisma.dekoracjaTlumaczenie.update({
        where: { id: tlumaczenie.id },
        data: {
          tytul: title
        },
      });
    } else {
      // Если перевода нет, создаем новый
      await prisma.dekoracjaTlumaczenie.create({
        data: {
          dekoracja_id: Number(id),
          kod_jezyka: locale,
          tytul: title
        },
      });
    }

    return new Response(JSON.stringify({message: `Pomyślnie zmieniono dane dla ID ${id}`}), { status: 200 });
  } catch (err) {
    console.error("Error updating dekoracja:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}




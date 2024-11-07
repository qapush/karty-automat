import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(request, props) {
  const params = await props.params;
  const { id } = params;

  try {
    // Fetch the dekoracja by ID
    const dekoracja = await prisma.dekoracja.findUnique({
      where: { id: parseInt(id) },
      include: {
        tlumaczenia: true, // Ensure this is included
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
      title: {tlumaczenia: dekoracja.tlumaczenia || "Untitled"},
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


// app/api/dekoracje/[id]/route.js

export async function PUT(req, props) {
  const params = await props.params;
  try {
    const { id } = params;
    const {
      title,
      subtitle_id,       // ID of TypDekoracji you want to connect
      tlumaczenie_id,
      led,
      power,
      szerokosc,
      wysokosc,
      glebokosc,
      cechy,             // Array of Cechy IDs
      przewagi,          // Array of Przewagi IDs
    } = await req.json();

    if (!tlumaczenie_id) {
      return new Response(JSON.stringify({ error: "Translation ID is required" }), { status: 400 });
    }

    // Check if the translation exists
    const existingTranslation = await prisma.dekoracjaTlumaczenie.findUnique({
      where: { id: tlumaczenie_id },
    });

    if (!existingTranslation) {
      return new Response(JSON.stringify({ error: "Translation not found" }), { status: 404 });
    }

    // Ensure all dimensions are valid numbers before updating
    const validSzerokosc = parseFloat(szerokosc) || 0;
    const validGlebokosc = parseFloat(glebokosc) || 0;

    // Update the translation in the DekoracjaTlumaczenie table
    await prisma.dekoracjaTlumaczenie.update({
      where: { id: tlumaczenie_id },
      data: { tytul: title },
    });

    // Update the dekoracja fields
    const updatedDekoracja = await prisma.dekoracja.update({
      where: { id: parseInt(id) },
      data: {
        typ_dekoracji: { connect: { id: subtitle_id } },  // Use connect for relation field
        ilosc_led: parseInt(led),
        moc: parseInt(power),
        szerokosc: validSzerokosc,
        wysokosc: parseFloat(wysokosc),
        glebokosc: validGlebokosc,
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

    return new Response(JSON.stringify(updatedDekoracja), { status: 200 });
  } catch (err) {
    console.error("Error updating dekoracja:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}












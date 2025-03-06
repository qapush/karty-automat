import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  
  
  try {
    const { id } = await params; 
    const body = await req.json(); // Parse request body
    const { tlumaczenieId, nazwa, kod_jezyka } = body;
    
    console.log(id);// Extract translation ID from URL
    console.log(tlumaczenieId, nazwa, kod_jezyka);
    


    // Ensure required fields are provided
    if (!tlumaczenieId || !nazwa || !kod_jezyka) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Find the existing translation to check if it matches the requested language
    const existingTranslation = await prisma.cechyTlumaczenie.findUnique({
      where: { id: tlumaczenieId },
    });

    if (!existingTranslation) {
      return new Response(
        JSON.stringify({ error: "Translation not found" }),
        { status: 404 }
      );
    }

    // Ensure we are updating the correct translation for the locale
    if (existingTranslation.kod_jezyka !== kod_jezyka) {
      return new Response(
        JSON.stringify({ error: "Translation ID does not match the language" }),
        { status: 400 }
      );
    }

    // Update the translation
    const updatedTranslation = await prisma.cechyTlumaczenie.update({
      where: { id: tlumaczenieId },
      data: { nazwa },
    });

    return new Response(JSON.stringify(updatedTranslation), { status: 200 });
  } catch (error) {
    console.error("Error updating feature translation:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update feature translation" }),
      { status: 500 }
    );
  }
}
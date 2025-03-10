import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = await params; // Extract the feature ID from URL params
    const body = await req.json(); // Parse request body
    const { nazwa, kod_jezyka } = body; // Extract name and language code


    // Ensure required fields are provided
    if (!id || !nazwa || !kod_jezyka) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Check if the translation already exists for this feature and language
const existingTranslation = await prisma.cechyTlumaczenie.findFirst({
  where: {
    cecha_id: id,
    kod_jezyka: kod_jezyka,
  },
});


    let upsertedTranslation;

    if (existingTranslation) {
      // Update the existing translation if it exists
      upsertedTranslation = await prisma.cechyTlumaczenie.updateMany({
        where: { cecha_id: id, kod_jezyka },
        data: {
          nazwa, // Update name
        },
      });
    } else {
      // Create a new translation if it doesn't exist
      upsertedTranslation = await prisma.cechyTlumaczenie.create({
        data: {
          cecha_id: id, // The feature ID
          kod_jezyka, // The language code
          nazwa, // The name of the feature (translated)
        },
      });
    }

    console.log(upsertedTranslation);
    
    return new Response(JSON.stringify(upsertedTranslation), { status: 200 });
  } catch (error) {
    console.error("Error updating/creating feature translation:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update or create feature translation" }),
      { status: 500 }
    );
  }
}

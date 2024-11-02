import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, language } = await req.json(); // Parse JSON from the request body

  try {
    const newCecha = await prisma.cechy.create({
      data: {
        tlumaczenia: {
          create: {
            nazwa: name,
            kod_jezyka: language,
          },
        },
      },
    });
    return new Response(JSON.stringify(newCecha), { status: 201 });
  } catch (error) {
    console.error('Failed to create new feature:', error);
    return new Response(JSON.stringify({ error: 'Failed to create new feature' }), { status: 500 });
  }
}

// Optionally, you can define other HTTP methods like GET, PUT, DELETE, etc.

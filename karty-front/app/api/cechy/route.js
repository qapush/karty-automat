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

export async function DELETE(req) {
  const { id } = await req.json(); // Parse JSON from the request body
  try {
    const resp = await prisma.cechy.delete({
      where: { id },
    });
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete new cecha:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete new cecha' }), { status: 404 });
  }
}

export async function GET(req) {
  try {
    // Fetch features with their translations where language code is 'pl'
    const cechy = await prisma.cechy.findMany({
      include: {
        tlumaczenia: {
          where: { kod_jezyka: 'pl' }, // Filter for Polish translations
        },
      },
    });

    return new Response(JSON.stringify(cechy), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching cechy:', error);
    return new Response('Failed to fetch cechy', { status: 500 });
  }
}

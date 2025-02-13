import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  const { name, language } = await req.json(); // Parse JSON from the request body

  try {
    const newCecha = await prisma.typDekoracji.create({
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
    await prisma.typDekoracji.delete({
      where: { id },
    });
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete new typ:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete new typ' }), { status: 404 });
  }
}

// app/api/typy/route.js


// GET /api/typy
export async function GET(req) {
  try {
    // Fetch decoration types with their translations where language code is 'pl'
    const typy = await prisma.typDekoracji.findMany({
      include: {
        tlumaczenia: {
          where: { kod_jezyka: 'pl' }, // Filter for Polish translations
        },
      },
    });

    return new Response(JSON.stringify(typy), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching typy:', error);
    return new Response('Failed to fetch typy', { status: 500 });
  }
}


 

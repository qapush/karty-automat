import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { przewagiData } from '@/utils/przewagi';


export async function POST(req) {
  const { name, language } = await req.json(); // Parse JSON from the request body

  try {
    const newPrzewaga = await prisma.przewagi.create({
      data: {
        tlumaczenia: {
          create: {
            nazwa: name,
            kod_jezyka: language,
          },
        },
      },
    });
    return new Response(JSON.stringify(newPrzewaga), { status: 201 });
  } catch (error) {
    console.error('Failed to create new feature:', error);
    return new Response(JSON.stringify({ error: 'Failed to create new feature' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { id } = await req.json(); // Parse JSON from the request body
  try {
    const resp = await prisma.przewagi.delete({
      where: { id },
    });
    
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete new feature:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete new feature' }), { status: 404 });
  }
}

export async function GET(req) {
  try {
    // Fetch advantages with their translations where language code is 'pl'
    const przewagi = await przewagiData();

    return new Response(JSON.stringify(przewagi), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching przewagi:', error);
    return new Response('Failed to fetch przewagi', { status: 500 });
  }
}

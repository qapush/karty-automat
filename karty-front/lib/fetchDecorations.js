// lib/fetchDecorations.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchDecorations(languageCode = 'pl') {
  try {
    const decorations = await prisma.dekoracja.findMany({
      include: {
        // Include title translations filtered by language code
        tlumaczenia: true,
        // Include translated type name in the specified language
        typ_dekoracji: {
          include: {
            tlumaczenia: {
              where: {
                kod_jezyka: languageCode,
              },
              select: {
                nazwa: true,
              },
            },
          },
        },
        // Include features with translations in the specified language
        cechy: {
          include: {
            cecha: {
              include: {
                tlumaczenia: {
                  where: {
                    kod_jezyka: languageCode,
                  },
                  select: {
                    nazwa: true,
                  },
                },
              },
            },
          },
        },
        // Include advantages with translations in the specified language
        przewagi: {
          include: {
            przewaga: {
              include: {
                tlumaczenia: {
                  where: {
                    kod_jezyka: languageCode,
                  },
                  select: {
                    nazwa: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    

    return new Response(JSON.stringify(decorations), { status: 200 });
  } catch (error) {
    console.error('Error fetching decorations:', error);
    return new Response('Failed to fetch decorations', { status: 500 });
  }
}

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateSlugs() {
  const przewagi = await prisma.przewagi.findMany({
    include: {
      tlumaczenia: true,
    },
  });

  for (const przewaga of przewagi) {
    const plTranslation = przewaga.tlumaczenia.find(t => t.kod_jezyka === 'pl');

    if (plTranslation) {
      await prisma.przewagi.update({
        where: { id: przewaga.id },
        data: { slug: plTranslation.nazwa },
      });

      console.log(`Updated przewaga ID ${przewaga.id} with slug: ${plTranslation.nazwa}`);
    }
  }

  console.log('Slugs updated successfully!');
}

updateSlugs()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());

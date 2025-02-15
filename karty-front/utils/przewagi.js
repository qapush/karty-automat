import { PrismaClient } from "@prisma/client";

export const przewagiData = async (id) => {
 
  const prisma = new PrismaClient();

  const przewagi = await prisma.przewagi.findMany({
    include: {
      tlumaczenia: {
        where: { kod_jezyka: 'pl' }, // Filter for Polish translations
      },
    },
  });

  // If not found, return 404
  if (!przewagi) {
    return {};
  }

  // Return the clean data as JSON
  return przewagi;
};

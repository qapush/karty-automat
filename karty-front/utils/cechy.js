import { PrismaClient } from "@prisma/client";

export const cechyData = async (id) => {
 
  const prisma = new PrismaClient();

  const cechy = await prisma.cechy.findMany({
    include: {
      tlumaczenia: {
        where: { kod_jezyka: 'pl' }, // Filter for Polish translations
      },
    },
  });



  // If not found, return 404
  if (!cechy) {
    return {};
  }
  

  // Return the clean data as JSON
  return cechy;
};

import { PrismaClient } from "@prisma/client";

export const typyData = async (id) => {
 
  const prisma = new PrismaClient();

  const typy = await prisma.typDekoracji.findMany({
    include: {
      tlumaczenia: {
        where: { kod_jezyka: 'pl' }, // Filter for Polish translations
      },
    },
  });
  

  // If not found, return 404
  if (!typy) {
    return {};
  }


  // Return the clean data as JSON
  return typy;
};

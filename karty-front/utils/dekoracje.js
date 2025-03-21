import { PrismaClient } from "@prisma/client";

export const dekoracjaData = async (id, locale) => {
  const prisma = new PrismaClient();

  const dekoracja = await prisma.dekoracja.findUnique({
    where: { id: parseInt(id) },
    include: {
      tlumaczenia: true,
      typ_dekoracji: {
        select: {
          tlumaczenia: true,
          id: true
        },
      },
      cechy: {
      select: {
        cecha: {
          select: {
            id: true, // Keep if you need the Cechy ID
            tlumaczenia: {
              where: { kod_jezyka: locale },
              select: { nazwa: true, id: true },
            },
          },
        },
      },
    },
      przewagi: {
        include: {
          przewaga: {
            include: {
              tlumaczenia: {
                where: { kod_jezyka: locale },
                
              },
            },
          },
        },
      },
    },
  });
  

  
  
  

  if (!dekoracja) {
    return {};
  }
  


  // Prepare a "clean" object that safely checks for optional fields
  const cleanDekoracja = {
    id: dekoracja.id,
    title: dekoracja?.tlumaczenia || "Untitled" ,
    typ: dekoracja?.typ_dekoracji || "No subtitle",
    led: dekoracja.ilosc_led || 0,
    power: dekoracja.moc || 0,
    przewagi:
      dekoracja.przewagi?.map(
        (i) => i.przewaga || "Unnamed Advantage"
      ) || [],
    cechy:
      dekoracja.cechy?.map(
        (i) => i.cecha || "Unnamed Feature"
      ) || [],
    szerokosc: dekoracja.szerokosc || 0,
    wysokosc: dekoracja.wysokosc || 0,
    glebokosc: dekoracja.glebokosc || 0,
  };


  

  return cleanDekoracja;
};

"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DateRange } from "react-date-range";
import { getUserIdDB } from "./user.action";

export async function allHouses() {
  try {
    const house = await prisma.casa.findMany();

    return house;
  } catch (errore) {
    console.error("cerca tutte le case", errore);
    return [];
  }
}

export async function cercaCasa(id: string) {
  try {
    const casa = await prisma.casa.findUnique({
      where: {
        id,
      },
      include: {
        caseHost: true,
        prenotazioni: {
          select: {
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    return casa;
  } catch (errore) {
    console.error("Casa non trovata da db", errore);
  }
}

interface Date {
  startDate: any;
  endDate: any;
  key: string;
}

export async function prenotazione(id: string, date: Date) {
  const { userId } = await auth();
  if (!userId) return;
  const userIdDb = await getUserIdDB(userId!);
  const casa = await cercaCasa(id);

  try {
    if (!casa) return;
    let diffDate =
      (date.endDate.valueOf() - date.startDate.valueOf()) /
      (1000 * 60 * 60 * 24);
    let prezzoTot = casa.price * diffDate;
    const creaPrenotazione = await prisma.prenotazioni.create({
      data: {
        userId: userIdDb!,
        casaId: id,
        totalPrice: prezzoTot,
        startDate: date.startDate,
        endDate: date.endDate,
      },
    });
  } catch (errore) {
    console.error("errore nella prenotazione", errore);
  }
}

export async function querySearch(
  nation: string,
  rooms: number,
  bathrooms: number,
  startDate: string,
  endDate: string
) {
  if (!rooms && !nation) return;
  try {
    const queryHouse = await prisma.casa.findMany({
      where: {
        location: nation,
        bathroomCount: bathrooms,
        roomCount: rooms,
        prenotazioni: {
          none: {
            OR: [
              {
                startDate: {
                  lte: new Date(endDate),
                },
                endDate: {
                  gte: new Date(startDate),
                },
              },
            ],
          },
        },
      },
    });
    return queryHouse;
  } catch (errore) {
    console.error("errore nella ricerca casa tramite query", errore);
  }
}

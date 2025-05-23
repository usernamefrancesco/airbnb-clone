// app/api/case/route.ts
import { NextResponse } from 'next/server';
import prisma  from '@/lib/prisma'; // adatta il percorso al tuo progetto

export async function GET() {
  try {
    const cases = await prisma.casa.findMany();
    return NextResponse.json(cases);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Errore nel recupero dei dati' }, { status: 500 });
  }
}
 
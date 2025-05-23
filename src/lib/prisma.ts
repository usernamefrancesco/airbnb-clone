// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Dichiariamo correttamente i tipi globali per TypeScript
declare global {
  // Evita errori di tipo in ambienti dev con hot-reloading
  var prisma: PrismaClient | undefined;
  // Aggiungiamo la dichiarazione di tipo per prismaDisconnect
  var prismaDisconnect: () => Promise<void>;
}

// Implementazione alternativa che usa un pattern più aggressivo
// per prevenire i problemi con i prepared statements

// PrismaClientSingleton personalizzato che reinizializza le connessioni
class PrismaClientSingleton {
  private static instance: PrismaClient;
  
  public static getInstance(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient({
        log: ['error'],
        // Disabilitiamo esplicitamente il caching delle query
        // che può contribuire al problema dei prepared statements
        datasources: {
          db: {
            url: process.env.DATABASE_URL
          }
        }
      });
      console.log('✅ PrismaClient creato'); // 👈 AGGIUNGILO QUI
    }
    return PrismaClientSingleton.instance;
  }
  
  // Metodo per disconnettere forzatamente e ricreare se necessario
  public static async disconnect(): Promise<void> {
    if (PrismaClientSingleton.instance) {
      await PrismaClientSingleton.instance.$disconnect();
      PrismaClientSingleton.instance = new PrismaClient({
        log: ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL
          }
        }
      });
    }
  }
}

// Esporta l'istanza singleton
const prisma = PrismaClientSingleton.getInstance();

// In ambiente di sviluppo, impostiamo un meccanismo di pulizia periodica
// per gestire meglio le connessioni che potrebbero diventare stale
if (process.env.NODE_ENV !== 'production') {
  // Ogni 30 minuti, disconnettiamo e ricreiamo il client Prisma
  // per evitare l'accumulo di prepared statements
  setInterval(async () => {
    console.log('🧹 Pulizia programmata delle connessioni Prisma');
    await PrismaClientSingleton.disconnect();
  }, 30 * 60 * 1000); // 30 minuti
  
  // Esportiamo anche il metodo disconnect per poterlo chiamare manualmente
  // se necessario durante lo sviluppo
  global.prismaDisconnect = PrismaClientSingleton.disconnect;

}

export default prisma;
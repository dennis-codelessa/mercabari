import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Forzamos la URL directa para evitar fallos de lectura del .env en Windows
const connectionString = "postgresql://neondb_owner:npg_Po71VtbCHQZv@ep-fancy-truth-anygy7kn.c-6.us-east-1.aws.neon.tech/mercabari?sslmode=verify-full";

// Creamos el Pool clásico de Postgres
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Le pasamos el adaptador exacto como Prisma 7 lo exige
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
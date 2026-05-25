import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    // Usamos tu URL directa aquí para que el generador no falle
    url: "postgresql://neondb_owner:npg_Po71VtbCHQZv@ep-fancy-truth-anygy7kn.c-6.us-east-1.aws.neon.tech/mercabari?sslmode=require",
  },
});
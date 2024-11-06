import { PrismaClient } from "@prisma/client";

// Declare the global type
declare global {
  var prisma: PrismaClient | undefined; // Use 'var' instead of 'const'
}

const prismadb =
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prismadb;
}

export default prismadb;

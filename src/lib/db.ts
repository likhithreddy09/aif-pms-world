import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function clientOptions(): ConstructorParameters<typeof PrismaClient>[0] {
  const log =
    process.env.NODE_ENV === "development" ? (["error", "warn"] as const) : (["error"] as const);
  const configured = process.env.DATABASE_URL;
  if (!process.env.VERCEL || (configured && !configured.startsWith("file:"))) {
    return { log: [...log] };
  }

  const source = path.join(process.cwd(), "prisma", "dev.db");
  const target = "/tmp/pms-aif-world.db";
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
  }
  return { log: [...log], datasources: { db: { url: `file:${target}` } } };
}

export const db = globalForPrisma.prisma ?? new PrismaClient(clientOptions());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}

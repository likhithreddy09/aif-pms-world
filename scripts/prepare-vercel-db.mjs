import { execSync } from "node:child_process";

const configured = process.env.DATABASE_URL;
if (configured && !configured.startsWith("file:")) {
  console.log("External database configured; skipping SQLite seed.");
  process.exit(0);
}

process.env.DATABASE_URL = "file:./dev.db";
process.env.ADMIN_EMAIL ||= "admin@pmsaifworld.com";
process.env.ADMIN_PASSWORD ||= "DemoAdmin@2026";

execSync("npx prisma db push --skip-generate", { stdio: "inherit", env: process.env });
execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env: process.env });

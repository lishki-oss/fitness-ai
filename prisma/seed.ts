import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await bcrypt.hash("trainer123", 12);

  const trainer = await prisma.user.upsert({
    where: { email: "trainer@fittrainer.com" },
    update: {},
    create: {
      email: "trainer@fittrainer.com",
      name: "מאמן ראשי",
      passwordHash,
    },
  });

  console.log("Seeded trainer:", trainer.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

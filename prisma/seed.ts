import { PrismaClient } from "../src/generated/prisma";
import { activities } from "./seed-data.ts";

const prisma = new PrismaClient();

async function seedDatabase() {
  for (const activity of activities) {
    await prisma.activity.create({ data: activity });
  }
}

seedDatabase()
  .then(() => console.log("Seeding complete"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  
import "dotenv/config";
import { prisma } from "../src/lib/prisma.js";
import { Role, User, Property } from "../src/generated/prisma/client.js";
import { faker } from "@faker-js/faker";

async function seed() {
  console.info(`Seeding started!`);

  /* -------------------------- Delete Previous Data -------------------------- */
  console.info(`Delete previous data...`);

  await prisma.user.deleteMany();
  await prisma.property.deleteMany();
  await prisma.order.deleteMany();

  console.info(`Old data has been removed`);

  /* ------------------------------ Create Users ------------------------------ */
  console.info(`Create user data...`);

  const users: User[] = [];
  for (let i = 0; i < 5; i++) {
    const role = i % 2 === 0 ? Role.CUSTOMER : Role.TENANT;

    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.person.fullName(),
        password: "purwadhika123",
        role,
      },
    });

    users.push(user);
  }

  console.info(`Created users data`);

  /* ---------------------------- Create Properties --------------------------- */
  console.info(`Create properties data...`);

  const properties: Property[] = [];

  for (let i = 0; i < 10; i++) {
    const property = await prisma.property.create({
      data: {
        name: faker.location.streetAddress(),
        price: faker.number.float({ min: 5, max: 5000, fractionDigits: 2 }),
      },
    });

    properties.push(property);
  }

  console.info(`Created properties data`);
  console.info(`Seeding finished`);
}

seed();

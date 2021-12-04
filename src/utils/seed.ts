const dbClient = require("./dbClient")

import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient

async function seed() {
await dbClient.user.deleteMany();

console.log(`Start Seeding`)

const user = await dbClient.user.create({
    data: {
email: 'Emmanuel',
password: 'qwerty'
    }
})
console.log("Created User and Seeding finished:", user)
}
seed()
.catch((error) => {
    console.error(error.message)
})
.finally(async () => {
    await dbClient.$disconnect();
    process.exit(1)
})
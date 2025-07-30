import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: 'administrator@orion.xyz' },
  });

  if (!adminExists) {
    await prisma.user.create({
      data: {
        email: 'administrator@orion.xyz',
        password: await bcrypt.hash('Sup3rS3cur3P@ssw0rd', 10),
        role: 'admin',
      },
    });
    console.log("✅ Admin user created: administrator@orion.xyz / Sup3rS3cur3P@ssw0rd");
  } else {
    console.log("ℹ️ Admin user already exists");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

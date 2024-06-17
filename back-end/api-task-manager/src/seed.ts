import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
      password: 'alice123',
    },
  });

  console.log({ user1 });

  const tag1 = await prisma.tag.create({
    data: {
      title: 'urgent',
    },
  });

  const tag2 = await prisma.tag.create({
    data: {
      title: 'backend',
    },
  });

  const tag3 = await prisma.tag.create({
    data: {
      title: 'frontend',
    },
  });

  console.log({ tag1, tag2, tag3 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

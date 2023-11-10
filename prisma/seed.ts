const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.book.create({
    data: {
      title: 'init book',
      url: 'https://www.google.com',
      category: 'hobby',
      likes: 0,
      price: 100000,
    },
  });
  console.log(user);
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

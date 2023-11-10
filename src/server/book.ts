'use server';

export const createBook = async () => {
  const book = await prisma.book.create({
    data: {
      title: 'test',
      url: 'test',
      category: 'test',
      price: 0,
      likes: 0,
    },
  });

  return book;
};

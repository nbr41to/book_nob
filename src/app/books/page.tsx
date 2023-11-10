import {Suspense} from 'react';
import {prisma} from '@/server/prisma/client';
import {BookCard} from './components/BookCard';

/* バックエンドの処理 */
const getBooks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const books = await prisma.book.findMany();

  return books;
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div className='flex flex-wrap gap-2'>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

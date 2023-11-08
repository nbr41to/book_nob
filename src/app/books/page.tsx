import {Suspense} from 'react';
import {BookInfoCard, BookInfoCardSkeleton} from './components/BookInfoCard';

/* バックエンドの処理 */
const getBooks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await fetch(
    'https://www.googleapis.com/books/v1/volumes?q={search%20terms}'
  );
  const data = await response.json();

  return data;
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div className='flex flex-wrap gap-2'>
      {books.items.map((item: any) => (
        <Suspense key={item.id} fallback={<BookInfoCardSkeleton />}>
          <BookInfoCard
            key={item.id}
            title={item.volumeInfo.title}
            imageUrl={item.volumeInfo.imageLinks.thumbnail}
          />
        </Suspense>
      ))}
    </div>
  );
}

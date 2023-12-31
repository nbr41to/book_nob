import { getCarts } from "@/server/redis/cart";
import { BookCard } from "./components/BookCard";
import { getBooks, getBooksByCategoryId } from "@/server/prisma/book";

const getBookBySearchParams = async (searchParams: { category: string }) => {
  if (searchParams.category) {
    const books = await getBooksByCategoryId(Number(searchParams.category));

    return books;
  }

  const books = await getBooks();

  return books;
};

export default async function Page({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const books = await getBookBySearchParams(searchParams);
  const cartIds = await getCarts();

  return (
    <div>
      <h2 className="py-4 text-2xl font-bold">Books</h2>
      <div className="flex flex-wrap gap-2">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            existsInCart={cartIds.includes(String(book.id))}
          />
        ))}
      </div>
    </div>
  );
}

import { prisma } from "@/server/prisma/client";
import { BookCard } from "./components/BookCard";

/* バックエンドの処理 */
const getBooks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const books = await prisma.book.findMany();

  return books;
};

export default async function Page() {
  const books = await getBooks();

  return (
    <div>
      <h2 className="font-bold text-2xl py-4">Books</h2>
      <div className="flex flex-wrap gap-2">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

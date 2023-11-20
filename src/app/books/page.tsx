import { BookCard } from "./components/BookCard";
import { getBooks } from "@/server/book";

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

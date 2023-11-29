import { BookCard } from "./components/BookCard";
import { getBooks } from "@/server/book";

export default async function Page() {
  const books = await getBooks();

  return (
    <div>
      <h2 className="py-4 text-2xl font-bold">Books</h2>
      <div className="flex flex-wrap gap-2">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

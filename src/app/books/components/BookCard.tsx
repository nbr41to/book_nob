import { Book } from "@prisma/client";
import { FC, Suspense } from "react";
import { BookImage, BookImageSkeleton } from "./BookImage";
import Link from "next/link";

type Props = {
  book: Book;
};

export const BookCard: FC<Props> = ({ book }) => {
  return (
    <Link
      className="border w-56 h-72 rounded flex flex-col gap-2 p-2 cursor-pointer hover:scale-105 transition-transform"
      href={`/books/${book.id}`}
    >
      <Suspense fallback={<BookImageSkeleton />}>
        <BookImage url={book.url} />
      </Suspense>
      <div className="px-2 space-y-1">
        <div className="font-bold text-lg">{book.title}</div>
        <div className="border rounded text-sm w-fit px-1">{book.category}</div>
        <div className="flex justify-between">
          <div>{book.price.toLocaleString()}円</div>
          <div>♥ {book.likes.length}</div>
        </div>
      </div>
    </Link>
  );
};

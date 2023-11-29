import { FC, Suspense } from "react";
import { BookImage, BookImageSkeleton } from "./BookImage";
import Link from "next/link";
import { BookWithCategory } from "@/types";

type Props = {
  book: BookWithCategory;
};

export const BookCard: FC<Props> = ({ book }) => {
  return (
    <Link
      className="flex h-72 w-56 cursor-pointer flex-col gap-2 rounded border p-2 transition-transform hover:scale-105"
      href={`/books/${book.id}`}
    >
      <Suspense fallback={<BookImageSkeleton />}>
        <BookImage url={book.url} />
      </Suspense>
      <div className="space-y-1 px-2">
        <div className="text-lg font-bold">{book.title}</div>
        <div className="w-fit rounded border px-1 text-sm">
          {book.category.name}
        </div>
        <div className="flex justify-between">
          <div>{book.price.toLocaleString()}円</div>
          <div>♥ {book.likes.length}</div>
        </div>
      </div>
    </Link>
  );
};

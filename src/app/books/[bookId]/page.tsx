import { prisma } from "@/server/prisma/client";
import { LikeButton } from "./components/LikeButton";
import { getOgImage } from "@/server/ogp";
import Image from "next/image";
import { formatDate } from "@/utils/date";

const getBook = async (bookId: number) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { category: true },
  });

  return book;
};

const getImageUrl = async (siteUrl: string) => {
  const url = getOgImage(siteUrl);

  return url;
};

export default async function Page({ params }: { params: { bookId: string } }) {
  const bookId = Number(params.bookId);
  const book = await getBook(bookId);
  const imageUrl = await getImageUrl(book?.url ?? "");

  if (!book) return <div>Book not found</div>;

  return (
    <div className="w-fit mx-auto font-bold">
      <div className="space-y-3 py-4">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <a
          className="underline text-blue-500"
          href={book.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {book.url}
        </a>
      </div>
      <div className="space-y-3">
        <div>
          <Image
            src={imageUrl || "https://placehold.jp/300x200.png"}
            width={300}
            height={200}
            alt="book image"
          />
        </div>
        <LikeButton bookId={book.id} likedIds={book.likes} />
        <div>Category: {book.category.name}</div>
        <div>作成日時: {formatDate(book.createdAt)}</div>
        <div>更新日時: {formatDate(book.updatedAt)}</div>
        <div>{book.price.toLocaleString()}円</div>
      </div>
    </div>
  );
}

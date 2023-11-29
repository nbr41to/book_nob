import { prisma } from "@/server/prisma/client";
import { LikeButton } from "./components/LikeButton";
import { getOgImage } from "@/server/ogp";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import { AddCartButton } from "./components/AddCartButton";
import { getCarts } from "@/server/redis/cart";

// TODO: /prismaに移動
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
  const cartIds = await getCarts();

  if (!book) return <div>Book not found</div>;

  return (
    <div className="mx-auto w-fit font-bold">
      <div className="space-y-3 py-4">
        <h2 className="text-2xl font-bold">{book.title}</h2>
        <a
          className="text-blue-500 underline"
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
        <div className="flex gap-4">
          <AddCartButton
            bookId={book.id}
            disabled={cartIds.includes(String(book.id))}
          />
          <LikeButton bookId={book.id} likedIds={book.likes} />
        </div>
        <div>Category: {book.category.name}</div>
        <div>作成日時: {formatDate(book.createdAt)}</div>
        <div>更新日時: {formatDate(book.updatedAt)}</div>
        <div>{book.price.toLocaleString()}円</div>
      </div>
    </div>
  );
}

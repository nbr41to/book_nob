import { LikeButton } from "./components/LikeButton";
import { getOgImage } from "@/server/ogp";
import Image from "next/image";
import { formatDate } from "@/utils/date";
import { AddCartButton } from "./components/AddCartButton";
import { getCarts } from "@/server/redis/cart";
import type { Metadata, ResolvingMetadata } from "next";
import { getBookById } from "@/server/prisma/book";

/* Metadata */
type Props = {
  params: { bookId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const bookId = Number(params.bookId);
  const book = await getBookById(bookId);

  if (!book)
    return {
      title: "Book not found | BOOK^NOB 📚",
    };

  const title = `${book.title} | BOOK^NOB 📚`;
  const imageUrl = await getOgImage(book.url);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title,
    openGraph: {
      images: [
        imageUrl || "https://placehold.jp/200x160.png",
        ...previousImages,
      ],
    },
  };
}

/* Page */
export default async function Page({ params }: { params: { bookId: string } }) {
  const bookId = Number(params.bookId);
  const book = await getBookById(bookId);

  if (!book) return <div>Book not found</div>;

  const imageUrl = await getOgImage(book.url);
  const cartIds = await getCarts();

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

import { getCategories } from "@/server/prisma/category";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "本一覧 | BOOK^NOB 📚",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div>
      <div>
        <div className="flex gap-2">
          <div className="font-bold">Category: </div>
          <Link
            className="underline hover:text-gray-600 dark:hover:text-gray-400"
            href="/books"
          >
            all
          </Link>
          {categories.map((category) => (
            <Link
              className="underline hover:text-gray-600 dark:hover:text-gray-400"
              key={category.id}
              href={{
                pathname: "/books",
                query: { category: category.id },
              }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

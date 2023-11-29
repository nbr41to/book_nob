import { Button } from "@mantine/core";
import { Table } from "./components/Table";
import { getBooks } from "@/server/book";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function Page() {
  const books = await getBooks();

  return (
    <div>
      <div className="flex items-end justify-between">
        <h2 className="py-4 text-2xl font-bold">Books</h2>
        <Button component={Link} href="/admin/books/new">
          Add Book
        </Button>
      </div>
      <Table books={books} />
    </div>
  );
}

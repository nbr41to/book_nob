import { Button } from "@mantine/core";
import { Table } from "./components/Table";
import { getBooks } from "@/server/book";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default async function Page() {
  const books = await getBooks();

  return (
    <div>
      <div className="flex justify-between items-end">
        <h2 className="font-bold text-2xl py-4">Books</h2>
        <Button component={Link} href="/admin/books/new">
          Add Book
        </Button>
      </div>
      <Table books={books} />
    </div>
  );
}

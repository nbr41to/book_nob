import { Button } from "@mantine/core";
import { Table } from "./components/Table";
import { getBooks } from "@/server/book";

export default async function Page() {
  const books = await getBooks();

  return (
    <div>
      <div className="flex justify-between items-end">
        <h2 className="font-bold text-2xl py-4">Books</h2>
        <Button>Add Book</Button>
      </div>
      <Table books={books} />
    </div>
  );
}

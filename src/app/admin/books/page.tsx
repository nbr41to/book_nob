import { Table } from "./components/Table";
import { getBooks } from "@/server/book";
import { CreateButton } from "./components/CreateButton";

export default async function Page() {
  const books = await getBooks();

  return (
    <>
      <div>
        <div className="flex items-end justify-between">
          <h2 className="py-4 text-2xl font-bold">Books</h2>
          <CreateButton />
        </div>
        <Table books={books} />
      </div>
    </>
  );
}

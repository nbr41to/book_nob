import { Table } from "./components/Table";
import { getBooks } from "@/server/prisma/book";
import { CreateButton } from "./components/CreateButton";
import { getCategories } from "@/server/prisma/category";

export default async function Page() {
  const books = await getBooks();
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="py-4 text-2xl font-bold">Books</h2>
        <CreateButton categories={categories} />
      </div>
      <Table books={books} />
    </div>
  );
}

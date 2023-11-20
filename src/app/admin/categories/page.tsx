import { getCategories } from "@/server/category";
import { Table } from "./components/Table";
import { Button } from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex justify-between items-end">
        <h2 className="font-bold text-2xl py-4">Categories</h2>
        <Button component={Link} href="/admin/categories/new">
          Add Category
        </Button>
      </div>
      <Table categories={categories} />
    </div>
  );
}

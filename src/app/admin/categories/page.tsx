import { getCategories } from "@/server/prisma/category";
import { Table } from "./components/Table";
import { Button } from "@mantine/core";
import Link from "next/link";

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <h2 className="py-4 text-2xl font-bold">Categories</h2>
        <Button component={Link} href="/admin/categories/new">
          Add Category
        </Button>
      </div>
      <Table categories={categories} />
    </div>
  );
}

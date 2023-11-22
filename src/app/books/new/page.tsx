import { getCategories } from "@/server/category";
import { CreateForm } from "./components/CreateForm";

export default async function Page() {
  const categories = await getCategories();

  return (
    <div className="mx-auto w-fit py-20 space-y-2">
      <h2 className="font-bold">New Book</h2>
      <CreateForm categories={categories} />
    </div>
  );
}

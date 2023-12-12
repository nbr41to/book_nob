import { getCategories } from "@/server/prisma/category";
import { CreateForm } from "./components/CreateForm";
import { ParallelModal } from "@/app/components/ParallelModal";

export default async function Page() {
  const categories = await getCategories();

  return (
    <ParallelModal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Create New Book</h2>
        <CreateForm categories={categories} />
      </div>
    </ParallelModal>
  );
}

import { UpdateForm } from "./components/UpdateForm";
import { getCategoryById } from "@/server/prisma/category";
import { ParallelModal } from "@/app/components/ParallelModal";

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = Number(params.categoryId);
  const category = await getCategoryById(categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <ParallelModal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Update Category</h2>
        <UpdateForm category={category} />
      </div>
    </ParallelModal>
  );
}

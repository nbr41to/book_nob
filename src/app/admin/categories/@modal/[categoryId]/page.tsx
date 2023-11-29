import { Modal } from "@/app/components/Modal";
import { UpdateForm } from "./components/UpdateForm";
import { prisma } from "@/server/prisma/client";

const getCategory = async (categoryId: number) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  return category;
};

export default async function Page({
  params,
}: {
  params: { categoryId: string };
}) {
  const categoryId = Number(params.categoryId);
  const category = await getCategory(categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <Modal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Update Category</h2>
        <UpdateForm category={category} />
      </div>
    </Modal>
  );
}

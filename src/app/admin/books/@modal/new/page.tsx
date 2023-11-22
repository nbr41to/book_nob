import { getCategories } from "@/server/category";
import { CreateForm } from "./components/CreateForm";
import { Modal } from "@/app/components/Modal";

export default async function Page() {
  const categories = await getCategories();

  return (
    <Modal>
      <div className="mx-auto w-fit pb-8 space-y-8">
        <h2 className="text-2xl font-bold">Create New Book</h2>
        <CreateForm categories={categories} />
      </div>
    </Modal>
  );
}

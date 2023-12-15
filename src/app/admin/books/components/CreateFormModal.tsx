import { getCategories } from "@/server/prisma/category";
import { CreateForm } from "./CreateForm";
import { Modal } from "@/app/components/Modal";
import { FC, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
  opened: boolean;
  onClose: () => void;
};
export const CreateFormModal: FC<Props> = ({ categories, opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Create New Book</h2>
        <CreateForm categories={categories} onClose={onClose} />
      </div>
    </Modal>
  );
};

import { getCategories } from "@/server/prisma/category";
import { CreateForm } from "./CreateForm";
import { Modal } from "@/app/components/Modal";
import { FC, Suspense } from "react";
import { LoadingOverlay } from "@mantine/core";

const GetCategoriesWrapper = async ({ onClose }: { onClose: () => void }) => {
  const categories = await getCategories();

  return <CreateForm categories={categories} onClose={onClose} />;
};

type Props = {
  opened: boolean;
  onClose: () => void;
};
export const CreateFormModal: FC<Props> = ({ opened, onClose }) => {
  return (
    <Modal opened={opened} onClose={onClose}>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Create New Book</h2>
        <Suspense
          fallback={
            <div className="min-h-[340px]">
              <LoadingOverlay visible overlayProps={{ opacity: 0 }} />
            </div>
          }
        >
          <GetCategoriesWrapper onClose={onClose} />
        </Suspense>
      </div>
    </Modal>
  );
};

"use client";

import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { CreateForm } from "./components/CreateForm";

export default function Page() {
  const router = useRouter();

  return (
    <Modal opened centered onClose={router.back}>
      <div className="mx-auto w-fit pb-8 space-y-8">
        <h2 className="text-2xl font-bold">Create New Category</h2>
        <CreateForm />
      </div>
    </Modal>
  );
}

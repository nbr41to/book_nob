"use client";

import { CreateForm } from "./components/CreateForm";
import { ParallelModal } from "@/app/components/ParallelModal";

export default function Page() {
  return (
    <ParallelModal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Create New Category</h2>
        <CreateForm />
      </div>
    </ParallelModal>
  );
}

"use client";

import { Button } from "@mantine/core";
import { FC } from "react";
import { CreateFormModal } from "./CreateFormModal";
import { useDisclosure } from "@mantine/hooks";
import { Category } from "@prisma/client";

type Props = {
  categories: Category[];
};
export const CreateButton: FC<Props> = ({ categories }) => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button onClick={open}>Add Book</Button>
      <CreateFormModal
        categories={categories}
        opened={opened}
        onClose={close}
      />
    </>
  );
};

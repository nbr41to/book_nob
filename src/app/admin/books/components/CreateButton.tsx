"use client";

import { Button } from "@mantine/core";
import { FC } from "react";
import { CreateFormModal } from "./CreateFormModal";
import { useDisclosure } from "@mantine/hooks";

export const CreateButton: FC = () => {
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Button onClick={open}>Add Book</Button>
      <CreateFormModal opened={opened} onClose={close} />
    </>
  );
};

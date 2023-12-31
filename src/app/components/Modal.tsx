"use client";

import { Modal as MantineModal } from "@mantine/core";
import { FC, ReactNode } from "react";

type Props = {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<Props> = ({ opened, onClose, children }) => {
  return (
    <MantineModal opened={opened} centered onClose={onClose}>
      {children}
    </MantineModal>
  );
};

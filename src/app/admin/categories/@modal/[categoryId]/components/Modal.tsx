"use client";

import { Modal as MantineModal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Modal: FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <MantineModal opened centered onClose={router.back}>
      {children}
    </MantineModal>
  );
};

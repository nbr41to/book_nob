"use client";

import { updateUserMetadata } from "@/server/clerk/metadata";
import { Button } from "@mantine/core";
import { FC } from "react";

type Props = {
  userId: string;
};
export const EditUserMetadata: FC<Props> = ({ userId }) => {
  const onClick = () => {
    updateUserMetadata(userId, {
      role: "admin",
    });
  };

  return (
    <div className="">
      <Button onClick={onClick}>roleをadminに更新</Button>
      <div>
        <a href="https://clerk.com/docs/users/metadata">
          https://clerk.com/docs/users/metadata
        </a>
      </div>
    </div>
  );
};

import { getCarts } from "@/server/redis/cart";
import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";

type Props = {};

export const GlobalCartIcon: FC<Props> = async () => {
  const carts = await getCarts();
  const cartLength = carts.length;

  return (
    <div className="relative">
      {cartLength > 0 && (
        <div className="bg-red-500 text-white text-sm font-bold rounded-full absolute -right-1 -top-1 w-5 h-5 z-10 place-items-center grid">
          {cartLength}
        </div>
      )}
      <ActionIcon
        component={Link}
        href="/carts"
        variant="light"
        color="dark"
        radius="xl"
        size="xl"
      >
        🛒
      </ActionIcon>
    </div>
  );
};

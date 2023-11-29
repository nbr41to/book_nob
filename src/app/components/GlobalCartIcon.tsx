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
        <div className="absolute -right-1 -top-1 z-10 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-sm font-bold text-white">
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

import { prisma } from "@/server/prisma/client";
import { DeleteButton } from "./components/DeleteButton";
import { getCarts } from "@/server/redis/cart";
import { PaymentButton } from "./components/PaymentButton";
import { Metadata } from "next";
import { getBookWhereIn } from "@/server/prisma/book";

export const metadata: Metadata = {
  title: "カート | BOOK^NOB 📚",
};

const getCartItems = async () => {
  const carts = await getCarts();

  const itemIds = carts.map((id) => Number(id));
  const cartItems = await getBookWhereIn(itemIds);

  return cartItems;
};

export default async function Page() {
  const carts = await getCartItems();
  const priceIds = carts.map((cart) => cart.stripePriceId);

  return (
    <div className="mx-auto w-fit space-y-4">
      <h2 className="text-center text-xl font-bold">In CART</h2>
      <div className="flex flex-wrap gap-4">
        {carts?.map((cart) => (
          <div key={cart.id} className="w-40 rounded border">
            <div className="bg-gray-800 p-2 text-center text-lg font-bold text-white dark:bg-white dark:text-black">
              {cart.title}
            </div>
            <div className="p-1">
              <div className="text-right text-sm">{cart.category.name}</div>
              <div className="text-right text-sm">
                {cart.price.toLocaleString()}円
              </div>
            </div>
            <div className="ml-auto w-fit">
              <DeleteButton bookId={cart.id} />
            </div>
          </div>
        ))}
      </div>
      <PaymentButton priceIds={priceIds} />
    </div>
  );
}

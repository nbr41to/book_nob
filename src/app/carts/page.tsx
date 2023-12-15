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
    <div className="space-y-4">
      <h2>CARTS</h2>
      <div className="flex">
        {carts?.map((cart) => (
          <div key={cart.id} className="border">
            <div>{cart.title}</div>
            <div>{cart.category.name}</div>
            <div>{cart.price.toLocaleString()}円</div>
            <DeleteButton bookId={cart.id} />
          </div>
        ))}
      </div>
      <PaymentButton priceIds={priceIds} />
    </div>
  );
}

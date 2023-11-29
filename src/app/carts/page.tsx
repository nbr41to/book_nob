import { prisma } from "@/server/prisma/client";
import { DeleteButton } from "./components/DeleteButton";
import { getCarts } from "@/server/redis/cart";

export const dynamic = "force-dynamic";
const getCartItems = async () => {
  const carts = await getCarts();

  const itemIds = carts.map((id) => Number(id));
  const cartItems = await prisma.book.findMany({
    where: { id: { in: itemIds } },
    include: { category: true },
  });

  return cartItems;
};

export default async function Page() {
  const carts = await getCartItems();

  return (
    <div className="">
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
    </div>
  );
}

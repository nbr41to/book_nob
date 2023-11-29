"use server";

import { auth } from "@clerk/nextjs";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";

type CartIds = string[] | null;

/* カートを取得 */
export const getCarts = async () => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return [];

  const carts = await (kv.get(userId) as Promise<CartIds>);
  if (!carts) return [];
  return carts;
};

/* カートに追加 */
export const addCart = async (prevState: any, formData: FormData) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return;

  const currentCarts = await (kv.get(userId) as Promise<CartIds>);
  const bookId = formData.get("bookId");
  if (!bookId || !currentCarts || typeof bookId !== "string") return;
  if (currentCarts.includes(bookId)) return;
  currentCarts.push(bookId);
  await kv.set(userId, currentCarts, {
    // 1週間
    // ex: 60 * 60 * 24 * 7,
    ex: 60 * 60 * 24 * 1, // 検証用
  });

  revalidatePath("/carts");
  revalidatePath("/", "layout");
};

/* カートから削除 */
export const removeCart = async (prevState: any, formData: FormData) => {
  const { userId }: { userId: string | null } = auth();
  if (!userId) return;

  const currentCarts = await (kv.get(userId) as Promise<CartIds>);
  const bookId = formData.get("bookId");
  if (!bookId || !currentCarts || typeof bookId !== "string") return;
  if (!currentCarts.includes(bookId)) return;
  const newCarts = currentCarts.filter((id) => id !== bookId);
  await kv.set(userId, newCarts);

  revalidatePath("/carts");
  revalidatePath("/", "layout");
};

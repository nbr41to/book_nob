"use server";

import { clerkClient } from "./client";

/* 取得 */
export const getUserRole = async (userId: string | null) => {
  if (!userId) return "general";
  const user = await clerkClient.users.getUser(userId);

  if (!user) return "general";
  return user.privateMetadata?.role as string;
};

/* 更新 */
export const updateUserMetadata = async (
  userId: string,
  metadata: {
    role: string;
  },
) => {
  await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: metadata,
  });
};

import { auth } from "@clerk/nextjs";

import { Metadata } from "next";
import { EditUserMetadata } from "./components/EditUserMetadata";

export const metadata: Metadata = {
  title: "マイページ | BOOK^NOB 📚",
};

export default function Page() {
  const { userId } = auth();

  if (!userId) return null;

  return (
    <div className="">
      <EditUserMetadata userId={userId} />
    </div>
  );
}

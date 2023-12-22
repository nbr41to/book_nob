import { Button } from "@mantine/core";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "購入完了 | BOOK^NOB 📚",
};

export default function Page() {
  return (
    <div className="space-y-8 py-10">
      <h2 className="text-center text-xl font-bold">購入が完了しました</h2>
      <div className="text-center">
        <Button component={Link} href="/" variant="outline" size="lg">
          Homeに戻る
        </Button>
      </div>
    </div>
  );
}

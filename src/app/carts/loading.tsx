import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="space-y-8">
      <h2 className="text-center text-xl font-bold">In CART</h2>
      <div className="grid place-items-center gap-8">
        <p className="text-xl font-bold">カート情報の取得中...</p>
        <Loader size="lg" />
      </div>
    </div>
  );
}

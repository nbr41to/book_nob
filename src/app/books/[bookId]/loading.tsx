import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div className="grid place-items-center gap-8">
      <p className="text-xl font-bold">情報を取得中...</p>
      <Loader size="lg" />
    </div>
  );
}

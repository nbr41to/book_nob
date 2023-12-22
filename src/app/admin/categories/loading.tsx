import { Skeleton } from "@mantine/core";

export default function Loading() {
  return (
    <div className="space-y-8">
      <div className="">
        <h2 className="py-4 text-2xl font-bold">Categories</h2>
      </div>
      <div className="space-y-2">
        <div className="flex gap-2">
          <Skeleton width={200} height={40} />
          <Skeleton width={600} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={150} height={40} />
          <Skeleton width={200} height={40} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={200} height={40} />
          <Skeleton width={600} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={150} height={40} />
          <Skeleton width={200} height={40} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={200} height={40} />
          <Skeleton width={600} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={150} height={40} />
          <Skeleton width={200} height={40} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={200} height={40} />
          <Skeleton width={600} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={150} height={40} />
          <Skeleton width={200} height={40} />
        </div>
        <div className="flex gap-2">
          <Skeleton width={200} height={40} />
          <Skeleton width={600} height={40} />
          <Skeleton width={200} height={40} />
          <Skeleton width={150} height={40} />
          <Skeleton width={200} height={40} />
        </div>
      </div>
    </div>
  );
}

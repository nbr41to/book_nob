import { getOgImage } from "@/server/ogp";
import Image from "next/image";
import { FC } from "react";

const getImageUrl = async (siteUrl: string) => {
  /* OG画像を取得 */
  const url = getOgImage(siteUrl);

  return url;
};

type Props = {
  url: string;
};

export const BookImage: FC<Props> = async ({ url }) => {
  const imageUrl = await getImageUrl(url);

  return (
    <div className="relative min-h-[160px] min-w-[200px]">
      <Image
        className="object-contain"
        src={imageUrl || "https://placehold.jp/200x160.png"}
        alt="book image"
        fill
        priority
      />
    </div>
  );
};

export const BookImageSkeleton = () => {
  return <div className="h-40 w-[200px] animate-pulse bg-slate-600" />;
};

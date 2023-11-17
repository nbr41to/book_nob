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
    <div className="min-w-[200px] min-h-[160px] relative">
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
  return <div className="w-[200px] h-40 bg-slate-600 animate-pulse" />;
};

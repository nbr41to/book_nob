import "server-only";

import ogp from "ogp-parser";

export const getOgImage = async (url: string) => {
  try {
    const result = await ogp(url);
    return (
      result.ogp?.["image"][0] ||
      result.ogp?.["og:image"][0] ||
      "https://placehold.jp/200x160.png"
    );
  } catch (error) {
    return "https://placehold.jp/200x160.png";
  }
};

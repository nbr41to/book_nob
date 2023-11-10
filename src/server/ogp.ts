import ogp from 'ogp-parser';

export const getOgImage = async (url: string) => {
  try {
    const result = await ogp(url);
    return result.ogp?.['og:image'][0] || null;
  } catch (error) {
    return null;
  }
};

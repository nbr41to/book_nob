import {FC} from 'react';

const getBookPrice = async () => {
  const wait = Math.random() * 3000;
  await new Promise((resolve) => setTimeout(resolve, wait));
  const price = Math.floor(Math.random() * 100) * 100;
  return price;
};

type Props = {
  title: string;
  imageUrl: string;
};

export const BookInfoCard: FC<Props> = async ({title, imageUrl}) => {
  const price = await getBookPrice();

  return (
    <div className='border w-48 h-80 rounded flex flex-col items-center justify-center gap-2 p-2 bg-slate-100 dark:bg-slate-600'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt='book image' />
      <div>{title}</div>
      <div>{price.toLocaleString()}円</div>
    </div>
  );
};

export const BookInfoCardSkeleton = () => {
  return <div className='w-48 h-80 animate-pulse bg-slate-600 rounded' />;
};

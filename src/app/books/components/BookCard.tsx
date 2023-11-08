'use client';

import {FC} from 'react';

type Props = {
  title: string;
  imageUrl: string;
};

export const BookCard: FC<Props> = ({title, imageUrl}) => {
  return (
    <div className='border w-48 h-72 rounded flex flex-col items-center justify-center gap-2 p-2'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt='book image' />
      <div>{title}</div>
    </div>
  );
};

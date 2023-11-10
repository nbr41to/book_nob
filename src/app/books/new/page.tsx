'use client';

import {Button, InputBase, NumberInput} from '@mantine/core';
import {createBook} from '@/server/book';

export default function Page() {
  const onAction = async () => {
    console.log('onAction'); // client side
    const book = await createBook();
    console.log(book); // client side
  };

  return (
    <div className=''>
      <form action={onAction} className='w-80' noValidate>
        <InputBase label='Title' placeholder='Title' required />
        <InputBase label='URL' placeholder='URL' required />
        <InputBase label='Category' placeholder='Category' required />
        <NumberInput label='Price' placeholder='0' required />
        <NumberInput label='Likes' placeholder='0' required />
        <Button type='submit'>Submit</Button>
      </form>
    </div>
  );
}

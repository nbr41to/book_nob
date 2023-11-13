'use client';

import {createBook} from '@/server/book';
import {Button, NumberInput, TextInput} from '@mantine/core';
import {FC} from 'react';
import {useFormState, useFormStatus} from 'react-dom';

const initialState = {
  message: null,
};

export const CreateForm: FC = () => {
  const [state, formAction] = useFormState(createBook, initialState);
  const {pending} = useFormStatus();

  console.log(state);
  console.log(pending);

  return (
    <form action={formAction} className='w-80' noValidate>
      <TextInput name='title' label='Title' placeholder='Title' required />
      <TextInput name='url' label='URL' placeholder='URL' required />
      <TextInput
        name='category'
        label='Category'
        placeholder='Category'
        required
      />
      <NumberInput name='price' label='Price' placeholder='0' required />
      <Button type='submit'>Submit</Button>
      {state.message && (
        <p className='text-red-500 font-bold'>{state.message}</p>
      )}
    </form>
  );
};

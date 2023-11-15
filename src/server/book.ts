'use server';

import {Book, Prisma} from '@prisma/client';
import {prisma} from './prisma/client';
import {bookCreateSchema} from './validations/book';
import {redirect} from 'next/navigation';

type State = {
  data: Book | null;
  error: string | null;
};

export const createBook = async (
  prevState: State,
  formData: FormData
): Promise<State> => {
  try {
    const data: Prisma.BookCreateInput = {
      title: formData.get('title') as string,
      url: formData.get('url') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
    };

    /* Validation */
    const validated = bookCreateSchema.safeParse(data);
    if (!validated.success) {
      return {
        data: null,
        error: 'Validation error',
      };
    }

    /* Create */
    await prisma.book.create({
      data: validated.data,
    });
  } catch (error) {
    return {
      data: null,
      error: 'Internal server error',
    };
  }

  redirect('/books');
};

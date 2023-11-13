'use server';

import {Prisma} from '@prisma/client';
import {prisma} from './prisma/client';
import {bookCreateSchema} from './validations/book';

export const createBook = async (
  prevState: {
    message: string | null;
  },
  formData: FormData
): Promise<{message: string | null}> => {
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
        message: 'Validation error',
      };
    }

    /* Create */
    const book = await prisma.book.create({
      data: validated.data,
    });
    // return book;
    return {
      message: 'Book created',
    };
  } catch (error) {
    return {
      message: 'Internal server error',
    };
  }
};

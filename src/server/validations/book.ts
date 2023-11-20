import "server-only";

import { z } from "zod";

export const bookCreateSchema = z.object({
  title: z.coerce.string().min(1),
  url: z.coerce.string().min(1),
  categoryId: z.coerce.number(),
  price: z.coerce.number().min(0),
});

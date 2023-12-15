import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const isZodError = (error: any): error is ZodError => {
  return error instanceof ZodError;
};

export const isPrismaError = (
  error: any,
): error is Prisma.PrismaClientKnownRequestError => {
  return (
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  );
};

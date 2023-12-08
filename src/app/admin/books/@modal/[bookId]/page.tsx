import { UpdateForm } from "./components/UpdateForm";
import { getCategories } from "@/server/category";
import { getBookById } from "@/server/book";
import { ParallelModal } from "@/app/components/ParallelModal";

export default async function Page({ params }: { params: { bookId: string } }) {
  const categories = await getCategories();
  const bookId = Number(params.bookId);
  const book = await getBookById(bookId);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <ParallelModal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Update Book</h2>
        <UpdateForm book={book} categories={categories} />
      </div>
    </ParallelModal>
  );
}

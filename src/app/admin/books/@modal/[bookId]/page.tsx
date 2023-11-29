import { Modal } from "@/app/components/Modal";
import { UpdateForm } from "./components/UpdateForm";
import { getCategories } from "@/server/category";
import { getBookById } from "@/server/book";

export default async function Page({ params }: { params: { bookId: string } }) {
  const categories = await getCategories();
  const bookId = Number(params.bookId);
  const book = await getBookById(bookId);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <Modal>
      <div className="mx-auto w-fit space-y-8 pb-8">
        <h2 className="text-2xl font-bold">Update Book</h2>
        <UpdateForm book={book} categories={categories} />
      </div>
    </Modal>
  );
}

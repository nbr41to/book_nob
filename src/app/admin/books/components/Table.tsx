"use client";

import { FC } from "react";
import { Table as MantineTable } from "@mantine/core";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { BookWithCategory } from "@/types";
import { formatDate } from "@/utils/date";

type Props = {
  books: BookWithCategory[];
};

export const Table: FC<Props> = ({ books }) => {
  return (
    <MantineTable.ScrollContainer minWidth={800}>
      <MantineTable>
        <MantineTable.Thead>
          <MantineTable.Tr>
            <MantineTable.Th>ID</MantineTable.Th>
            <MantineTable.Th>Title</MantineTable.Th>
            <MantineTable.Th>URL</MantineTable.Th>
            <MantineTable.Th>カテゴリ</MantineTable.Th>
            <MantineTable.Th>いいね！</MantineTable.Th>
            <MantineTable.Th>Price ID</MantineTable.Th>
            <MantineTable.Th>作成日時</MantineTable.Th>
            <MantineTable.Th>更新日時</MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {books.map((book) => (
            <MantineTable.Tr key={book.id}>
              <MantineTable.Td className="whitespace-nowrap">
                {book.id}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {book.title}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {book.url}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {book.category.name}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {book.likes.length}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {book.stripePriceId}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {formatDate(book.createdAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                {formatDate(book.updatedAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                <Link href={`/admin/books/${book.id}`}>編集</Link>
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap">
                <DeleteButton id={book.id} />
              </MantineTable.Td>
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
  );
};

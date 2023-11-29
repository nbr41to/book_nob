"use client";

import { FC } from "react";
import { Table as MantineTable } from "@mantine/core";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { BookWithCategory } from "@/types";

type Props = {
  books: BookWithCategory[];
};

export const Table: FC<Props> = ({ books }) => {
  return (
    <MantineTable>
      <MantineTable.Thead>
        <MantineTable.Tr>
          <MantineTable.Th>ID</MantineTable.Th>
          <MantineTable.Th>Title</MantineTable.Th>
          <MantineTable.Th>URL</MantineTable.Th>
          <MantineTable.Th>カテゴリ</MantineTable.Th>
          <MantineTable.Th>いいね！</MantineTable.Th>
        </MantineTable.Tr>
      </MantineTable.Thead>

      <MantineTable.Tbody>
        {books.map((book) => (
          <MantineTable.Tr key={book.id}>
            <MantineTable.Td>{book.id}</MantineTable.Td>
            <MantineTable.Td>{book.title}</MantineTable.Td>
            <MantineTable.Td>{book.url}</MantineTable.Td>
            <MantineTable.Td>{book.category.name}</MantineTable.Td>
            <MantineTable.Td>{book.likes.length}</MantineTable.Td>
            <MantineTable.Td>
              <Link href={`/admin/books/${book.id}`}>編集</Link>
            </MantineTable.Td>
            <MantineTable.Td>
              <DeleteButton id={book.id} />
            </MantineTable.Td>
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
};

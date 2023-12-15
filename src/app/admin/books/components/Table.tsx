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
            <MantineTable.Th className="whitespace-nowrap align-middle">
              ID
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              Title
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              URL
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              カテゴリ
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              Price
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              いいね！
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              Price ID
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              作成日時
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              更新日時
            </MantineTable.Th>
          </MantineTable.Tr>
        </MantineTable.Thead>

        <MantineTable.Tbody>
          {books.map((book) => (
            <MantineTable.Tr key={book.id}>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.id}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.title}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.url}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.category.name}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.price}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.likes.length}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {book.stripePriceId}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {formatDate(book.createdAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {formatDate(book.updatedAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                <Link href={`/admin/books/${book.id}`}>編集</Link>
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                <DeleteButton id={book.id} />
              </MantineTable.Td>
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
  );
};

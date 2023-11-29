"use client";

import { FC } from "react";
import { Table as MantineTable } from "@mantine/core";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { Category } from "@prisma/client";
import { formatDate } from "@/utils/date";

type Props = {
  categories: Category[];
};

export const Table: FC<Props> = ({ categories }) => {
  return (
    <MantineTable>
      <MantineTable.Thead>
        <MantineTable.Tr>
          <MantineTable.Th>ID</MantineTable.Th>
          <MantineTable.Th>Name</MantineTable.Th>
          <MantineTable.Th>作成日時</MantineTable.Th>
          <MantineTable.Th>更新日時</MantineTable.Th>
        </MantineTable.Tr>
      </MantineTable.Thead>

      <MantineTable.Tbody>
        {categories.map((category) => (
          <MantineTable.Tr key={category.id}>
            <MantineTable.Td>{category.id}</MantineTable.Td>
            <MantineTable.Td>{category.name}</MantineTable.Td>
            <MantineTable.Td>{formatDate(category.createdAt)}</MantineTable.Td>
            <MantineTable.Td>{formatDate(category.updatedAt)}</MantineTable.Td>
            <MantineTable.Td>
              <Link href={`/admin/categories/${category.id}`}>詳細</Link>
            </MantineTable.Td>
            <MantineTable.Td>
              <DeleteButton id={category.id} />
            </MantineTable.Td>
          </MantineTable.Tr>
        ))}
      </MantineTable.Tbody>
    </MantineTable>
  );
};

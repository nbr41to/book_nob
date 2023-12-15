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
    <MantineTable.ScrollContainer minWidth={800}>
      <MantineTable align="center">
        <MantineTable.Thead>
          <MantineTable.Tr>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              ID
            </MantineTable.Th>
            <MantineTable.Th className="whitespace-nowrap align-middle">
              Name
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
          {categories.map((category) => (
            <MantineTable.Tr key={category.id}>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {category.id}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {category.name}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {formatDate(category.createdAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                {formatDate(category.updatedAt)}
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                <Link href={`/admin/categories/${category.id}`}>編集</Link>
              </MantineTable.Td>
              <MantineTable.Td className="whitespace-nowrap align-middle">
                <DeleteButton id={category.id} />
              </MantineTable.Td>
            </MantineTable.Tr>
          ))}
        </MantineTable.Tbody>
      </MantineTable>
    </MantineTable.ScrollContainer>
  );
};

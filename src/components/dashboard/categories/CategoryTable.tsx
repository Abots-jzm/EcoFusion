"use client";

import { type StoreCategories } from "@/trpc/shared";
import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import Image from "next/image";
import { FaEllipsis } from "react-icons/fa6";

const columnHelper = createColumnHelper<StoreCategories[0]>();
const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("billboard", {
    header: "Billboard",
    cell: (info) => (
      <div className="relative h-10 w-20 overflow-hidden rounded-lg">
        <Image
          className="h-full w-full object-cover object-center"
          src={info.getValue().imageUrl}
          alt={info.getValue().label ?? "Unnamed billboard"}
          fill
        />
      </div>
    ),
  }),
  columnHelper.accessor("lastUpdated", {
    header: "Last Updated",
    cell: (info) => info.getValue().toLocaleDateString("en-US"),
  }),
  columnHelper.accessor("colors", {
    header: "Colors",
    cell: (info) => (
      <div className="flex flex-wrap gap-2">
        {info.getValue().map((color, index) => (
          <div
            key={index}
            className="h-4 w-4 rounded-full border border-gray-300 dark:border-darkAccent"
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    ),
  }),
  columnHelper.accessor("sizes", {
    header: "Sizes",
    cell: (info) => (
      <div className="flex flex-wrap gap-2 text-sm">
        {info.getValue().map((size, index) => (
          <div
            className="flex items-center gap-2 rounded-lg border border-gray-300 p-2 dark:border-darkMutedText"
            key={index}
          >
            {size.name}
          </div>
        ))}
      </div>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: () => (
      <button className="grid place-items-center">
        <FaEllipsis />
      </button>
    ),
  }),
];

type Props = {
  categories: StoreCategories;
};

function CategoryTable({ categories }: Props) {
  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-10 overflow-x-auto rounded-lg border border-gray-200 p-3 pb-1 dark:border-darkAccent">
      <table className="w-full table-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="whitespace-nowrap border-b border-gray-200 px-1 py-3 text-left dark:border-darkAccent"
                >
                  {header.column.columnDef.header?.toString()}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-200 last:border-b-0 dark:border-darkAccent"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-1 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryTable;

"use client";

import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

import { FilterInput } from "@/components/data-table/FilterInput";
import "@/components/data-table/scrollbar.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface DataTableProps<TData, TValue> {
  columns: import("@tanstack/react-table").ColumnDef<TData, TValue>[];
  data: TData[];
}

/**
 * フィルター部分のコンポーネント
 */
export function DataTableFilters<TData>({
  table,
}: {
  table: import("@tanstack/react-table").Table<TData>;
}) {
  return (
    <div className="flex items-center py-4">
      <FilterInput table={table} columnKey="order_id" placeholder="注文ID" className="w-1/4" />
      <FilterInput table={table} columnKey="customer_name" placeholder="顧客名" className="w-1/4" />
      <FilterInput table={table} columnKey="region" placeholder="地域" className="w-1/4" />
      <FilterInput table={table} columnKey="product_name" placeholder="商品名" className="w-1/4" />
    </div>
  );
}

/**
 * テーブル部分のコンポーネント
 */
export function DataTableContent<TData, TValue>({
  table,
  columns,
}: {
  table: import("@tanstack/react-table").Table<TData>;
  columns: import("@tanstack/react-table").ColumnDef<TData, TValue>[];
}) {
  // カラムの総幅を計算
  const totalWidth = columns.reduce((sum, col) => sum + (col.size || 150), 0);

  return (
    <div className="rounded-md border overflow-hidden" style={{ height: "60vh" }}>
      {/* 固定ヘッダー */}
      <div className="bg-primary">
        <Table style={{ tableLayout: "fixed", width: `${totalWidth}px`, minWidth: "100%" }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-primary hover:bg-primary">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-primary-foreground font-semibold text-center"
                      style={{ width: header.column.columnDef.size || header.getSize() }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>

      {/* スクロール可能な行部分 */}
      <div
        className="overflow-y-auto subtle-scrollbar"
        style={{
          height: "calc(60vh - 60px)",
        }}
      >
        <Table style={{ tableLayout: "fixed", width: `${totalWidth}px`, minWidth: "100%" }}>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={index % 2 === 0 ? "bg-background" : "bg-muted/50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-center"
                      style={{ width: cell.column.columnDef.size || cell.column.getSize() }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/**
 * データテーブルのフック（テーブルインスタンスを提供）
 */
export function useDataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return table;
}

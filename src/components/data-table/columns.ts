"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Order = {
  order_id: string;
  customer_name: string;
  region: string;
  order_date: string;
  product_name: string;
  color: string;
  size: string;
  price: number;
  payment_method: string;
  shipping_status: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "order_id",
    header: "注文ID",
    size: 100,
  },
  {
    accessorKey: "customer_name",
    header: "顧客名",
    size: 80,
  },
  {
    accessorKey: "region",
    header: "地域",
    size: 80,
  },
  {
    accessorKey: "order_date",
    header: "注文日",
    size: 100,
  },
  {
    accessorKey: "product_name",
    header: "商品名",
    size: 100,
  },
  {
    accessorKey: "color",
    header: "カラー",
    size: 80,
  },
  {
    accessorKey: "size",
    header: "サイズ",
    size: 60,
  },
  {
    accessorKey: "price",
    header: "金額",
    size: 100,
  },
  {
    accessorKey: "payment_method",
    header: "支払い方法",
    size: 100,
  },
  {
    accessorKey: "shipping_status",
    header: "配送状況",
    size: 120,
  },
];

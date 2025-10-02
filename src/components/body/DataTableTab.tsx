import db from "@/../data/db.json";
import { columns, Order } from "@/components/data-table/columns";
import {
  DataTable,
  DataTableContent,
  DataTableFilters,
  useDataTable,
} from "@/components/data-table/DataTable";
import { useEffect, useState } from "react";

/**
 * データを取得する関数
 */
async function getData(): Promise<Order[]> {
  // db.jsonの内容を返す
  return db;
}

/**
 * フィルター部分のコンポーネント
 */
function FilterSection() {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const table = useDataTable({ columns, data });

  return <DataTableFilters table={table} />;
}

/**
 * テーブル部分のコンポーネント
 */
function TableSection() {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const table = useDataTable({ columns, data });

  return <DataTableContent table={table} columns={columns} />;
}

/**
 * 完全なデータテーブルコンポーネント（従来の機能）
 */
function CompleteDataTable() {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return <DataTable columns={columns} data={data} />;
}

/**
 * データテーブルタブのメインコンポーネント
 */
export default function DataTableTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">フィルター部分のみ</h3>
        <FilterSection />
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">テーブル部分のみ</h3>
        <TableSection />
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-4">完全なデータテーブル</h3>
        <CompleteDataTable />
      </div>
    </div>
  );
}

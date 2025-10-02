import db from "@/../data/db.json";
import { columns, Order } from "@/components/data-table/columns";
import { DataTableContent, useDataTable } from "@/components/data-table/DataTable";
import { FilterManager } from "@/components/data-table/FilterManager";
import { useEffect, useState } from "react";

/**
 * データを取得する関数
 */
async function getData(): Promise<Order[]> {
  // db.jsonの内容を返す
  return db;
}

/**
 * 地域の一意な値を取得する関数
 */
function getRegionOptions(data: Order[]): { value: string; label: string }[] {
  const uniqueRegions = [...new Set(data.map((item) => item.region))];
  return uniqueRegions.map((region) => ({
    value: region,
    label: region,
  }));
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

  return <FilterManager table={table} data={data} getRegionOptions={getRegionOptions} />;
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
    </div>
  );
}

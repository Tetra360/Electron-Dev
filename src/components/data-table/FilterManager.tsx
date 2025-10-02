import { Table } from "@tanstack/react-table";
import { ComboboxFilter } from "./ComboboxFilter";
import { FilterInput } from "./FilterInput";

interface FilterManagerProps<T> {
  table: Table<T>;
  data: T[];
  getRegionOptions: (data: T[]) => { value: string; label: string }[];
  className?: string;
}

/**
 * 4種のフィルタを管理するコンポーネント
 * - 注文IDフィルタ（テキスト入力）
 * - 顧客名フィルタ（テキスト入力）
 * - 地域フィルタ（コンボボックス）
 * - 商品名フィルタ（テキスト入力）
 */
export function FilterManager<T>({
  table,
  data,
  getRegionOptions,
  className = "flex items-center py-4 h-8 ",
}: FilterManagerProps<T>) {
  const regionOptions = getRegionOptions(data);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 ">
        <label className="flex items-center justify-center w-18 rounded-sm">注文ID</label>
        <FilterInput
          table={table}
          columnKey="order_id"
          placeholder="注文ID"
          className="w-30 mr-4"
        />
        <label className="flex items-center justify-center w-18 rounded-sm">顧客名</label>
        <FilterInput
          table={table}
          columnKey="customer_name"
          placeholder="顧客名"
          className="w-30 mr-4"
        />
        <label className="flex items-center justify-center w-18 rounded-sm">地域</label>
        <ComboboxFilter
          table={table}
          columnKey="region"
          options={regionOptions}
          placeholder="地域"
          className="w-30 mr-4"
        />
        <label className="flex items-center justify-center w-18 rounded-sm">商品名</label>
        <FilterInput table={table} columnKey="product_name" placeholder="商品名" className="w-30" />
      </div>
    </div>
  );
}

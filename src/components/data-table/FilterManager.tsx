import { ComboboxFilter } from "@/components/data-table/ComboboxFilter";
import { FilterInput } from "@/components/data-table/FilterInput";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

// props の型定義
interface FilterManagerProps<T> {
  // T 型の行を持つテーブルオブジェクト
  table: Table<T>;
  // T 型のデータ配列
  data: T[];
  // 地域オプションを取得する関数
  getRegionOptions: (data: T[]) => { value: string; label: string }[];
  // クラス名
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

  // クリアボタンを押したときの処理
  const clearAllFilters = () => {
    table.getColumn("order_id")?.setFilterValue("");
    table.getColumn("customer_name")?.setFilterValue("");
    table.getColumn("region")?.setFilterValue("");
    table.getColumn("product_name")?.setFilterValue("");
  };

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
        <FilterInput
          table={table}
          columnKey="product_name"
          placeholder="商品名"
          className="w-30  mr-4"
        />
        <Button variant="outline" onClick={clearAllFilters}>
          クリア
        </Button>
      </div>
    </div>
  );
}

import { Combobox } from "@/components/body/ComboBoxTab";
import { Table } from "@tanstack/react-table";

interface ComboboxFilterProps<T> {
  table: Table<T>;
  columnKey: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

/**
 * テーブルフィルター用のコンボボックスコンポーネント
 */
export function ComboboxFilter<T>({
  table,
  columnKey,
  options,
  placeholder,
  className,
}: ComboboxFilterProps<T>) {
  const currentValue = (table.getColumn(columnKey)?.getFilterValue() as string) ?? "";

  return (
    <Combobox
      options={options}
      value={currentValue}
      onValueChange={(value) => table.getColumn(columnKey)?.setFilterValue(value)}
      placeholder={placeholder}
      searchPlaceholder={`${placeholder}を検索...`}
      emptyText={`${placeholder}が見つかりませんでした。`}
      className={className}
    />
  );
}

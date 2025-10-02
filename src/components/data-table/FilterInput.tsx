import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

interface FilterInputProps<T> {
  table: Table<T>;
  columnKey: string;
  placeholder?: string;
  className?: string;
}

export function FilterInput<T>({ table, columnKey, placeholder, className }: FilterInputProps<T>) {
  return (
    <div className={"relative " + (className ?? "")}>
      <Input
        placeholder={placeholder || columnKey}
        value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) => table.getColumn(columnKey)?.setFilterValue(event.target.value)}
        className="w-full py-3 px-4 text-lg"
      />
      {((table.getColumn(columnKey)?.getFilterValue() as string) ?? "") !== "" && (
        <button
          type="button"
          className="absolute right-1/8 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-100 hover:bg-gray-300"
          onClick={() => table.getColumn(columnKey)?.setFilterValue("")}
          aria-label="クリア"
        >
          <X className="h-2 w-2 text-gray-800" />
        </button>
      )}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Search, Settings2 } from "lucide-react";
import { ColumnDefinition } from "../types/tableTypes";

interface DataTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  visibleColumns: Record<string, boolean>;
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void;
  columns: ColumnDefinition[];
  selectedRowName?: string;
}

/**
 * データテーブルのフィルター関連コンポーネント
 * 検索機能と表示列設定を含む
 */
export function DataTableFilters({
  searchTerm,
  onSearchChange,
  visibleColumns,
  onColumnVisibilityChange,
  columns,
  selectedRowName,
}: DataTableFiltersProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        {selectedRowName && <div className="text-sm text-gray-600">選択中: {selectedRowName}</div>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="検索..."
            value={searchTerm}
            variant="clearable"
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-2 h-4 w-4" />
              表示列
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {columns.map((column: ColumnDefinition) => (
              <DropdownMenuCheckboxItem
                key={column.key}
                checked={visibleColumns[column.key]}
                onSelect={(e) => {
                  e.preventDefault();
                  onColumnVisibilityChange(column.key, !visibleColumns[column.key]);
                }}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

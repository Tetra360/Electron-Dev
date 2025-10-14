import { ChevronDown, ChevronUp, ChevronsUpDown, WrapText } from "lucide-react";
import React, { useMemo } from "react";
import { ColumnDefinition, ResizingState, SortConfig, UserData } from "../types/tableTypes";

interface DataTableBodyProps {
  columns: ColumnDefinition[];
  visibleColumns: Record<string, boolean>;
  columnWidths: Record<string, number>;
  resizing: ResizingState | null;
  wrappedColumns: Record<string, boolean>;
  sortConfig: SortConfig;
  sortedData: (UserData & { no: number })[];
  selectedRow: UserData | null;
  onSort: (key: string) => void;
  onMouseDown: (e: React.MouseEvent, columnKey: string) => void;
  onToggleWrap: (columnKey: string) => void;
  onRowClick: (row: UserData) => void;
}

/**
 * データテーブルの本体コンポーネント
 * テーブルの表示とソート、リサイズ機能を含む
 */
export function DataTableBody({
  columns,
  visibleColumns,
  columnWidths,
  resizing,
  wrappedColumns,
  sortConfig,
  sortedData,
  selectedRow,
  onSort,
  onMouseDown,
  onToggleWrap,
  onRowClick,
}: DataTableBodyProps) {
  const getSortIcon = (key: string) => {
    const isActive = sortConfig.key === key;
    const iconClass = isActive ? "ml-2 h-4 w-4 text-blue-600" : "ml-2 h-4 w-4";

    if (!isActive) return <ChevronsUpDown className={iconClass} />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className={iconClass} />
    ) : (
      <ChevronDown className={iconClass} />
    );
  };

  const getAlignmentClass = (align: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center justify-center";
      case "right":
        return "text-right justify-end";
      default:
        return "text-left justify-start";
    }
  };

  const visibleColumnsList = columns.filter((col: ColumnDefinition) => visibleColumns[col.key]);

  const totalTableWidth = useMemo(() => {
    const allColumnsWidth = visibleColumnsList.reduce(
      (sum: number, col: ColumnDefinition) => sum + columnWidths[col.key],
      0
    );
    return allColumnsWidth;
  }, [visibleColumnsList, columnWidths]);

  return (
    <div className="rounded-md border border-gray-200 overflow-hidden">
      <div className="overflow-auto" style={{ maxHeight: "calc(10 * 3.5rem + 3rem)" }}>
        <table
          className="text-sm"
          style={{ tableLayout: "fixed", width: "100%", minWidth: `${totalTableWidth}px` }}
        >
          <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
            <tr>
              {visibleColumnsList.map((column: ColumnDefinition, index: number) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 font-medium text-gray-700 bg-gray-50 relative group ${getAlignmentClass(column.headerAlign || "left")}`}
                  style={{
                    width:
                      index === visibleColumnsList.length - 1
                        ? "auto"
                        : `${columnWidths[column.key]}px`,
                    minWidth:
                      index === visibleColumnsList.length - 1
                        ? `${columnWidths[column.key]}px`
                        : undefined,
                    maxWidth:
                      index === visibleColumnsList.length - 1 ? `${column.maxWidth}px` : undefined,
                  }}
                >
                  <div
                    className={`flex items-center ${column.headerAlign === "center" ? "justify-center" : column.headerAlign === "right" ? "justify-end" : "justify-between"}`}
                  >
                    {column.sortable && !column.wrapText ? (
                      <button
                        onClick={() => onSort(column.key)}
                        className="flex items-center hover:text-gray-900 transition-colors"
                      >
                        <span className="truncate">{column.label}</span>
                        {getSortIcon(column.key)}
                      </button>
                    ) : column.sortable && column.wrapText ? (
                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={() => onSort(column.key)}
                          className="flex items-center hover:text-gray-900 transition-colors"
                        >
                          <span className="truncate">{column.label}</span>
                          {getSortIcon(column.key)}
                        </button>
                        <button
                          onClick={() => onToggleWrap(column.key)}
                          className="flex items-center hover:text-gray-900 transition-colors"
                          title={
                            wrappedColumns[column.key] ? "折り返しを解除" : "テキストを折り返す"
                          }
                        >
                          <WrapText
                            className={`h-4 w-4 ${wrappedColumns[column.key] ? "text-blue-600" : ""}`}
                          />
                        </button>
                      </div>
                    ) : !column.sortable && column.wrapText ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{column.label}</span>
                        <button
                          onClick={() => onToggleWrap(column.key)}
                          className="flex items-center hover:text-gray-900 transition-colors"
                          title={
                            wrappedColumns[column.key] ? "折り返しを解除" : "テキストを折り返す"
                          }
                        >
                          <WrapText
                            className={`h-4 w-4 ${wrappedColumns[column.key] ? "text-blue-600" : ""}`}
                          />
                        </button>
                      </div>
                    ) : (
                      <span className="truncate">{column.label}</span>
                    )}
                  </div>
                  {column.resizable && index !== visibleColumnsList.length - 1 && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors z-20"
                      onMouseDown={(e) => onMouseDown(e, column.key)}
                      style={{
                        width: resizing?.columnKey === column.key ? "3px" : "1px",
                        backgroundColor: resizing?.columnKey === column.key ? "#3b82f6" : undefined,
                      }}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumnsList.length} className="text-center py-8 text-gray-500">
                  データが見つかりません
                </td>
              </tr>
            ) : (
              sortedData.map((row: UserData & { no: number }) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick(row)}
                  className={`transition-colors cursor-pointer ${
                    selectedRow?.id === row.id
                      ? "bg-blue-100 hover:bg-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {visibleColumnsList.map((column: ColumnDefinition, index: number) => (
                    <td
                      key={column.key}
                      className={`px-4 py-3 text-gray-700 relative ${getAlignmentClass(column.cellAlign || "left")}`}
                      style={{
                        width:
                          index === visibleColumnsList.length - 1
                            ? "auto"
                            : `${columnWidths[column.key]}px`,
                        minWidth:
                          index === visibleColumnsList.length - 1
                            ? `${columnWidths[column.key]}px`
                            : undefined,
                        maxWidth:
                          index === visibleColumnsList.length - 1
                            ? `${column.maxWidth}px`
                            : undefined,
                      }}
                    >
                      <div
                        className={
                          wrappedColumns[column.key] ? "whitespace-normal break-words" : "truncate"
                        }
                        title={
                          !wrappedColumns[column.key]
                            ? String(row[column.key as keyof UserData])
                            : undefined
                        }
                      >
                        {row[column.key as keyof UserData]}
                      </div>
                      {column.resizable && index !== visibleColumnsList.length - 1 && (
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-gray-200" />
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

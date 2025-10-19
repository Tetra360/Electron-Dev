import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ColumnDefinition,
  DataTableProps,
  ResizingState,
  SortConfig,
  UserData,
  UserDataForm,
} from "../types/tableTypes";
import { DataTableBody } from "./DataTableBody";
import { DataTableDialogs } from "./DataTableDialogs";
import { DataTableFilters } from "./DataTableFilters";

/**
 * メインのデータテーブルコンポーネント
 *
 * フィルター、テーブル本体、ダイアログを統合した
 * 完全なデータテーブル機能を提供します。
 *
 * @param data - 表示するデータ配列
 * @param columns - 列定義配列
 */
export function DataTable({ data, columns, onRowSelect, initialSelectedUserId }: DataTableProps) {
  // テーブルデータの状態管理
  const [tableData, setTableData] = useState<UserData[]>(data);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  // 列の表示・非表示状態
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce(
      (acc: Record<string, boolean>, col: ColumnDefinition) => ({ ...acc, [col.key]: true }),
      {}
    )
  );

  // 列幅の状態管理
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    columns.reduce(
      (acc: Record<string, number>, col: ColumnDefinition) => ({
        ...acc,
        [col.key]: col.defaultWidth,
      }),
      {}
    )
  );

  // 列リサイズ状態
  const [resizing, setResizing] = useState<ResizingState | null>(null);

  // テキスト折り返し状態
  const [wrappedColumns, setWrappedColumns] = useState<Record<string, boolean>>(
    columns
      .filter((col: ColumnDefinition) => col.wrapText)
      .reduce(
        (acc: Record<string, boolean>, col: ColumnDefinition) => ({ ...acc, [col.key]: false }),
        {}
      )
  );

  // 選択された行とダイアログ状態
  const [selectedRow, setSelectedRow] = useState<UserData | null>(null);

  // 初期選択状態の設定
  useEffect(() => {
    if (initialSelectedUserId) {
      const initialRow = tableData.find((user) => user.id === initialSelectedUserId);
      if (initialRow) {
        setSelectedRow(initialRow);
      }
    }
  }, [initialSelectedUserId, tableData]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);

  // フォームデータ
  const [editFormData, setEditFormData] = useState<Partial<UserData>>({});
  const [addFormData, setAddFormData] = useState<UserDataForm>({});

  // データのフィルタリング（検索機能）
  const filteredData = useMemo(() => {
    return tableData
      .map((item: UserData, index: number) => ({ ...item, no: index + 1 }))
      .filter((item: UserData & { no: number }) =>
        Object.values(item).some((value: unknown) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  }, [tableData, searchTerm]);

  // データのソート処理
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a: UserData & { no: number }, b: UserData & { no: number }) => {
      const aValue = a[sortConfig.key as keyof UserData];
      const bValue = b[sortConfig.key as keyof UserData];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // ソート処理
  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // 列リサイズ処理（マウス移動時）
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizing) return;
      const diff = e.clientX - resizing.startX;
      const newWidth = Math.max(
        resizing.minWidth,
        Math.min(resizing.maxWidth, resizing.startWidth + diff)
      );
      setColumnWidths((prev) => ({ ...prev, [resizing.columnKey]: newWidth }));
    },
    [resizing]
  );

  // 列リサイズ終了
  const handleMouseUp = () => {
    setResizing(null);
  };

  // 列リサイズ開始
  const handleMouseDown = (e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    const column = columns.find((col: ColumnDefinition) => col.key === columnKey);
    if (column) {
      setResizing({
        columnKey,
        startX: e.clientX,
        startWidth: columnWidths[columnKey],
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
      });
    }
  };

  // テキスト折り返しの切り替え
  const toggleWrap = (columnKey: string) => {
    setWrappedColumns((prev) => ({ ...prev, [columnKey]: !prev[columnKey] }));
  };

  // 行選択処理
  const handleRowClick = (row: UserData) => {
    setSelectedRow(row);
    // 外部コールバックを呼び出し
    if (onRowSelect) {
      onRowSelect(row.id);
    }
  };

  // 編集ダイアログを開く
  const handleEditClick = () => {
    if (selectedRow) {
      setEditFormData({ ...selectedRow });
      setIsEditDialogOpen(true);
    }
  };

  // 追加ダイアログを開く
  const handleAddClick = () => {
    // 空のフォームデータを初期化
    const emptyData = columns.reduce((acc: UserDataForm, col: ColumnDefinition) => {
      if (col.key !== "no" && col.key !== "id") {
        acc[col.key as keyof UserDataForm] = "";
      }
      return acc;
    }, {});
    setAddFormData(emptyData);
    setIsAddDialogOpen(true);
  };

  // 編集データの保存
  const handleSave = () => {
    if (editFormData.id) {
      setTableData((prev: UserData[]) =>
        prev.map((item: UserData) =>
          item.id === editFormData.id ? ({ ...item, ...editFormData } as UserData) : item
        )
      );
    }
    setIsEditDialogOpen(false);
    setSelectedRow(null);
  };

  // 新規データの追加
  const handleAdd = () => {
    // 新しいIDを生成
    const newId = Math.max(...tableData.map((item: UserData) => item.id), 0) + 1;
    const newRow = { ...addFormData, id: newId } as UserData;
    setTableData((prev: UserData[]) => [...prev, newRow]);
    setIsAddDialogOpen(false);
    setAddFormData({});
  };

  // 削除確認ダイアログを開く
  const handleDelete = () => {
    setIsDeleteConfirmOpen(true);
  };

  // 削除の実行
  const handleDeleteConfirm = () => {
    if (editFormData.id) {
      setTableData((prev: UserData[]) =>
        prev.filter((item: UserData) => item.id !== editFormData.id)
      );
    }
    setIsDeleteConfirmOpen(false);
    setIsEditDialogOpen(false);
    setSelectedRow(null);
    setEditFormData({});
  };

  // 削除キャンセル
  const handleDeleteCancel = () => {
    setIsDeleteConfirmOpen(false);
  };

  // 編集キャンセル
  const handleCancel = () => {
    setIsEditDialogOpen(false);
    setEditFormData({});
  };

  // 追加キャンセル
  const handleAddCancel = () => {
    setIsAddDialogOpen(false);
    setAddFormData({});
  };

  // 列リサイズのマウスイベント監視
  React.useEffect(() => {
    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [resizing, handleMouseMove]);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-4">
      <DataTableFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={(columnKey, visible) => {
          setVisibleColumns((prev) => ({ ...prev, [columnKey]: visible }));
        }}
        columns={columns}
      />

      <DataTableBody
        columns={columns}
        visibleColumns={visibleColumns}
        columnWidths={columnWidths}
        resizing={resizing}
        wrappedColumns={wrappedColumns}
        sortConfig={sortConfig}
        sortedData={sortedData}
        selectedRow={selectedRow}
        onSort={handleSort}
        onMouseDown={handleMouseDown}
        onToggleWrap={toggleWrap}
        onRowClick={handleRowClick}
      />

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">全 {sortedData.length} 件を表示中</div>
        <div className="flex gap-2">
          <Button onClick={handleAddClick} variant="default">
            <Plus className="mr-2 h-4 w-4" />
            追加
          </Button>
          <Button onClick={handleEditClick} disabled={!selectedRow} variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            編集
          </Button>
        </div>
      </div>

      <DataTableDialogs
        isEditDialogOpen={isEditDialogOpen}
        onEditDialogChange={setIsEditDialogOpen}
        editFormData={editFormData}
        onEditFormDataChange={setEditFormData}
        onEditSave={handleSave}
        onEditCancel={handleCancel}
        onEditDelete={handleDelete}
        isAddDialogOpen={isAddDialogOpen}
        onAddDialogChange={setIsAddDialogOpen}
        addFormData={addFormData}
        onAddFormDataChange={setAddFormData}
        onAddSave={handleAdd}
        onAddCancel={handleAddCancel}
        isDeleteConfirmOpen={isDeleteConfirmOpen}
        onDeleteConfirmChange={setIsDeleteConfirmOpen}
        onDeleteConfirm={handleDeleteConfirm}
        onDeleteCancel={handleDeleteCancel}
        columns={columns}
      />
    </div>
  );
}

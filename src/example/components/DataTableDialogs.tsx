import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { ColumnDefinition, UserData, UserDataForm } from "../types/tableTypes";

interface DataTableDialogsProps {
  // 編集ダイアログ
  isEditDialogOpen: boolean;
  onEditDialogChange: (open: boolean) => void;
  editFormData: Partial<UserData>;
  onEditFormDataChange: (data: Partial<UserData>) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onEditDelete: () => void;

  // 追加ダイアログ
  isAddDialogOpen: boolean;
  onAddDialogChange: (open: boolean) => void;
  addFormData: UserDataForm;
  onAddFormDataChange: (data: UserDataForm) => void;
  onAddSave: () => void;
  onAddCancel: () => void;

  // 削除確認ダイアログ
  isDeleteConfirmOpen: boolean;
  onDeleteConfirmChange: (open: boolean) => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;

  // 共通
  columns: ColumnDefinition[];
}

/**
 * データテーブルのダイアログ関連コンポーネント
 * 編集、追加、削除確認ダイアログを含む
 */
export function DataTableDialogs({
  isEditDialogOpen,
  onEditDialogChange,
  editFormData,
  onEditFormDataChange,
  onEditSave,
  onEditCancel,
  onEditDelete,
  isAddDialogOpen,
  onAddDialogChange,
  addFormData,
  onAddFormDataChange,
  onAddSave,
  onAddCancel,
  isDeleteConfirmOpen,
  onDeleteConfirmChange,
  onDeleteConfirm,
  onDeleteCancel,
  columns,
}: DataTableDialogsProps) {
  return (
    <>
      {/* 編集ダイアログ */}
      <Dialog open={isEditDialogOpen} onOpenChange={onEditDialogChange}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>データを編集</DialogTitle>
            <DialogDescription>各項目を編集して保存ボタンをクリックしてください</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {columns
              .filter((col: ColumnDefinition) => col.key !== "no")
              .map((column: ColumnDefinition) => (
                <div key={column.key} className="space-y-2">
                  <Label htmlFor={column.key}>{column.label}</Label>
                  <Input
                    id={column.key}
                    value={editFormData[column.key as keyof UserData] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onEditFormDataChange({
                        ...editFormData,
                        [column.key]: e.target.value,
                      })
                    }
                    placeholder={`${column.label}を入力`}
                  />
                </div>
              ))}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="destructive" onClick={onEditDelete} className="mr-auto">
              <Trash2 className="mr-2 h-4 w-4" />
              削除
            </Button>
            <Button variant="outline" onClick={onEditCancel}>
              キャンセル
            </Button>
            <Button onClick={onEditSave}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 追加ダイアログ */}
      <Dialog open={isAddDialogOpen} onOpenChange={onAddDialogChange}>
        <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>新規データを追加</DialogTitle>
            <DialogDescription>各項目を入力して追加ボタンをクリックしてください</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {columns
              .filter((col: ColumnDefinition) => col.key !== "no" && col.key !== "id")
              .map((column: ColumnDefinition) => (
                <div key={column.key} className="space-y-2">
                  <Label htmlFor={`add-${column.key}`}>{column.label}</Label>
                  <Input
                    id={`add-${column.key}`}
                    value={addFormData[column.key as keyof UserDataForm] || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onAddFormDataChange({
                        ...addFormData,
                        [column.key]: e.target.value,
                      })
                    }
                    placeholder={`${column.label}を入力`}
                  />
                </div>
              ))}
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={onAddCancel}>
              キャンセル
            </Button>
            <Button onClick={onAddSave}>
              <Plus className="mr-2 h-4 w-4" />
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 削除確認ダイアログ */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={onDeleteConfirmChange}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>削除の確認</DialogTitle>
            <DialogDescription>
              この行を削除してもよろしいですか？この操作は取り消せません。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={onDeleteCancel}>
              いいえ
            </Button>
            <Button variant="destructive" onClick={onDeleteConfirm}>
              はい
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

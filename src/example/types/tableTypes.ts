/**
 * データテーブル関連の型定義
 *
 * このファイルには、DataTableコンポーネントで使用される
 * すべての型定義が含まれています。
 */

/** ユーザーデータの型定義 */
export interface UserData {
  id: number; // ユニークID
  name: string; // ユーザー名
  email: string; // メールアドレス
  role: string; // 役割
  status: string; // ステータス
  department: string; // 部署
  notes: string; // 備考
}

/** テーブル列の定義型 */
export interface ColumnDefinition {
  key: string; // データのキー
  label: string; // 表示ラベル
  sortable: boolean; // ソート可能かどうか
  resizable: boolean; // 列幅調整可能かどうか
  wrapText: boolean; // テキスト折り返し可能かどうか
  headerAlign: "left" | "center" | "right"; // ヘッダーの配置
  cellAlign: "left" | "center" | "right"; // セルの配置
  defaultWidth: number; // デフォルト幅
  minWidth: number; // 最小幅
  maxWidth: number; // 最大幅
}

/** ソート設定の型 */
export interface SortConfig {
  key: string | null; // ソート対象のキー
  direction: "asc" | "desc" | null; // ソート方向
}

/** 列リサイズ状態の型 */
export interface ResizingState {
  columnKey: string; // リサイズ中の列キー
  startX: number; // 開始X座標
  startWidth: number; // 開始幅
  minWidth: number; // 最小幅
  maxWidth: number; // 最大幅
}

/** DataTableコンポーネントのProps型 */
export interface DataTableProps {
  data: UserData[]; // 表示するデータ
  columns: ColumnDefinition[]; // 列定義
  onRowSelect?: (userId: number) => void; // 行選択時のコールバック
  initialSelectedUserId?: number | null; // 初期選択ユーザーID
}

/** ユーザーデータフォームの型（IDを除く） */
export type UserDataForm = Partial<Omit<UserData, "id">>;

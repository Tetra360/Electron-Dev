import { ColumnDefinition } from "../types/tableTypes";

/**
 * テーブルの列定義設定
 *
 * 各列の表示設定、ソート機能、リサイズ機能、テキスト折り返し機能などを
 * 個別に設定できます。この設定により、テーブルの動作を柔軟にカスタマイズ可能です。
 */
export const columnDefinitions: ColumnDefinition[] = [
  {
    key: "no",
    label: "No",
    sortable: true, // ソート機能を有効化
    resizable: true, // 列幅調整を有効化
    wrapText: false, // 折り返し機能を無効化
    headerAlign: "center", // ヘッダーのテキスト配置
    cellAlign: "center", // セルのテキスト配置
    defaultWidth: 80, // デフォルト幅
    minWidth: 60, // 最小幅
    maxWidth: 120, // 最大幅
  },
  {
    key: "name",
    label: "名前",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left",
    cellAlign: "left",
    defaultWidth: 120,
    minWidth: 80,
    maxWidth: 300,
  },
  {
    key: "email",
    label: "メールアドレス",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left",
    cellAlign: "left",
    defaultWidth: 200,
    minWidth: 150,
    maxWidth: 400,
  },
  {
    key: "role",
    label: "役割",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center",
    cellAlign: "center",
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 200,
  },
  {
    key: "status",
    label: "ステータス",
    sortable: false, // ソート機能を無効化（例として）
    resizable: true,
    wrapText: false,
    headerAlign: "center",
    cellAlign: "center",
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 200,
  },
  {
    key: "department",
    label: "部署",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left",
    cellAlign: "left",
    defaultWidth: 120,
    minWidth: 80,
    maxWidth: 250,
  },
  {
    key: "notes",
    label: "備考",
    sortable: true,
    resizable: false, // 最後の列は列幅調整を無効化
    wrapText: true, // 折り返し機能を有効化
    headerAlign: "left",
    cellAlign: "left",
    defaultWidth: 300,
    minWidth: 200,
    maxWidth: 600,
  },
];

/**
 * テーブルモジュールの統一エクスポート
 */

// カスタムフックをエクスポート
export { usePurchases, useRelationTable, useUsers } from "./hooks";

// サービスをエクスポート
export { diContainer } from "./services";

// 既存のコンポーネントとデータをエクスポート
export { DataTable } from "./components/DataTable";
export { purchaseColumnDefinitions, userColumnDefinitions } from "./data/columnDefinitions";
export type { PurchaseData, UserData } from "./types/tableTypes";

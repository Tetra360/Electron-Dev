import { purchaseHandlers, userHandlers } from "../../../api/mock";
import { PurchaseData } from "../../../api/types";
import { UserData } from "../types/tableTypes";

/**
 * データ取得の統一インターフェース
 * 将来的にDBに置き換え可能な設計
 */
export interface DataService {
  getUsers(): Promise<UserData[]>;
  getPurchasesByUserId(userId: number): Promise<PurchaseData[]>;
  getAllPurchases(): Promise<PurchaseData[]>;
}

/**
 * モックサーバーを使用するサービス実装
 * 新しいモックバックエンドを使用
 */
class MockDataService implements DataService {
  /**
   * ユーザー一覧を取得する
   */
  async getUsers(): Promise<UserData[]> {
    try {
      return await userHandlers.getUsers();
    } catch (error) {
      console.error("ユーザーデータの取得に失敗しました:", error);
      return [];
    }
  }

  /**
   * 指定されたユーザーIDの購入情報を取得する
   */
  async getPurchasesByUserId(userId: number): Promise<PurchaseData[]> {
    try {
      return await purchaseHandlers.getPurchasesByUserId(userId);
    } catch (error) {
      console.error("購入データの取得に失敗しました:", error);
      return [];
    }
  }

  /**
   * 全購入情報を取得する
   */
  async getAllPurchases(): Promise<PurchaseData[]> {
    try {
      return await purchaseHandlers.getPurchases();
    } catch (error) {
      console.error("購入データの取得に失敗しました:", error);
      return [];
    }
  }
}

/**
 * データサービスのインスタンス
 * モックサーバーを使用
 */
export const dataService: DataService = new MockDataService();

/**
 * ユーザーテーブル用のカラム定義
 */
export const userColumnDefinitions = [
  {
    key: "id",
    label: "ユーザーID",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "name",
    label: "ユーザー名",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left" as const,
    cellAlign: "left" as const,
    defaultWidth: 150,
    minWidth: 100,
    maxWidth: 300,
  },
  {
    key: "email",
    label: "メールアドレス",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left" as const,
    cellAlign: "left" as const,
    defaultWidth: 250,
    minWidth: 200,
    maxWidth: 400,
  },
  {
    key: "role",
    label: "会員種別",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 200,
  },
  {
    key: "lastPurchaseDate",
    label: "購入日付",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 150,
  },
];

/**
 * 購入情報テーブル用のカラム定義
 */
export const purchaseColumnDefinitions = [
  {
    key: "userId",
    label: "ユーザーID",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "id",
    label: "商品ID",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 80,
    minWidth: 60,
    maxWidth: 120,
  },
  {
    key: "productName",
    label: "商品名",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "left" as const,
    cellAlign: "left" as const,
    defaultWidth: 200,
    minWidth: 150,
    maxWidth: 400,
  },
  {
    key: "color",
    label: "カラー",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 150,
  },
  {
    key: "price",
    label: "定価",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "right" as const,
    cellAlign: "right" as const,
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 150,
  },
  {
    key: "quantity",
    label: "購入点数",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "center" as const,
    cellAlign: "center" as const,
    defaultWidth: 100,
    minWidth: 80,
    maxWidth: 120,
  },
  {
    key: "totalAmount",
    label: "合計金額",
    sortable: true,
    resizable: true,
    wrapText: false,
    headerAlign: "right" as const,
    cellAlign: "right" as const,
    defaultWidth: 120,
    minWidth: 100,
    maxWidth: 150,
  },
];

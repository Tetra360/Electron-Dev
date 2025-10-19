/**
 * 購入情報関連の型定義
 */

// 購入データの基本型
export interface PurchaseData {
  id: number;
  userId: number;
  productName: string;
  color: string;
  price: number;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
}

// 購入情報作成時のリクエスト型
export interface CreatePurchaseRequest {
  userId: number;
  productName: string;
  color: string;
  price: number;
  quantity: number;
  totalAmount: number;
  purchaseDate: string;
}

// 購入情報更新時のリクエスト型
export interface UpdatePurchaseRequest {
  userId?: number;
  productName?: string;
  color?: string;
  price?: number;
  quantity?: number;
  totalAmount?: number;
  purchaseDate?: string;
}

// ユーザーIDによる購入情報取得のレスポンス型
export interface UserPurchasesResponse {
  userId: number;
  purchases: PurchaseData[];
  totalCount: number;
}

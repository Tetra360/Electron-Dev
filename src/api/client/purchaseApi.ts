/**
 * 購入情報関連のAPIクライアント
 * 実際のバックエンドAPIとの通信を担当
 */

import {
  CreatePurchaseRequest,
  PurchaseData,
  UpdatePurchaseRequest,
} from "../types/purchase.types";
import { apiClient } from "./apiClient";

/**
 * 購入情報関連のAPIクライアント
 * 実際のバックエンドAPIのエンドポイントと通信する
 */
export class PurchaseApiClient {
  /**
   * 全購入情報を取得
   * GET /api/purchases
   */
  async getPurchases(): Promise<PurchaseData[]> {
    const response = await apiClient.get<PurchaseData[]>("/purchases");

    if (!response.success) {
      throw new Error(response.message || "購入情報一覧の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * ユーザーIDで購入情報を取得
   * GET /api/purchases/user/:userId
   */
  async getPurchasesByUserId(userId: number): Promise<PurchaseData[]> {
    const response = await apiClient.get<PurchaseData[]>(`/purchases/user/${userId}`);

    if (!response.success) {
      throw new Error(response.message || "購入情報の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * IDで購入情報を取得
   * GET /api/purchases/:id
   */
  async getPurchaseById(id: number): Promise<PurchaseData | null> {
    const response = await apiClient.get<PurchaseData>(`/purchases/${id}`);

    if (!response.success) {
      throw new Error(response.message || "購入情報の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * 新しい購入情報を作成
   * POST /api/purchases
   */
  async createPurchase(purchaseData: CreatePurchaseRequest): Promise<PurchaseData> {
    const response = await apiClient.post<PurchaseData>("/purchases", purchaseData);

    if (!response.success) {
      throw new Error(response.message || "購入情報の作成に失敗しました");
    }

    return response.data;
  }

  /**
   * 購入情報を更新
   * PUT /api/purchases/:id
   */
  async updatePurchase(id: number, purchaseData: UpdatePurchaseRequest): Promise<PurchaseData> {
    const response = await apiClient.put<PurchaseData>(`/purchases/${id}`, purchaseData);

    if (!response.success) {
      throw new Error(response.message || "購入情報の更新に失敗しました");
    }

    return response.data;
  }

  /**
   * 購入情報を削除
   * DELETE /api/purchases/:id
   */
  async deletePurchase(id: number): Promise<boolean> {
    const response = await apiClient.delete<{ success: boolean }>(`/purchases/${id}`);

    if (!response.success) {
      throw new Error(response.message || "購入情報の削除に失敗しました");
    }

    return response.data.success;
  }
}

/**
 * 購入情報APIクライアントのインスタンス
 */
export const purchaseApiClient = new PurchaseApiClient();

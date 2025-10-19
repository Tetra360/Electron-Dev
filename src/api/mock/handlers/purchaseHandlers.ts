/**
 * 購入情報関連のAPIハンドラー
 * モックサーバーを使って購入データを操作する
 */

import {
  CreatePurchaseRequest,
  PurchaseData,
  UpdatePurchaseRequest,
} from "../../types/purchase.types";
import { mockServer } from "../server";

/**
 * 購入情報関連のAPIハンドラー
 * 実際のバックエンドAPIのエンドポイントをシミュレート
 */
export const purchaseHandlers = {
  /**
   * 全購入情報を取得
   * GET /api/purchases
   */
  async getPurchases(): Promise<PurchaseData[]> {
    try {
      return await mockServer.getPurchases();
    } catch (error) {
      console.error("購入情報一覧の取得に失敗しました:", error);
      throw new Error("購入情報一覧の取得に失敗しました");
    }
  },

  /**
   * ユーザーIDで購入情報を取得
   * GET /api/purchases/user/:userId
   */
  async getPurchasesByUserId(userId: number): Promise<PurchaseData[]> {
    try {
      return await mockServer.getPurchasesByUserId(userId);
    } catch (error) {
      console.error(`ユーザーID ${userId} の購入情報取得に失敗しました:`, error);
      throw new Error("購入情報の取得に失敗しました");
    }
  },

  /**
   * IDで購入情報を取得
   * GET /api/purchases/:id
   */
  async getPurchaseById(id: number): Promise<PurchaseData | null> {
    try {
      return await mockServer.getPurchaseById(id);
    } catch (error) {
      console.error(`購入情報ID ${id} の取得に失敗しました:`, error);
      throw new Error("購入情報の取得に失敗しました");
    }
  },

  /**
   * 新しい購入情報を作成
   * POST /api/purchases
   */
  async createPurchase(purchaseData: CreatePurchaseRequest): Promise<PurchaseData> {
    try {
      // バリデーション（簡単な例）
      if (!purchaseData.userId || !purchaseData.productName) {
        throw new Error("ユーザーIDと商品名は必須です");
      }

      if (purchaseData.price <= 0 || purchaseData.quantity <= 0) {
        throw new Error("価格と数量は0より大きい必要があります");
      }

      return await mockServer.createPurchase(purchaseData);
    } catch (error) {
      console.error("購入情報の作成に失敗しました:", error);
      throw error;
    }
  },

  /**
   * 購入情報を更新
   * PUT /api/purchases/:id
   */
  async updatePurchase(
    id: number,
    purchaseData: UpdatePurchaseRequest
  ): Promise<PurchaseData | null> {
    try {
      const updatedPurchase = await mockServer.updatePurchase(id, purchaseData);
      if (!updatedPurchase) {
        throw new Error(`購入情報ID ${id} が見つかりません`);
      }
      return updatedPurchase;
    } catch (error) {
      console.error(`購入情報ID ${id} の更新に失敗しました:`, error);
      throw error;
    }
  },

  /**
   * 購入情報を削除
   * DELETE /api/purchases/:id
   */
  async deletePurchase(id: number): Promise<boolean> {
    try {
      const success = await mockServer.deletePurchase(id);
      if (!success) {
        throw new Error(`購入情報ID ${id} が見つかりません`);
      }
      return success;
    } catch (error) {
      console.error(`購入情報ID ${id} の削除に失敗しました:`, error);
      throw error;
    }
  },
};

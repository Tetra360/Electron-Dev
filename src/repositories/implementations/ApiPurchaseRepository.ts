/**
 * API購入情報リポジトリの実装
 * 実際のバックエンドAPIを使用して購入データを操作
 */

import { purchaseApiClient } from "../../api/client";
import { CreatePurchaseRequest, PurchaseData, UpdatePurchaseRequest } from "../../api/types";
import { IPurchaseRepository } from "../interfaces/IPurchaseRepository";

/**
 * API購入情報リポジトリの実装
 * 実際のバックエンドAPIとの通信を担当
 */
export class ApiPurchaseRepository implements IPurchaseRepository {
  /**
   * 全購入情報を取得
   */
  async getAll(): Promise<PurchaseData[]> {
    try {
      return await purchaseApiClient.getPurchases();
    } catch (error) {
      console.error("購入情報一覧の取得に失敗しました:", error);
      throw error;
    }
  }

  /**
   * IDで購入情報を取得
   */
  async getById(id: number): Promise<PurchaseData | null> {
    try {
      return await purchaseApiClient.getPurchaseById(id);
    } catch (error) {
      console.error(`購入情報ID ${id} の取得に失敗しました:`, error);
      throw error;
    }
  }

  /**
   * ユーザーIDで購入情報を取得
   */
  async getByUserId(userId: number): Promise<PurchaseData[]> {
    try {
      return await purchaseApiClient.getPurchasesByUserId(userId);
    } catch (error) {
      console.error(`ユーザーID ${userId} の購入情報取得に失敗しました:`, error);
      throw error;
    }
  }

  /**
   * 新しい購入情報を作成
   */
  async create(purchaseData: CreatePurchaseRequest): Promise<PurchaseData> {
    try {
      return await purchaseApiClient.createPurchase(purchaseData);
    } catch (error) {
      console.error("購入情報の作成に失敗しました:", error);
      throw error;
    }
  }

  /**
   * 購入情報を更新
   */
  async update(id: number, purchaseData: UpdatePurchaseRequest): Promise<PurchaseData | null> {
    try {
      return await purchaseApiClient.updatePurchase(id, purchaseData);
    } catch (error) {
      console.error(`購入情報ID ${id} の更新に失敗しました:`, error);
      throw error;
    }
  }

  /**
   * 購入情報を削除
   */
  async delete(id: number): Promise<boolean> {
    try {
      return await purchaseApiClient.deletePurchase(id);
    } catch (error) {
      console.error(`購入情報ID ${id} の削除に失敗しました:`, error);
      throw error;
    }
  }
}

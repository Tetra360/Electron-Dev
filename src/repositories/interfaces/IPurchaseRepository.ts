/**
 * 購入情報リポジトリのインターフェース
 * データの取得・保存・更新・削除の操作を定義
 */

import { CreatePurchaseRequest, PurchaseData, UpdatePurchaseRequest } from "../../api/types";

/**
 * 購入情報リポジトリのインターフェース
 * データの永続化に関する操作を抽象化
 */
export interface IPurchaseRepository {
  /**
   * 全購入情報を取得
   * @returns 購入情報一覧のPromise
   */
  getAll(): Promise<PurchaseData[]>;

  /**
   * IDで購入情報を取得
   * @param id 購入情報ID
   * @returns 購入情報データまたはnullのPromise
   */
  getById(id: number): Promise<PurchaseData | null>;

  /**
   * ユーザーIDで購入情報を取得
   * @param userId ユーザーID
   * @returns 該当ユーザーの購入情報一覧のPromise
   */
  getByUserId(userId: number): Promise<PurchaseData[]>;

  /**
   * 新しい購入情報を作成
   * @param purchaseData 購入情報作成データ
   * @returns 作成された購入情報データのPromise
   */
  create(purchaseData: CreatePurchaseRequest): Promise<PurchaseData>;

  /**
   * 購入情報を更新
   * @param id 購入情報ID
   * @param purchaseData 更新データ
   * @returns 更新された購入情報データまたはnullのPromise
   */
  update(id: number, purchaseData: UpdatePurchaseRequest): Promise<PurchaseData | null>;

  /**
   * 購入情報を削除
   * @param id 購入情報ID
   * @returns 削除成功の真偽値のPromise
   */
  delete(id: number): Promise<boolean>;
}

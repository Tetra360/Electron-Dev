/**
 * 購入情報関連のカスタムフック
 * 購入データの取得・管理・操作を担当
 */

import { useCallback, useState } from "react";
import { CreatePurchaseRequest, PurchaseData, UpdatePurchaseRequest } from "../../../api/types";
import { IPurchaseRepository } from "../../../repositories/interfaces";

/**
 * 購入情報関連のカスタムフック
 * 購入データの状態管理と操作を提供
 */
export function usePurchases(purchaseRepository: IPurchaseRepository) {
  // 状態管理
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 全購入情報を取得
   */
  const fetchPurchases = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const purchaseData = await purchaseRepository.getAll();
      setPurchases(purchaseData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "購入情報一覧の取得に失敗しました";
      setError(errorMessage);
      console.error("購入情報一覧の取得に失敗しました:", err);
    } finally {
      setLoading(false);
    }
  }, [purchaseRepository]);

  /**
   * ユーザーIDで購入情報を取得
   */
  const fetchPurchasesByUserId = useCallback(
    async (userId: number): Promise<PurchaseData[]> => {
      try {
        setLoading(true);
        setError(null);
        const userPurchases = await purchaseRepository.getByUserId(userId);
        setPurchases(userPurchases);
        return userPurchases;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の取得に失敗しました";
        setError(errorMessage);
        console.error(`ユーザーID ${userId} の購入情報取得に失敗しました:`, err);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [purchaseRepository]
  );

  /**
   * IDで購入情報を取得
   */
  const fetchPurchaseById = useCallback(
    async (id: number): Promise<PurchaseData | null> => {
      try {
        setError(null);
        return await purchaseRepository.getById(id);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の取得に失敗しました";
        setError(errorMessage);
        console.error(`購入情報ID ${id} の取得に失敗しました:`, err);
        return null;
      }
    },
    [purchaseRepository]
  );

  /**
   * 新しい購入情報を作成
   */
  const createPurchase = useCallback(
    async (purchaseData: CreatePurchaseRequest): Promise<PurchaseData | null> => {
      try {
        setError(null);
        const newPurchase = await purchaseRepository.create(purchaseData);
        // 作成後、購入情報一覧を再取得
        await fetchPurchases();
        return newPurchase;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の作成に失敗しました";
        setError(errorMessage);
        console.error("購入情報の作成に失敗しました:", err);
        return null;
      }
    },
    [purchaseRepository, fetchPurchases]
  );

  /**
   * 購入情報を更新
   */
  const updatePurchase = useCallback(
    async (id: number, purchaseData: UpdatePurchaseRequest): Promise<PurchaseData | null> => {
      try {
        setError(null);
        const updatedPurchase = await purchaseRepository.update(id, purchaseData);
        if (updatedPurchase) {
          // 更新後、購入情報一覧を再取得
          await fetchPurchases();
        }
        return updatedPurchase;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の更新に失敗しました";
        setError(errorMessage);
        console.error(`購入情報ID ${id} の更新に失敗しました:`, err);
        return null;
      }
    },
    [purchaseRepository, fetchPurchases]
  );

  /**
   * 購入情報を削除
   */
  const deletePurchase = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        setError(null);
        const success = await purchaseRepository.delete(id);
        if (success) {
          // 削除後、購入情報一覧を再取得
          await fetchPurchases();
        }
        return success;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の削除に失敗しました";
        setError(errorMessage);
        console.error(`購入情報ID ${id} の削除に失敗しました:`, err);
        return false;
      }
    },
    [purchaseRepository, fetchPurchases]
  );

  return {
    // 状態
    purchases,
    loading,
    error,

    // 操作
    fetchPurchases,
    fetchPurchasesByUserId,
    fetchPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchase,
  };
}

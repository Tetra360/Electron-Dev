/**
 * リレーションテーブル用のカスタムフック
 * ユーザーと購入情報の関連データを管理
 */

import { useCallback, useEffect, useState } from "react";
import { PurchaseData, UserData } from "../../../api/types";
import { IPurchaseRepository, IUserRepository } from "../../../repositories/interfaces";

/**
 * リレーションテーブル用のカスタムフック
 * ユーザーと購入情報の関連データの状態管理と操作を提供
 */
export function useRelationTable(
  userRepository: IUserRepository,
  purchaseRepository: IPurchaseRepository
) {
  // 状態管理
  const [users, setUsers] = useState<UserData[]>([]);
  const [purchases, setPurchases] = useState<PurchaseData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * ユーザー一覧を取得
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userRepository.getAll();
      setUsers(userData);

      // 最初のユーザーを自動選択
      if (userData.length > 0) {
        setSelectedUserId(userData[0].id);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "ユーザー一覧の取得に失敗しました";
      setError(errorMessage);
      console.error("ユーザー一覧の取得に失敗しました:", err);
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  /**
   * 選択されたユーザーの購入情報を取得
   */
  const fetchPurchasesBySelectedUser = useCallback(
    async (userId: number) => {
      try {
        setPurchaseLoading(true);
        setError(null);
        const userPurchases = await purchaseRepository.getByUserId(userId);
        setPurchases(userPurchases);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "購入情報の取得に失敗しました";
        setError(errorMessage);
        console.error(`ユーザーID ${userId} の購入情報取得に失敗しました:`, err);
        setPurchases([]);
      } finally {
        setPurchaseLoading(false);
      }
    },
    [purchaseRepository]
  );

  /**
   * ユーザーを選択
   */
  const selectUser = useCallback((userId: number) => {
    setSelectedUserId(userId);
  }, []);

  /**
   * 選択されたユーザーの購入情報を取得
   */
  const loadPurchasesForSelectedUser = useCallback(async () => {
    if (selectedUserId) {
      await fetchPurchasesBySelectedUser(selectedUserId);
    }
  }, [selectedUserId, fetchPurchasesBySelectedUser]);

  // コンポーネントマウント時にユーザー一覧を取得
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ユーザーが選択された時に購入情報を取得
  useEffect(() => {
    if (selectedUserId) {
      fetchPurchasesBySelectedUser(selectedUserId);
    }
  }, [selectedUserId, fetchPurchasesBySelectedUser]);

  return {
    // 状態
    users,
    purchases,
    selectedUserId,
    loading,
    purchaseLoading,
    error,

    // 操作
    selectUser,
    loadPurchasesForSelectedUser,
    fetchUsers,
    fetchPurchasesBySelectedUser,
  };
}

/**
 * ユーザー関連のカスタムフック
 * ユーザーデータの取得・管理・操作を担当
 */

import { useCallback, useEffect, useState } from "react";
import { CreateUserRequest, UpdateUserRequest, UserData } from "../../../api/types";
import { IUserRepository } from "../../../repositories/interfaces";

/**
 * ユーザー関連のカスタムフック
 * ユーザーデータの状態管理と操作を提供
 */
export function useUsers(userRepository: IUserRepository) {
  // 状態管理
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * 全ユーザーを取得
   */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await userRepository.getAll();
      setUsers(userData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "ユーザー一覧の取得に失敗しました";
      setError(errorMessage);
      console.error("ユーザー一覧の取得に失敗しました:", err);
    } finally {
      setLoading(false);
    }
  }, [userRepository]);

  /**
   * IDでユーザーを取得
   */
  const fetchUserById = useCallback(
    async (id: number): Promise<UserData | null> => {
      try {
        setError(null);
        return await userRepository.getById(id);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "ユーザーの取得に失敗しました";
        setError(errorMessage);
        console.error(`ユーザーID ${id} の取得に失敗しました:`, err);
        return null;
      }
    },
    [userRepository]
  );

  /**
   * 新しいユーザーを作成
   */
  const createUser = useCallback(
    async (userData: CreateUserRequest): Promise<UserData | null> => {
      try {
        setError(null);
        const newUser = await userRepository.create(userData);
        // 作成後、ユーザー一覧を再取得
        await fetchUsers();
        return newUser;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "ユーザーの作成に失敗しました";
        setError(errorMessage);
        console.error("ユーザーの作成に失敗しました:", err);
        return null;
      }
    },
    [userRepository, fetchUsers]
  );

  /**
   * ユーザー情報を更新
   */
  const updateUser = useCallback(
    async (id: number, userData: UpdateUserRequest): Promise<UserData | null> => {
      try {
        setError(null);
        const updatedUser = await userRepository.update(id, userData);
        if (updatedUser) {
          // 更新後、ユーザー一覧を再取得
          await fetchUsers();
        }
        return updatedUser;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "ユーザーの更新に失敗しました";
        setError(errorMessage);
        console.error(`ユーザーID ${id} の更新に失敗しました:`, err);
        return null;
      }
    },
    [userRepository, fetchUsers]
  );

  /**
   * ユーザーを削除
   */
  const deleteUser = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        setError(null);
        const success = await userRepository.delete(id);
        if (success) {
          // 削除後、ユーザー一覧を再取得
          await fetchUsers();
        }
        return success;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "ユーザーの削除に失敗しました";
        setError(errorMessage);
        console.error(`ユーザーID ${id} の削除に失敗しました:`, err);
        return false;
      }
    },
    [userRepository, fetchUsers]
  );

  // コンポーネントマウント時にユーザー一覧を取得
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    // 状態
    users,
    loading,
    error,

    // 操作
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}

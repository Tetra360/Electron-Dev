/**
 * ユーザー関連のAPIハンドラー
 * モックサーバーを使ってユーザーデータを操作する
 */

import { CreateUserRequest, UpdateUserRequest, UserData } from "../../types/user.types";
import { mockServer } from "../server";

/**
 * ユーザー関連のAPIハンドラー
 * 実際のバックエンドAPIのエンドポイントをシミュレート
 */
export const userHandlers = {
  /**
   * 全ユーザーを取得
   * GET /api/users
   */
  async getUsers(): Promise<UserData[]> {
    try {
      return await mockServer.getUsers();
    } catch (error) {
      console.error("ユーザー一覧の取得に失敗しました:", error);
      throw new Error("ユーザー一覧の取得に失敗しました");
    }
  },

  /**
   * IDでユーザーを取得
   * GET /api/users/:id
   */
  async getUserById(id: number): Promise<UserData | null> {
    try {
      return await mockServer.getUserById(id);
    } catch (error) {
      console.error(`ユーザーID ${id} の取得に失敗しました:`, error);
      throw new Error("ユーザーの取得に失敗しました");
    }
  },

  /**
   * 新しいユーザーを作成
   * POST /api/users
   */
  async createUser(userData: CreateUserRequest): Promise<UserData> {
    try {
      // バリデーション（簡単な例）
      if (!userData.name || !userData.email) {
        throw new Error("名前とメールアドレスは必須です");
      }

      return await mockServer.createUser(userData);
    } catch (error) {
      console.error("ユーザーの作成に失敗しました:", error);
      throw error;
    }
  },

  /**
   * ユーザー情報を更新
   * PUT /api/users/:id
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserData | null> {
    try {
      const updatedUser = await mockServer.updateUser(id, userData);
      if (!updatedUser) {
        throw new Error(`ユーザーID ${id} が見つかりません`);
      }
      return updatedUser;
    } catch (error) {
      console.error(`ユーザーID ${id} の更新に失敗しました:`, error);
      throw error;
    }
  },

  /**
   * ユーザーを削除
   * DELETE /api/users/:id
   */
  async deleteUser(id: number): Promise<boolean> {
    try {
      const success = await mockServer.deleteUser(id);
      if (!success) {
        throw new Error(`ユーザーID ${id} が見つかりません`);
      }
      return success;
    } catch (error) {
      console.error(`ユーザーID ${id} の削除に失敗しました:`, error);
      throw error;
    }
  },
};

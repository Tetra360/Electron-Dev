/**
 * ユーザー関連のAPIクライアント
 * 実際のバックエンドAPIとの通信を担当
 */

import { CreateUserRequest, UpdateUserRequest, UserData } from "../types/user.types";
import { apiClient } from "./apiClient";

/**
 * ユーザー関連のAPIクライアント
 * 実際のバックエンドAPIのエンドポイントと通信する
 */
export class UserApiClient {
  /**
   * 全ユーザーを取得
   * GET /api/users
   */
  async getUsers(): Promise<UserData[]> {
    const response = await apiClient.get<UserData[]>("/users");

    if (!response.success) {
      throw new Error(response.message || "ユーザー一覧の取得に失敗しました");
    }

    return response.data;
  }

  /**
   * IDでユーザーを取得
   * GET /api/users/:id
   */
  async getUserById(id: number): Promise<UserData | null> {
    const response = await apiClient.get<UserData>(`/users/${id}`);

    if (!response.success) {
      throw new Error(response.message || "ユーザーの取得に失敗しました");
    }

    return response.data;
  }

  /**
   * 新しいユーザーを作成
   * POST /api/users
   */
  async createUser(userData: CreateUserRequest): Promise<UserData> {
    const response = await apiClient.post<UserData>("/users", userData);

    if (!response.success) {
      throw new Error(response.message || "ユーザーの作成に失敗しました");
    }

    return response.data;
  }

  /**
   * ユーザー情報を更新
   * PUT /api/users/:id
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserData> {
    const response = await apiClient.put<UserData>(`/users/${id}`, userData);

    if (!response.success) {
      throw new Error(response.message || "ユーザーの更新に失敗しました");
    }

    return response.data;
  }

  /**
   * ユーザーを削除
   * DELETE /api/users/:id
   */
  async deleteUser(id: number): Promise<boolean> {
    const response = await apiClient.delete<{ success: boolean }>(`/users/${id}`);

    if (!response.success) {
      throw new Error(response.message || "ユーザーの削除に失敗しました");
    }

    return response.data.success;
  }
}

/**
 * ユーザーAPIクライアントのインスタンス
 */
export const userApiClient = new UserApiClient();

/**
 * APIユーザーリポジトリの実装
 * 実際のバックエンドAPIを使用してユーザーデータを操作
 */

import { userApiClient } from "../../api/client";
import { CreateUserRequest, UpdateUserRequest, UserData } from "../../api/types";
import { IUserRepository } from "../interfaces/IUserRepository";

/**
 * APIユーザーリポジトリの実装
 * 実際のバックエンドAPIとの通信を担当
 */
export class ApiUserRepository implements IUserRepository {
  /**
   * 全ユーザーを取得
   */
  async getAll(): Promise<UserData[]> {
    try {
      return await userApiClient.getUsers();
    } catch (error) {
      console.error("ユーザー一覧の取得に失敗しました:", error);
      throw error;
    }
  }

  /**
   * IDでユーザーを取得
   */
  async getById(id: number): Promise<UserData | null> {
    try {
      return await userApiClient.getUserById(id);
    } catch (error) {
      console.error(`ユーザーID ${id} の取得に失敗しました:`, error);
      throw error;
    }
  }

  /**
   * 新しいユーザーを作成
   */
  async create(userData: CreateUserRequest): Promise<UserData> {
    try {
      return await userApiClient.createUser(userData);
    } catch (error) {
      console.error("ユーザーの作成に失敗しました:", error);
      throw error;
    }
  }

  /**
   * ユーザー情報を更新
   */
  async update(id: number, userData: UpdateUserRequest): Promise<UserData | null> {
    try {
      return await userApiClient.updateUser(id, userData);
    } catch (error) {
      console.error(`ユーザーID ${id} の更新に失敗しました:`, error);
      throw error;
    }
  }

  /**
   * ユーザーを削除
   */
  async delete(id: number): Promise<boolean> {
    try {
      return await userApiClient.deleteUser(id);
    } catch (error) {
      console.error(`ユーザーID ${id} の削除に失敗しました:`, error);
      throw error;
    }
  }
}

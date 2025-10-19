/**
 * ユーザーリポジトリのインターフェース
 * データの取得・保存・更新・削除の操作を定義
 */

import { CreateUserRequest, UpdateUserRequest, UserData } from "../../api/types";

/**
 * ユーザーリポジトリのインターフェース
 * データの永続化に関する操作を抽象化
 */
export interface IUserRepository {
  /**
   * 全ユーザーを取得
   * @returns ユーザー一覧のPromise
   */
  getAll(): Promise<UserData[]>;

  /**
   * IDでユーザーを取得
   * @param id ユーザーID
   * @returns ユーザーデータまたはnullのPromise
   */
  getById(id: number): Promise<UserData | null>;

  /**
   * 新しいユーザーを作成
   * @param userData ユーザー作成データ
   * @returns 作成されたユーザーデータのPromise
   */
  create(userData: CreateUserRequest): Promise<UserData>;

  /**
   * ユーザー情報を更新
   * @param id ユーザーID
   * @param userData 更新データ
   * @returns 更新されたユーザーデータまたはnullのPromise
   */
  update(id: number, userData: UpdateUserRequest): Promise<UserData | null>;

  /**
   * ユーザーを削除
   * @param id ユーザーID
   * @returns 削除成功の真偽値のPromise
   */
  delete(id: number): Promise<boolean>;
}

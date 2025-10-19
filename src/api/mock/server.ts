/**
 * モックバックエンドサーバー
 * 実際のバックエンドAPIの代わりに動作するモックサーバー
 */

import {
  CreatePurchaseRequest,
  PurchaseData,
  UpdatePurchaseRequest,
} from "../types/purchase.types";
import { CreateUserRequest, UpdateUserRequest, UserData } from "../types/user.types";

export class MockServer {
  // メモリ上でデータを管理（実際のDBの代わり）
  private users: UserData[] = [];
  private purchases: PurchaseData[] = [];
  private nextUserId = 1;
  private nextPurchaseId = 1;

  /**
   * モックサーバーを初期化
   * JSONファイルからデータを読み込む
   */
  async initialize(): Promise<void> {
    await this.reloadData();
    console.log("モックサーバーが初期化されました");
  }

  /**
   * JSONファイルからデータを再読み込み
   * 開発時にJSONファイルを直接編集した場合に使用
   */
  async reloadData(): Promise<void> {
    try {
      // ユーザーデータを読み込み
      const usersResponse = await fetch("/src/api/mock/data/users.json");
      this.users = await usersResponse.json();

      // 購入データを読み込み
      const purchasesResponse = await fetch("/src/api/mock/data/purchases.json");
      this.purchases = await purchasesResponse.json();

      // 次のIDを設定（既存データの最大ID + 1）
      this.nextUserId = Math.max(...this.users.map((u) => u.id), 0) + 1;
      this.nextPurchaseId = Math.max(...this.purchases.map((p) => p.id), 0) + 1;

      console.log("データが再読み込みされました");
    } catch (error) {
      console.error("データの再読み込みに失敗しました:", error);
      throw error;
    }
  }

  // ===== ユーザー関連のメソッド =====

  /**
   * 全ユーザーを取得
   */
  async getUsers(): Promise<UserData[]> {
    // 実際のAPIでは少し遅延をシミュレート
    await this.delay(100);
    return [...this.users];
  }

  /**
   * IDでユーザーを取得
   */
  async getUserById(id: number): Promise<UserData | null> {
    await this.delay(50);
    return this.users.find((user) => user.id === id) || null;
  }

  /**
   * 新しいユーザーを作成
   */
  async createUser(userData: CreateUserRequest): Promise<UserData> {
    await this.delay(200);

    const newUser: UserData = {
      id: this.nextUserId++,
      ...userData,
    };

    this.users.push(newUser);
    return newUser;
  }

  /**
   * ユーザー情報を更新
   */
  async updateUser(id: number, userData: UpdateUserRequest): Promise<UserData | null> {
    await this.delay(150);

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.users[userIndex] = { ...this.users[userIndex], ...userData };
    return this.users[userIndex];
  }

  /**
   * ユーザーを削除
   */
  async deleteUser(id: number): Promise<boolean> {
    await this.delay(100);

    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  // ===== 購入情報関連のメソッド =====

  /**
   * 全購入情報を取得
   */
  async getPurchases(): Promise<PurchaseData[]> {
    await this.delay(100);
    return [...this.purchases];
  }

  /**
   * ユーザーIDで購入情報を取得
   */
  async getPurchasesByUserId(userId: number): Promise<PurchaseData[]> {
    await this.delay(50);
    return this.purchases.filter((purchase) => purchase.userId === userId);
  }

  /**
   * IDで購入情報を取得
   */
  async getPurchaseById(id: number): Promise<PurchaseData | null> {
    await this.delay(50);
    return this.purchases.find((purchase) => purchase.id === id) || null;
  }

  /**
   * 新しい購入情報を作成
   */
  async createPurchase(purchaseData: CreatePurchaseRequest): Promise<PurchaseData> {
    await this.delay(200);

    const newPurchase: PurchaseData = {
      id: this.nextPurchaseId++,
      ...purchaseData,
    };

    this.purchases.push(newPurchase);
    return newPurchase;
  }

  /**
   * 購入情報を更新
   */
  async updatePurchase(
    id: number,
    purchaseData: UpdatePurchaseRequest
  ): Promise<PurchaseData | null> {
    await this.delay(150);

    const purchaseIndex = this.purchases.findIndex((purchase) => purchase.id === id);
    if (purchaseIndex === -1) {
      return null;
    }

    this.purchases[purchaseIndex] = { ...this.purchases[purchaseIndex], ...purchaseData };
    return this.purchases[purchaseIndex];
  }

  /**
   * 購入情報を削除
   */
  async deletePurchase(id: number): Promise<boolean> {
    await this.delay(100);

    const purchaseIndex = this.purchases.findIndex((purchase) => purchase.id === id);
    if (purchaseIndex === -1) {
      return false;
    }

    this.purchases.splice(purchaseIndex, 1);
    return true;
  }

  // ===== ユーティリティメソッド =====

  /**
   * 指定した時間だけ待機（APIの遅延をシミュレート）
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// シングルトンインスタンスを作成
export const mockServer = new MockServer();

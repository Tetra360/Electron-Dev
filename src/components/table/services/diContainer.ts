/**
 * 依存性注入（DI）コンテナ
 * リポジトリのインスタンスを管理し、適切な実装を提供
 */

import { mockServer } from "../../../api/mock";
import { MockPurchaseRepository, MockUserRepository } from "../../../repositories/implementations";
import { IPurchaseRepository, IUserRepository } from "../../../repositories/interfaces";

/**
 * DIコンテナの設定
 */
interface DIContainerConfig {
  useMock: boolean; // モックサーバーを使用するかどうか
}

/**
 * DIコンテナクラス
 * リポジトリのインスタンスを管理
 */
export class DIContainer {
  private config: DIContainerConfig;
  private userRepository: IUserRepository | null = null;
  private purchaseRepository: IPurchaseRepository | null = null;

  constructor(config: DIContainerConfig) {
    this.config = config;
  }

  /**
   * ユーザーリポジトリを取得
   */
  getUserRepository(): IUserRepository {
    if (!this.userRepository) {
      if (this.config.useMock) {
        this.userRepository = new MockUserRepository();
      } else {
        // 実際のAPIリポジトリを使用する場合
        // this.userRepository = new ApiUserRepository();
        throw new Error("APIリポジトリは未実装です");
      }
    }
    return this.userRepository;
  }

  /**
   * 購入情報リポジトリを取得
   */
  getPurchaseRepository(): IPurchaseRepository {
    if (!this.purchaseRepository) {
      if (this.config.useMock) {
        this.purchaseRepository = new MockPurchaseRepository();
      } else {
        // 実際のAPIリポジトリを使用する場合
        // this.purchaseRepository = new ApiPurchaseRepository();
        throw new Error("APIリポジトリは未実装です");
      }
    }
    return this.purchaseRepository;
  }

  /**
   * モックサーバーを初期化
   */
  async initialize(): Promise<void> {
    if (this.config.useMock) {
      await mockServer.initialize();
    }
  }
}

/**
 * デフォルトのDIコンテナ設定
 */
export const defaultDIConfig: DIContainerConfig = {
  useMock: true, // 開発中はモックサーバーを使用
};

/**
 * デフォルトのDIコンテナインスタンス
 */
export const diContainer = new DIContainer(defaultDIConfig);

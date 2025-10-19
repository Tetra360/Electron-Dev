/**
 * リポジトリの統一エクスポート
 */

// インターフェースをエクスポート
export type { IPurchaseRepository, IUserRepository } from "./interfaces";

// 実装をエクスポート
export {
  ApiPurchaseRepository,
  ApiUserRepository,
  MockPurchaseRepository,
  MockUserRepository,
} from "./implementations";

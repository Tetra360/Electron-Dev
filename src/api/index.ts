/**
 * APIモジュールの統一エクスポート
 */

// 型定義をエクスポート
export type {
  ApiError,
  ApiResponse,
  CreatePurchaseRequest,
  CreateUserRequest,
  PurchaseData,
  UpdatePurchaseRequest,
  UpdateUserRequest,
  UserData,
  UserPurchasesResponse,
} from "./types";

// モックAPIをエクスポート
export { mockServer, purchaseHandlers, userHandlers } from "./mock";

// APIクライアントをエクスポート
export { apiClient, purchaseApiClient, userApiClient } from "./client";

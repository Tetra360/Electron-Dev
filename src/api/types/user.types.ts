/**
 * ユーザー関連の型定義
 */

// ユーザーデータの基本型
export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  notes: string;
  lastPurchaseDate: string;
}

// ユーザー作成時のリクエスト型
export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
  notes: string;
  lastPurchaseDate: string;
}

// ユーザー更新時のリクエスト型
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  department?: string;
  notes?: string;
  lastPurchaseDate?: string;
}

// APIレスポンスの基本型
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// エラーレスポンスの型
export interface ApiError {
  success: false;
  error: string;
  message: string;
}

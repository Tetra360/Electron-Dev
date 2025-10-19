/**
 * APIクライアントの基本クラス
 * HTTPリクエストを送信するための共通機能を提供
 */

import { ApiResponse } from "../types";

/**
 * APIクライアントの基本設定
 */
interface ApiClientConfig {
  baseUrl: string; // APIのベースURL
  timeout: number; // リクエストのタイムアウト時間（ミリ秒）
  headers: Record<string, string>; // 共通ヘッダー
}

/**
 * APIクライアントの基本クラス
 * 実際のバックエンドAPIとの通信を担当
 */
export class ApiClient {
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
  }

  /**
   * GETリクエストを送信
   */
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: "GET",
        headers: this.config.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`GET ${endpoint} に失敗しました:`, error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : "不明なエラーが発生しました",
      };
    }
  }

  /**
   * POSTリクエストを送信
   */
  async post<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          ...this.config.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      console.error(`POST ${endpoint} に失敗しました:`, error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : "不明なエラーが発生しました",
      };
    }
  }

  /**
   * PUTリクエストを送信
   */
  async put<T>(endpoint: string, data: unknown): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: "PUT",
        headers: {
          ...this.config.headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (error) {
      console.error(`PUT ${endpoint} に失敗しました:`, error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : "不明なエラーが発生しました",
      };
    }
  }

  /**
   * DELETEリクエストを送信
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: this.config.headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error(`DELETE ${endpoint} に失敗しました:`, error);
      return {
        success: false,
        data: null as T,
        message: error instanceof Error ? error.message : "不明なエラーが発生しました",
      };
    }
  }
}

/**
 * デフォルトのAPIクライアント設定
 */
export const defaultApiConfig: ApiClientConfig = {
  baseUrl: "/api", // APIのベースURL
  timeout: 5000, // 5秒でタイムアウト
  headers: {
    Accept: "application/json", // JSON形式でデータを受け取る
  },
};

/**
 * デフォルトのAPIクライアントインスタンス
 */
export const apiClient = new ApiClient(defaultApiConfig);

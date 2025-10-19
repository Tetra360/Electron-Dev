import { mockServer } from "@/api/mock";
import { PurchaseData } from "@/api/types";
import { DataTable } from "@/components/table/components/DataTable";
import {
  dataService,
  purchaseColumnDefinitions,
  userColumnDefinitions,
} from "@/components/table/data";
import { UserData } from "@/components/table/types/tableTypes";
import Splitter from "@/components/ui/splitter";
import { useEffect, useState } from "react";

/**
 * RelationTableTabコンポーネントのプロップス
 */
interface RelationTableTabProps {
  /** 初期選択時に購入データを自動読み込みするか */
  autoLoadPurchases?: boolean;
}

/**
 * リレーションテーブルタブコンポーネント
 * スプリッターを使用して2つのパネルにテーブルを表示する
 */
export default function RelationTableTab({ autoLoadPurchases = true }: RelationTableTabProps) {
  // データの状態管理
  const [userData, setUserData] = useState<UserData[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<PurchaseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [purchaseLoading, setPurchaseLoading] = useState<boolean>(false);

  // 選択されたユーザーID
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // 最初のユーザーが選択された時の購入データ読み込み
  useEffect(() => {
    const loadFirstUserPurchaseData = async () => {
      if (selectedUserId && autoLoadPurchases) {
        try {
          setPurchaseLoading(true);
          const purchases = await dataService.getPurchasesByUserId(selectedUserId);
          setFilteredPurchases(purchases);
        } catch (error) {
          console.error("最初のユーザーの購入データの読み込みに失敗しました:", error);
          setFilteredPurchases([]);
        } finally {
          setPurchaseLoading(false);
        }
      }
    };

    loadFirstUserPurchaseData();
  }, [selectedUserId, autoLoadPurchases]);

  // 選択されたユーザーIDに基づく購入データの取得
  useEffect(() => {
    const loadPurchaseData = async () => {
      if (selectedUserId) {
        try {
          setPurchaseLoading(true);
          const purchases = await dataService.getPurchasesByUserId(selectedUserId);
          setFilteredPurchases(purchases);
        } catch (error) {
          console.error("購入データの読み込みに失敗しました:", error);
          setFilteredPurchases([]);
        } finally {
          setPurchaseLoading(false);
        }
      } else {
        // ユーザーが選択されていない場合は空の配列を表示
        setFilteredPurchases([]);
      }
    };

    loadPurchaseData();
  }, [selectedUserId]);

  // ページ読み込み時にoverflowを制御
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // コンポーネント表示時にデータを再取得
  useEffect(() => {
    const loadUserDataOnMount = async () => {
      try {
        setLoading(true);

        // JSONファイルの変更を反映するためにモックサーバーを再読み込み
        await mockServer.reloadData();

        const users = await dataService.getUsers();
        setUserData(users);

        // 最初のユーザーを選択
        if (users.length > 0) {
          setSelectedUserId(users[0].id);
        }
      } catch (error) {
        console.error("ユーザーデータの読み込みに失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserDataOnMount();
  }, []); // 空の依存配列でマウント時のみ実行

  // ローディング状態の表示
  if (loading) {
    return (
      <div className="w-screen h-[80vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-[80vh] flex flex-col overflow-hidden bg-gray-100 p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">ECサイト 購入管理システム</h2>
        <p className="text-gray-600">
          左のテーブルで顧客を選択すると、右のテーブルに関連する購入情報が表示されます
        </p>
      </div>

      <Splitter
        contents={[
          // 左パネル: 顧客テーブル
          <div className="w-full h-full p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">顧客一覧</h3>
            </div>
            <div className="h-full">
              <DataTable
                data={userData}
                columns={userColumnDefinitions}
                onRowSelect={(userId) => setSelectedUserId(userId)}
              />
            </div>
          </div>,

          // 右パネル: 購入情報テーブル
          <div className="w-full h-full p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">購入情報一覧</h3>
            </div>
            <div className="h-full">
              {purchaseLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">購入データを読み込み中...</p>
                  </div>
                </div>
              ) : (
                <DataTable
                  data={filteredPurchases as unknown as UserData[]}
                  columns={purchaseColumnDefinitions}
                />
              )}
            </div>
          </div>,
        ]}
        initialWidths={[50, 50]}
        minWidth={20}
        maxWidth={80}
        onResize={(widths) =>
          console.log("パネル幅:", widths.map((w) => w.toFixed(1) + "%").join(", "))
        }
      />
    </div>
  );
}

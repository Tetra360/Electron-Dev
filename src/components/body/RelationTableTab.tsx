import Splitter from "@/components/ui/splitter";
import { DataTable } from "@/example/components/DataTable";
import { UserData } from "@/example/types/tableTypes";
import { useEffect, useState } from "react";
import {
  purchaseColumnDefinitions,
  purchaseData,
  userColumnDefinitions,
  userData,
} from "./relationTableData";

/**
 * リレーションテーブルタブコンポーネント
 * スプリッターを使用して2つのパネルにテーブルを表示する
 */
export default function RelationTableTab() {
  // 選択されたユーザーID
  const [selectedUserId] = useState<number | null>(null);

  // 選択されたユーザーに関連する購入情報をフィルタリング
  const filteredPurchases = selectedUserId
    ? purchaseData.filter((purchase) => purchase.userId === selectedUserId)
    : purchaseData;

  // ページ読み込み時にoverflowを制御
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
              <h3 className="text-lg font-semibold text-gray-700">購入一覧</h3>
            </div>
            <div className="h-full">
              <DataTable data={userData} columns={userColumnDefinitions} />
            </div>
          </div>,

          // 右パネル: 購入情報テーブル
          <div className="w-full h-full p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                購入情報一覧
                {selectedUserId && (
                  <span className="text-sm font-normal text-blue-600 ml-2">
                    (顧客ID: {selectedUserId} の購入履歴)
                  </span>
                )}
              </h3>
            </div>
            <div className="h-full">
              <DataTable
                data={filteredPurchases as unknown as UserData[]}
                columns={purchaseColumnDefinitions}
              />
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

import React, { useCallback, useRef, useState } from "react";

/**
 * Splitterコンポーネント（8px余白つき・スクロールなし・簡潔版）
 * 左右のパネルを分割して、ドラッグでサイズを変更できるコンポーネント
 */
function Splitter({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode; // 左側に表示するコンテンツ
  rightContent: React.ReactNode; // 右側に表示するコンテンツ
}) {
  // 左パネルの幅をパーセンテージで管理 (初期値は50%)
  const [leftWidth, setLeftWidth] = useState(50);
  // ドラッグ中かどうかの状態を管理
  const [isDragging, setIsDragging] = useState(false);
  // コンテナのDOM要素への参照を取得
  const containerRef = useRef<HTMLDivElement>(null);

  // マウスダウン時の処理 (ドラッグ開始)
  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  // マウス移動時の処理 (ドラッグ中にパネル幅を更新)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // ドラッグ中でない、またはコンテナが存在しない場合は何もしない
      if (!isDragging || !containerRef.current) return;

      // コンテナの位置とサイズを取得
      const rect = containerRef.current.getBoundingClientRect();
      // マウス位置から左パネルの幅を計算 (パーセンテージ)
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
      // 幅を10%〜90%の範囲に制限して更新
      setLeftWidth(Math.max(10, Math.min(90, newLeftWidth)));
    },
    [isDragging]
  );

  // マウスアップ時の処理 (ドラッグ終了)
  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  // ドラッグ中のイベントリスナーを設定/削除
  React.useEffect(() => {
    if (isDragging) {
      // ドラッグ中は文書全体でマウスイベントを監視
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      // テキスト選択を無効化 (ドラッグ時の選択を防ぐ)
      document.body.style.userSelect = "none";

      // クリーンアップ関数 (コンポーネントのアンマウント時や依存配列の変更時に実行)
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        // テキスト選択を元に戻す
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className="w-screen h-[80vh] flex p-8 overflow-hidden bg-gray-100">
      {/* 左パネル */}
      <div
        className="flex justify-center items-center overflow-hidden"
        style={{ width: `${leftWidth}%` }} // 計算された幅を適用
      >
        <div className="flex justify-center items-center w-full h-full border rounded-3xl bg-white text-4xl">
          {leftContent}
        </div>
      </div>

      {/* スプリッター (分割バー) - ドラッグ可能な部分 */}
      <div
        className="flex items-center justify-center w-4 flex-shrink-0 cursor-col-resize"
        onMouseDown={handleMouseDown} // マウスダウンでドラッグ開始
      >
        {/* スプリッターの視覚的なバー */}
        <div
          className={`w-1 h-16 rounded-full transition-colors ${
            isDragging ? "bg-blue-400" : "bg-gray-400 hover:bg-blue-300"
          }`}
        />
      </div>

      {/* 右パネル */}
      <div
        className="flex justify-center items-center overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }} // 左パネル以外の幅
      >
        <div className="flex justify-center items-center w-full h-full border rounded-3xl bg-white text-4xl">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

/**
 * Splitterタブのメインコンポーネント
 * アプリケーション全体のスクロールを無効化し、Splitterコンポーネントを表示する
 */
export default function SplitterTab() {
  // コンポーネントがマウントされた時にページ全体のスクロールを無効化
  React.useEffect(() => {
    document.body.style.overflow = "hidden"; // スクロールを無効化
    // コンポーネントがアンマウントされる時にスクロールを元に戻す
    return () => {
      document.body.style.overflow = ""; // スクロールを有効化
    };
  }, []); // 空の依存配列なので、マウント時のみ実行

  return (
    // 画面全体を覆うコンテナ (スクロール無効)
    <div className="w-screen h-screen flex flex-col overflow-hidden">
      <Splitter leftContent={<div>左側パネル</div>} rightContent={<div>右側パネル</div>} />
    </div>
  );
}

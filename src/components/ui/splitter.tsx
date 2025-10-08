import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * Splitterコンポーネントのプロパティ定義
 * 複数のパネルを横並びで表示し、ドラッグでサイズを変更できる汎用コンポーネント
 */
type SplitterProps = {
  /** 各パネルに表示するコンテンツの配列 */
  contents: React.ReactNode[];
  /** 初期の幅配分（%の配列。例: [30, 40, 30]） */
  initialWidths?: number[];
  /** 各パネルの最小幅（%） */
  minWidth?: number;
  /** 各パネルの最大幅（%） */
  maxWidth?: number;
  /** スプリッターの太さ(px、デフォルト8px） */
  splitterWidth?: number;
  /** 幅変更時に呼ばれるコールバック */
  onResize?: (widths: number[]) => void;
  /** コンテナクラス */
  className?: string;
};

/**
 * 汎用 Splitter コンポーネント
 * 複数のパネルを横並びで表示し、ドラッグでサイズを変更できる
 *
 * 特徴:
 * - 任意の数のパネルに対応
 * - ドラッグによる直感的なサイズ変更
 * - 最小・最大幅の制限
 * - リアルタイムの幅変更コールバック
 */
export default function Splitter({
  contents,
  initialWidths,
  minWidth = 5,
  maxWidth = 90,
  splitterWidth = 8,
  onResize,
  className = "",
}: SplitterProps) {
  // コンテンツの数を取得
  const contentsCount = contents.length;

  // ===== STEP 1: 初期設定と状態管理 =====
  // initialWidthsが指定されていて、コンテンツ数と一致する場合はそれを使用
  // そうでなければ各パネルに均等に幅を分配
  const normalizedWidths =
    initialWidths && initialWidths.length === contentsCount
      ? initialWidths
      : Array(contentsCount).fill(100 / contentsCount); // 各要素に対して均等に幅を分配

  // 各パネルの幅をパーセンテージで管理
  const [widths, setWidths] = useState<number[]>(normalizedWidths);
  // ドラッグ中かどうかの状態を管理
  const [isDragging, setIsDragging] = useState(false);
  // どのスプリッターをドラッグ中かの状態 (スプリッターのインデックス)
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  // コンテナのDOM要素への参照を取得
  const containerRef = useRef<HTMLDivElement>(null);

  // ===== STEP 2: イベントハンドラーの定義 =====
  // マウスダウン時の処理 (ドラッグ開始)
  const handleMouseDown = useCallback((index: number) => {
    setIsDragging(true); // ドラッグ中フラグをON
    setDragIndex(index); // 複数あるスプリッターのどれをドラッグしているか記録
  }, []);

  // マウス移動時の処理 (ドラッグ中にパネル幅を更新)
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      // ドラッグ中でない、またはスプリッターが指定されていない、またはコンテナが存在しない場合は何もしない
      if (!isDragging || dragIndex === null || !containerRef.current) return;

      // containerRefに紐づいた要素の幅取得
      const rect = containerRef.current.getBoundingClientRect();
      const totalWidth = rect.width;
      // マウスの移動量から幅の変化量を計算 (パーセンテージ)
      const deltaPercent = (e.movementX / totalWidth) * 100;

      setWidths((prev) => {
        const newWidths = [...prev];
        // ドラッグ中のスプリッターの左右のパネルの幅を取得
        const left = newWidths[dragIndex];
        const right = newWidths[dragIndex + 1];

        // 新しい幅を計算 (最小・最大幅の制限を適用)
        const newLeft = Math.max(minWidth, Math.min(maxWidth, left + deltaPercent));
        const newRight = Math.max(minWidth, Math.min(maxWidth, right - deltaPercent));

        // 幅の合計を維持しつつ調整 (合計が100%を超えないように調整)
        const diff = newLeft + newRight - (left + right);
        newWidths[dragIndex] = newLeft - diff / 2;
        newWidths[dragIndex + 1] = newRight - diff / 2;

        // 幅変更のコールバックを実行
        onResize?.(newWidths);
        return newWidths;
      });
    },
    [isDragging, dragIndex, minWidth, maxWidth, onResize]
  );

  // マウスアップ時の処理 (ドラッグ終了)
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setDragIndex(null);
  }, []);

  // ===== STEP 3: イベントリスナーの管理 =====
  // ドラッグ中のイベントリスナーを設定/削除
  useEffect(() => {
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
    // メインコンテナ (横並びレイアウト)
    <div ref={containerRef} className={`flex w-full h-full overflow-hidden ${className}`}>
      {contents.map((content, index) => (
        <React.Fragment key={index}>
          {/* パネル - 動的な幅で表示 */}
          <div
            className="flex justify-center items-center overflow-hidden"
            style={{ width: `${widths[index]}%` }} // 計算された幅を適用
          >
            {/* パネルのコンテンツエリア (白背景、角丸、境界線) */}
            <div className="flex justify-center items-center w-full h-full border rounded-3xl bg-white">
              {content}
            </div>
          </div>

          {/* スプリッター (分割バー) - ドラッグ可能な部分 */}
          {/* 最後のパネルの後にはスプリッターを表示しない */}
          {index < contentsCount - 1 && (
            <div
              className="flex items-center justify-center flex-shrink-0 cursor-col-resize"
              style={{ width: splitterWidth + 8 }} // 左右の余白を確保
              onMouseDown={() => handleMouseDown(index)} // マウスダウンでドラッグ開始
            >
              {/* スプリッターの視覚的なバー */}
              <div
                className={`w-1 rounded-full transition-all duration-300 ease-in-out ${
                  isDragging && dragIndex === index
                    ? "bg-blue-400 h-16"
                    : "bg-gray-400 h-12 hover:bg-blue-300 hover:h-16"
                }`}
              />
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

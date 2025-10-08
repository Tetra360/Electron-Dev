import React, { useCallback, useEffect, useRef, useState } from "react";

type SplitterProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  /** 左パネルの初期幅（%指定、デフォルト50） */
  initialLeftWidth?: number;
  /** 左パネルの最小幅（%指定、デフォルト10） */
  minLeftWidth?: number;
  /** 左パネルの最大幅（%指定、デフォルト90） */
  maxLeftWidth?: number;
  /** スプリッターの太さ(px、デフォルト8px） */
  splitterWidth?: number;
  /** 幅が変更されたときに呼ばれるコールバック */
  onResize?: (leftWidth: number) => void;
  /** コンテナのクラスを外部指定 */
  className?: string;
};

/**
 * 汎用 Splitter コンポーネント
 * 左右に分割し、ドラッグでサイズを変更できる
 */
export default function Splitter({
  leftContent,
  rightContent,
  initialLeftWidth = 50,
  minLeftWidth = 10,
  maxLeftWidth = 90,
  splitterWidth = 8,
  onResize,
  className = "",
}: SplitterProps) {
  const [leftWidth, setLeftWidth] = useState(initialLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
      setLeftWidth(clamped);
      onResize?.(clamped);
    },
    [isDragging, minLeftWidth, maxLeftWidth, onResize]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div ref={containerRef} className={`flex w-full h-full overflow-hidden ${className}`}>
      {/* 左パネル */}
      <div
        className="flex justify-center items-center overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        <div className="flex justify-center items-center w-full h-full border rounded-3xl bg-white">
          {leftContent}
        </div>
      </div>

      {/* スプリッター */}
      <div
        className="flex items-center justify-center flex-shrink-0 cursor-col-resize"
        style={{ width: splitterWidth + 8 /* 左右の余白を確保 */ }}
        onMouseDown={handleMouseDown}
      >
        <div
          className={`w-1 h-16 rounded-full transition-colors ${
            isDragging ? "bg-blue-400" : "bg-gray-400 hover:bg-blue-300"
          }`}
        />
      </div>

      {/* 右パネル */}
      <div
        className="flex justify-center items-center overflow-hidden"
        style={{ width: `${100 - leftWidth}%` }}
      >
        <div className="flex justify-center items-center w-full h-full border rounded-3xl bg-white">
          {rightContent}
        </div>
      </div>
    </div>
  );
}

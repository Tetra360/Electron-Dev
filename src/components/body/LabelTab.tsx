import { Button } from "@/components/ui/button";

/**
 * 基本的なラベルコンポーネント
 */
function BasicLabel() {
  return (
    <div className="flex items-center justify-center w-36 p-1 border-2 rounded-full">
      <label>Label</label>
    </div>
  );
}

/**
 * スタイル付きラベルコンポーネント
 */
function StyledLabel() {
  return (
    <label className="flex items-center justify-center w-36 font-bold bg-gray-500 rounded-sm">
      Label
    </label>
  );
}

/**
 * ラベルとボタンの組み合わせコンポーネント
 */
function LabelWithButton() {
  return (
    <div className="grid grid-cols-2 items-center gap-2">
      <StyledLabel />
      <Button variant="outline">Button</Button>
    </div>
  );
}

/**
 * ラベルタブのメインコンポーネント
 */
export default function LabelTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      <BasicLabel />
      <LabelWithButton />
    </div>
  );
}

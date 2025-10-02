import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

/**
 * 基本的な入力フィールドコンポーネント
 */
function BasicInput() {
  return <Input placeholder="テキストを入力" />;
}

/**
 * クリアボタン付き入力フィールドコンポーネント
 */
function ClearableInput() {
  return <Input placeholder="テキストを入力後にクリアボタンが表示されます" variant="clearable" />;
}

/**
 * スイッチ制御付き入力フィールドコンポーネント
 */
function SwitchControlledInput() {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="flex items-center gap-2 whitespace-nowrap">
      <span>編集不可</span>
      <Switch
        checked={isDisabled}
        onCheckedChange={setIsDisabled}
        className="h-6 data-[state=checked]:bg-[var(--theme-color)]"
      />
      <Input placeholder="スイッチがオンの時編集不可" disabled={isDisabled} />
    </div>
  );
}

/**
 * 入力タブのメインコンポーネント
 */
export default function InputTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      <BasicInput />
      <ClearableInput />
      <SwitchControlledInput />
    </div>
  );
}

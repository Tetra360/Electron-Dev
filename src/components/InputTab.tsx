import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const InputTab = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <Input placeholder="テキストを入力" />
      <Input placeholder="テキストを入力後にクリアボタンが表示されます" variant="clearable" />
      <div className="flex items-center gap-2 whitespace-nowrap">
        <span>編集不可</span>
        <Switch
          checked={isDisabled}
          onCheckedChange={setIsDisabled}
          className="h-6 w-12 data-[state=checked]:bg-[var(--theme-color)]"
        />
        <Input placeholder="スイッチがオンの時編集不可" disabled={isDisabled} />
      </div>
    </div>
  );
};

export default InputTab;

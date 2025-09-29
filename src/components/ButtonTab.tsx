import { Button } from "@/components/ui/button";
import { useState } from "react";

const ButtonTab = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <Button className="px-8 py-4 text-lg">Click me</Button>
      <Button onClick={() => setOpen(true)} className="px-8 py-4 text-lg text-white">
        ポップアップ表示
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[300px] flex flex-col items-center">
            <div className="mb-4 text-lg">ポップアップウィンドウです</div>
            <Button onClick={() => setOpen(false)} className="mt-2">
              閉じる
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonTab;

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
const ButtonTab = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col items-center gap-6">
      <Button className="px-8 py-4 text-lg bg-[var(--theme-color)] hover:bg-[var(--theme-color-hover)]">
        Click me
      </Button>
      <Button onClick={() => setOpen(true)} className="px-8 py-4 text-lg">
        ポップアップ表示
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8 min-w-[300px] flex flex-col items-center text-foreground">
            <div className="mb-4 text-lg">ポップアップウィンドウです</div>
            <Button onClick={() => setOpen(false)} className="mt-2">
              閉じる
            </Button>
          </div>
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button className="px-8 py-4 text-lg bg-[var(--theme-color)] hover:bg-[var(--theme-color-hover)]">
              hover
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>ライブラリに追加</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ButtonTab;

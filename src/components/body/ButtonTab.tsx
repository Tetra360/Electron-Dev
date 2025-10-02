import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * 基本的なボタンコンポーネント
 */
function BasicButton() {
  return (
    <Button className="px-8 py-4 text-lg" onClick={() => alert("Click me")}>
      Click me
    </Button>
  );
}

/**
 * ダイアログ付きボタンコンポーネント
 */
function DialogButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="px-8 py-4 text-lg">
          Open Dialog
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

/**
 * ツールチップ付きボタンコンポーネント
 */
function TooltipButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="theme" className="px-8 py-4 text-lg">
            hover
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>ライブラリに追加</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/**
 * ボタンタブのメインコンポーネント
 */
export default function ButtonTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      <BasicButton />
      <DialogButton />
      <TooltipButton />
    </div>
  );
}

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      style={
        {
          // スイッチの高さ
          "--switch-h": "1.5rem", // 任意に変更可 (例: h-6 = 1.5rem)
          // 幅は高さの2倍に設定（好みに応じて調整）
          "--switch-w": "calc(var(--switch-h) * 2)",
          // Thumb の直径は高さの90%に設定
          "--thumb-d": "calc(var(--switch-h) * 0.9)",
        } as React.CSSProperties
      }
      className={cn(
        "peer",
        "inline-flex [height:var(--switch-h)] [width:var(--switch-w)] shrink-0 items-center",
        "rounded-full border border-transparent shadow-xs transition-all outline-none",
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block [width:var(--thumb-d)] [height:var(--thumb-d)]",
          "rounded-full bg-white ring-0 transition-transform",
          "data-[state=checked]:translate-x-[calc(var(--switch-w)-var(--thumb-d))]",
          "data-[state=unchecked]:translate-x-0",
          "border border-neutral-300"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };

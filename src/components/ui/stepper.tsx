import { cn } from "@/lib/utils";
import * as React from "react";

type StepperProps = {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  className?: string;
  onChange?: (value: number) => void;
};

export function Stepper({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  className,
  onChange,
}: StepperProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (newValue: number) => {
    const clamped = Math.min(Math.max(newValue, min), max);
    setValue(clamped);
    onChange?.(clamped);
  };

  return (
    <div
      className={cn(
        "flex items-center rounded-md border border-input bg-background text-sm",
        "overflow-hidden w-32 h-9 dark:bg-input/30",
        className
      )}
    >
      {/* − ボタン */}
      <button
        type="button"
        className="flex h-full w-9 items-center justify-center border-r border-input hover:bg-accent disabled:opacity-50"
        onClick={() => handleChange(value - step)}
        disabled={value <= min}
      >
        −
      </button>

      {/* 数字部分 */}
      <div className="flex-1 text-center">{value}</div>

      {/* ＋ ボタン */}
      <button
        type="button"
        className="flex h-full w-9 items-center justify-center border-l border-input hover:bg-accent disabled:opacity-50"
        onClick={() => handleChange(value + step)}
        disabled={value >= max}
      >
        ＋
      </button>
    </div>
  );
}

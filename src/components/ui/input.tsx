import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import * as React from "react";

type InputProps = React.ComponentProps<"input"> & {
  variant?: "default" | "clearable";
};

function Input({ className, type, variant = "default", ...props }: InputProps) {
  const [internalValue, setInternalValue] = React.useState(props.value ?? "");
  const isControlled = props.value !== undefined;
  const value = isControlled ? props.value : internalValue;
  const showClear = variant === "clearable" && value && typeof value === "string" && value !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isControlled && props.onChange) {
      props.onChange(e);
    } else {
      setInternalValue(e.target.value);
      if (props.onChange) props.onChange(e);
    }
  };

  const handleClear = () => {
    if (isControlled && props.onChange) {
      const input = document.createElement("input");
      input.value = "";
      const event = Object.create(null);
      event.target = input;
      props.onChange(event as React.ChangeEvent<HTMLInputElement>);
    } else {
      setInternalValue("");
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          showClear ? "pr-10" : ""
        )}
        {...props}
        value={value}
        onChange={handleChange}
      />
      {showClear && (
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-200 hover:bg-gray-300 p-1"
          onClick={handleClear}
          aria-label="クリア"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}

export { Input };

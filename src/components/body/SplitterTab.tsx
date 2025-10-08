import Splitter from "@/components/ui/splitter";
import { useEffect } from "react";

export default function SplitterTab() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="w-screen h-[80vh] flex flex-col overflow-hidden bg-gray-100 p-8">
      <Splitter
        leftContent={<div className="text-4xl">左側パネル</div>}
        rightContent={<div className="text-4xl">右側パネル</div>}
        initialLeftWidth={40}
        onResize={(w) => console.log("現在の左幅:", w.toFixed(1) + "%")}
      />
    </div>
  );
}

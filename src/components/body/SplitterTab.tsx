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
        contents={[
          <div className="text-3xl">左パネル</div>,
          <div className="text-3xl">中央パネル</div>,
          <div className="text-3xl">右パネル</div>,
        ]}
        initialWidths={[30, 40, 30]}
        onResize={(w) => console.log("現在の幅:", w.map((x) => x.toFixed(1) + "%").join(", "))}
      />
    </div>
  );
}

import { Stepper } from "@/components/ui/stepper";

/**
 * ステッパーコンポーネント
 */
function StepperComponent() {
  return <Stepper min={0} max={10} step={1} defaultValue={5} className="w-xs" />;
}

/**
 * ステッパータブのメインコンポーネント
 */
export default function StepperTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      <StepperComponent />
    </div>
  );
}

import { Stepper } from "@/components/ui/stepper";

const StepperTab = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <Stepper min={0} max={10} step={1} defaultValue={5} className="w-xs" />
    </div>
  );
};

export default StepperTab;

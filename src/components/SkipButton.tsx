import { memo } from "react";

interface SkipButtonProps {
  handleSkip: () => void;
}

export const SkipButton = memo(function SkipButton({
  handleSkip,
}: SkipButtonProps) {
  return (
    <button
      className="mr-2 w-40 rounded border border-slate-400 bg-slate-200 p-2 text-slate-700 hover:text-slate-950"
      onClick={handleSkip}
    >
      Skip
    </button>
  );
});

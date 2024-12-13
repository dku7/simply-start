import { memo } from "react";
import { TimerStatusType } from "../types/types";

interface TimerButtonProps {
  status: TimerStatusType;
  handleClick: () => void;
}

export const TimerButton = memo(function TimerButton({
  status,
  handleClick,
}: TimerButtonProps) {
  const buttonCaptions: Record<TimerStatusType, string> = {
    "Not Started": "Start",
    Started: "Pause",
    Paused: "Resume",
  };

  return (
    <button
      onClick={handleClick}
      className="mr-2 w-40 rounded border border-slate-400 bg-slate-200 p-2 text-slate-700 hover:text-slate-950"
    >
      {buttonCaptions[status]}
    </button>
  );
});

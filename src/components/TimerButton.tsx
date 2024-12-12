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
      className="mr-2 w-40 rounded border bg-slate-800 p-2 text-slate-100"
    >
      {buttonCaptions[status]}
    </button>
  );
});

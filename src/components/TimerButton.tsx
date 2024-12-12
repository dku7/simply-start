import { memo } from "react";

interface TimerButtonProps {
  title: string;
  handleCountdown: () => void;
}

export const TimerButton = memo(function TimerButton({
  title,
  handleCountdown,
}: TimerButtonProps) {
  return (
    <button onClick={handleCountdown} className="mr-2 rounded border p-1">
      {title}
    </button>
  );
});

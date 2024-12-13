import { memo } from "react";
import { RiResetLeftFill } from "react-icons/ri";

interface ResetButtonProps {
  handleClick: () => void;
}

export const ResetSessionsButton = memo(function ResetSessionsButton({
  handleClick,
}: ResetButtonProps) {
  return (
    <button
      aria-label="Reset completed sessions"
      title="Reset completed sessions"
      onClick={handleClick}
    >
      <RiResetLeftFill size={20} />
    </button>
  );
});

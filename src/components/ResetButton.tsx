import { memo } from "react";
import { RiResetLeftFill } from "react-icons/ri";

interface ResetButtonProps {
  buttonTitle: string;
  iconOnly: boolean;
  handleClick: () => void;
}

export const ResetButton = memo(function ResetButton({
  buttonTitle,
  iconOnly,
  handleClick,
}: ResetButtonProps) {
  return (
    <button
      aria-label={buttonTitle}
      title={iconOnly ? buttonTitle : ""}
      onClick={handleClick}
      className={
        iconOnly
          ? ""
          : "mr-2 w-40 rounded border border-slate-400 bg-slate-200 p-2 text-slate-700 hover:text-slate-950"
      }
    >
      {iconOnly ? <RiResetLeftFill size={20} /> : buttonTitle}
    </button>
  );
});

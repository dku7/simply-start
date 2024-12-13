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
          : "mr-2 rounded border bg-slate-800 p-2 px-4 text-slate-100 hover:bg-slate-600 hover:text-slate-50"
      }
    >
      {iconOnly ? <RiResetLeftFill size={20} /> : buttonTitle}
    </button>
  );
});

import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { SettingsButtonType } from "../types/types";

interface IntervalSettingButtonProps {
  type: SettingsButtonType;
  handleClick: () => void;
}

export default function IntervalSettingButton({
  type,
  handleClick,
}: IntervalSettingButtonProps) {
  const buttonType =
    type === "Add" ? <CiSquarePlus size={32} /> : <CiSquareMinus size={32} />;

  return (
    <button onClick={handleClick} aria-label={type}>
      {buttonType}
    </button>
  );
}
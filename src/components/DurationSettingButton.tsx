import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { SettingsButtonType } from "../types/types";

interface DurationSettingButtonProps {
  type: SettingsButtonType;
  handleClick: () => void;
}

export default function DurationSettingButton({
  type,
  handleClick,
}: DurationSettingButtonProps) {
  const buttonType =
    type === "Add" ? <CiSquarePlus size={32} /> : <CiSquareMinus size={32} />;

  return (
    <button onClick={handleClick} aria-label={type}>
      {buttonType}
    </button>
  );
}

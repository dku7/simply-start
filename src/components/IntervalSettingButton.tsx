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
    <button className="m-0" onClick={handleClick}>
      {buttonType}
    </button>
  );
}

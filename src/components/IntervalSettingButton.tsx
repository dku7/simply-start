import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";

interface IntervalSettingButtonProps {
  type: string;
  handleClick: () => void;
}

export default function IntervalSettingButton({
  type,
  handleClick,
}: IntervalSettingButtonProps) {
  const buttonType =
    type === "add" ? (
      <CiSquarePlus size={32} />
    ) : type === "minus" ? (
      <CiSquareMinus size={32} />
    ) : null;

  return <button onClick={handleClick}>{buttonType}</button>;
}

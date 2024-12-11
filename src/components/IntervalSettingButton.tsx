interface IntervalSettingButtonProps {
  type: string;
  handleClick: () => void;
}
export default function IntervalSettingButton({
  type,
  handleClick,
}: IntervalSettingButtonProps) {
  return (
    <button className="mx-2 h-4 w-4 rounded border" onClick={handleClick}>
      {type === "add" ? "+" : "-"}
    </button>
  );
}

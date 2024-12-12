import { useEffect, useState } from "react";
import IntervalSettingButton from "./IntervalSettingButton";
import Time from "./Time";
import { IntervalType } from "../types/types";
import { getIntervalSeconds } from "../utils/utils";

interface IntervalSettingProps {
  type: IntervalType;
}

export default function IntervalSetting({ type }: IntervalSettingProps) {
  const [intervalSeconds, setIntervalSeconds] = useState<number>(0);

  useEffect(() => {
    setIntervalSeconds(getIntervalSeconds(type));
  }, [type]);

  const handleAddSeconds = () => {
    const seconds = intervalSeconds + 5;

    setIntervalSeconds(() => seconds);
    localStorage.setItem(type, seconds.toString());
  };

  const handleMinusSeconds = () => {
    const seconds = intervalSeconds - 5;

    setIntervalSeconds((current) => (current === 0 ? current : seconds));
    localStorage.setItem(type, seconds.toString());
  };

  return (
    <div>
      {type}: <Time seconds={intervalSeconds} />
      <IntervalSettingButton type={"Add"} handleClick={handleAddSeconds} />
      <IntervalSettingButton type={"Minus"} handleClick={handleMinusSeconds} />
    </div>
  );
}

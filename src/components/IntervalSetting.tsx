import { useEffect, useState } from "react";
import IntervalSettingButton from "./IntervalSettingButton";
import Time from "./Time";
import { IntervalType } from "../types/types";

interface IntervalSettingProps {
  type: IntervalType;
}

const defaultIntervals: Record<IntervalType, number> = {
  Work: 10,
  "Short Break": 5,
  "Long Break": 5,
};

export default function IntervalSetting({ type }: IntervalSettingProps) {
  const [intervalSeconds, setIntervalSeconds] = useState<number>(0);

  useEffect(() => {
    let savedSeconds = Number(localStorage.getItem(type));
    if (!savedSeconds) savedSeconds = defaultIntervals[type];

    setIntervalSeconds(savedSeconds);
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

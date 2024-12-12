import { useEffect, useState } from "react";
import IntervalSettingButton from "./IntervalSettingButton";

type IntervalType = "Work" | "Short Break" | "Long Break";

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
  const [intervalString, setIntervalString] = useState<string>("");

  useEffect(() => {
    let savedSeconds = Number(localStorage.getItem(type));
    if (!savedSeconds) savedSeconds = defaultIntervals[type];

    setIntervalSeconds(savedSeconds);
  }, [type]);

  useEffect(() => {
    const formatTime = (timePart: number): string =>
      timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

    const min = Math.floor(intervalSeconds / 60);
    const sec = intervalSeconds - min * 60;

    setIntervalString(formatTime(min) + ":" + formatTime(sec));
  }, [intervalSeconds]);

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
      {type}: {intervalString}
      <IntervalSettingButton type={"add"} handleClick={handleAddSeconds} />
      <IntervalSettingButton type={"minus"} handleClick={handleMinusSeconds} />
    </div>
  );
}

import { useEffect, useState } from "react";
import IntervalSettingButton from "./IntervalSettingButton";

interface IntervalSettingProps {
  type: string;
}

export default function IntervalSetting({ type }: IntervalSettingProps) {
  const [intervalSeconds, setIntervalSeconds] = useState<number>(0);
  const [intervalString, setIntervalString] = useState<string>("");

  useEffect(() => {
    switch (type) {
      case "Work":
        setIntervalSeconds(10);
        break;
      case "Short Break":
        setIntervalSeconds(5);
        break;
      case "Long Break":
        setIntervalSeconds(10);
        break;
    }
  }, [type]);

  useEffect(() => {
    const formatTime = (timePart: number): string =>
      timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

    const min = Math.floor(intervalSeconds / 60);
    const sec = intervalSeconds - min * 60;

    setIntervalString(formatTime(min) + ":" + formatTime(sec));
  }, [intervalSeconds]);

  const handleAddSeconds = () => {
    setIntervalSeconds((current) => current + 5);
  };
  const handleMinusSeconds = () => {
    setIntervalSeconds((current) => (current === 0 ? current : current - 5));
  };

  return (
    <div>
      {type}: {intervalString}
      <IntervalSettingButton type={"add"} handleClick={handleAddSeconds} />
      <IntervalSettingButton type={"minus"} handleClick={handleMinusSeconds} />
    </div>
  );
}

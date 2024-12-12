import { useState, useEffect } from "react";
import { TimePartsType } from "../types/types";

interface TimeProps {
  seconds: number;
}

export default function Time({ seconds }: TimeProps) {
  const [parts, setParts] = useState<TimePartsType>({ min: 0, sec: 0 });

  const formatTime = (part: number): string =>
    part < 10 ? `0${part.toString()}` : part.toString();

  useEffect(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;

    setParts({ min, sec });
  }, [seconds]);

  return (
    <>
      <span>{formatTime(parts.min)}</span>:<span>{formatTime(parts.sec)}</span>
    </>
  );
}

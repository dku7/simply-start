import { useState, useEffect } from "react";
import { TimePartsType } from "../types/types";

interface TimeProps {
  duration: number;
}

const initialTimeParts: TimePartsType = { min: 0, sec: 0 };
const formatTime = (part: number): string =>
  part < 10 ? `0${part.toString()}` : part.toString();

export default function Time({ duration }: TimeProps) {
  const [parts, setParts] = useState<TimePartsType>(initialTimeParts);

  useEffect(() => {
    const min = Math.floor(duration / 60);
    const sec = duration - min * 60;

    setParts({ min, sec });
  }, [duration]);

  return (
    <>
      <span>{formatTime(parts.min)}</span>:<span>{formatTime(parts.sec)}</span>
    </>
  );
}

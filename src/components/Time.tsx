import { useState, useEffect } from "react";

interface TimeProps {
  seconds: number;
}

export default function Time({ seconds }: TimeProps) {
  const [min, setMinutes] = useState<number>(0);
  const [sec, setSeconds] = useState<number>(0);

  const formatTime = (timePart: number): string =>
    timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

  useEffect(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - min * 60;

    setMinutes(min);
    setSeconds(sec);
  }, [seconds]);

  return (
    <>
      <span>{formatTime(min)}</span>:<span>{formatTime(sec)}</span>
    </>
  );
}

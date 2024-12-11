import { useState, useEffect } from "react";

interface CountdownProps {
  secondsLeft: number;
}

export default function Countdown({ secondsLeft }: CountdownProps) {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const formatTime = (timePart: number): string =>
    timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

  useEffect(() => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft - min * 60;

    setMinutes(min);
    setSeconds(sec);
  }, [secondsLeft]);

  return (
    <div className="text-8xl font-extrabold">
      <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
    </div>
  );
}

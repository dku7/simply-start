import { useState, useEffect } from "react";

interface CountdownProps {
  secondsLeft: number;
}

export default function Countdown({ secondsLeft }: CountdownProps) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const formatTime = (timePart: number) =>
    timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

  useEffect(() => {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft - min * 60;

    setMinutes(min);
    setSeconds(sec);
  }, [secondsLeft]);

  return (
    <p>
      <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
    </p>
  );
}

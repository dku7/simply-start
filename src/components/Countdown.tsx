import { useState, useEffect } from "react";

interface CountdownProps {
  secondsLeft: number;
}

export default function Countdown({ secondsLeft }: CountdownProps) {
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);

  const formatTime = (timePart: number) =>
    timePart < 10 ? `0${timePart.toString()}` : timePart.toString();

  useEffect(() => {
    const m = Math.floor(secondsLeft / 60);
    const s = secondsLeft - m * 60;

    setMin(m);
    setSec(s);
  }, [secondsLeft]);

  return (
    <p>
      <span>{formatTime(min)}</span>:<span>{formatTime(sec)}</span>
    </p>
  );
}

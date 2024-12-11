import { useState, useEffect, useRef } from "react";
import Countdown from "./Countdown";
import TimerButton from "./TimerButton";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const intervalRef = useRef(-1);

  const handleStartCountdown = () => {
    setCountdownStarted(true);
  };

  const handleStopCountdown = () => {
    setCountdownStarted(false);
  };

  useEffect(() => {
    if (countdownStarted) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((current) => current - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [countdownStarted]);

  useEffect(() => {
    if (!secondsLeft) {
      clearInterval(intervalRef.current);
    }
  }, [secondsLeft]);

  return (
    <>
      <Countdown secondsLeft={secondsLeft} />
      <TimerButton title={"Start"} handleCountdown={handleStartCountdown} />
      <TimerButton title={"Stop"} handleCountdown={handleStopCountdown} />
    </>
  );
}

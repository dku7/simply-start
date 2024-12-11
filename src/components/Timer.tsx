import { useState, useEffect, useRef } from "react";
import Countdown from "./Countdown";
import TimerButton from "./TimerButton";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [countdownStarted, setCountdownStarted] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<string>("Work");
  const [numberOfWorkSession, setNumberOfWorkSessions] = useState<number>(0);
  const intervalRef = useRef<number>(-1);

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
    if (!secondsLeft && countdownStarted) {
      clearInterval(intervalRef.current);
      setCountdownStarted(false);

      if (sessionType === "Work") {
        const updatedSessionCount = numberOfWorkSession + 1;
        setNumberOfWorkSessions(updatedSessionCount);

        if (updatedSessionCount % 4 === 0) {
          setSessionType("Long Break");
          setSecondsLeft(10);
        } else {
          setSessionType("Short Break");
          setSecondsLeft(5);
        }
      } else if (
        sessionType === "Long Break" ||
        sessionType === "Short Break"
      ) {
        setSessionType("Work");
        setSecondsLeft(10);
      }
    }
  }, [countdownStarted, numberOfWorkSession, secondsLeft, sessionType]);

  return (
    <>
      <header>
        <h2>{sessionType}</h2>
      </header>
      <Countdown secondsLeft={secondsLeft} />
      <TimerButton title={"Start"} handleCountdown={handleStartCountdown} />
      <TimerButton title={"Stop"} handleCountdown={handleStopCountdown} />
      <p>Completed sessions: {numberOfWorkSession}</p>
    </>
  );
}

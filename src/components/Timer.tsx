import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import Time from "./Time";
import TimerButton from "./TimerButton";
import defaultNotification from "../assets/default-notification.mp3";
import { IntervalType } from "../types/types";
import { getIntervalSeconds } from "../utils/utils";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [countdownStarted, setCountdownStarted] = useState<boolean>(false);
  const [intervalType, setIntervalType] = useState<IntervalType>("Work");
  const [numberOfWorkSession, setNumberOfWorkSessions] = useState<number>(0);
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(true);
  const [playNotification] = useSound(defaultNotification);
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

  const handleSoundsEnabled = () => {
    setSoundsEnabled((enabled) => !enabled);
  };

  useEffect(() => {
    if (!secondsLeft && countdownStarted) {
      clearInterval(intervalRef.current);
      setCountdownStarted(false);

      if (soundsEnabled) playNotification();

      if (intervalType === "Work") {
        const updatedSessionCount = numberOfWorkSession + 1;
        setNumberOfWorkSessions(updatedSessionCount);

        if (updatedSessionCount % 4 === 0) setIntervalType("Long Break");
        else setIntervalType("Short Break");
      } else setIntervalType("Work");
    }
  }, [
    countdownStarted,
    intervalType,
    numberOfWorkSession,
    playNotification,
    secondsLeft,
    soundsEnabled,
  ]);

  useEffect(() => {
    setSecondsLeft(getIntervalSeconds(intervalType));
  }, [intervalType]);

  return (
    <>
      <header>
        <h2 className="text-l font-bold">{intervalType}</h2>
      </header>
      <div className="text-8xl font-extrabold">
        <Time seconds={secondsLeft} />
      </div>
      <div className="my-4">
        <TimerButton title={"Start"} handleCountdown={handleStartCountdown} />
        <TimerButton title={"Stop"} handleCountdown={handleStopCountdown} />
      </div>
      <div className="mb-2">
        <input
          type="checkbox"
          name="enable-sounds"
          id="enable-sounds"
          checked={soundsEnabled}
          onChange={handleSoundsEnabled}
        />
        <label className="ml-2" htmlFor="enable-sounds">
          enable sounds
        </label>
      </div>
      <p>Completed sessions: {numberOfWorkSession}</p>
    </>
  );
}

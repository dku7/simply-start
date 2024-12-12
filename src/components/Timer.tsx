import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import Countdown from "./Countdown";
import TimerButton from "./TimerButton";
import defaultNotification from "../assets/default-notification.mp3";
import { getSetting } from "../utils/settings";

export default function Timer() {
  const [secondsLeft, setSecondsLeft] = useState<number>(10);
  const [countdownStarted, setCountdownStarted] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<string>("Work");
  const [numberOfWorkSession, setNumberOfWorkSessions] = useState<number>(0);
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(true);

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

  const [playNotification] = useSound(defaultNotification);
  const handleSoundsEnabled = () => {
    setSoundsEnabled((enabled) => !enabled);
  };

  useEffect(() => {
    if (!secondsLeft && countdownStarted) {
      clearInterval(intervalRef.current);
      setCountdownStarted(false);

      if (soundsEnabled) playNotification();

      if (sessionType === "Work") {
        const updatedSessionCount = numberOfWorkSession + 1;
        setNumberOfWorkSessions(updatedSessionCount);

        if (updatedSessionCount % 4 === 0) {
          setSessionType("Long Break");
          const nextSeconds = Number(localStorage.getItem("Long Break"));
          setSecondsLeft(nextSeconds);
        } else {
          setSessionType("Short Break");
          const nextSeconds = Number(localStorage.getItem("Short Break"));
          setSecondsLeft(nextSeconds);
        }
      } else if (
        sessionType === "Long Break" ||
        sessionType === "Short Break"
      ) {
        setSessionType("Work");
        const nextSeconds = Number(localStorage.getItem("Work"));
        setSecondsLeft(nextSeconds);
      }
    }
  }, [
    countdownStarted,
    numberOfWorkSession,
    playNotification,
    secondsLeft,
    sessionType,
    soundsEnabled,
  ]);

  return (
    <>
      <header>
        <h2 className="text-l font-bold">{sessionType}</h2>
      </header>
      <Countdown secondsLeft={secondsLeft} />
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

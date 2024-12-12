import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import useSound from "use-sound";
import Time from "./Time";
import { TimerButton } from "./TimerButton";
import defaultNotification from "../assets/default-notification.mp3";
import { IntervalType, TimerType } from "../types/types";
import { getIntervalSeconds } from "../utils/utils";
import { timerReducer } from "../reducers/timer-reducer";

const initialTimer: TimerType = {
  seconds: 0,
  started: false,
  intervalType: "Work",
  sessions: 0,
};

export default function Timer() {
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(true);
  const [playNotification] = useSound(defaultNotification);
  const intervalRef = useRef<number>(-1);

  const handleStart = useCallback(() => {
    dispatchTimer({ type: "START_TIMER" });
  }, []);

  const handleStop = useCallback(() => {
    dispatchTimer({ type: "STOP_TIMER" });
  }, []);

  useEffect(() => {
    if (timer.started) {
      intervalRef.current = setInterval(() => {
        dispatchTimer({ type: "COUNTDOWN" });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer]);

  const handleSoundsEnabled = () => {
    setSoundsEnabled((enabled) => !enabled);
  };

  useEffect(() => {
    if (!timer.seconds && timer.started) {
      let newIntervalType: IntervalType = timer.intervalType;

      clearInterval(intervalRef.current);
      dispatchTimer({ type: "STOP_TIMER" });

      if (soundsEnabled) playNotification();

      if (timer.intervalType === "Work") {
        const newSessions = timer.sessions + 1;
        dispatchTimer({ type: "UPDATE_SESSION_COUNT", payload: newSessions });

        if (newSessions % 4 === 0) newIntervalType = "Long Break";
        else newIntervalType = "Short Break";
      } else newIntervalType = "Work";

      dispatchTimer({ type: "SET_TYPE", payload: newIntervalType });
    }
  }, [playNotification, soundsEnabled, timer]);

  useEffect(() => {
    const seconds = getIntervalSeconds(timer.intervalType);
    dispatchTimer({ type: "SET_SECONDS", payload: seconds });
  }, [timer.intervalType]);

  return (
    <>
      <header>
        <h2 className="text-l font-bold">{timer.intervalType}</h2>
      </header>
      <div className="text-8xl font-extrabold">
        <Time seconds={timer.seconds} />
      </div>
      <div className="my-4">
        <TimerButton title={"Start"} handleCountdown={handleStart} />
        <TimerButton title={"Stop"} handleCountdown={handleStop} />
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
      <p>Completed sessions: {timer.sessions}</p>
    </>
  );
}

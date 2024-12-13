import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import useSound from "use-sound";
import Time from "./Time";
import { TimerButton } from "./TimerButton";
import defaultNotification from "../assets/default-notification.mp3";
import { IntervalType, TimerType } from "../types/types";
import {
  getStoredSessions,
  getIntervalSeconds,
  incrementStoredSessions,
  resetStoredSessions,
} from "../utils/utils";
import { timerReducer } from "../reducers/timer-reducer";
import { ResetButton } from "./ResetButton";

const initialTimer: TimerType = {
  seconds: 0,
  intervalType: "Focus",
  status: "Not Started",
};

export default function Timer() {
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  const [sessions, setSessions] = useState<number>(0);
  const [soundsEnabled, setSoundsEnabled] = useState<boolean>(true);
  const [playNotification] = useSound(defaultNotification);
  const intervalRef = useRef<number>(-1);

  const handleClick = useCallback(() => {
    if (timer.status === "Not Started") {
      const secondsToUse = getIntervalSeconds(timer.intervalType);
      dispatchTimer({ type: "SET_SECONDS", payload: secondsToUse });
    }

    dispatchTimer({ type: "TOGGLE_STATUS" });
  }, [timer.intervalType, timer.status]);

  const handleResetSessions = useCallback(() => {
    resetStoredSessions();
    setSessions(0);
  }, []);

  const handleSoundsEnabled = () => {
    setSoundsEnabled((enabled) => !enabled);
  };

  useEffect(() => {
    setSessions(getStoredSessions());
  }, []);

  // start countdown
  useEffect(() => {
    if (timer.status == "Started") {
      intervalRef.current = setInterval(() => {
        dispatchTimer({ type: "COUNTDOWN" });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [timer]);

  // detect countdown finished
  useEffect(() => {
    if (!timer.seconds && timer.status === "Started") {
      let newIntervalType: IntervalType = timer.intervalType;

      clearInterval(intervalRef.current);
      dispatchTimer({ type: "STOP_TIMER" });

      if (soundsEnabled) playNotification();

      if (timer.intervalType === "Focus") {
        const newSessions = incrementStoredSessions();
        setSessions(newSessions);

        if (newSessions % 4 === 0) newIntervalType = "Long Break";
        else newIntervalType = "Short Break";
      } else newIntervalType = "Focus";

      dispatchTimer({ type: "SET_TYPE", payload: newIntervalType });
    }
  }, [playNotification, soundsEnabled, timer]);

  // set new interval length when switch session types
  useEffect(() => {
    const seconds = getIntervalSeconds(timer.intervalType);
    dispatchTimer({ type: "SET_SECONDS", payload: seconds });
  }, [timer.intervalType]);

  return (
    <>
      <header>
        <h2 className="text-l font-bold">{timer.intervalType}</h2>
      </header>
      <div className="text-9xl font-extrabold">
        <Time seconds={timer.seconds} />
      </div>
      <div>
        <progress
          className="w-96 [&::-moz-progress-bar]:bg-slate-400 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-slate-400 [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-slate-800"
          max={getIntervalSeconds(timer.intervalType)}
          value={timer.seconds}
        />
      </div>
      <div className="my-4">
        <TimerButton status={timer.status} handleClick={handleClick} />
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
      <div className="flex items-center justify-center">
        <span className="mr-4">Completed sessions: {sessions}</span>
        <ResetButton
          buttonTitle={"Reset completed sessions"}
          iconOnly={true}
          handleClick={handleResetSessions}
        />
      </div>
    </>
  );
}

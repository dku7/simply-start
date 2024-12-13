import { useState, useEffect, useRef, useReducer, useCallback } from "react";
import useSound from "use-sound";
import Time from "./Time";
import { TimerButton } from "./TimerButton";
import gong from "../assets/gong.mp3";
import { SegmentType, TimerType } from "../types/types";
import {
  getStoredIntervals,
  getSegmentDuration,
  incrementStoredIntervals,
  resetStoredIntervals,
  getNotificationSettings,
} from "../utils/utils";
import { timerReducer } from "../reducers/timer-reducer";
import { ResetButton } from "./ResetButton";

const initialTimer: TimerType = {
  duration: 0,
  segmentType: "Focus",
  status: "Not Started",
};

export default function Timer() {
  const [timer, dispatchTimer] = useReducer(timerReducer, initialTimer);
  const [maxDuration, setMaxDuration] = useState<number>(0);
  const [intervalsCompleted, setIntervalsCompleted] = useState<number>(0);
  const [playNotification] = useSound(gong);
  const intervalRef = useRef<number>(-1);

  const handleClick = useCallback(() => {
    if (timer.status === "Not Started") {
      const duration = getSegmentDuration(timer.segmentType);

      setMaxDuration(duration);
      dispatchTimer({ type: "SET_DURATION", payload: duration });
    }

    dispatchTimer({ type: "TOGGLE_STATUS" });
  }, [timer.segmentType, timer.status]);

  const handleResetIntervals = useCallback(() => {
    resetStoredIntervals();
    setIntervalsCompleted(0);
  }, []);

  const setNewSegmentType = useCallback(() => {
    let newSegmentType: SegmentType = timer.segmentType;
    if (timer.segmentType === "Focus") {
      const newIntervals = incrementStoredIntervals();

      setIntervalsCompleted(newIntervals);

      if (newIntervals % 4 === 0) newSegmentType = "Long Break";
      else newSegmentType = "Short Break";
    } else newSegmentType = "Focus";

    dispatchTimer({ type: "SET_TYPE", payload: newSegmentType });
  }, [timer.segmentType]);

  useEffect(() => {
    setIntervalsCompleted(getStoredIntervals());
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
    if (!timer.duration && timer.status === "Started") {
      const notificationEnabled = getNotificationSettings();
      clearInterval(intervalRef.current);
      dispatchTimer({ type: "STOP_TIMER" });

      if (notificationEnabled) playNotification();

      setNewSegmentType();
    }
  }, [playNotification, setNewSegmentType, timer.duration, timer.status]);

  // set new interval length when switch types
  useEffect(() => {
    const duration = getSegmentDuration(timer.segmentType);

    setMaxDuration(duration);
    dispatchTimer({ type: "SET_DURATION", payload: duration });
  }, [timer.segmentType]);

  return (
    <>
      <header>
        <h2 className="text-xl font-bold">{timer.segmentType}</h2>
      </header>
      <div className="text-8xl font-extrabold text-slate-700 md:text-9xl">
        <Time duration={timer.duration} />
      </div>
      <div>
        <progress
          className="w-80 [&::-moz-progress-bar]:bg-slate-400 [&::-webkit-progress-bar]:rounded [&::-webkit-progress-bar]:bg-slate-400 [&::-webkit-progress-value]:rounded [&::-webkit-progress-value]:bg-slate-700"
          max={maxDuration}
          value={timer.duration}
        />
      </div>
      <div className="my-4">
        <TimerButton status={timer.status} handleClick={handleClick} />
      </div>
      <div className="flex items-center justify-center">
        <span className="mr-4">Completed intervals: {intervalsCompleted}</span>
        <ResetButton
          buttonTitle={"Reset completed intervals"}
          iconOnly={true}
          handleClick={handleResetIntervals}
        />
      </div>
    </>
  );
}

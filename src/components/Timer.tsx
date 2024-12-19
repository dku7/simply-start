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
} from "../services/api";
import { timerReducer } from "../reducers/timer-reducer";
import { ResetButton } from "./ResetButton";
import { SkipButton } from "./SkipButton";

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

  const handleTimer = useCallback(() => {
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

  const setNewSegmentType = useCallback(
    (incCompleted: boolean) => {
      let newSegmentType: SegmentType = timer.segmentType;
      if (timer.segmentType === "Focus") {
        const newIntervals = incrementStoredIntervals();

        if (incCompleted) setIntervalsCompleted(newIntervals);

        if (newIntervals % 4 === 0) newSegmentType = "Long Break";
        else newSegmentType = "Short Break";
      } else newSegmentType = "Focus";

      dispatchTimer({ type: "SET_TYPE", payload: newSegmentType });
    },
    [timer.segmentType],
  );

  const stopTimerAndChangeType = useCallback(() => {
    clearInterval(intervalRef.current);
    dispatchTimer({ type: "STOP_TIMER" });
  }, []);

  const playTimerAlert = useCallback(() => {
    const notificationEnabled = getNotificationSettings();

    if (notificationEnabled) playNotification();
  }, [playNotification]);

  const handleSkip = useCallback(() => {
    stopTimerAndChangeType();
    setNewSegmentType(false);
  }, [stopTimerAndChangeType, setNewSegmentType]);

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
      playTimerAlert();
      stopTimerAndChangeType();
      setNewSegmentType(true);
    }
  }, [
    playTimerAlert,
    timer.duration,
    timer.status,
    stopTimerAndChangeType,
    setNewSegmentType,
  ]);

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
        <TimerButton status={timer.status} handleTimer={handleTimer} />
        <SkipButton handleSkip={handleSkip} />
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

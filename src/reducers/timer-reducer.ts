import { IntervalType, TimerType } from "../types/types";

type Action =
  | { type: "START_TIMER" }
  | { type: "STOP_TIMER" }
  | { type: "SET_SECONDS"; payload: number }
  | { type: "SET_TYPE"; payload: IntervalType }
  | { type: "COUNTDOWN" }
  | { type: "UPDATE_SESSION_COUNT"; payload: number };

export function timerReducer(state: TimerType, action: Action): TimerType {
  console.log("reducing... action is: ", JSON.stringify(action));

  switch (action.type) {
    case "START_TIMER":
      return { ...state, started: true };
    case "STOP_TIMER":
      return { ...state, started: false };
    case "SET_SECONDS":
      return { ...state, seconds: action.payload };
    case "SET_TYPE":
      return { ...state, intervalType: action.payload };
    case "COUNTDOWN":
      return { ...state, seconds: state.seconds - 1 };
    case "UPDATE_SESSION_COUNT":
      return { ...state, sessions: action.payload };
    default:
      return { ...state };
  }
}

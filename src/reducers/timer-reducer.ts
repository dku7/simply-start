import { IntervalType, TimerType, TimerStatusType } from "../types/types";

type Action =
  | { type: "STOP_TIMER" }
  | { type: "SET_SECONDS"; payload: number }
  | { type: "SET_TYPE"; payload: IntervalType }
  | { type: "COUNTDOWN" }
  | { type: "TOGGLE_STATUS" };

const toggledStatuses: Record<TimerStatusType, TimerStatusType> = {
  "Not Started": "Started",
  Started: "Paused",
  Paused: "Started",
};

export function timerReducer(state: TimerType, action: Action): TimerType {
  switch (action.type) {
    case "STOP_TIMER":
      return { ...state, status: "Not Started" };
    case "SET_SECONDS":
      return { ...state, seconds: action.payload };
    case "SET_TYPE":
      return { ...state, intervalType: action.payload };
    case "COUNTDOWN":
      return { ...state, seconds: state.seconds - 1 };
    case "TOGGLE_STATUS":
      return { ...state, status: toggledStatuses[state.status] };
    default:
      return { ...state };
  }
}

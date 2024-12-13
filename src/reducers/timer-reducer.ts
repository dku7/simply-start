import { SegmentType, TimerType, TimerStatusType } from "../types/types";

type Action =
  | { type: "STOP_TIMER" }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_TYPE"; payload: SegmentType }
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
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_TYPE":
      return { ...state, segmentType: action.payload };
    case "COUNTDOWN":
      return { ...state, duration: state.duration - 1 };
    case "TOGGLE_STATUS":
      return { ...state, status: toggledStatuses[state.status] };
    default:
      return { ...state };
  }
}

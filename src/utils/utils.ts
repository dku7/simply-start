import { IntervalType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getIntervalSeconds(type: IntervalType): number {
  return Number(localStorage.getItem(type) ?? defaultIntervals[type]);
}

export function saveIntervalSeconds(type: IntervalType, seconds: number) {
  localStorage.setItem(type, seconds.toString());
}

export function getCompletedSessions(): number {
  return Number(localStorage.getItem("Sessions") ?? 0);
}

export function saveCompletedSessions(sessions: number) {
  localStorage.setItem("Sessions", sessions.toString());
}

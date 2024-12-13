import { IntervalType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getIntervalSeconds(type: IntervalType): number {
  return Number(localStorage.getItem(type) ?? defaultIntervals[type]);
}

export function saveIntervalSeconds(type: IntervalType, seconds: number) {
  localStorage.setItem(type, seconds.toString());
}

export function resetAllIntervalSeconds() {
  const allTypes: IntervalType[] = ["Focus", "Short Break", "Long Break"];

  for (const type of allTypes) {
    localStorage.removeItem(type);
    saveIntervalSeconds(type, defaultIntervals[type]);
  }
}

export function getStoredSessions(): number {
  return Number(localStorage.getItem("Sessions") ?? 0);
}

export function incrementStoredSessions(): number {
  const newSessions = getStoredSessions() + 1;

  localStorage.setItem("Sessions", newSessions.toString());

  return newSessions;
}

export function resetStoredSessions() {
  localStorage.removeItem("Sessions");
}

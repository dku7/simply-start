import { IntervalType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getIntervalSeconds(type: IntervalType): number {
  const seconds = Number(localStorage.getItem(type));

  return seconds ? seconds : defaultIntervals[type];
}

export function saveIntervalSeconds(type: IntervalType, seconds: number) {
  localStorage.setItem(type, seconds.toString());
}

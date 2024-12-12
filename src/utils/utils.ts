import { IntervalType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getIntervalSeconds(type: IntervalType): number {
  let seconds = Number(localStorage.getItem(type));

  if (!seconds) seconds = defaultIntervals[type];
  return seconds;
}

import { SegmentType, SettingsKeyType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getIntervalSeconds(type: SegmentType): number {
  return Number(localStorage.getItem(type) ?? defaultIntervals[type]);
}

export function saveIntervalSeconds(type: SegmentType, seconds: number) {
  localStorage.setItem(type, seconds.toString());
}

export function resetAllIntervalSeconds() {
  const allTypes: SegmentType[] = ["Focus", "Short Break", "Long Break"];

  for (const type of allTypes) {
    localStorage.removeItem(type);
    saveIntervalSeconds(type, defaultIntervals[type]);
  }
}

export function getStoredIntervals(): number {
  const key: SettingsKeyType = "Intervals";

  return Number(localStorage.getItem(key) ?? 0);
}

export function incrementStoredIntervals(): number {
  const newIntervals = getStoredIntervals() + 1;
  const key: SettingsKeyType = "Intervals";

  localStorage.setItem(key, newIntervals.toString());

  return newIntervals;
}

export function resetStoredIntervals() {
  const key: SettingsKeyType = "Intervals";

  localStorage.removeItem(key);
}

export function getNotificationSettings(): boolean {
  const key: SettingsKeyType = "Notifications";

  return (localStorage.getItem(key) ?? "true") === "true" ? true : false;
}

export function saveNotificationSettings(enabled: boolean) {
  const key: SettingsKeyType = "Notifications";

  localStorage.setItem(key, enabled.toString());
}

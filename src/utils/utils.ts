import { IntervalType, SettingsKeyType } from "../types/types";
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
  const key: SettingsKeyType = "Sessions";

  return Number(localStorage.getItem(key) ?? 0);
}

export function incrementStoredSessions(): number {
  const newSessions = getStoredSessions() + 1;
  const key: SettingsKeyType = "Sessions";

  localStorage.setItem(key, newSessions.toString());

  return newSessions;
}

export function resetStoredSessions() {
  const key: SettingsKeyType = "Sessions";

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

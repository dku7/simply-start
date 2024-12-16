import { SegmentType, SettingsKeyType } from "../types/types";
import { defaultIntervals } from "../constants/constants";

export function getSegmentDuration(type: SegmentType): number {
  return Number(localStorage.getItem(type) ?? defaultIntervals[type]);
}

export function saveSegmentDuration(type: SegmentType, duration: number) {
  localStorage.setItem(type, duration.toString());
}

export function resetAllSegmentDurations() {
  const allTypes: SegmentType[] = ["Focus", "Short Break", "Long Break"];

  for (const type of allTypes) {
    localStorage.removeItem(type);
    saveSegmentDuration(type, defaultIntervals[type]);
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

export function getIntention(): string {
  const key: SettingsKeyType = "Intention";

  return localStorage.getItem(key) ?? "";
}

export function saveIntention(intention: string) {
  const key: SettingsKeyType = "Intention";

  localStorage.setItem(key, intention);
}

export function removeIntention() {
  const key: SettingsKeyType = "Intention";

  localStorage.removeItem(key);
}

export function saveNotes(notes: string) {
  const key: SettingsKeyType = "Notes";
  localStorage.setItem(key, notes);
}

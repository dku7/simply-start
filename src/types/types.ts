export type IntervalType = "Work" | "Short Break" | "Long Break";
export type SettingsButtonType = "Add" | "Minus";

export interface TimePartsType {
  min: number;
  sec: number;
}

export interface TimerType {
  seconds: number;
  started: boolean;
  intervalType: IntervalType;
  sessions: number;
}

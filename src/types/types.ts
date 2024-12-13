export type SegmentType = "Focus" | "Short Break" | "Long Break";
export type SettingsKeyType = "Intervals" | "Notifications" | `${SegmentType}`;
export type SettingsButtonType = "Add" | "Minus";
export type TimerStatusType = "Not Started" | "Started" | "Paused";

export interface TimePartsType {
  min: number;
  sec: number;
}

export interface TimerType {
  duration: number;
  segmentType: SegmentType;
  status: TimerStatusType;
}

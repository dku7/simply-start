import { SegmentType } from "../types/types";

export const defaultIntervals: Record<SegmentType, number> = {
  Focus: 1500,
  "Short Break": 300,
  "Long Break": 900,
};

export const defaultIntervalChange = 300;

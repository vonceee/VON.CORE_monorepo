export type TrackerType = "counter" | "outcome";

export interface TrackerConfig {
  id: string;
  label: string;
  type: TrackerType;
  goal?: number; // for counter
  icon?: string; // e.g. "Droplets", "Gamepad2"
}

export type GameOutcome = "WIN" | "LOSS" | null;

export interface TrackerValue {
  amount: number | string | null;
  note?: string | null;
}

export interface DailyValues {
  [key: string]: TrackerValue; // id -> value object
}

// Map: DateString -> DailyValues
export type HistoryState = Record<string, DailyValues>;

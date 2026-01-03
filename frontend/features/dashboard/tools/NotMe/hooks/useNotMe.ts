import { useState, useEffect, useCallback } from "react";

export type TrackerType = "counter" | "outcome";

export interface TrackerConfig {
  id: string;
  label: string;
  type: TrackerType;
  goal?: number; // for counter
  icon?: string; // e.g. "Droplets", "Gamepad2" - strictly strings for serialization, we'll map to components in UI
}

export type GameOutcome = "WIN" | "LOSS" | null;

export interface DailyValues {
  [key: string]: any; // id -> value
}

// Map: DateString -> DailyValues
export type HistoryState = Record<string, DailyValues>;

const TODAY = new Date().toDateString();

const DEFAULT_CONFIG: TrackerConfig[] = [
  {
    id: "hydration",
    label: "Hydration",
    type: "counter",
    goal: 8,
    icon: "Droplets",
  },
  {
    id: "mobile_legends",
    label: "Mobile Legends",
    type: "outcome",
    icon: "Gamepad2",
  },
  { id: "chess", label: "Chess", type: "outcome", icon: "Swords" },
];

const STORAGE_KEY_CONFIG = "not-me-config";
const STORAGE_KEY_STATE = "not-me-daily-state-v2";
const EVENT_UPDATE = "not-me-update";

export const useNotMe = (dateOverride?: string) => {
  const [config, setConfig] = useState<TrackerConfig[]>([]);
  const [history, setHistory] = useState<HistoryState>({});
  const [internalDate, setInternalDate] = useState<string>(TODAY);

  const activeDate = dateOverride || internalDate;
  const setActiveDate = setInternalDate;

  // Helper to load EVERYTHING
  const loadAll = useCallback(() => {
    // 1. Config
    const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (savedConfig) {
      setConfig(JSON.parse(savedConfig));
    } else {
      setConfig(DEFAULT_CONFIG);
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_CONFIG));
    }

    // 2. State
    const savedState = localStorage.getItem(STORAGE_KEY_STATE);

    if (savedState) {
      const parsed = JSON.parse(savedState);

      // Migration Check: Old format had "date" and "values" at top level
      if (parsed.date && parsed.values) {
        // Old format detected -> Migrate to History
        const initialHistory: HistoryState = {
          [parsed.date]: parsed.values,
        };
        setHistory(initialHistory);
        // We'll save the new format on next update, or we could force save here.
        // Let's just set it in state for now.
      } else {
        // Assume it's the new HistoryState format
        setHistory(parsed);
      }
    } else {
      setHistory({});
    }
  }, []);

  // Initial Load & Event Listener
  useEffect(() => {
    loadAll();

    const handleUpdate = () => loadAll();
    window.addEventListener(EVENT_UPDATE, handleUpdate);
    return () => window.removeEventListener(EVENT_UPDATE, handleUpdate);
  }, [loadAll]);

  // Persist State
  const saveHistory = (newHistory: HistoryState) => {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(newHistory));
    setHistory(newHistory);
    window.dispatchEvent(new Event(EVENT_UPDATE));
  };

  // Persist Config
  const saveConfig = (newConfig: TrackerConfig[]) => {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(newConfig));
    setConfig(newConfig);
    window.dispatchEvent(new Event(EVENT_UPDATE));
  };

  // --- Actions ---

  const listItems = config;

  const addItem = (item: TrackerConfig) => {
    const newConfig = [...config, item];
    saveConfig(newConfig);
  };

  const removeItem = (id: string) => {
    const newConfig = config.filter((item) => item.id !== id);
    saveConfig(newConfig);

    // cleanup state (optional, but good for hygiene)
    // For history, we might want to keep old data even if habit is removed?
    // Let's keep it simple and NOT delete data for now to preserve history.
    // const newValues = { ...dailyState.values };
    // delete newValues[id];
    // saveState({ ...dailyState, values: newValues });
  };

  const updateValue = (id: string, value: any) => {
    const currentDayValues = history[activeDate] || {};
    const newDayValues = { ...currentDayValues, [id]: value };

    // Merge into history
    const newHistory = { ...history, [activeDate]: newDayValues };
    saveHistory(newHistory);
  };

  const getValue = (id: string) => {
    return history[activeDate]?.[id];
  };

  const getHistoryValue = (date: string, id: string) => {
    return history[date]?.[id];
  };

  return {
    listItems,
    addItem,
    removeItem,
    updateValue,
    getValue,
    getHistoryValue,
    activeDate,
    setActiveDate,
    history,
  };
};

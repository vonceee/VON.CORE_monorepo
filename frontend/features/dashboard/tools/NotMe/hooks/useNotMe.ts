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

export interface DailyState {
  date: string;
  values: Record<string, any>; // id -> value (number for counter, GameOutcome for outcome)
}

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

export const useNotMe = () => {
  const [config, setConfig] = useState<TrackerConfig[]>([]);
  const [dailyState, setDailyState] = useState<DailyState>({
    date: new Date().toDateString(),
    values: {},
  });

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
    const today = new Date().toDateString();
    const savedState = localStorage.getItem(STORAGE_KEY_STATE);

    if (savedState) {
      const parsed: DailyState = JSON.parse(savedState);
      if (parsed.date !== today) {
        // Reset for new day
        setDailyState({ date: today, values: {} });
      } else {
        setDailyState(parsed);
      }
    } else {
      setDailyState({ date: today, values: {} });
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
  const saveState = (newState: DailyState) => {
    localStorage.setItem(STORAGE_KEY_STATE, JSON.stringify(newState));
    setDailyState(newState);
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
    const newValues = { ...dailyState.values };
    delete newValues[id];
    saveState({ ...dailyState, values: newValues });
  };

  const updateValue = (id: string, value: any) => {
    const newValues = { ...dailyState.values, [id]: value };
    saveState({ ...dailyState, values: newValues });
  };

  const getValue = (id: string) => dailyState.values[id];

  return {
    listItems,
    addItem,
    removeItem,
    updateValue,
    getValue,
  };
};

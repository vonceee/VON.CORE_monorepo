import { useState, useEffect, useCallback } from "react";
import { trackerApi } from "../../../../../services/api/tracker";
import { TrackerConfig, HistoryState } from "../types";

export * from "../types";

export const useNotMe = (dateOverride?: string) => {
  const [listItems, setListItems] = useState<TrackerConfig[]>([]);
  const [history, setHistory] = useState<HistoryState>({});
  const [internalDate, setInternalDate] = useState<string>(
    new Date().toDateString()
  );

  const activeDate = dateOverride || internalDate;
  const setActiveDate = setInternalDate;

  const fetchData = useCallback(async () => {
    try {
      const [trackers, hist] = await Promise.all([
        trackerApi.fetchTrackers(),
        trackerApi.fetchHistory(),
      ]);
      setListItems(trackers);
      setHistory(hist);
    } catch (e) {
      console.error("Failed to fetch NotMe data", e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateValue = async (id: string, value: any) => {
    // Optimistic Update
    const currentDayValues = history[activeDate] || {};
    const newDayValues = { ...currentDayValues, [id]: value };
    const newHistory = { ...history, [activeDate]: newDayValues };
    setHistory(newHistory);

    try {
      await trackerApi.updateValue(activeDate, id, value);
    } catch (e) {
      console.error("Failed to save value", e);
      // Revert/Sync on error
      fetchData();
    }
  };

  const getValue = (id: string) => {
    return history[activeDate]?.[id];
  };

  const getHistoryValue = (date: string, id: string) => {
    return history[date]?.[id];
  };

  return {
    listItems,
    addItem: () => {}, // Managed via DB/Admin
    removeItem: () => {}, // Managed via DB/Admin
    updateValue,
    getValue,
    getHistoryValue,
    activeDate,
    setActiveDate,
    history,
    refresh: fetchData,
  };
};

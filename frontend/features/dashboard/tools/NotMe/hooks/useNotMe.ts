import { useState, useEffect, useCallback } from "react";
import { trackerApi } from "../../../../../services/api/tracker";
import { TrackerConfig, HistoryState, TrackerValue } from "../types";

export * from "../types";

// Helper for YYYY-MM-DD
const getISODate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const useNotMe = (dateOverride?: string) => {
  const [listItems, setListItems] = useState<TrackerConfig[]>([]);
  const [history, setHistory] = useState<HistoryState>({});
  const [internalDate, setInternalDate] = useState<string>(getISODate());

  const activeDate = dateOverride || internalDate;
  const setActiveDate = setInternalDate;

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [trackers, hist] = await Promise.all([
        trackerApi.fetchTrackers(),
        trackerApi.fetchHistory(),
      ]);
      setListItems(trackers);
      setHistory(hist);
    } catch (e) {
      console.error("Failed to fetch NotMe data", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateValue = async (id: string, updates: Partial<TrackerValue>) => {
    // Optimistic Update
    const currentDayValues = history[activeDate] || {};
    const existingValue = currentDayValues[id] || { amount: null, note: null };

    // Merge updates
    const newValue: TrackerValue = {
      ...existingValue,
      ...updates,
      // Ensure amount is null if not provided and not in existing, defaulting to existing or null
      amount:
        updates.amount !== undefined ? updates.amount : existingValue.amount,
      note: updates.note !== undefined ? updates.note : existingValue.note,
    };

    const newDayValues = { ...currentDayValues, [id]: newValue };
    const newHistory = { ...history, [activeDate]: newDayValues };
    setHistory(newHistory);

    try {
      await trackerApi.updateValue(activeDate, id, newValue);
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
    addItem: async (item: Partial<TrackerConfig>) => {
      try {
        const newItem = await trackerApi.addTracker(item);
        setListItems([...listItems, newItem]);
      } catch (e) {
        console.error("Failed to add item", e);
      }
    },
    removeItem: async (id: string) => {
      // Optimistic update
      setListItems(listItems.filter((i) => i.id !== id));
      try {
        await trackerApi.deleteTracker(id);
      } catch (e) {
        console.error("Failed to delete item", e);
        // Revert on failure
        fetchData();
      }
    },
    updateValue,
    getValue,
    getHistoryValue,
    activeDate,
    setActiveDate,
    history,
    refresh: fetchData,
    isLoading,
  };
};

import { useState, useEffect, useMemo, useCallback } from "react";
import { Task, TaskStatus, DailyRoutines, DayOfWeek } from "../types";

export const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Calibration",
    description: "Systems check and focus initialization.",
    startTime: "08:00",
    durationMinutes: 30,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Water", "No Screens"],
  },
  {
    id: "2",
    title: "Deep Work A",
    description: "High-leverage engineering or research.",
    startTime: "08:30",
    durationMinutes: 120,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Phone locked"],
  },
  {
    id: "3",
    title: "Recovery",
    description: "Biological replenishment.",
    startTime: "10:30",
    durationMinutes: 15,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: ["Stretch"],
  },
];

export const INITIAL_ROUTINES: DailyRoutines = {
  Monday: [...DEFAULT_TASKS],
  Tuesday: [...DEFAULT_TASKS],
  Wednesday: [...DEFAULT_TASKS],
  Thursday: [...DEFAULT_TASKS],
  Friday: [...DEFAULT_TASKS],
  Saturday: [...DEFAULT_TASKS],
  Sunday: [...DEFAULT_TASKS],
};

export const DAYS: DayOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const useSchedule = () => {
  // --- State ---
  const [routines, setRoutines] = useState<DailyRoutines>(() => {
    const saved = localStorage.getItem("life_router_routines");
    return saved ? JSON.parse(saved) : INITIAL_ROUTINES;
  });

  const [currentDay, setCurrentDay] = useState<DayOfWeek>(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  // --- Effects ---

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Window Event Listener for Synchronization
  useEffect(() => {
    const handleScheduleUpdate = () => {
      const saved = localStorage.getItem("life_router_routines");
      if (saved) {
        setRoutines(JSON.parse(saved));
      }
    };

    window.addEventListener("schedule-update", handleScheduleUpdate);
    return () => {
      window.removeEventListener("schedule-update", handleScheduleUpdate);
    };
  }, []);

  // --- Computed ---

  const currentDayTasks = useMemo(
    () => routines[currentDay],
    [routines, currentDay]
  );

  // --- Actions ---

  const saveDayRoutine = useCallback(
    (newTasks: Task[]) => {
      const updatedRoutines = { ...routines, [currentDay]: newTasks };

      // Update state
      setRoutines(updatedRoutines);

      // Update storage
      localStorage.setItem(
        "life_router_routines",
        JSON.stringify(updatedRoutines)
      );

      // Notify other components
      window.dispatchEvent(new Event("schedule-update"));
    },
    [routines, currentDay]
  );

  return {
    routines,
    currentDay,
    setCurrentDay,
    currentTime,
    saveDayRoutine,
    currentDayTasks,
    DEFAULT_TASKS,
    INITIAL_ROUTINES,
    DAYS,
  };
};

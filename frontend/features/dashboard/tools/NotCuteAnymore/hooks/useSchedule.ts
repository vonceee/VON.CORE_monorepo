import { useState, useEffect, useMemo, useCallback } from "react";
import { Task, TaskStatus, DailyRoutines, DayOfWeek } from "../types";
import { routineApi } from "../../../../../services/api/routine";

export const DEFAULT_TASKS: Task[] = [
  {
    id: "1",
    title: "Welcome to NCA",
    notes: "This is your daily execution queue. Click 'Edit Routine' to begin.",
    startTime: "09:00",
    durationMinutes: 1440,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: [],
  },
  {
    id: "2",
    title: "Customize Your Schedule",
    notes: "Tasks here update in real-time based on your system clock.",
    startTime: "11:58",
    durationMinutes: 60,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: [],
  },
  {
    id: "3",
    title: "Plan Your Week",
    notes:
      "Use the day selector above to switch views and copy routines between days.",
    startTime: "11:59",
    durationMinutes: 30,
    status: TaskStatus.PENDING,
    dependencies: [],
    requirements: [],
  },
];

const createDefaults = () => JSON.parse(JSON.stringify(DEFAULT_TASKS));

export const INITIAL_ROUTINES: DailyRoutines = {
  Monday: createDefaults(),
  Tuesday: createDefaults(),
  Wednesday: createDefaults(),
  Thursday: createDefaults(),
  Friday: createDefaults(),
  Saturday: createDefaults(),
  Sunday: createDefaults(),
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
  const [routines, setRoutines] = useState<DailyRoutines>(INITIAL_ROUTINES);
  const [isLoading, setIsLoading] = useState(true);

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

  // Fetch Routines on Mount
  useEffect(() => {
    const loadRoutines = async () => {
      try {
        const data = await routineApi.fetchRoutines();

        // Check if the fetched data effectively has no tasks
        const hasData = Object.values(data).some((tasks) => tasks.length > 0);

        if (hasData) {
          setRoutines(data);
        } else {
          // If no data, we keep the INITIAL_ROUTINES which contains the onboarding info.
          // No action needed effectively, but explicit comment helps.
          console.log("No remote data found, using onboarding defaults.");
        }
      } catch (error) {
        console.error("Failed to load routines:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRoutines();
  }, []);

  // Window Event Listener for Synchronization (Frontend-only sync, maybe deprecated if API is truth)
  // Keeping it for now if we want optimistic UI updates across components
  useEffect(() => {
    const handleScheduleUpdate = async () => {
      try {
        const data = await routineApi.fetchRoutines();
        setRoutines(data);
      } catch (error) {
        console.error("Failed to sync routines:", error);
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
    async (newTasks: Task[]) => {
      // NCA-001: Isolation & Cloning
      // Ensure we are only touching the `currentDay` and deep cloning tasks to prevent ref leakage
      const tasksToSave = JSON.parse(JSON.stringify(newTasks));

      try {
        // Optimistic Update
        setRoutines((prev) => ({
          ...prev,
          [currentDay]: tasksToSave,
        }));

        // Persist to Backend
        await routineApi.saveRoutine(currentDay, tasksToSave);

        // Notify other components
        // window.dispatchEvent(new Event("schedule-update"));

        // Re-fetch to normalize IDs if backend generated them (optional, but good practice)
        // const refreshed = await routineApi.fetchRoutines();
        // setRoutines(refreshed);
      } catch (error) {
        console.error("Failed to save routine:", error);
        // Revert optimistic update?
        // For MVP, we might just log error.
      }
    },
    [routines, currentDay]
  );

  const copyRoutineToDays = useCallback(
    async (sourceTasks: Task[], targetDays: DayOfWeek[]) => {
      // NCA-002: Batch Copy
      const tasksToSave = JSON.parse(JSON.stringify(sourceTasks));

      try {
        // Optimistic Update for all targets
        setRoutines((prev) => {
          const newRoutines = { ...prev };
          targetDays.forEach((day) => {
            newRoutines[day] = JSON.parse(JSON.stringify(tasksToSave));
          });
          return newRoutines;
        });

        // Backend persistence (parallel requests)
        // Note: For large batches/users, a batch API endpoint would be better,
        // but for <10 items x 7 days, parallel requests are acceptable for MVP.
        await Promise.all(
          targetDays.map((day) => routineApi.saveRoutine(day, tasksToSave))
        );

        window.dispatchEvent(new Event("schedule-update"));
      } catch (error) {
        console.error("Failed to copy routine:", error);
        // In a real app, we'd revert or show a toast
      }
    },
    []
  );

  return {
    routines,
    currentDay,
    setCurrentDay,
    currentTime,
    isLoading,
    saveDayRoutine,
    copyRoutineToDays,
    currentDayTasks,
    DEFAULT_TASKS,
    INITIAL_ROUTINES,
    DAYS,
  };
};

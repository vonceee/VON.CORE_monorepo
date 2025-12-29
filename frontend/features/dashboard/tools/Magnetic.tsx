import React, { useState, useEffect } from "react";
import { Task } from "../../../types";

const STORAGE_KEY = "vh_magnetic_tasks";

const INITIAL_TASKS: Task[] = [
  { id: "1", text: "Refactor intersection observer logic", completed: false },
  { id: "2", text: "Update metadata for SEO", completed: true },
  { id: "3", text: "Design terminal icons", completed: false },
];

const getTasks = (): Task[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
};

const useMagneticTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(getTasks);

  useEffect(() => {
    const handleStorageChange = () => {
      setTasks(getTasks());
    };
    // Listen for custom event for same-tab sync
    window.addEventListener("magnetic-update", handleStorageChange);
    return () => {
      window.removeEventListener("magnetic-update", handleStorageChange);
    };
  }, []);

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    window.dispatchEvent(new Event("magnetic-update"));
  };

  const toggleTask = (id: string) => {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    updateTasks(newTasks);
  };

  return { tasks, toggleTask };
};

export const Magnetic: React.FC = () => {
  const { tasks, toggleTask } = useMagneticTasks();

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Magnetic / Task Management
      </h1>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center p-3 bg-[#252526] hover:bg-[#2a2d2e] rounded border border-white/5 group cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            <div
              className={`w-5 h-5 rounded border-2 mr-4 flex items-center justify-center transition-colors ${
                task.completed
                  ? "bg-orange-500 border-orange-500"
                  : "border-[#444444]"
              }`}
            >
              {task.completed && (
                <span className="text-black font-bold">✓</span>
              )}
            </div>
            <span
              className={`${
                task.completed
                  ? "line-through text-neutral-600"
                  : "text-[#cccccc]"
              }`}
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const MagneticSidebar: React.FC = () => {
  const { tasks } = useMagneticTasks();
  return (
    <>
      {tasks.map((t) => (
        <div
          key={t.id}
          className="p-1 px-6 text-xs text-[#858585] hover:text-white truncate"
        >
          {t.completed ? "✓ " : "○ "} {t.text}
        </div>
      ))}
    </>
  );
};

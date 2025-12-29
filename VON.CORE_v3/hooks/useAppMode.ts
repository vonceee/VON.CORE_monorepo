import { useState, useEffect } from "react";
import { AppMode } from "../types";

export const useAppMode = () => {
  const [mode, setMode] = useState<AppMode>(
    () => (localStorage.getItem("vcore_mode") as AppMode) || "public"
  );

  useEffect(() => {
    localStorage.setItem("vcore_mode", mode);
  }, [mode]);

  return { mode, setMode };
};

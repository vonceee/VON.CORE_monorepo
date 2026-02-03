import { useState, useEffect } from "react";
import { AppMode } from "../types";

export const useAppMode = () => {
  const [mode, setMode] = useState<AppMode>(() => {
    const params = new URLSearchParams(window.location.search);
    const urlMode = params.get("mode") as AppMode;
    return (
      urlMode || (localStorage.getItem("vcore_mode") as AppMode) || "public"
    );
  });

  useEffect(() => {
    localStorage.setItem("vcore_mode", mode);
  }, [mode]);

  return { mode, setMode };
};

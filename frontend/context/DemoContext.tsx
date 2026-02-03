import React, { createContext, useContext, useState, ReactNode } from "react";
import { ToolId } from "../types";

interface DemoContextType {
  activeDemoId: ToolId | null;
  openDemo: (id: ToolId) => void;
  closeDemo: () => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeDemoId, setActiveDemoId] = useState<ToolId | null>(null);

  const openDemo = (id: ToolId) => setActiveDemoId(id);
  const closeDemo = () => setActiveDemoId(null);

  return (
    <DemoContext.Provider value={{ activeDemoId, openDemo, closeDemo }}>
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within a DemoProvider");
  return context;
};

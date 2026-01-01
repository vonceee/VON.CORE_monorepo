import React from "react";
import { useSchedule } from "./hooks/useSchedule";
import { QuestLog } from "./components/QuestLog";

export const NotCuteAnymoreSidebar: React.FC = () => {
  const { currentDayTasks, currentTime } = useSchedule();

  return (
    <div className="h-full w-full flex flex-col bg-[#0e1113]">
      <div className="p-2 flex-1 min-h-0">
        <QuestLog tasks={currentDayTasks} currentTime={currentTime} />
      </div>
    </div>
  );
};

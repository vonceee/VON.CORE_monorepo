import React from "react";
import { SystemLog } from "../types";

interface TerminalLogProps {
  logs: SystemLog[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
  const logContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex justify-between items-center mb-4 text-[#9aa0a6] uppercase font-bold text-[10px] tracking-widest border-b border-[#3c4043] pb-2">
        <span className="flex items-center gap-2">
          System Log{" "}
          <span className="text-[8px] opacity-30 font-mono">v2.0.4-stbl</span>
        </span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-[#81c995] rounded-full animate-pulse shadow-[0_0_6px_rgba(129,201,149,0.5)]" />
          <span className="text-[9px]">Live Data Sync</span>
        </div>
      </div>
      <div
        ref={logContainerRef}
        className="flex-1 overflow-y-auto space-y-2.5 pr-1 font-mono"
      >
        {logs.map((log) => (
          <div
            key={log.id}
            className="text-[10px] font-medium leading-relaxed border-l border-[#3c4043] pl-4 py-0.5 transition-colors"
          >
            <span className="text-[#5f6368] tabular-nums mr-3">
              [{log.timestamp}]
            </span>
            <span
              className={
                log.level === "SUCCESS"
                  ? "text-[#81c995]"
                  : log.level === "ERROR"
                  ? "text-[#f28b82]"
                  : log.level === "WARN"
                  ? "text-[#fdd663]"
                  : "text-[#e8eaed]"
              }
            >
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-[#5f6368] italic text-[10px] py-4">
            Awaiting system telemetry...
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";

// Singleton Store
let timerState = {
  time: 25 * 60,
  isRunning: false,
};
let listeners: Array<() => void> = [];
let interval: any = null;

const notify = () => listeners.forEach((l) => l());

const stopTimer = () => {
  timerState.isRunning = false;
  if (interval) clearInterval(interval);
  interval = null;
  notify();
};

const startTimer = () => {
  if (timerState.isRunning) return;
  timerState.isRunning = true;
  notify();

  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    if (timerState.time > 0) {
      timerState.time -= 1;
      notify();
    } else {
      stopTimer();
    }
  }, 1000);
};

const resetTimer = () => {
  stopTimer();
  timerState.time = 25 * 60;
  notify();
};

const useTimer = () => {
  const [state, setState] = useState(timerState);

  useEffect(() => {
    const listener = () => setState({ ...timerState });
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return {
    time: state.time,
    isRunning: state.isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const MidnightFiction: React.FC = () => {
  const { time, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4 text-[#858585] uppercase tracking-[0.2em]">
        Midnight Fiction / Focus
      </h1>
      <div className="text-[120px] font-mono text-white leading-none mb-12 tabular-nums">
        {formatTime(time)}
      </div>
      <div className="flex space-x-6">
        <button
          onClick={() => (isRunning ? stopTimer() : startTimer())}
          className="px-8 py-3 bg-orange-500 text-black font-bold rounded hover:bg-orange-400 transition-colors uppercase tracking-widest text-xs"
        >
          {isRunning ? "Pause" : "Start Focus"}
        </button>
        <button
          onClick={resetTimer}
          className="px-8 py-3 border border-[#444444] text-white font-bold rounded hover:bg-[#333333] transition-colors uppercase tracking-widest text-xs"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

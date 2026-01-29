import React, { useMemo } from "react";
import { useMagnetic } from "./hooks/useMagnetic";
import { ChronoStream } from "./components/ChronoStream";
import { CountdownGrid } from "./components/CountdownGrid";
import { Loader2 } from "lucide-react";

export const Magnetic: React.FC = () => {
  const { milestones, isLoading } = useMagnetic();

  const { upcoming, history } = useMemo(() => {
    const now = new Date();
    const upcomingList = [];
    const historyList = [];

    for (const m of milestones) {
      // For one-time events: if date < now, it's history. Else upcoming.
      // For recurring: always upcoming (next occurrence), but maybe show original in history if it's special?
      // "Now Anchor" concept:
      // Let's put EVERYTHING in history (sorted by date desc) to show the timeline of what "was".
      // AND put recurring/future events in upcoming.

      // Actually, keep it simple:
      const date = new Date(m.event_date);
      if (m.frequency === "one-time") {
        if (date < now) {
          historyList.push(m);
        } else {
          upcomingList.push(m);
        }
      } else {
        // Recurring events are always relevant for upcoming.
        upcomingList.push(m);
        // Also show origin in history? e.g. "Born on..."
        historyList.push(m);
      }
    }

    // Sort upcoming by next occurrence
    upcomingList.sort((a, b) => {
      // crude sort for now
      return (
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    });

    // Sort history by event date DESC
    historyList.sort((a, b) => {
      return (
        new Date(b.event_date).getTime() - new Date(a.event_date).getTime()
      );
    });

    return { upcoming: upcomingList, history: historyList };
  }, [milestones]);

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full bg-[#F2F4F7] text-[#2C2E33] overflow-hidden relative">
      <div className="bg-[#1B264F]/5 absolute inset-0 pointer-events-none" />
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="px-8 py-6 border-b border-[#D1D5DB]">
          <h1 className="text-2xl font-light tracking-tight text-[#1B264F]">
            Timeline
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="w-full space-y-8 pb-20">
            {/* Upcoming Section (Countdown) */}
            <section>
              <div className="px-6 py-4 flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#1B264F] animate-pulse" />
                <h2 className="text-sm font-semibold text-[#8E9299] uppercase tracking-wider">
                  Live / Upcoming
                </h2>
              </div>
              <CountdownGrid milestones={upcoming} />
            </section>

            {/* Divider / Now Anchor */}
            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D1D5DB]" />
              </div>
              <span className="relative z-10 bg-[#F2F4F7] px-4 text-xs text-[#8E9299] uppercase tracking-widest font-mono">
                Past & Origins
              </span>
            </div>

            {/* History Section (Stream) */}
            <section>
              <ChronoStream milestones={history} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

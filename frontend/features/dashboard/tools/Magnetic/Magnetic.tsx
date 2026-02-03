import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { IntroductionView } from "./components/IntroductionView";
import { useMagnetic } from "./hooks/useMagnetic";
import { ChronoStream } from "./components/ChronoStream";
import { CountdownGrid } from "./components/CountdownGrid";
import { MagneticToolSkeleton } from "./components/MagneticToolSkeleton";
import { getNextOccurrence } from "./utils";

export const Magnetic: React.FC = () => {
  const { milestones, isLoading } = useMagnetic();
  const [showIntro, setShowIntro] = useState(false);

  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");

  const { upcoming, history } = useMemo(() => {
    const now = new Date();
    const upcomingList = [];
    const historyList = [];

    for (const m of milestones) {
      const date = new Date(m.event_date);
      if (m.frequency === "one-time") {
        if (date < now) {
          historyList.push(m);
        } else {
          upcomingList.push(m);
        }
      } else {
        upcomingList.push(m);
        historyList.push(m);
      }
    }

    upcomingList.sort((a, b) => {
      return getNextOccurrence(a).getTime() - getNextOccurrence(b).getTime();
    });

    historyList.sort((a, b) => {
      return (
        new Date(a.event_date).getTime() - new Date(b.event_date).getTime()
      );
    });

    return { upcoming: upcomingList, history: historyList };
  }, [milestones]);

  if (isLoading) {
    return <MagneticToolSkeleton />;
  }

  return (
    <div className="flex w-full h-full bg-[#F2F4F7] text-[#2C2E33] overflow-hidden relative animate-fade-in">
      <div className="bg-[#1B264F]/5 absolute inset-0 pointer-events-none" />

      {showIntro && (
        <div className="absolute inset-0 z-50">
          <IntroductionView onClose={() => setShowIntro(false)} />
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <header className="px-8 py-6 border-b border-[#D1D5DB] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-light tracking-tight text-[#1B264F]">
              Timeline
            </h1>
            <button
              onClick={() => setShowIntro(true)}
              className="p-1.5 text-[#8E9299] hover:text-[#1B264F] hover:bg-[#1B264F]/5 rounded-full transition-colors"
              title="Information"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center bg-white p-1 rounded-lg border border-[#D1D5DB] shadow-sm">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "grid"
                  ? "bg-[#1B264F] text-white shadow-sm"
                  : "text-[#8E9299] hover:text-[#1B264F] hover:bg-[#F3F4F6]"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                viewMode === "timeline"
                  ? "bg-[#1B264F] text-white shadow-sm"
                  : "text-[#8E9299] hover:text-[#1B264F] hover:bg-[#F3F4F6]"
              }`}
            >
              Timeline View
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="w-full space-y-8 pb-20 pt-6">
            {viewMode === "grid" && (
              <section>
                <div className="px-8 pb-4 flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#1B264F] animate-pulse" />
                  <h2 className="text-sm font-semibold text-[#8E9299] uppercase tracking-wider">
                    Grid View
                  </h2>
                </div>
                <CountdownGrid milestones={upcoming} />
              </section>
            )}

            {viewMode === "timeline" && (
              <section>
                <div className="px-8 pb-4 flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#8E9299]" />
                  <h2 className="text-sm font-semibold text-[#8E9299] uppercase tracking-wider">
                    Timeline View
                  </h2>
                </div>
                <ChronoStream milestones={history} />
              </section>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

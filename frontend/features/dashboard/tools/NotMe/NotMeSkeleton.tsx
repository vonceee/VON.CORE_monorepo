import React from "react";

export const NotMeGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-[#18181b] rounded-xl p-6 border border-white/5 shadow-sm h-[200px]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 bg-white/5 rounded-lg" />
            <div className="h-5 w-24 bg-white/5 rounded" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-white/5" />
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 bg-white/5 rounded" />
                <div className="w-12 h-3 bg-white/5 rounded" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5" />
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const NotMeListSkeleton: React.FC = () => {
  return (
    <div className="space-y-2 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-transparent"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-500/50" />
            <div className="flex flex-col gap-1.5">
              <div className="w-20 h-4 bg-white/5 rounded" />
              <div className="w-12 h-3 bg-white/5 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

import React from "react";

export const MagneticToolSkeleton: React.FC = () => {
  return (
    <div className="flex w-full h-full bg-[#F2F4F7] overflow-hidden relative animate-pulse">
      {/* Background decoration matching Magnetic.tsx */}
      <div className="bg-[#1B264F]/5 absolute inset-0 pointer-events-none" />

      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        {/* Header Skeleton */}
        <header className="px-8 py-6 border-b border-[#D1D5DB] flex items-center justify-between">
          {/* Title Placeholder */}
          <div className="h-8 w-32 bg-gray-300 rounded" />

          {/* View Switcher Placeholder */}
          <div className="flex items-center bg-white p-1 rounded-lg border border-[#D1D5DB] shadow-sm">
            <div className="h-8 w-24 bg-gray-200 rounded-md" />
            <div className="h-8 w-24 bg-transparent rounded-md ml-1" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="w-full space-y-8 pb-20 pt-6">
            <section>
              {/* Section Header Placeholder */}
              <div className="px-8 pb-4 flex items-center space-x-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[#1B264F] opacity-50" />
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>

              {/* Grid Skeleton */}
              <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-white border border-[#D1D5DB] h-[180px] flex flex-col justify-between"
                  >
                    {/* Card Header: Title + Edit Icon */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-6 w-1/2 bg-gray-200 rounded" />
                      <div className="h-6 w-6 bg-gray-200 rounded-full" />
                    </div>

                    {/* Countdown Numbers */}
                    <div className="flex items-baseline space-x-2">
                      <div className="h-10 w-12 bg-gray-200 rounded" />
                      <div className="h-4 w-8 bg-gray-200 rounded" />
                      <div className="h-8 w-10 bg-gray-200 rounded ml-2" />
                      <div className="h-3 w-6 bg-gray-200 rounded" />
                    </div>

                    {/* Footer: Date */}
                    <div className="mt-4 flex items-center">
                      <div className="h-3 w-3 bg-gray-200 rounded-full mr-2" />
                      <div className="h-3 w-32 bg-gray-200 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

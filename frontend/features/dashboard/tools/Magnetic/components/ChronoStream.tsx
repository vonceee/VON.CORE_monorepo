import React from "react";
import { Milestone } from "../types";
import { Circle, Star, Heart, Calendar } from "lucide-react";
import classNames from "classnames";

interface ChronoStreamProps {
  milestones: Milestone[];
}

const getIcon = (category: string) => {
  switch (category) {
    case "birthday":
      return <Star className="w-5 h-5 text-[#1B264F]" />;
    case "anniversary":
      return <Heart className="w-5 h-5 text-[#1B264F]" />;
    case "milestone":
      return <Circle className="w-5 h-5 text-[#1B264F]" />;
    default:
      return <Calendar className="w-5 h-5 text-[#8E9299]" />;
  }
};

export const ChronoStream: React.FC<ChronoStreamProps> = ({ milestones }) => {
  return (
    <div className="flex flex-col space-y-12 p-6 relative max-w-5xl mx-auto w-full">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#D1D5DB] -translate-x-1/2" />

      {milestones.length === 0 && (
        <div className="text-[#8E9299] italic text-center relative z-10 bg-[#F2F4F7] px-4 self-center">
          No past milestones yet.
        </div>
      )}

      {milestones.map((m, index) => {
        const isLeft = index % 2 === 0;

        return (
          <div
            key={m.id}
            className={classNames("relative flex items-center w-full group", {
              "justify-end": isLeft,
              "justify-start": !isLeft,
            })}
          >
            {/* Center Anchor Point */}
            <div className="absolute left-1/2 -translate-x-1/2 z-20">
              <div className="relative">
                <div className="absolute inset-0 bg-[#1B264F] blur-md opacity-0 group-hover:opacity-20 transition-opacity rounded-full duration-500"></div>
                <div className="relative p-2 bg-white rounded-full border border-[#D1D5DB] group-hover:border-[#1B264F] group-hover:scale-110 transition-all duration-300 shadow-sm z-10">
                  {getIcon(m.category)}
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div
              className={classNames(
                "w-[calc(50%-40px)] bg-white p-5 rounded-lg border border-[#D1D5DB] shadow-sm hover:shadow-md hover:border-[#1B264F]/50 transition-all duration-300 group-hover:-translate-y-1",
                {
                  "mr-10 text-right": isLeft,
                  "ml-10 text-left": !isLeft,
                },
              )}
            >
              <div
                className={classNames("flex flex-col", {
                  "items-end": isLeft,
                  "items-start": !isLeft,
                })}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {!isLeft && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B264F]/5 border border-[#1B264F]/10 text-[#1B264F] uppercase tracking-wider font-semibold">
                      {m.category}
                    </span>
                  )}
                  <h3 className="text-[#1B264F] font-semibold text-lg tracking-tight leading-none">
                    {m.name}
                  </h3>
                  {isLeft && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1B264F]/5 border border-[#1B264F]/10 text-[#1B264F] uppercase tracking-wider font-semibold">
                      {m.category}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#8E9299]">
                  {new Date(m.event_date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

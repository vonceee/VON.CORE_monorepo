import React, { useRef, useState, useEffect } from "react";
import { EditorGroup as EditorGroupType } from "../types/dashboard";
import { Tool } from "../../../types/index";

interface ScrollableHeaderProps {
  group: EditorGroupType;
  getTool: (id: string) => Tool | undefined;
  onTabClick: (tabId: string) => void;
  onTabClose: (e: React.MouseEvent, tabId: string) => void;
}

const ScrollableHeader: React.FC<ScrollableHeaderProps> = ({
  group,
  getTool,
  onTabClick,
  onTabClose,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [group.tabs]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount,
        behavior: "smooth",
      });
      // Allow time for scroll to update before checking again (optional, but checkScroll also runs on scroll event)
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="flex-1 flex items-center h-full min-w-0 relative">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <button
          className="absolute left-0 z-20 h-full px-1 bg-[#252526] text-white hover:bg-[#333] border-r border-black/20"
          onClick={(e) => {
            e.stopPropagation();
            scroll("left");
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* Tabs Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex-1 flex items-center h-full overflow-x-auto [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {group.tabs.map((tabId) => {
          const tool = getTool(tabId);
          if (!tool) return null;
          const isTabActive = group.activeTabId === tabId;

          return (
            <div
              key={tabId}
              onClick={(e) => {
                e.stopPropagation();
                onTabClick(tabId);
              }}
              className={`
                h-full flex items-center justify-between px-4 space-x-2 text-xs cursor-pointer w-40 relative group transition-colors flex-shrink-0
                ${
                  isTabActive
                    ? "bg-[#1F1F1F] text-white z-10"
                    : "bg-transparent text-[#969696] hover:bg-[#2d2d2d]/50 hover:text-[#cccccc] border-r border-[#2B2B2B]"
                }
              `}
            >
              <span className="truncate flex-1 min-w-0">{tool.label}</span>
              <button
                onClick={(e) => onTabClose(e, tabId)}
                className={`ml-1 p-0.5 rounded-md opacity-0 group-hover:opacity-100 hover:bg-white/20 ${
                  isTabActive ? "opacity-100" : ""
                }`}
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <button
          className="absolute right-0 z-20 h-full px-1 bg-[#252526] text-white hover:bg-[#333] border-l border-black/20"
          onClick={(e) => {
            e.stopPropagation();
            scroll("right");
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollableHeader;

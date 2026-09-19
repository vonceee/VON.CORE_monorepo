import React, { useEffect, useRef } from "react";
import { useLenisScroll } from "../../context/LenisContext";

export const ScrollProgressBar: React.FC = () => {
  const { lenis } = useLenisScroll();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: { progress: number }) => {
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${e.progress ?? 0})`;
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7),0_0_20px_rgba(129,140,248,0.4)] will-change-transform"
        style={{
          transform: "scaleX(0)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default React.memo(ScrollProgressBar);

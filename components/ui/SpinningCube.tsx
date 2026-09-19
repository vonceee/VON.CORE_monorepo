import React, { useEffect, useRef, useState } from "react";

interface CubeCursorProps {
  className?: string;
  style?: React.CSSProperties;
}

const SPLINE_SCRIPT_URL =
  "https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js";

function ensureSplineScriptLoaded() {
  if (
    typeof customElements !== "undefined" &&
    customElements.get("spline-viewer")
  ) {
    return;
  }
  if (document.querySelector(`script[data-spline-script="true"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.dataset.splineScript = "true";
  script.src = SPLINE_SCRIPT_URL;
  document.body.appendChild(script);
}

const SpinningCube: React.FC<CubeCursorProps> = ({ className, style }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    ensureSplineScriptLoaded();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current as any;
    if (!viewer) return;

    if (isInView) {
      if (typeof viewer.play === "function") {
        viewer.play();
      }
    } else {
      if (typeof viewer.stop === "function") {
        viewer.stop();
      }
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className={className || "relative w-10 h-10 md:w-16 md:h-16"}
      style={{
        ...style,
        visibility: isInView ? "visible" : "hidden",
        pointerEvents: isInView ? "auto" : "none",
      }}
    >
      {/* @ts-ignore */}
      <spline-viewer
        ref={viewerRef}
        loading-anim-type="spinner-small-light"
        url="https://prod.spline.design/BszEkIu1nheNBBST/scene.splinecode"
        background="transparent"
      ></spline-viewer>
    </div>
  );
};

export default React.memo(SpinningCube);

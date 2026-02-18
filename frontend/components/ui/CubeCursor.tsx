import { useEffect } from "react";

interface CubeCursorProps {
  className?: string;
}

export default function CubeCursor({ className }: CubeCursorProps) {
  useEffect(() => {
    const scriptUrl =
      "https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js";
    if (document.querySelector(`script[src="${scriptUrl}"]`)) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = scriptUrl;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={className || "relative w-10 h-10 md:w-16 md:h-16"}>
      {/* @ts-ignore */}
      <spline-viewer
        url="https://prod.spline.design/BszEkIu1nheNBBST/scene.splinecode"
        background="transparent"
      ></spline-viewer>
    </div>
  );
}

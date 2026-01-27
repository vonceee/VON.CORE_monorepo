import { useEffect, useState, useRef } from "react";

export const useInView = (
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px" },
) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        hasTriggered.current = true;
        // Optional: Disconnect if we only want to trigger once
        // observer.disconnect();
      } else {
        // If we want it to toggle back off:
        // setIsInView(false);
      }
    }, options);

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return { ref, isInView, hasTriggered: hasTriggered.current };
};

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "lenis";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
}

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
  pause: () => void;
  resume: () => void;
  progress: number;
}

const LenisContext = createContext<LenisContextValue | undefined>(undefined);

interface LenisProviderProps {
  children: ReactNode;
  isPaused?: boolean;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children, isPaused = false }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      lerp: 0.09,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoRaf: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    let rafId: number;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isPaused) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isPaused]);

  const scrollTo = React.useCallback((target: string | HTMLElement | number, options?: ScrollToOptions) => {
    if (!lenisRef.current) {
      if (typeof target === "string") {
        const el = document.querySelector(target.startsWith("#") ? target : `#${target}`);
        el?.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    let resolvedTarget: string | HTMLElement | number = target;
    if (typeof target === "string" && !target.startsWith("#") && !target.startsWith(".")) {
      const el = document.getElementById(target);
      if (el) resolvedTarget = el;
    }

    lenisRef.current.scrollTo(resolvedTarget, {
      duration: options?.duration ?? 1.2,
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      lock: options?.lock ?? false,
      onComplete: options?.onComplete,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, []);

  const pause = React.useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const resume = React.useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const value = React.useMemo(
    () => ({
      lenis,
      scrollTo,
      pause,
      resume,
      progress: 0,
    }),
    [lenis, scrollTo, pause, resume],
  );

  return (
    <LenisContext.Provider value={value}>
      {children}
    </LenisContext.Provider>
  );
};

export const useLenisScroll = (): LenisContextValue => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenisScroll must be used within a LenisProvider");
  }
  return context;
};

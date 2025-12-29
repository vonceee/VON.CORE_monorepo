import React, { useState, useEffect, useRef } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  style?: string;
  isAscii?: boolean;
  isError?: boolean;
  isProgress?: boolean;
  progress?: number;
}

const ASCII_LOGO = `
    ██╗   ██╗ ██████╗ ███╗   ██╗
    ██║   ██║██╔═══██╗████╗  ██║
    ██║   ██║██║   ██║██╔██╗ ██║
    ╚██╗ ██╔╝██║   ██║██║╚██╗██║
     ╚████╔╝ ╚██████╔╝██║ ╚████║
      ╚═══╝   ╚═════╝ ╚═╝  ╚═══╝
    ═════════════════════════════
          S Y S T E M  C O R E
`;

const MATRIX_CHARS = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01";

const BASE_DELAY = 30;
const BURST_DELAY = 10;
const PAUSE_SHORT = 400;
const PAUSE_LONG = 800;

const SEQUENCE_STEPS: {
  content: string;
  delay: number;
  style?: string;
  isAscii?: boolean;
  isError?: boolean;
  isProgress?: boolean;
}[] = [
  {
    content: "VON.CORE BIOS v3.0.1 - BUILD 2024.12.24",
    delay: 100,
    style: "text-orange-500 font-bold",
  },
  { content: "Initializing Memory Controller...", delay: 80 },
  { content: "CHECKING RAM: 64TB [OK]", delay: 80 },
  { content: "DETECTING CPU: NEURAL_ENGINE_X9 [OK]", delay: 80 },
  { content: "PRIMARY BUS: ONLINE", delay: 200 },
  { content: "SCANNING PERIPHERAL DEVICES...", delay: 150 },
  { content: "├─ QUANTUM DRIVE: DETECTED", delay: 60 },
  { content: "├─ NEURAL INTERFACE: ACTIVE", delay: 60 },
  { content: "└─ HOLOGRAPHIC DISPLAY: READY", delay: PAUSE_SHORT },

  {
    content: ASCII_LOGO,
    delay: PAUSE_LONG,
    isAscii: true,
    style: "text-orange-500/80 leading-none my-4",
  },

  { content: "MOUNTING FILESYSTEM...", delay: 200, isProgress: true },
  { content: "/dev/sda1 mounted as /root", delay: 150 },
  { content: "Verifying Encryption Keys...", delay: 200 },
  { content: "KEY_PAIR_A: VERIFIED", delay: 100, style: "text-green-500" },
  { content: "KEY_PAIR_B: VERIFIED", delay: 100, style: "text-green-500" },
  { content: "KEY_PAIR_C: CHECKING...", delay: 300 },
  {
    content: "KEY_PAIR_C: WARNING - REGENERATING",
    delay: 400,
    style: "text-yellow-500",
    isError: true,
  },
  { content: "KEY_PAIR_C: VERIFIED", delay: 200, style: "text-green-500" },
  { content: "Establishing Secure Handshake...", delay: 300 },
  { content: "Handshake Accepted. Uplink Stable.", delay: 200 },
  {
    content: "SATELLITE LINK: CONNECTED [PING: 42ms]",
    delay: 150,
    style: "text-cyan-500",
  },

  {
    content: "LOADING KERNEL MODULES:",
    delay: 100,
    style: "text-orange-400 mt-2",
  },
  { content: " > loading module: ui_core.dll", delay: BURST_DELAY },
  { content: " > loading module: portfolio.sys", delay: BURST_DELAY },
  { content: " > loading module: magnetic_field.driver", delay: BURST_DELAY },
  { content: " > loading module: lucky_girl.res", delay: BURST_DELAY },
  { content: " > loading module: fiction_logic.bin", delay: BURST_DELAY },
  { content: " > loading module: nav_system.x86", delay: BURST_DELAY },
  { content: " > loading module: thermal_monitor.d", delay: BURST_DELAY },
  { content: " > loading module: security_layer.lib", delay: BURST_DELAY },
  { content: " > loading module: audio_subsystem.wav", delay: BURST_DELAY },
  { content: " > loading module: gfx_renderer.gl", delay: BURST_DELAY },
  { content: " > loading module: network_stack.tcp", delay: BURST_DELAY },
  { content: " > loading module: user_profile.dat", delay: BURST_DELAY },
  { content: " > loading module: dev_tools.kit", delay: BURST_DELAY },
  { content: " > loading module: reality_engine.core", delay: BURST_DELAY },
  { content: " > loading module: time_sync.chrono", delay: PAUSE_SHORT },

  { content: "ALL MODULES LOADED.", delay: 200, style: "text-green-500" },
  { content: "RUNNING SYSTEM DIAGNOSTICS...", delay: 300, isProgress: true },
  { content: "├─ MEMORY TEST: PASSED", delay: 120, style: "text-green-500" },
  {
    content: "├─ CPU STRESS TEST: PASSED",
    delay: 120,
    style: "text-green-500",
  },
  { content: "├─ NETWORK CHECK: PASSED", delay: 120, style: "text-green-500" },
  { content: "└─ SECURITY SCAN: PASSED", delay: 300, style: "text-green-500" },
  { content: "INITIALIZING DASHBOARD INTERFACE...", delay: 600 },
  { content: "LOADING USER PREFERENCES...", delay: 200 },
  { content: "CALIBRATING DISPLAY MATRIX...", delay: 200 },
  {
    content: "SYSTEM READY.",
    delay: 800,
    style: "text-orange-500 font-bold text-4xl",
  },
  { content: "WELCOME BACK, DEVELOPER.", delay: 400, style: "text-cyan-400" },
  { content: "ENTERING DEV MODE...", delay: 300 },
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);
  const [matrixRain, setMatrixRain] = useState<
    { x: number; char: string; speed: number }[]
  >([]);
  const [bootProgress, setBootProgress] = useState(0);
  const [showScanline, setShowScanline] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const playBeep = (
    frequency: number,
    duration: number,
    volume: number = 0.05
  ) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = "square";
      gain.gain.value = volume;

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      // Silently fail
    }
  };

  // Matrix rain effect on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const drops: number[] = Array(columns).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fb923080";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(drawMatrix, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Escape" ||
        (currentIndex >= SEQUENCE_STEPS.length &&
          e.key !== "Shift" &&
          e.key !== "Control" &&
          e.key !== "Alt")
      ) {
        playBeep(600, 0.1, 0.1);
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete, currentIndex]);

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.85) {
        setGlitchActive(true);
        playBeep(800, 0.03);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 2000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Scanline sweep effect
  useEffect(() => {
    const scanlineInterval = setInterval(() => {
      setShowScanline(false);
      setTimeout(() => setShowScanline(true), 50);
    }, 3000);
    return () => clearInterval(scanlineInterval);
  }, []);

  // Boot progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        const next = prev + Math.random() * 5;
        return next > 100 ? 100 : next;
      });
    }, 200);
    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (currentIndex >= SEQUENCE_STEPS.length) {
      playBeep(1000, 0.2, 0.08);
      // Don't auto-complete, wait for user input
      return;
    }

    const step = SEQUENCE_STEPS[currentIndex];

    let finalDelay = step.delay;
    if (finalDelay < 100) {
      finalDelay += Math.random() * 30;
    }

    const timer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          text: step.content,
          style: step.style,
          isAscii: step.isAscii,
          isError: step.isError,
          isProgress: step.isProgress,
        },
      ]);
      setCurrentIndex((prev) => prev + 1);

      if (!step.isAscii) {
        if (step.isError) {
          playBeep(400, 0.1, 0.08);
        } else if (step.delay < 100) {
          playBeep(1200 + Math.random() * 400, 0.02);
        } else {
          playBeep(800, 0.05, 0.03);
        }
      }
    }, finalDelay);

    return () => clearTimeout(timer);
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-neutral-400 font-mono text-xl md:text-2xl overflow-hidden select-none cursor-wait">
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.97; }
        }
        @keyframes textGlow {
          0%, 100% { text-shadow: 0 0 2px rgba(251, 146, 60, 0.3); }
          50% { text-shadow: 0 0 8px rgba(251, 146, 60, 0.6), 0 0 12px rgba(251, 146, 60, 0.3); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(251, 146, 60, 0.8); }
          50% { box-shadow: 0 0 20px rgba(251, 146, 60, 1), 0 0 30px rgba(251, 146, 60, 0.5); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .crt-flicker {
          animation: flicker 0.15s infinite;
        }
        .text-glow {
          animation: textGlow 3s ease-in-out infinite;
        }
        .glitch {
          animation: glitch 0.1s;
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          25% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
          50% { transform: translate(2px, -2px); filter: hue-rotate(-90deg); }
          75% { transform: translate(-2px, -2px); filter: hue-rotate(180deg); }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-4px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes error-flash {
          0%, 100% { background: transparent; }
          50% { background: rgba(234, 179, 8, 0.1); }
        }
        .error-flash {
          animation: error-flash 0.5s ease-in-out 2;
        }
        .scanline-sweep {
          animation: scanline 2s linear;
        }
      `}</style>

      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[101] opacity-10 pointer-events-none"
      />

      {/* CRT Effects */}
      <div className="pointer-events-none absolute inset-0 z-[110] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20 crt-flicker" />

      {/* Moving Scanline */}
      {showScanline && (
        <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-b from-transparent via-orange-500/30 to-transparent z-[115] scanline-sweep" />
      )}

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[110] bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]" />

      {/* Screen Edge Glow */}
      <div className="pointer-events-none absolute inset-0 z-[105] shadow-[inset_0_0_100px_rgba(251,146,60,0.1)]" />

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 z-[125] text-orange-500/30 text-xs">
        <div>┏━━━━━━━━━━━━━━━━━</div>
        <div>┃ VON.CORE</div>
      </div>
      <div className="absolute top-4 right-4 z-[125] text-orange-500/30 text-xs text-right">
        <div>━━━━━━━━━━━━━━━━━┓</div>
        <div>SYS.INIT ┃</div>
      </div>

      {/* System Stats */}
      <div className="absolute top-20 right-4 z-[125] text-neutral-500 text-xs space-y-1">
        <div>CPU: {Math.floor(bootProgress)}%</div>
        <div>MEM: {Math.floor(bootProgress * 0.8)}%</div>
        <div>NET: {bootProgress > 50 ? "ONLINE" : "INIT"}</div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-neutral-800 rounded overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className={`relative z-[120] h-full flex flex-col p-6 md:p-10 ${
          glitchActive ? "glitch" : ""
        }`}
      >
        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style>{`
            .flex-1::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex flex-col gap-1 pb-20">
            {lines.map((line, idx) => (
              <div
                key={idx}
                className={`${line.style || "text-neutral-400"} ${
                  line.isAscii ? "whitespace-pre font-bold text-glow" : ""
                } ${
                  line.isError ? "error-flash" : ""
                } transition-opacity duration-200`}
                style={{
                  animation: `fadeIn 0.3s ease-out ${idx * 0.02}s both`,
                }}
              >
                {!line.isAscii && (
                  <span className="mr-3 text-neutral-600 opacity-50">
                    [
                    {new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      fractionalSecondDigits: 3,
                    })}
                    ]
                  </span>
                )}
                <span className={line.isAscii ? "" : "tracking-wide"}>
                  {line.text}
                </span>
              </div>
            ))}
            <div
              ref={bottomRef}
              className="h-4 w-2 bg-orange-500 mt-2"
              style={{ animation: "pulse-glow 1s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-between px-8">
          <div className="text-neutral-600 text-base font-bold">
            {currentIndex < SEQUENCE_STEPS.length ? (
              <span className="text-orange-500 animate-pulse">
                ◉ BOOTING...
              </span>
            ) : (
              <span className="text-green-500">◉ READY</span>
            )}
          </div>
          <div className="text-neutral-500 text-base animate-pulse backdrop-blur-sm bg-black/30 px-3 py-2 rounded border border-neutral-800 hover:border-orange-500/50 transition-colors">
            {currentIndex < SEQUENCE_STEPS.length ? (
              <>
                <span className="text-orange-500 font-bold">[ESC]</span> TO SKIP
                SEQUENCE
              </>
            ) : (
              <>
                <span className="text-green-500 font-bold">
                  [PRESS ANY KEY]
                </span>{" "}
                TO CONTINUE
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent z-[125]" />
    </div>
  );
};

export default BootSequence;

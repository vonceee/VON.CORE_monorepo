import React, { useState, useEffect, useRef } from "react";

interface BootSequenceProps {
  onComplete: () => void;
}

// --- Data Structures ---

interface BootLine {
  id: number;
  text: string;
  timestamp: string;
  isAscii?: boolean;
  style?: string;
}

type WindowType = "MEMORY" | "THREADS" | "NETWORK";

interface SequenceStep {
  content: string;
  delay: number;
  style?: string;
  isAscii?: boolean;
  trigger?: {
    type: "MOUNT" | "AUTH_BLOCK";
    target?: WindowType;
  };
}

// --- Sub-Components ---

const BrutalistPane: React.FC<{
  title: string;
  className?: string;
  children: React.ReactNode;
  isActive?: boolean;
}> = ({ title, className, children, isActive = true }) => (
  <div
    className={`flex flex-col border border-green-900 bg-black overflow-hidden relative transition-opacity duration-500 ${
      isActive ? "opacity-100" : "opacity-30 grayscale"
    } ${className}`}
  >
    {/* ASCII Style Header */}
    <div className="bg-green-900/10 text-green-600 text-[10px] px-2 py-1 uppercase font-bold tracking-widest border-b border-green-900 flex justify-between select-none">
      <span>{title}</span>
      <span>{isActive ? "[ACTIVE]" : "[OFFLINE]"}</span>
    </div>
    <div className="flex-1 p-2 overflow-hidden relative">{children}</div>
    {/* Grid Lines Pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />
  </div>
);

const MemoryDump: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const chars = "0123456789ABCDEF";
    const interval = setInterval(() => {
      const line = Array(4)
        .fill(0)
        .map(
          () =>
            `0x${chars[Math.floor(Math.random() * 16)]}${
              chars[Math.floor(Math.random() * 16)]
            }`,
        )
        .join(" ");
      setLines((prev) => [...prev.slice(-15), line]);
    }, 80);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="font-mono text-[10px] text-green-700 leading-tight">
      {lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
};

const ThreadManager: React.FC = () => {
  const [threads, setThreads] = useState([
    { id: 101, name: "kernel_task", status: "RUN" },
    { id: 402, name: "kworker/u", status: "WAIT" },
    { id: 550, name: "init_gfx", status: "WAIT" },
    { id: 899, name: "watchdog", status: "RUN" },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setThreads((prev) =>
        prev.map((t) => ({
          ...t,
          status:
            Math.random() > 0.7
              ? Math.random() > 0.5
                ? "RUN"
                : "WAIT"
              : t.status,
        })),
      );
    }, 300);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col gap-1 font-mono text-[10px] w-full">
      <div className="flex justify-between border-b border-green-900/50 pb-1 text-green-800">
        <span>PID</span>
        <span>PROC</span>
        <span>STAT</span>
      </div>
      {threads.map((t) => (
        <div key={t.id} className="flex justify-between text-green-600">
          <span>{t.id}</span>
          <span>{t.name}</span>
          <span
            className={t.status === "RUN" ? "text-green-400" : "text-green-800"}
          >
            {t.status}
          </span>
        </div>
      ))}
    </div>
  );
};

const NetworkTopology: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 4);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { x: "10%", y: "20%", name: "GTW" },
    { x: "80%", y: "20%", name: "DNS" },
    { x: "50%", y: "50%", name: "L-H" }, // Localhost
    { x: "50%", y: "80%", name: "DB" },
  ];

  return (
    <div className="relative w-full h-full font-mono text-[9px] text-green-800">
      {/* ASCII Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <line
          x1="10%"
          y1="20%"
          x2="50%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="80%"
          y1="20%"
          x2="50%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="1"
        />
        <line
          x1="50%"
          y1="50%"
          x2="50%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          dasharray="4 2"
        />
      </svg>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <div
          key={i}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 border bg-black px-1 transition-colors duration-200 ${
            activeNode === i
              ? "border-green-400 text-green-400"
              : "border-green-900 text-green-900"
          }`}
          style={{ left: node.x, top: node.y }}
        >
          {node.name}
        </div>
      ))}
    </div>
  );
};

// --- Boot Logic ---

const ASCII_LOGO = `
██╗   ██╗ ██████╗ ███╗   ██╗
██║   ██║██╔═══██╗████╗  ██║
██║   ██║██║   ██║██╔██╗ ██║
╚██╗ ██╔╝██║   ██║██║╚██╗██║
 ╚████╔╝ ╚██████╔╝██║ ╚████║
  ╚═══╝   ╚═════╝ ╚═╝  ╚═══╝
VON.CORE SYSTEM INTERFACE
`;

const SEQUENCE: SequenceStep[] = [
  { content: "BIOS_REV: 0x44A [Legacy Mode]", delay: 100 },
  { content: "Probing EDI/MMX Registers...", delay: 80 },
  { content: "Initializing Northbridge...", delay: 80 },
  { content: "Primary Master: VIRTUAL_DISK_IMAGE (64GB)", delay: 80 },
  { content: "MEM_ALLOC: Reserve 4096MB base", delay: 150 },
  {
    content: "MOUNTING SUBSYSTEMS...",
    delay: 200,
    trigger: { type: "MOUNT", target: "MEMORY" },
  },
  { content: "Allocating DMA Channels 0-15...", delay: 100 },
  { content: "Interrupter Vector Table... OK", delay: 100 },
  { content: "Loading Kernel Image v5.19", delay: 300 },
  { content: "Checking Root Filesystem...", delay: 150 },
  {
    content: "SECURITY_DAEMON: STARTING...",
    delay: 400,
    trigger: { type: "AUTH_BLOCK" }, // <--- Blocks sequence
  },
  {
    content: "SECURITY_DAEMON: AUTHORIZED",
    delay: 100,
    style: "text-green-400 font-bold",
  },
  {
    content: "Spawning User Processes...",
    delay: 150,
    trigger: { type: "MOUNT", target: "THREADS" },
  },
  { content: "init: entering runlevel 3", delay: 100 },
  {
    content: "Starting Network Manager...",
    delay: 200,
    trigger: { type: "MOUNT", target: "NETWORK" },
  },
  { content: "eth0: Link up (1000Mbps)", delay: 100 },
  { content: "lo: Link up (Loopback)", delay: 100 },
  { content: ASCII_LOGO, delay: 600, isAscii: true },
  { content: "Loading UI Framework...", delay: 200 },
  { content: "Mounting React Fiber Roots...", delay: 150 },
  { content: "Hydrating State Stores...", delay: 150 },
  { content: "SYSTEM_READY", delay: 500, style: "font-bold text-green-400" },
];

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<BootLine[]>([]);
  const [index, setIndex] = useState(0);
  const [mountedWindows, setMountedWindows] = useState<WindowType[]>([]);
  const [isAuthBlocking, setIsAuthBlocking] = useState(false);
  const [authInput, setAuthInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // time generator
  const getKernelTime = () => `[${(performance.now() / 1000).toFixed(6)}]`;

  // auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [lines]);

  // main loop
  useEffect(() => {
    if (isAuthBlocking) return;
    if (index >= SEQUENCE.length) {
      setTimeout(onComplete, 1000);
      return;
    }

    const step = SEQUENCE[index];

    // handle triggers (synchronously before delay)
    if (step.trigger) {
      if (step.trigger.type === "MOUNT" && step.trigger.target) {
        setMountedWindows((prev) => [...prev, step.trigger.target!]);
      }
      if (step.trigger.type === "AUTH_BLOCK") {
        setIsAuthBlocking(true);
        // don't advance index yet
        return;
      }
    }

    const timer = setTimeout(() => {
      setLines((prev) => [
        ...prev,
        {
          id: index,
          text: step.content,
          timestamp: getKernelTime(),
          isAscii: step.isAscii,
          style: step.style,
        },
      ]);
      setIndex((prev) => prev + 1);
    }, step.delay);

    return () => clearTimeout(timer);
  }, [index, isAuthBlocking, onComplete]);

  // auth simulation logic
  useEffect(() => {
    if (!isAuthBlocking) return;

    let str = "ACCESS_KEY_99";
    let charIndex = 0;

    // skip the blocking step itself to avoid loop
    const typeTimer = setInterval(() => {
      setAuthInput(str.slice(0, charIndex + 1));
      charIndex++;
      if (charIndex >= str.length) {
        clearInterval(typeTimer);
        setTimeout(() => {
          setIsAuthBlocking(false);
          setIndex((prev) => prev + 1);
        }, 600);
      }
    }, 100);

    return () => clearInterval(typeTimer);
  }, [isAuthBlocking]);

  // skip
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onComplete();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-black text-green-600 font-mono text-xs md:text-sm select-none cursor-wait grid grid-cols-1 lg:grid-cols-12 gap-1 p-2">
      {/* LEFT COL: MAIN LOG (Span 8) */}
      <BrutalistPane
        title="KERNEL_STDOUT"
        className="col-span-1 lg:col-span-8 lg:row-span-3"
      >
        <div className="flex flex-col h-full overflow-y-auto w-full pb-8 no-scrollbar">
          {lines.map((line) => (
            <div
              key={line.id}
              className={`flex items-start gap-2 ${line.style || ""} ${
                line.isAscii
                  ? "whitespace-pre leading-none my-4 text-green-500"
                  : ""
              }`}
            >
              {!line.isAscii && (
                <span className="text-green-900 shrink-0 select-none">
                  {line.timestamp}
                </span>
              )}
              <span className="break-words">{line.text}</span>
            </div>
          ))}
          <div
            ref={bottomRef}
            className="h-4 w-2 bg-green-600 animate-pulse mt-1"
          />
        </div>
      </BrutalistPane>

      {/* RIGHT COL: UTILITIES (Span 4) */}

      {/* MEMORY DUMP */}
      <BrutalistPane
        title="MEM_HEX_ADDR"
        className="col-span-1 lg:col-span-4 h-32 lg:h-auto"
        isActive={mountedWindows.includes("MEMORY")}
      >
        {mountedWindows.includes("MEMORY") && <MemoryDump />}
      </BrutalistPane>

      {/* THREAD MANAGER */}
      <BrutalistPane
        title="PID_TABLE"
        className="col-span-1 lg:col-span-4 h-32 lg:h-auto"
        isActive={mountedWindows.includes("THREADS")}
      >
        {mountedWindows.includes("THREADS") && <ThreadManager />}
      </BrutalistPane>

      {/* NETWORK MAP */}
      <BrutalistPane
        title="NET_TOPOLOGY"
        className="col-span-1 lg:col-span-4 h-40 lg:h-auto"
        isActive={mountedWindows.includes("NETWORK")}
      >
        {mountedWindows.includes("NETWORK") && <NetworkTopology />}
      </BrutalistPane>

      {/* BLOCKING AUTH MODAL */}
      {isAuthBlocking && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
          <div className="border-2 border-green-500 bg-black p-6 flex flex-col items-center gap-4 w-96 shadow-[0_0_20px_rgba(0,255,0,0.2)]">
            <div className="text-green-500 font-bold tracking-widest animate-pulse">
              WARNING: SECURITY GATES ACTIVE
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-[10px] text-green-800 uppercase">
                Enter Passkey
              </label>
              <div className="w-full bg-green-900/10 border border-green-800 p-2 text-green-400 font-bold">
                {authInput}
                <span className="animate-pulse">_</span>
              </div>
            </div>
            <div className="text-[10px] text-green-800 w-full text-center mt-2">
              IDENTITY.VERIFICATION.DAEMON
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="fixed bottom-0 left-0 right-0 p-1 bg-black border-t border-green-900 text-green-900 text-[10px] font-mono uppercase text-center z-50">
        [ESC] ABORT_SEQUENCE // VON.CORE v3.0 // MEM: 64TB // CPU: 12%
      </div>
    </div>
  );
};

export default BootSequence;

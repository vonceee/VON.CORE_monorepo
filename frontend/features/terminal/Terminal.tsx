import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onDevModeSuccess: () => void;
  onDevModeOff: () => void;
  isDevMode: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  onDevModeSuccess,
  onDevModeOff,
  isDevMode,
}) => {
  const themeContext = useTheme();
  const [lines, setLines] = useState<string[]>([
    "von.core [version 1.0.42]",
    "initializing secure link...",
    "ready.",
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = inputValue.trim().toLowerCase();
    if (!cleanInput && !isAuthenticating) return;

    if (isAuthenticating) {
      // prototype-level password check
      if (cleanInput === "yunah.dev") {
        setLines((prev) => [
          ...prev,
          "*******",
          "authentication successful. entering dev mode...",
        ]);
        setTimeout(() => {
          setIsAuthenticating(false);
          onDevModeSuccess();
        }, 1000);
      } else {
        setLines((prev) => [
          ...prev,
          "*******",
          "error: invalid credentials. access denied.",
        ]);
        setIsAuthenticating(false);
      }
      setInputValue("");
      return;
    }

    const cmd = cleanInput;
    let response = "";

    if (cmd.startsWith("theme")) {
      const parts = cmd.split(" ").filter((p) => p.trim() !== "");

      if (parts.length === 1) {
        response = `current theme: ${themeContext.theme}`;
      } else if (parts[1] === "--help" || parts[1] === "-h") {
        response =
          "usage: theme [--set <name>]\navailable themes: dark, valentines, snow";
      } else if (parts[1] === "--set" && parts[2]) {
        const newTheme = parts[2] as any;
        const allowedThemes = ["dark", "valentines", "snow"];

        if (allowedThemes.includes(newTheme)) {
          themeContext.setTheme(newTheme);
          response = `theme set to '${newTheme}'.`;
        } else {
          response = `error: theme '${newTheme}' not found. type 'theme --help' for available options.`;
        }
      } else {
        response = "invalid syntax. try 'theme --help'.";
      }
    } else {
      switch (cmd) {
        case "help":
          response =
            "available: whois, portfolio, clear, contact, dev on, dev off, theme, exit";
          break;
        case "whois":
          response =
            "von.core: a digital entity focused on brutalist minimalism.";
          break;
        case "dev on":
          if (isDevMode) {
            response = "already in dev mode.";
          } else {
            setIsAuthenticating(true);
            setLines((prev) => [...prev, `> ${cleanInput}`, "enter password:"]);
            setInputValue("");
            return;
          }
          break;
        case "dev off":
          if (!isDevMode) {
            response = "not in dev mode.";
          } else {
            onDevModeOff();
            response = "exiting dev mode. returning to public view...";
          }
          break;
        case "clear":
          setLines([]);
          setInputValue("");
          return;
        case "exit":
          onClose();
          return;
        default:
          response = `command not found: ${cmd}`;
      }
    }

    setLines((prev) => [...prev, `> ${cleanInput}`, response]);
    setInputValue("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 terminal-blur bg-black/40">
      <div className="w-full max-w-3xl h-auto max-h-[600px] bg-black border-2 border-white shadow-none flex flex-col font-mono text-lg md:text-xl">
        <div className="flex items-center justify-between px-2 py-1 bg-white text-black border-b-2 border-white uppercase tracking-wider">
          <span className="font-bold">Version 1.0.42</span>
          <button
            onClick={onClose}
            className="hover:bg-black hover:text-white px-1"
          >
            [X]
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-1 custom-scroll"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.startsWith(">") ? "text-neutral-400" : "text-white"
              }
            >
              <span className="mr-2">{line.startsWith(">") ? "" : ""}</span>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="p-4 flex bg-black">
          <span className="text-white mr-2">C:\&gt;</span>
          <input
            autoFocus
            type={isAuthenticating ? "password" : "text"}
            className="bg-transparent border-none outline-none w-full font-mono"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isAuthenticating ? "********" : ""}
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;

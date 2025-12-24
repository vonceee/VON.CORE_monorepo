
import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onDevModeSuccess: () => void;
  onDevModeOff: () => void;
  isDevMode: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose, onDevModeSuccess, onDevModeOff, isDevMode }) => {
  const [lines, setLines] = useState<string[]>(["VON.CORE [Version 1.0.42]", "Initializing secure link...", "Ready."]);
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
    const cleanInput = inputValue.trim();
    if (!cleanInput && !isAuthenticating) return;

    if (isAuthenticating) {
      // Prototype-level password check
      if (cleanInput === "voncore123") {
        setLines(prev => [...prev, "*******", "Authentication successful. Entering Dev Mode..."]);
        setTimeout(() => {
          setIsAuthenticating(false);
          onDevModeSuccess();
        }, 1000);
      } else {
        setLines(prev => [...prev, "*******", "Error: Invalid credentials. Access denied."]);
        setIsAuthenticating(false);
      }
      setInputValue("");
      return;
    }

    const cmd = cleanInput.toLowerCase();
    let response = "";

    switch (cmd) {
      case 'help':
        response = "Available: whois, portfolio, clear, contact, dev on, dev off, exit";
        break;
      case 'whois':
        response = "VON.CORE: A digital entity focused on brutalist minimalism.";
        break;
      case 'dev on':
        if (isDevMode) {
          response = "Already in Dev Mode.";
        } else {
          setIsAuthenticating(true);
          setLines(prev => [...prev, `> ${cleanInput}`, "Enter Password:"]);
          setInputValue("");
          return;
        }
        break;
      case 'dev off':
        if (!isDevMode) {
          response = "Not in Dev Mode.";
        } else {
          onDevModeOff();
          response = "Exiting Dev Mode. Returning to Public View...";
        }
        break;
      case 'clear':
        setLines([]);
        setInputValue("");
        return;
      case 'exit':
        onClose();
        return;
      default:
        response = `Command not found: ${cmd}`;
    }

    setLines(prev => [...prev, `> ${cleanInput}`, response]);
    setInputValue("");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10 terminal-blur bg-black/40">
      <div className="w-full max-w-2xl h-[500px] bg-black border border-white/20 rounded shadow-2xl flex flex-col font-mono text-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-b border-white/10">
          <span className="text-white/60">terminal.sh {isDevMode ? '[DEV]' : ''}</span>
          <button onClick={onClose} className="text-white/60 hover:text-white">✕</button>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-2">
          {lines.map((line, i) => (
            <div key={i} className={line.startsWith('>') ? "text-orange-500" : "text-neutral-300"}>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="p-4 border-t border-white/10 flex">
          <span className="text-orange-500 mr-2">$</span>
          <input
            autoFocus
            type={isAuthenticating ? "password" : "text"}
            className="bg-transparent border-none outline-none text-white w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isAuthenticating ? "********" : ""}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;

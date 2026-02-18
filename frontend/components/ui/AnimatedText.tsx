import React, { useState, useEffect, useRef } from "react";

interface AnimatedTextProps {
  text: string;
  type?: "decode" | "directional";
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
  delay?: number;
  once?: boolean;
  speed?: number;
  trigger?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  type = "directional",
  direction = "bottom",
  className = "",
  delay = 0,
  once = true,
  speed = 0.3,
  trigger,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const elementRef = useRef<HTMLDivElement>(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()_+";

  useEffect(() => {
    if (trigger !== undefined) {
      setIsVisible(trigger);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [once, trigger]);

  useEffect(() => {
    if (isVisible && type === "decode") {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += speed;
      }, 30);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [isVisible, text, type, speed]);

  const getDirectionStyles = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return "translate-x-[-40px] opacity-0";
        case "right":
          return "translate-x-[40px] opacity-0";
        case "top":
          return "translate-y-[-40px] opacity-0";
        case "bottom":
          return "translate-y-[40px] opacity-0";
      }
    }
    return "translate-x-0 translate-y-0 opacity-100";
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-1000 ease-out ${className} ${
        type === "directional" ? getDirectionStyles() : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {type === "decode" ? displayText : text}
    </div>
  );
};

export default AnimatedText;

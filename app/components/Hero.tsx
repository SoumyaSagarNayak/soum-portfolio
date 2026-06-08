"use client";

import { useEffect, useState, useRef } from "react";

const CODE_LINES = [
  { text: "const developer = {", color: "var(--ink)" },
  { text: '  name: "Soumya Sagar Nayak",', color: "var(--body-strong)" },
  { text: '  role: "Full-Stack Developer",', color: "var(--body-strong)" },
  { text: "  skills: [", color: "var(--ink)" },
  {
    text: '    "React", "Node.js", "TypeScript"',
    color: "var(--body)",
  },
  { text: "  ],", color: "var(--ink)" },
  { text: '  passion: "Building for the web"', color: "var(--body-strong)" },
  { text: "};", color: "var(--ink)" },
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [history, setHistory] = useState<{ type: "input" | "output" | "error"; text: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose developer object globally so user can interact with it
    (window as any).developer = {
      name: "Soumya Sagar Nayak",
      role: "Full-Stack Developer",
      skills: ["React", "Node.js", "TypeScript"],
      passion: "Building for the web"
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!inputValue.trim()) return;

      const newHistory = [...history, { type: "input" as const, text: inputValue }];

      // Simple transform to make let/const/var assignments global so they persist
      let codeToEval = inputValue;
      if (/^\s*(let|const|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*=/.test(codeToEval)) {
        codeToEval = codeToEval.replace(/^\s*(let|const|var)\s+([a-zA-Z_$][0-9a-zA-Z_$]*)/, "window.$2");
      }

      const originalLog = console.log;
      const logs: string[] = [];
      console.log = (...args) => {
        logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(" "));
        originalLog(...args); // Keep logging to the real console too
      };

      try {
        // eslint-disable-next-line no-eval
        const result = (0, eval)(codeToEval);

        if (logs.length > 0) {
          newHistory.push({ type: "output" as const, text: logs.join("\n") });
        }

        let outputText = "";
        if (result === undefined) {
          outputText = "undefined";
        } else if (typeof result === "object") {
          outputText = JSON.stringify(result, null, 2);
        } else {
          outputText = String(result);
        }

        newHistory.push({ type: "output" as const, text: outputText });
      } catch (err: any) {
        newHistory.push({ type: "error" as const, text: err.toString() });
      } finally {
        console.log = originalLog;
      }

      setHistory(newHistory);
      setInputValue("");

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 50);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative"
      style={{ padding: "var(--sp-3xl) var(--sp-xl)", paddingTop: "120px" }}
    >
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-[var(--sp-4xl)] items-center">
        {/* Left — Text */}
        <div className="animate-fade-in-up">
          <p
            className="text-[var(--mute)] text-[14px] font-medium leading-[20px] mb-[var(--sp-lg)] tracking-wide uppercase"
            style={{
              fontFamily:
                "var(--font-dm-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "13px",
              lineHeight: "18px",
            }}
          >
            Hello, I&apos;m
          </p>

          <h1
            className="text-[var(--ink)] mb-[var(--sp-xl)]"
            style={{
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-1.6px",
            }}
          >
            Soumya Sagar
            <br />
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), Georgia, 'Times New Roman', serif",
                fontStyle: "italic",
                fontWeight: 300,
                letterSpacing: "-0.5px",
              }}
            >
              Nayak
            </span>
          </h1>

          <p
            className="text-[var(--body)] mb-[var(--sp-2xl)] max-w-md"
            style={{ fontSize: "18px", lineHeight: "28px" }}
          >
            Full-stack developer crafting clean, responsive, and delightful web
            experiences. Currently pursuing B.Tech CSE at OUTR Bhubaneswar.
          </p>

          <div className="flex flex-wrap gap-[var(--sp-sm)]">
            <a
              href="#projects"
              className="inline-flex items-center text-[var(--on-primary)] text-[14px] font-medium leading-[20px] no-underline hover:opacity-90 transition-opacity"
              style={{
                background: "var(--primary)",
                padding: "var(--sp-sm) var(--sp-lg)",
                borderRadius: "var(--r-sm)",
              }}
            >
              View Projects
              <svg
                className="ml-1.5 w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center text-[var(--ink)] text-[14px] font-medium leading-[20px] no-underline border border-[var(--hairline)] hover:border-[var(--mute)] transition-colors"
              style={{
                padding: "var(--sp-sm) var(--sp-lg)",
                borderRadius: "var(--r-sm)",
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right — Terminal Mockup */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <div
            className="border border-[var(--hairline)]"
            style={{
              background: "var(--canvas-soft)",
              borderRadius: "var(--r-md)",
              overflow: "hidden",
            }}
          >
            {/* Terminal Title Bar */}
            <div
              className="flex items-center gap-2 border-b border-[var(--hairline)]"
              style={{ padding: "var(--sp-sm) var(--sp-lg)" }}
            >
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5a504a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#5a504a]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#5a504a]" />
              </div>
              <span
                className="text-[var(--mute)] ml-2"
                style={{
                  fontFamily:
                    "var(--font-dm-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: "12px",
                  lineHeight: "16px",
                }}
              >
                ~/sagar JS IDE
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={containerRef}
              onClick={focusInput}
              className="cursor-text"
              style={{
                padding: "var(--sp-lg)",
                fontFamily:
                  "var(--font-dm-mono), ui-monospace, SFMono-Regular, monospace",
                fontSize: "13px",
                lineHeight: "22px",
                height: "280px",
                overflowY: "auto",
              }}
            >
              {CODE_LINES.map((line, i) => (
                <div
                  key={i}
                  className="transition-opacity duration-300"
                  style={{
                    color: line.color,
                    opacity: i < visibleLines ? 1 : 0,
                    transform:
                      i < visibleLines
                        ? "translateY(0)"
                        : "translateY(4px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  {line.text}
                </div>
              ))}
              {visibleLines >= CODE_LINES.length && (
                <div className="mt-2">
                  {history.map((item, i) => (
                    <div key={i} className="mb-1 whitespace-pre-wrap">
                      {item.type === "input" && (
                        <div>
                          <span className="text-[var(--mute)]">❯ </span>
                          <span className="text-[var(--ink)]">{item.text}</span>
                        </div>
                      )}
                      {item.type === "output" && (
                        <div className="text-[var(--mute)]">{item.text}</div>
                      )}
                      {item.type === "error" && (
                        <div className="text-red-400">{item.text}</div>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center">
                    <span className="text-[var(--mute)]">❯ </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none outline-none text-[var(--ink)] ml-2"
                      style={{
                        fontFamily: "inherit",
                        fontSize: "inherit",
                      }}
                      spellCheck={false}
                      autoComplete="off"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span
          className="text-[var(--mute)]"
          style={{ fontSize: "12px", lineHeight: "16px" }}
        >
          scroll
        </span>
        <div className="w-[1px] h-8 bg-[var(--hairline)] relative overflow-hidden">
          <div
            className="w-full bg-[var(--mute)] absolute top-0"
            style={{
              height: "8px",
              animation: "scrollDown 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollDown {
          0% { top: -8px; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}

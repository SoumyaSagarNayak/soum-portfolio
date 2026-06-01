"use client";

import { useEffect, useRef, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS = [
  "var(--heatmap-0)",
  "var(--heatmap-1)",
  "var(--heatmap-2)",
  "var(--heatmap-3)",
  "var(--heatmap-4)",
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export default function GitHubHeatmap() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/SoumyaSagarNayak?y=last")
      .then((r) => r.json())
      .then((data) => {
        setContributions(data.contributions || []);
        setTotal(data.total?.lastYear || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Animate count up
  useEffect(() => {
    if (!isVisible || total === 0) return;
    const duration = 1500;
    const steps = 60;
    const increment = total / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= total) {
        setAnimatedTotal(total);
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, total]);

  // Group contributions into weeks
  const weeks: ContributionDay[][] = [];
  if (contributions.length > 0) {
    let currentWeek: ContributionDay[] = [];
    // Pad the first week
    const firstDate = new Date(contributions[0].date);
    const firstDay = firstDate.getDay(); // 0=Sun
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push({ date: "", count: -1, level: -1 });
    }
    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }
  }

  // Calculate month label positions
  const monthPositions: { label: string; x: number }[] = [];
  if (contributions.length > 0) {
    let lastMonth = -1;
    contributions.forEach((day, i) => {
      const month = new Date(day.date).getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        const weekIndex = Math.floor((i + new Date(contributions[0].date).getDay()) / 7);
        monthPositions.push({ label: MONTH_LABELS[month], x: weekIndex });
      }
    });
  }

  const cellSize = 11;
  const cellGap = 2;
  const leftPad = 28;
  const topPad = 20;

  return (
    <section
      id="github"
      ref={ref}
      className="section-reveal"
      style={{ padding: "var(--sp-3xl) var(--sp-xl)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-[var(--sp-3xl)]">
          <span
            className="text-[var(--mute)] block mb-[var(--sp-sm)]"
            style={{
              fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
              fontSize: "13px",
              lineHeight: "18px",
            }}
          >
            02
          </span>
          <div className="flex flex-wrap items-baseline gap-[var(--sp-lg)]">
            <h2
              className="text-[var(--ink)]"
              style={{
                fontSize: "32px",
                fontWeight: 500,
                lineHeight: "40px",
                letterSpacing: "-0.8px",
              }}
            >
              GitHub Activity
            </h2>
            {!loading && (
              <span
                className="text-[var(--body)]"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                <span
                  className="text-[var(--ink)] font-medium"
                  style={{
                    fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                    fontSize: "14px",
                  }}
                >
                  {animatedTotal}
                </span>{" "}
                contributions in the last year
              </span>
            )}
          </div>
        </div>

        {/* Heatmap Card */}
        <div
          className="border border-[var(--hairline)] overflow-x-auto"
          style={{
            background: "var(--canvas-soft)",
            borderRadius: "var(--r-md)",
            padding: "var(--sp-xl)",
          }}
        >
          {loading ? (
            <div
              className="flex items-center justify-center text-[var(--mute)]"
              style={{
                fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                fontSize: "13px",
                height: "120px",
              }}
            >
              Loading contribution data...
            </div>
          ) : (
            <svg
              width={leftPad + weeks.length * (cellSize + cellGap) + 8}
              height={topPad + 7 * (cellSize + cellGap) + 8}
              className="block"
            >
              {/* Month labels */}
              {monthPositions.map((mp, i) => (
                <text
                  key={i}
                  x={leftPad + mp.x * (cellSize + cellGap)}
                  y={12}
                  fill="var(--mute)"
                  fontSize="10"
                  fontFamily="var(--font-dm-mono), ui-monospace, monospace"
                >
                  {mp.label}
                </text>
              ))}

              {/* Day labels */}
              {DAY_LABELS.map((label, i) =>
                label ? (
                  <text
                    key={i}
                    x={0}
                    y={topPad + i * (cellSize + cellGap) + cellSize - 1}
                    fill="var(--mute)"
                    fontSize="10"
                    fontFamily="var(--font-dm-mono), ui-monospace, monospace"
                  >
                    {label}
                  </text>
                ) : null
              )}

              {/* Cells */}
              {weeks.map((week, wi) =>
                week.map((day, di) => {
                  if (day.level < 0) return null;
                  return (
                    <rect
                      key={`${wi}-${di}`}
                      x={leftPad + wi * (cellSize + cellGap)}
                      y={topPad + di * (cellSize + cellGap)}
                      width={cellSize}
                      height={cellSize}
                      rx={2}
                      fill={LEVEL_COLORS[day.level] || LEVEL_COLORS[0]}
                      style={{
                        animationName: isVisible ? "heatmapFade" : "none",
                        animationDuration: "0.3s",
                        animationTimingFunction: "ease-out",
                        animationFillMode: "forwards",
                        animationDelay: `${wi * 8 + di * 2}ms`,
                        opacity: isVisible ? undefined : 0,
                      }}
                    >
                      <title>{`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}</title>
                    </rect>
                  );
                })
              )}
            </svg>
          )}

          {/* Legend */}
          <div
            className="flex items-center justify-end gap-1 mt-[var(--sp-lg)]"
          >
            <span
              className="text-[var(--mute)] mr-1"
              style={{ fontSize: "10px" }}
            >
              Less
            </span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: cellSize,
                  height: cellSize,
                  background: color,
                  borderRadius: "2px",
                }}
              />
            ))}
            <span
              className="text-[var(--mute)] ml-1"
              style={{ fontSize: "10px" }}
            >
              More
            </span>
          </div>
        </div>

        {/* GitHub link */}
        <div className="mt-[var(--sp-lg)] flex justify-end">
          <a
            href="https://github.com/SoumyaSagarNayak"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[var(--body)] hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1.5 no-underline"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            View on GitHub
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

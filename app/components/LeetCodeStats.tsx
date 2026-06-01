"use client";

import { useEffect, useRef, useState } from "react";

interface SubmissionStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetCodeData {
  submitStats: {
    acSubmissionNum: SubmissionStat[];
    totalSubmissionNum: SubmissionStat[];
  };
  profile: {
    ranking: number;
    realName: string;
  };
}

const DIFFICULTY_CONFIG = [
  { key: "Easy", color: "#a89880", bgRing: "#3f3a36" },
  { key: "Medium", color: "#c9b896", bgRing: "#3f3a36" },
  { key: "Hard", color: "#f7f5f0", bgRing: "#3f3a36" },
];

function ProgressRing({
  solved,
  total,
  color,
  bgRing,
  label,
  isVisible,
}: {
  solved: number;
  total: number;
  color: string;
  bgRing: string;
  label: string;
  isVisible: boolean;
}) {
  const radius = 36;
  const stroke = 5;
  const circumference = 2 * Math.PI * radius;
  const progress = total > 0 ? solved / total : 0;
  const offset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-[var(--sp-sm)]">
      <div className="relative">
        <svg width={90} height={90} className="-rotate-90">
          {/* Background ring */}
          <circle
            cx={45}
            cy={45}
            r={radius}
            fill="none"
            stroke={bgRing}
            strokeWidth={stroke}
          />
          {/* Progress ring */}
          <circle
            cx={45}
            cy={45}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            style={{
              transition: "stroke-dashoffset 1.5s ease-out 0.3s",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-[var(--ink)]"
            style={{
              fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            {solved}
          </span>
        </div>
      </div>
      <span
        className="text-[var(--body)]"
        style={{ fontSize: "14px", lineHeight: "20px" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function LeetCodeStats() {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedTotal, setAnimatedTotal] = useState(0);
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
    fetch("https://leetcode-api-pied.vercel.app/user/icesagar")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Count-up animation
  useEffect(() => {
    if (!isVisible || !data) return;
    const totalSolved =
      data.submitStats.acSubmissionNum.find((s) => s.difficulty === "All")
        ?.count || 0;
    const duration = 1500;
    const steps = 60;
    const increment = totalSolved / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalSolved) {
        setAnimatedTotal(totalSolved);
        clearInterval(timer);
      } else {
        setAnimatedTotal(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, data]);

  const acStats = data?.submitStats.acSubmissionNum || [];
  const totalStats = data?.submitStats.totalSubmissionNum || [];
  const totalSolved = acStats.find((s) => s.difficulty === "All")?.count || 0;
  const totalSubmissions =
    totalStats.find((s) => s.difficulty === "All")?.submissions || 0;
  const acceptanceRate =
    totalSubmissions > 0
      ? ((totalSolved / totalSubmissions) * 100).toFixed(1)
      : "0";

  return (
    <section
      id="leetcode"
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
            04
          </span>
          <h2
            className="text-[var(--ink)]"
            style={{
              fontSize: "32px",
              fontWeight: 500,
              lineHeight: "40px",
              letterSpacing: "-0.8px",
            }}
          >
            LeetCode
          </h2>
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center text-[var(--mute)] border border-[var(--hairline)]"
            style={{
              fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
              fontSize: "13px",
              height: "200px",
              background: "var(--canvas-soft)",
              borderRadius: "var(--r-md)",
            }}
          >
            Loading LeetCode stats...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-xl)]">
            {/* Total Solved Card */}
            <div
              className="border border-[var(--hairline)] flex flex-col items-center justify-center"
              style={{
                background: "var(--canvas-soft)",
                borderRadius: "var(--r-md)",
                padding: "var(--sp-3xl) var(--sp-xl)",
              }}
            >
              <span
                className="text-[var(--ink)] mb-[var(--sp-sm)]"
                style={{
                  fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                  fontSize: "48px",
                  fontWeight: 400,
                  lineHeight: "52.8px",
                  letterSpacing: "-1.2px",
                }}
              >
                {animatedTotal}
              </span>
              <span
                className="text-[var(--body)]"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                Problems Solved
              </span>
              <div
                className="flex items-center gap-[var(--sp-xl)] mt-[var(--sp-xl)]"
              >
                <div className="text-center">
                  <span
                    className="text-[var(--mute)] block"
                    style={{ fontSize: "12px", lineHeight: "16px" }}
                  >
                    Acceptance
                  </span>
                  <span
                    className="text-[var(--ink)]"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {acceptanceRate}%
                  </span>
                </div>
                <div
                  className="w-[1px] h-6"
                  style={{ background: "var(--hairline)" }}
                />
                <div className="text-center">
                  <span
                    className="text-[var(--mute)] block"
                    style={{ fontSize: "12px", lineHeight: "16px" }}
                  >
                    Ranking
                  </span>
                  <span
                    className="text-[var(--ink)]"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {data?.profile.ranking?.toLocaleString() || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div
              className="border border-[var(--hairline)] flex items-center justify-center"
              style={{
                background: "var(--canvas-soft)",
                borderRadius: "var(--r-md)",
                padding: "var(--sp-3xl) var(--sp-xl)",
              }}
            >
              <div className="flex items-center gap-[var(--sp-3xl)]">
                {DIFFICULTY_CONFIG.map((diff) => {
                  const solved =
                    acStats.find((s) => s.difficulty === diff.key)?.count || 0;
                  const total =
                    totalStats.find((s) => s.difficulty === diff.key)
                      ?.submissions || 1;
                  return (
                    <ProgressRing
                      key={diff.key}
                      solved={solved}
                      total={total}
                      color={diff.color}
                      bgRing={diff.bgRing}
                      label={diff.key}
                      isVisible={isVisible}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* LeetCode link */}
        <div className="mt-[var(--sp-lg)] flex justify-end">
          <a
            href="https://leetcode.com/u/icesagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[var(--body)] hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1.5 no-underline"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            View on LeetCode
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

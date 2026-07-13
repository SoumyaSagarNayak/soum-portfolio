"use client";

import { useEffect, useRef } from "react";

const ACHIEVEMENTS = [
  {
    text: "Solved 196+ DSA problems on LeetCode covering arrays, strings, recursion, dynamic programming, and more.",
    tag: "DSA",
  },
  {
    text: "Selected in the top 250 out of 1000+ applicants for OWL-AI's inaugural virtual internship batch.",
    tag: "Internship",
  },
  {
    text: "Built and deployed real-world projects with strong UI/UX principles and responsive design practices.",
    tag: "Projects",
  },
  {
    text: "Recognized for active contributions in the Lets Code community and promoted from Community Member to Full Stack Developer Intern, collaborating directly with the founder on product improvements and growth initiatives.",
    tag: "Growth",
  },
  {
    text: "Active member of Zairza (Tech Club, OUTR), collaborating on tech-driven projects and innovation initiatives.",
    tag: "Community",
  },
  {
    text: "Active member of Cetadel (Literature Club, OUTR), collaborating on creative content, community engagement, and literary initiatives.",
    tag: "Community",
  },
];

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="achievements"
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
            08
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
            Achievements
          </h2>
        </div>

        <div className="space-y-0">
          {ACHIEVEMENTS.map((achievement, i) => (
            <div
              key={i}
              className="border-b border-[var(--hairline)] flex items-start gap-[var(--sp-lg)]"
              style={{ padding: "var(--sp-lg) 0" }}
            >
              <span
                className="text-[var(--mute)] shrink-0 mt-0.5"
                style={{
                  fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                  fontSize: "12px",
                  lineHeight: "16px",
                  padding: "var(--sp-xxs) var(--sp-xs)",
                  border: "1px solid var(--hairline)",
                  borderRadius: "var(--r-sm)",
                  background: "var(--canvas-soft)",
                }}
              >
                {achievement.tag}
              </span>
              <p
                className="text-[var(--body)]"
                style={{ fontSize: "16px", lineHeight: "24px" }}
              >
                {achievement.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

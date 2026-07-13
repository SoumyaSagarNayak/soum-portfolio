"use client";

import { useEffect, useRef } from "react";

const SKILL_CATEGORIES = [
  {
    title: "Languages",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    skills: [
      "C++",
      "JavaScript",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0L12 16.5l-5.571-2.25m11.142 0L21.75 16.5 12 21.75 2.25 16.5l4.179-2.25" />
      </svg>
    ),
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Bootstrap",
      "REST APIs",
      "Socket.io",
      "Clerk",
      "FastAPI",
    ],
  },
  {
    title: "Tools & Technologies",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    skills: [
      "Git",
      "GitHub",
      "MongoDB",
      "SQLite",
      "Vercel",
      "Render",
      "Figma",
      "VS Code",
      "Zapier",
    ],
  },
];

export default function Skills() {
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
      id="skills"
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
            03
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
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--sp-lg)]">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="border border-[var(--hairline)]"
              style={{
                background: "var(--canvas-soft)",
                borderRadius: "var(--r-md)",
                padding: "var(--sp-xl)",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-[var(--sp-xl)]">
                <div
                  className="flex items-center justify-center w-7 h-7 text-[var(--primary)]"
                  style={{
                    background: "var(--canvas)",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  {category.icon}
                </div>
                <h3
                  className="text-[var(--ink)]"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    lineHeight: "20px",
                  }}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-[var(--sp-sm)]">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[var(--body-strong)] border border-[var(--hairline)] hover:border-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-default"
                    style={{
                      fontFamily:
                        "var(--font-dm-mono), ui-monospace, monospace",
                      fontSize: "13px",
                      lineHeight: "18px",
                      padding: "var(--sp-xs) var(--sp-sm)",
                      borderRadius: "var(--r-sm)",
                      background: "var(--canvas)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

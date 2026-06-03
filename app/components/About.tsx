"use client";

import { useEffect, useRef } from "react";

export default function About() {
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
      id="about"
      ref={ref}
      className="section-reveal"
      style={{ padding: "var(--sp-3xl) var(--sp-xl)" }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-[var(--sp-3xl)]">
          <span
            className="text-[var(--mute)] block mb-[var(--sp-sm)]"
            style={{
              fontFamily:
                "var(--font-dm-mono), ui-monospace, SFMono-Regular, monospace",
              fontSize: "13px",
              lineHeight: "18px",
            }}
          >
            01
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
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-[var(--sp-3xl)]">
          {/* Bio */}
          <div className="lg:col-span-3">
            <p
              className="text-[var(--body-strong)] mb-[var(--sp-xl)]"
              style={{ fontSize: "18px", lineHeight: "28px" }}
            >
              I&apos;m a passionate full-stack developer and Computer Science student
              who loves building things that live on the internet. I care deeply
              about creating clean, accessible, and performant digital
              experiences.
            </p>
            <p
              className="text-[var(--body)]"
              style={{ fontSize: "17px", lineHeight: "24px" }}
            >
              I love building products that solve real problems. Confident in frontend development and comfortable working with backend technologies, I enjoy creating scalable, responsive, and user-friendly applications. Whether it's designing interfaces, integrating APIs, or optimizing performance, I thrive on turning ideas into polished products. Outside of coding, you'll usually find me solving DSA problems, playing chess, or sketching.
            </p>
          </div>

          {/* Education Card */}
          <div className="lg:col-span-2">
            <div
              className="border border-[var(--hairline)]"
              style={{
                background: "var(--canvas-soft)",
                borderRadius: "var(--r-md)",
                padding: "var(--sp-xl)",
              }}
            >
              <div className="flex items-start gap-3 mb-[var(--sp-lg)]">
                <div
                  className="flex items-center justify-center w-8 h-8 shrink-0"
                  style={{
                    background: "var(--canvas)",
                    borderRadius: "var(--r-sm)",
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <svg
                    className="w-4 h-4 text-[var(--primary)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>
                <div>
                  <h3
                    className="text-[var(--ink)]"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    Education
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p
                    className="text-[var(--ink)]"
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      lineHeight: "20px",
                    }}
                  >
                    B.Tech, Computer Science
                  </p>
                  <p
                    className="text-[var(--body)]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    Odisha University of Technology and Research (OUTR)
                  </p>
                  <p
                    className="text-[var(--body)]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    Bhubaneswar
                  </p>
                </div>

                <div
                  className="border-t border-[var(--hairline)]"
                  style={{ paddingTop: "var(--sp-sm)" }}
                >
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[var(--mute)]"
                      style={{ fontSize: "12px", lineHeight: "16px" }}
                    >
                      2023 – 2027
                    </span>
                    <span
                      className="text-[var(--ink)]"
                      style={{
                        fontFamily:
                          "var(--font-dm-mono), ui-monospace, monospace",
                        fontSize: "13px",
                        lineHeight: "18px",
                        fontWeight: 500,
                      }}
                    >
                      CGPA: 8.43
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

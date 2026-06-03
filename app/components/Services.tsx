"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Frontend Engineering",
    description: "Frontend is my most comfortable area. I love building highly performant, responsive, and reactive user interfaces using React, Next.js, and TypeScript. Focused on scalable architectures, clean code, and smooth UX. I can also design a bit and work with Canva and Figma."
  },
  {
    num: "02",
    title: "Backend Architecture",
    description: "Designing robust, scalable APIs and server-side logic using Node.js, Express, and databases, with real-time capabilities and secure data flows. I can work in backend too to support full-stack application development."
  },
  {
    num: "03",
    title: "UI/UX Design",
    description: "Bridging the gap between design and code. Creating modern, visually stunning user interfaces and mockups using Figma and Canva, then translating them into fully interactive, pixel-perfect frontend experiences."
  }
];

export default function Services() {
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
      id="services"
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
            05
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
            Services
          </h2>
        </div>

        {/* Services Rows */}
        <div className="border-t border-[var(--hairline)] text-left">
          {SERVICES.map((service, i) => (
            <div
              key={service.num}
              className="border-b border-[var(--hairline)] flex flex-col sm:flex-row items-start gap-[var(--sp-xl)] transition-colors hover:bg-[var(--canvas-soft)]/20"
              style={{
                padding: "var(--sp-2xl) 0",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {/* Number on the Left */}
              <div
                className="text-[var(--ink)] font-extrabold shrink-0 select-none"
                style={{
                  fontSize: "48px",
                  lineHeight: "1",
                  letterSpacing: "-1px",
                  width: "80px",
                }}
              >
                {service.num}
              </div>

              {/* Title & Description on the Right */}
              <div className="flex-1">
                <h3
                  className="text-[var(--ink)] font-bold mb-[var(--sp-sm)]"
                  style={{
                    fontSize: "20px",
                    lineHeight: "28px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[var(--body)]"
                  style={{
                    fontSize: "15px",
                    lineHeight: "24px",
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

const EXPERIENCES = [
  {
    role: "Full Stack Engineer",
    company: "Webyalaya",
    period: "Jun 2026 – Present",
    points: [
      "Developing and maintaining full-stack features for a peer-to-peer learning platform using modern web technologies.",
      "Building responsive user interfaces and integrating backend APIs to deliver scalable and seamless user experiences.",
      "Contributing to automation workflows, website improvements, and collaborative development using Git and GitHub."
    ],
    skills: [
      "React.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Git",
      "GitHub",
      "REST APIs"
    ],
    links: [
      { label: "Website", url: "https://www.webyalaya.com/" }
    ]
  },
  {
    role: "Full Stack Engineer",
    company: "Coinslive.in",
    period: "May 2026 – Jun 2026",
    points: [
      "Built responsive UI features using React/HTML/CSS that improved content accessibility for non-technical learners.",
      "Contributed to a platform designed to reduce Web3 misinformation—supporting real-world digital literacy impact.",
    ],
    skills: ["HTML5", "Zapier", "React.js", "CSS3", "JavaScript"],
    links: [
      { label: "Website", url: "https://coinslive.in" },
      { label: "Offer Letter", url: "/resume/offer_letter_soumyacoin.pdf" },
    ],
  },
  {
    role: "Summer Intern",
    company: "Overload Ware Labs AI (OWL-AI)",
    period: "Aug 2025 – Aug 2025",
    points: [
      "Selected as part of OWL-AI's inaugural batch (top 250 out of 1000+ applicants) for a 1-month virtual internship.",
      "Developed the OWL AI Project, gaining hands-on experience in AI applications and real-world project workflows.",
      "Contributed to live projects with mentorship, enhancing practical skills in AI, teamwork, and problem-solving.",
    ],
    skills: ["Python", "Machine Learning", "AI Applications", "Teamwork"],
    links: [
      { label: "GitHub", url: "https://github.com/SoumyaSagarNayak/owl.ai" },
      { label: "Live", url: "https://owl-ai-zeta.vercel.app/" },
    ],
  },
  {
    role: "Junior Manager",
    company: "AIESEC in India",
    period: "Feb 2024 – Nov 2024",
    points: [
      "Led event coordination, mentored new recruits, managed socialization programs, and ensured event success.",
      "Strengthened skills in communication, teamwork, multi-tasking, and real-time problem-solving.",
      "Collaborated with local and international teams for project execution, planning, and community outreach.",
    ],
    skills: ["Leadership", "Event Management", "Communication", "Problem-solving"],
    links: [],
  },
];

export default function Experience() {
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
      id="experience"
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
            06
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
            Experience
          </h2>
        </div>

        <div className="space-y-0">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="border-b border-[var(--hairline)]"
              style={{ padding: "var(--sp-xl) 0" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-[var(--sp-lg)]">
                <div>
                  <h3
                    className="text-[var(--ink)]"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    {exp.role}
                  </h3>
                  <p
                    className="text-[var(--body-strong)]"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    {exp.company}
                  </p>
                </div>
                <span
                  className="text-[var(--mute)] shrink-0"
                  style={{
                    fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                    fontSize: "13px",
                    lineHeight: "18px",
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <ul className="space-y-2">
                {exp.points.map((point, j) => (
                  <li
                    key={j}
                    className="text-[var(--body)] flex gap-2"
                    style={{ fontSize: "14px", lineHeight: "20px" }}
                  >
                    <span className="text-[var(--mute)] shrink-0 mt-1">›</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-[var(--sp-lg)]">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[var(--mute)] border border-[var(--hairline)] hover:border-[var(--mute)] hover:text-[var(--ink)] transition-colors cursor-default"
                      style={{
                        fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                        fontSize: "11px",
                        lineHeight: "15px",
                        padding: "2px 6px",
                        borderRadius: "var(--r-sm)",
                        background: "var(--canvas-soft)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {exp.links.length > 0 && (
                <div className="flex gap-[var(--sp-lg)] mt-[var(--sp-lg)]">
                  {exp.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-[var(--body)] hover:text-[var(--ink)] transition-colors inline-flex items-center gap-1 no-underline"
                      style={{
                        fontFamily:
                          "var(--font-dm-mono), ui-monospace, monospace",
                        fontSize: "13px",
                        lineHeight: "18px",
                      }}
                    >
                      {link.label}
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

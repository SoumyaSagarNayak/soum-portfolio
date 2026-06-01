"use client";

import { useEffect, useRef, useState } from "react";

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  fork: boolean;
  topics: string[];
  updated_at: string;
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#c9b896",
  JavaScript: "#c9b896",
  CSS: "#a89880",
  HTML: "#a89880",
  Python: "#dad2c1",
  "C++": "#f7f5f0",
  null: "var(--mute)",
};

// Repos to exclude (profile config, forks, non-projects)
const EXCLUDE_REPOS = [
  "SoumyaSagarNayak",
  "copilot-codespaces-vscode",
  "AI-Agents-Projects",
  "mindsdb",
  "daytona",
  "ecrypto",
  "ETray",
];

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch(
      "https://api.github.com/users/SoumyaSagarNayak/repos?sort=updated&per_page=30"
    )
      .then((r) => r.json())
      .then((data: Repo[]) => {
        const filtered = data
          .filter(
            (repo) =>
              !repo.fork && !EXCLUDE_REPOS.includes(repo.name)
          )
          .slice(0, 12);
        setRepos(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section
      id="projects"
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
            Projects
          </h2>
          <p
            className="text-[var(--body)] mt-[var(--sp-sm)]"
            style={{ fontSize: "16px", lineHeight: "24px" }}
          >
            Pulled live from GitHub — always up to date.
          </p>
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
            Fetching repositories...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-lg)]">
            {repos.map((repo, i) => (
              <div
                key={repo.name}
                className="border border-[var(--hairline)] card-hover flex flex-col"
                style={{
                  background: "var(--canvas-soft)",
                  borderRadius: "var(--r-md)",
                  padding: "var(--sp-xl)",
                  animationDelay: `${i * 0.05}s`,
                }}
              >
                {/* Title + Links */}
                <div className="flex items-start justify-between mb-[var(--sp-sm)]">
                  <h3
                    className="text-[var(--ink)]"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      lineHeight: "24px",
                    }}
                  >
                    {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                  </h3>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
                        aria-label="Live demo"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors"
                      aria-label="GitHub repository"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="text-[var(--body)] flex-1"
                  style={{
                    fontSize: "14px",
                    lineHeight: "20px",
                    marginBottom: "var(--sp-lg)",
                  }}
                >
                  {repo.description || "No description provided."}
                </p>

                {/* Footer: Language + Stars */}
                <div className="flex items-center gap-[var(--sp-lg)]">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          background:
                            LANG_COLORS[repo.language] || "var(--mute)",
                        }}
                      />
                      <span
                        className="text-[var(--body)]"
                        style={{
                          fontFamily:
                            "var(--font-dm-mono), ui-monospace, monospace",
                          fontSize: "12px",
                          lineHeight: "16px",
                        }}
                      >
                        {repo.language}
                      </span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3.5 h-3.5 text-[var(--mute)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                      <span
                        className="text-[var(--mute)]"
                        style={{
                          fontFamily:
                            "var(--font-dm-mono), ui-monospace, monospace",
                          fontSize: "12px",
                        }}
                      >
                        {repo.stargazers_count}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GitHub link */}
        <div className="mt-[var(--sp-xl)] flex justify-center">
          <a
            href="https://github.com/SoumyaSagarNayak?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--ink)] text-[14px] font-medium leading-[20px] no-underline border border-[var(--hairline)] hover:border-[var(--mute)] transition-colors"
            style={{
              padding: "var(--sp-sm) var(--sp-lg)",
              borderRadius: "var(--r-sm)",
            }}
          >
            View All Repositories
            <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

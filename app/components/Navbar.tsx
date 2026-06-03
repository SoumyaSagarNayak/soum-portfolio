"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "border-b border-[var(--hairline)] bg-[var(--canvas)]/95 backdrop-blur-md"
        : "bg-[var(--canvas)]"
        }`}
      style={{ padding: "var(--sp-md) var(--sp-xl)" }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#"
          className="text-[var(--ink)] font-medium text-[14px] leading-[20px] tracking-tight no-underline hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
        >
          Soumya Sagar
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-[var(--sp-xs)]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[var(--ink)] text-[14px] font-medium leading-[20px] no-underline hover:text-[var(--body-strong)] transition-colors"
              style={{
                padding: "var(--sp-xs) var(--sp-md)",
                borderRadius: "var(--r-sm)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume/re.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center text-[var(--on-primary)] text-[14px] font-medium leading-[20px] no-underline hover:opacity-90 transition-opacity"
            style={{
              background: "var(--primary)",
              padding: "var(--sp-sm) var(--sp-lg)",
              borderRadius: "var(--r-sm)",
            }}
          >
            Resume
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
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          <span
            className={`hamburger-line block w-5 h-[1.5px] bg-[var(--ink)] origin-center ${isOpen ? "translate-y-[4.5px] rotate-45" : ""
              }`}
          />
          <span
            className={`hamburger-line block w-5 h-[1.5px] bg-[var(--ink)] ${isOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`hamburger-line block w-5 h-[1.5px] bg-[var(--ink)] origin-center ${isOpen ? "-translate-y-[4.5px] -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden animate-slide-down border-t border-[var(--hairline)] mt-[var(--sp-md)]"
          style={{ padding: "var(--sp-lg) 0" }}
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-[var(--ink)] text-[14px] font-medium leading-[20px] no-underline hover:text-[var(--body-strong)] transition-colors"
                style={{
                  padding: "var(--sp-sm) var(--sp-md)",
                  borderRadius: "var(--r-sm)",
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume/re.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center text-[var(--on-primary)] text-[14px] font-medium leading-[20px] no-underline"
              style={{
                background: "var(--primary)",
                padding: "var(--sp-sm) var(--sp-lg)",
                borderRadius: "var(--r-sm)",
              }}
            >
              Download Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="border-t border-[var(--hairline)]"
      style={{ padding: "var(--sp-3xl) var(--sp-xl)" }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-[var(--sp-lg)]">
        <p
          className="text-[var(--mute)]"
          style={{ fontSize: "14px", lineHeight: "20px" }}
        >
          © {new Date().getFullYear()} Soumya Sagar Nayak
        </p>

        <div className="flex items-center gap-[var(--sp-lg)]">
          <a
            href="https://github.com/SoumyaSagarNayak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors no-underline"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            GitHub
          </a>
          <span className="text-[var(--hairline)]">·</span>
          <a
            href="https://linkedin.com/in/soumya-sagar-nayak-498352295"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors no-underline"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            LinkedIn
          </a>
          <span className="text-[var(--hairline)]">·</span>
          <a
            href="https://leetcode.com/u/icesagar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--mute)] hover:text-[var(--ink)] transition-colors no-underline"
            style={{ fontSize: "14px", lineHeight: "20px" }}
          >
            LeetCode
          </a>
        </div>

        <p
          className="text-[var(--mute)]"
          style={{
            fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
            fontSize: "12px",
            lineHeight: "16px",
          }}
        >
          Built with Next.js
        </p>
      </div>
    </footer>
  );
}

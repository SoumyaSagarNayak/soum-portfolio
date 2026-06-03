"use client";

import { useEffect, useRef } from "react";

const CERTIFICATES = [
  {
    name: "SAP Certified - Back-End Developer - ABAP Cloud",
    issuer: "SAP",
    issued_at: "2026-06-03",
    image: "https://images.credly.com/images/5489be1c-ce49-4cf3-8b24-eee50e5259be/blob",
    url: "https://www.credly.com/org/sap/badge/sap-certified-back-end-developer-abap-cloud",
    description: "This certification verifies familiarity with the core principles of the ABAP programming language, writing simple applications based on the ABAP RESTful Application Programming Model, and Clean Core principles for creating custom extensions in SAP S/4HANA."
  },
  {
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco",
    issued_at: "2026-05-29",
    image: "https://images.credly.com/images/0a6d331e-8abf-4272-a949-33f754569a76/CCNAENSA__1_.png",
    url: "https://www.credly.com/org/cisco/badge/ccna-enterprise-networking-security-and-automation",
    description: "Cisco verifies successful completion of the CCNA Enterprise Networking, Security, and Automation course. Covers scalable network architectures, dynamic routing, mitigating security threats, wide-area networks, virtualization, and network automation."
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    issued_at: "2026-05-29",
    image: "https://images.credly.com/images/70d71df5-f3dc-4380-9b9d-f22513a70417/CCNAITN__1_.png",
    url: "https://www.credly.com/org/cisco/badge/ccna-introduction-to-networks",
    description: "Verifies foundational knowledge of networking, including IP addressing, Ethernet protocols, and configuration of basic connectivity between switches, routers, and end devices."
  },
  {
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    issued_at: "2026-05-29",
    image: "https://images.credly.com/images/f4ccdba9-dd65-4349-baad-8f05df116443/CCNASRWE__1_.png",
    url: "https://www.credly.com/org/cisco/badge/ccna-switching-routing-and-wireless-essentials.1",
    description: "Verifies knowledge of switching operations, wired and wireless LAN configuration using security best practices, redundancy protocols, and advanced troubleshooting."
  },
  {
    name: "Apply AI: Analyze Customer Reviews",
    issuer: "Cisco",
    issued_at: "2026-05-25",
    image: "https://images.credly.com/images/32aad19b-a359-48f5-a332-2cd9ac2b8731/blob",
    url: "https://www.credly.com/org/cisco/badge/apply-ai-analyze-customer-reviews",
    description: "Verifies application of thematic analysis to tables of text data using AI and spreadsheet apps, demonstrating competency in picking optimal AI models or non-AI tools for business analytical tasks."
  },
  {
    name: "Introduction to Data Science",
    issuer: "Cisco",
    issued_at: "2026-05-25",
    image: "https://images.credly.com/images/b38a42e0-dc58-4ce2-b6c0-28d978e8aaad/image.png",
    url: "https://www.credly.com/org/cisco/badge/introduction-to-data-science",
    description: "Covers fundamental concepts of Data Analytics, Data Engineering, Data Science, and Machine Learning/AI roles in modern business environments."
  },
  {
    name: "Python Essentials 1",
    issuer: "Python Institute / Cisco",
    issued_at: "2026-05-25",
    image: "https://images.credly.com/images/68c0b94d-f6ac-40b1-a0e0-921439eb092e/image.png",
    url: "https://www.credly.com/org/cisco/badge/python-essentials-1.1",
    description: "Covers essentials of computer programming syntax, semantics, and standard operations in the Python programming language."
  },
  {
    name: "Python Essentials 2",
    issuer: "Python Institute / Cisco",
    issued_at: "2026-05-25",
    image: "https://images.credly.com/images/3f802526-7274-4230-91ab-f6d1a35340e6/image.png",
    url: "https://www.credly.com/org/cisco/badge/python-essentials-2",
    description: "Covers intermediate Python programming concepts including packages, modules, exceptions, file processing, and object-oriented programming (OOP)."
  },
  {
    name: "Introduction to Modern AI",
    issuer: "Cisco",
    issued_at: "2025-08-15",
    image: "https://images.credly.com/images/e2d12302-10f9-40d4-8ff1-066a7008b61d/blob",
    url: "https://www.credly.com/org/cisco/badge/introduction-to-modern-ai",
    description: "Verifies practical understanding of AI systems, chatbot prompting engineering, and working with modern AI models and machine translation services."
  },
  {
    name: "Introduction to Cybersecurity",
    issuer: "Cisco",
    issued_at: "2025-08-05",
    image: "https://images.credly.com/images/af8c6b4e-fc31-47c4-8dcb-eb7a2065dc5b/I2CS__1_.png",
    url: "https://www.credly.com/org/cisco/badge/introduction-to-cybersecurity",
    description: "Covers introductory concepts of cybersecurity, network threat mitigation, vulnerability detection, and defense mechanisms."
  }
];

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split("-");
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIdx = parseInt(month, 10) - 1;
  return `${monthNames[monthIdx]} ${year}`;
}

export default function Certificates() {
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

  return (
    <section
      id="certificates"
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
            09
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
            Certificates & Badges
          </h2>
          <p
            className="text-[var(--body)] mt-[var(--sp-sm)]"
            style={{ fontSize: "16px", lineHeight: "24px" }}
          >
            Verified technical credentials and certifications.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--sp-lg)]">
          {CERTIFICATES.map((cert, i) => (
            <div
              key={cert.name}
              className="border border-[var(--hairline)] card-hover flex flex-col sm:flex-row gap-[var(--sp-lg)]"
              style={{
                background: "var(--canvas-soft)",
                borderRadius: "var(--r-md)",
                padding: "var(--sp-xl)",
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {/* Left Side: Badge Graphic */}
              <div
                className="shrink-0 flex items-center justify-center bg-[var(--canvas)] p-2.5 border border-[var(--hairline)] w-[84px] h-[84px] self-start sm:self-center"
                style={{ borderRadius: "var(--r-md)" }}
              >
                <img
                  src={cert.image}
                  alt={cert.name}
                  className="w-16 h-16 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Right Side: Info */}
              <div className="flex-1 flex flex-col justify-between min-h-[84px]">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3
                      className="text-[var(--ink)]"
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        lineHeight: "22px",
                      }}
                    >
                      {cert.name}
                    </h3>
                    <span
                      className="text-[var(--mute)] shrink-0 mt-0.5"
                      style={{
                        fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                        fontSize: "11px",
                        lineHeight: "16px",
                      }}
                    >
                      {formatDate(cert.issued_at)}
                    </span>
                  </div>
                  
                  <p
                    className="text-[var(--mute)] mt-0.5"
                    style={{
                      fontFamily: "var(--font-dm-mono), ui-monospace, monospace",
                      fontSize: "12px",
                      lineHeight: "16px",
                    }}
                  >
                    {cert.issuer}
                  </p>

                  <p
                    className="text-[var(--body)] mt-2"
                    style={{
                      fontSize: "13.5px",
                      lineHeight: "19px",
                    }}
                  >
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--body-strong)] hover:text-[var(--ink)] transition-colors no-underline link-underline"
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    Verify Credential
                    <svg className="ml-1 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Credly profile link */}
        <div className="mt-[var(--sp-xl)] flex justify-center">
          <a
            href="https://www.credly.com/users/soumya-sagar-nayak.ae8822ea"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--ink)] text-[14px] font-medium leading-[20px] no-underline border border-[var(--hairline)] hover:border-[var(--mute)] transition-colors"
            style={{
              padding: "var(--sp-sm) var(--sp-lg)",
              borderRadius: "var(--r-sm)",
            }}
          >
            View All on Credly
            <svg className="ml-1.5 w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Inter, DM_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "400",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Soumya Sagar Nayak — Developer Portfolio",
  description:
    "Full-stack developer crafting clean, responsive, and delightful web experiences. B.Tech CSE student at OUTR Bhubaneswar. Skilled in React, Node.js, and modern JavaScript.",
  keywords: [
    "Soumya Sagar Nayak",
    "portfolio",
    "developer",
    "React",
    "Node.js",
    "full-stack",
    "web developer",
  ],
  authors: [{ name: "Soumya Sagar Nayak" }],
  openGraph: {
    title: "Soumya Sagar Nayak — Developer Portfolio",
    description:
      "Full-stack developer crafting clean, responsive, and delightful web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

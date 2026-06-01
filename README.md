# ⚡ Soumya Sagar Nayak — Developer Portfolio

A minimalist, high-performance developer portfolio built with Next.js and Tailwind CSS. Features a Warp-inspired dark UI, live API integrations for GitHub and LeetCode, and an interactive JavaScript REPL terminal.

[![Next.js](https://img.shields.io/badge/Next.js-16+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Key Features

- **Interactive JS Terminal**: The hero section isn't just for show. Click the terminal, type JavaScript code (e.g., `developer.skills.push("Python")`), and see it execute live with scope persistence!
- **Live GitHub Heatmap**: Dynamically fetches and renders the last 365 days of GitHub contributions in a beautiful, staggered SVG grid.
- **LeetCode Integration**: Automatically pulls live problem-solving stats (Easy/Medium/Hard) and acceptance rates, visualized with animated progress rings.
- **Dynamic Projects Showcase**: Fetches the latest pinned and updated repositories directly from the GitHub API.
- **Warp-Inspired UI/UX**: A clean, distraction-free aesthetic utilizing `Inter`, `DM Mono`, and `Instrument Serif`, accented by a refined warm-dark color palette.
- **Fully Responsive**: Flawless experience across all devices with scroll-triggered fade animations and interactive hover states.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS Variables + [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Data Fetching**: Native `fetch` with Intersection Observers for lazy rendering
- **APIs Used**:
  - GitHub REST API (Repositories)
  - jogruber's GitHub Contributions API (Heatmap)
  - LeetCode Public API Wrapper (Stats)

## 🚀 Getting Started

Want to run this locally or use it as a template?

### 1. Clone the repository
```bash
git clone https://github.com/SoumyaSagarNayak/soum-portfolio.git
cd soum-portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
soum-portfolio/
├── app/
│   ├── components/
│   │   ├── About.tsx          # Bio & Education
│   │   ├── Achievements.tsx   # Accomplishments row
│   │   ├── Contact.tsx        # Socials & Email links
│   │   ├── Experience.tsx     # Timeline & Roles
│   │   ├── GitHubHeatmap.tsx  # Live SVG contribution graph
│   │   ├── Hero.tsx           # Interactive Terminal & Intro
│   │   ├── LeetCodeStats.tsx  # Live progress rings
│   │   ├── Navbar.tsx         # Sticky blurred nav
│   │   ├── Projects.tsx       # Live repo fetching
│   │   └── Skills.tsx         # Tech stack grids
│   ├── globals.css            # Custom Design Tokens & Animations
│   ├── layout.tsx             # Fonts & Meta tags
│   └── page.tsx               # Component composition
└── public/
    └── resume/                # PDF Resume assets
```

## 📬 Contact & Links

- **GitHub**: [@SoumyaSagarNayak](https://github.com/SoumyaSagarNayak)
- **LinkedIn**: [Soumya Sagar Nayak](https://linkedin.com/in/soumya-sagar-nayak-498352295)
- **LeetCode**: [@icesagar](https://leetcode.com/u/icesagar/)

---
*Designed & Built by Soumya Sagar Nayak*

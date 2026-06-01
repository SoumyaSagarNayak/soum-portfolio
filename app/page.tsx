import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import GitHubHeatmap from "./components/GitHubHeatmap";
import Skills from "./components/Skills";
import LeetCodeStats from "./components/LeetCodeStats";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <GitHubHeatmap />
        <Skills />
        <LeetCodeStats />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}

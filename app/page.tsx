import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import GitHubHeatmap from "./components/GitHubHeatmap";
import Skills from "./components/Skills";
import LeetCodeStats from "./components/LeetCodeStats";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Certificates from "./components/Certificates";
import Contact from "./components/Contact";
import CursorCat from "./components/CursorCat";

export default function Home() {
  return (
    <>
      <Navbar />
      <CursorCat />
      <main>
        <Hero />
        <About />
        <GitHubHeatmap />
        <Skills />
        <LeetCodeStats />
        <Services />
        <Experience />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
      </main>
    </>
  );
}

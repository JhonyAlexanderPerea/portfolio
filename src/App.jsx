import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <BackToTop />
      <footer className="py-8 text-center text-xs font-mono text-text-muted/60 border-t border-border">
        construido con React + Tailwind — {new Date().getFullYear()}
      </footer>
    </div>
  );
}

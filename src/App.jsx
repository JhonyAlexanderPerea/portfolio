import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import { useLanguage } from "./i18n";

export default function App() {
  const { t } = useLanguage();

  return (
    <div className="site-shell min-h-screen text-text">
      <div className="ambient-background" aria-hidden="true" />
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
        {t.footer} — {new Date().getFullYear()}
      </footer>
    </div>
  );
}

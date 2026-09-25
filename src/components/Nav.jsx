import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const NAV = [
  { href: "#sobre-mi", label: "sobre-mi", id: "sobre-mi" },
  { href: "#skills", label: "skills", id: "skills" },
  { href: "#proyectos", label: "proyectos", id: "proyectos" },
  { href: "#contacto", label: "contacto", id: "contacto" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur border-b border-border" : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between font-mono text-sm">
        <a href="#" className="text-text font-semibold tracking-tight">
          <span className="text-accent">~/</span>
          {profile.handle.toLowerCase()}
        </a>
        <ul className="hidden sm:flex items-center gap-7 text-text-muted">
          {NAV.map((item) => (
            <li key={item.href} className="relative py-1">
              <a
                href={item.href}
                className={`transition-colors ${
                  active === item.id ? "text-accent" : "hover:text-accent"
                }`}
              >
                {item.label}
              </a>
              {active === item.id && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-accent shadow-[0_0_6px_rgba(57,255,106,0.8)]" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

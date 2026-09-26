import { useEffect, useMemo, useRef, useState } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "../i18n";

const NAV_IDS = ["sobre-mi", "skills", "proyectos", "contacto"];

export default function Nav() {
  const { language, setLanguage, profile, t } = useLanguage();
  const nav = useMemo(() => NAV_IDS.map((id, index) => ({
    href: `#${id}`,
    label: Object.values(t.nav)[index],
    id,
  })), [t.nav]);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigationTarget = useRef(null);

  useEffect(() => {
    const sections = nav.map((item) => document.getElementById(item.id)).filter(Boolean);

    const updateActiveSection = () => {
      const marker = Math.min(window.innerHeight * 0.38, 260);
      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;

      if (reachedBottom && sections.length) {
        setActive(sections[sections.length - 1].id);
        return;
      }

      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= marker && bounds.bottom > marker;
      });

      if (current) {
        setActive(current.id);
        return;
      }

      const previous = sections.reduce((activeSection, section) => {
        return section.getBoundingClientRect().top <= marker ? section : activeSection;
      }, null);

      setActive(previous?.id ?? "");
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      if (navigationTarget.current) {
        const target = document.getElementById(navigationTarget.current);
        const targetTop = target?.getBoundingClientRect().top ?? 0;

        if (target && Math.abs(targetTop - 80) > 12) return;

        setActive(navigationTarget.current);
        navigationTarget.current = null;
        return;
      }

      updateActiveSection();
    };

    const cancelNavigation = () => {
      navigationTarget.current = null;
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("wheel", cancelNavigation, { passive: true });
    window.addEventListener("touchstart", cancelNavigation, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("wheel", cancelNavigation);
      window.removeEventListener("touchstart", cancelNavigation);
    };
  }, [nav]);

  function handleNavigation(event, id) {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    navigationTarget.current = id;
    setActive(id);
    setMenuOpen(false);
    window.scrollTo({
      top: Math.max(section.offsetTop - 80, 0),
      behavior: "smooth",
    });
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur border-b border-border" : ""
      }`}
    >
      <nav className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between font-mono text-sm">
        <a href="#" className="text-text font-semibold tracking-tight">
          <span className="text-accent">~/</span>
          {profile.handle.toLowerCase()}
        </a>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? t.accessibility.closeMenu : t.accessibility.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
          className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden="true" className="text-lg leading-none">{menuOpen ? "x" : "="}</span>
        </button>
        <ul
          id="site-navigation"
          className={`${menuOpen ? "flex" : "hidden"} absolute left-4 right-4 top-[4.5rem] flex-col gap-1 rounded-lg border border-border bg-surface/95 p-3 text-text-muted shadow-xl backdrop-blur sm:static sm:flex sm:flex-row sm:items-center sm:gap-7 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none`}
        >
          {nav.map((item) => (
            <li key={item.href} className="relative py-1">
              <a
                href={item.href}
                onClick={(event) => handleNavigation(event, item.id)}
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
        <button
          type="button"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
          className="ml-3 inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
          aria-label={t.switchLanguage}
          title={t.switchLanguage}
        >
          <Languages size={14} aria-hidden="true" />
          <span>{language.toUpperCase()}</span>
        </button>
      </nav>
    </header>
  );
}

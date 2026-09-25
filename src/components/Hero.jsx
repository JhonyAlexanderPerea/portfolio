import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile, links, skillGroups, projects } from "../data/profile";
import Avatar from "./Avatar";

const INTRO_LINES = [
  { cmd: "whoami", out: [`${profile.name}`, `> ${profile.role}`] },
  { cmd: "cat about.txt", out: [profile.bio] },
  { cmd: "echo $STATUS", out: [profile.status] },
];

const HELP_TEXT = [
  "comandos disponibles:",
  "  about       — sobre mi",
  "  skills      — stack tecnico",
  "  projects    — proyectos destacados",
  "  contact     — como contactarme",
  "  github      — abrir mi github",
  "  clear       — limpiar terminal",
  "  help        — ver esta ayuda",
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "":
      return { out: [] };
    case "help":
    case "?":
      return { out: HELP_TEXT };
    case "about":
    case "whoami":
      scrollToId("sobre-mi");
      return { out: [profile.bio] };
    case "skills":
      scrollToId("skills");
      return {
        out: skillGroups.map((g) => `${g.label}: ${g.items.join(", ")}`),
      };
    case "projects":
    case "ls":
      scrollToId("proyectos");
      return { out: projects.map((p) => `${p.title.padEnd(22)} ${p.description}`) };
    case "contact":
      scrollToId("contacto");
      return { out: [`email: ${links.email}`, `github: ${links.github}`, `linkedin: ${links.linkedin}`] };
    case "github":
      window.open(links.github, "_blank", "noreferrer");
      return { out: ["abriendo github..."] };
    case "linkedin":
      window.open(links.linkedin, "_blank", "noreferrer");
      return { out: ["abriendo linkedin..."] };
    case "sudo":
      return { out: ["nice try. permission denied."] };
    case "clear":
      return { clear: true };
    default:
      return { out: [`comando no encontrado: ${cmd}`, `escribe "help" para ver los comandos disponibles`] };
  }
}

function useTypewriter(lines, speed = 18, lineDelay = 300) {
  const [rendered, setRendered] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const result = [];

    async function run() {
      for (const line of lines) {
        if (cancelled) return;
        let typed = "";
        result.push({ cmd: "", out: [] });
        const idx = result.length - 1;
        for (const ch of line.cmd) {
          if (cancelled) return;
          typed += ch;
          result[idx] = { cmd: typed, out: [] };
          setRendered([...result]);
          await new Promise((r) => setTimeout(r, speed));
        }
        await new Promise((r) => setTimeout(r, lineDelay));
        result[idx] = { cmd: typed, out: line.out };
        setRendered([...result]);
        await new Promise((r) => setTimeout(r, lineDelay));
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rendered, done };
}

export default function Hero() {
  const { rendered: introRendered, done: introDone } = useTypewriter(INTRO_LINES);
  const [history, setHistory] = useState([]); // {cmd, out}
  const [input, setInput] = useState("");
  const [historyIdx, setHistoryIdx] = useState(null);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const lines = introDone
    ? [...introRendered, ...history]
    : introRendered;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines.length, history]);

  function handleSubmit(e) {
    e.preventDefault();
    const result = runCommand(input);
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory((h) => [...h, { cmd: input, out: result.out }]);
    }
    setInput("");
    setHistoryIdx(null);
  }

  function handleKeyDown(e) {
    const past = history.map((h) => h.cmd).filter(Boolean);
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!past.length) return;
      const next = historyIdx === null ? past.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(next);
      setInput(past[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= past.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(past[next]);
      }
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-grid overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/95 to-bg pointer-events-none" />

      {/* floating gradient orbs for depth */}
      <motion.div
        aria-hidden
        className="orb w-72 h-72 bg-accent left-[8%] top-[15%]"
        animate={{ y: [0, 24, 0], x: [0, 14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="orb w-64 h-64 bg-accent-2 right-[10%] bottom-[12%]"
        animate={{ y: [0, -20, 0], x: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl flex flex-col items-center"
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <Avatar />
          <div className="text-center">
            <h1 className="font-mono text-lg sm:text-xl font-bold text-text">{profile.name}</h1>
            <p className="font-mono text-xs sm:text-sm text-accent">{profile.role}</p>
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.focus()}
          className="w-full rounded-xl border border-border bg-surface/90 backdrop-blur shadow-[0_0_60px_-15px_rgba(57,255,106,0.25)] cursor-text"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
            <span className="ml-3 text-xs text-text-muted font-mono">
              jhony@portfolio: ~
            </span>
          </div>

          <div
            ref={scrollRef}
            className="px-5 py-6 font-mono text-sm sm:text-base leading-relaxed h-[320px] sm:h-[360px] overflow-y-auto"
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-4">
                <div className="flex gap-2">
                  <span className="text-accent">➜</span>
                  <span className="text-accent-2">~</span>
                  <span className="text-text">{line.cmd}</span>
                  {!introDone && i === lines.length - 1 && (
                    <span className="inline-block w-2 h-4 bg-accent animate-pulse ml-0.5" />
                  )}
                </div>
                {line.out.map((o, j) => (
                  <p key={j} className="text-text-muted mt-1 pl-5 whitespace-pre-wrap">
                    {o}
                  </p>
                ))}
              </div>
            ))}

            {introDone && (
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <span className="text-accent">➜</span>
                <span className="text-accent-2">~</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  placeholder="escribe 'help'…"
                  className="flex-1 bg-transparent outline-none text-text placeholder:text-text-muted/50 font-mono"
                />
              </form>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: introDone ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#proyectos"
            className="px-5 py-2.5 rounded-lg bg-accent text-bg font-mono text-sm font-semibold hover:shadow-[0_0_20px_rgba(57,255,106,0.5)] transition-shadow"
          >
            ./ver-proyectos
          </a>
          <a
            href="#contacto"
            className="px-5 py-2.5 rounded-lg border border-border text-text font-mono text-sm hover:border-accent hover:text-accent transition-colors"
          >
            ./contactar
          </a>
        </motion.div>

        <p className="mt-4 text-[11px] font-mono text-text-muted/50 text-center">
          tip: la terminal es interactiva — escribe <span className="text-accent-2">help</span> para explorar
        </p>
      </motion.div>
    </section>
  );
}

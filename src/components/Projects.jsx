import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, Clock, Lock, X } from "lucide-react";
import { GithubIcon } from "./icons";
import { useLanguage } from "../i18n";
import SpotlightCard from "./SpotlightCard";

function repoPath(url) {
  try {
    const u = new URL(url);
    const [, owner, name] = u.pathname.split("/");
    return owner && name ? `${owner}/${name}` : null;
  } catch {
    return null;
  }
}

function timeAgo(dateStr, t) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return t.project.today;
  if (days === 1) return t.project.yesterday;
  if (days < 30) return t.project.daysAgo(days);
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? t.project.monthAgo : t.project.monthsAgo(months);
  const years = Math.floor(months / 12);
  return years === 1 ? t.project.yearAgo : t.project.yearsAgo(years);
}

function useGithubStats(repoUrl) {
  const [stats, setStats] = useState({ status: "loading" });

  useEffect(() => {
    const path = repoPath(repoUrl);
    if (!path) {
      setStats({ status: "empty" });
      return;
    }
    let cancelled = false;
    fetch(`https://api.github.com/repos/${path}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data) => {
        if (cancelled) return;
        setStats({
          status: "ok",
          stars: data.stargazers_count,
          forks: data.forks_count,
          updatedAt: data.pushed_at,
          language: data.language,
        });
      })
      .catch(() => !cancelled && setStats({ status: "error" }));
    return () => {
      cancelled = true;
    };
  }, [repoUrl]);

  return stats;
}

function GithubStats({ repo }) {
  const { t } = useLanguage();
  const stats = useGithubStats(repo);

  if (stats.status === "loading") {
    return (
      <div className="flex gap-3 mt-3 text-xs font-mono text-text-muted/40 animate-pulse">
        <span>· · ·</span>
      </div>
    );
  }
  if (stats.status !== "ok") return null;

  return (
    <div className="flex flex-wrap gap-4 mt-3 text-xs font-mono text-text-muted">
      <span className="inline-flex items-center gap-1" title="stars">
        <Star size={12} className="text-accent" /> {stats.stars}
      </span>
      <span className="inline-flex items-center gap-1" title="forks">
        <GitFork size={12} className="text-accent-2" /> {stats.forks}
      </span>
      <span className="inline-flex items-center gap-1" title={t.project.lastActivity}>
        <Clock size={12} /> {timeAgo(stats.updatedAt, t)}
      </span>
    </div>
  );
}

function PrivateRepoModal({ project, onClose }) {
  const { t } = useLanguage();
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-bg/80 px-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-[0_0_40px_-12px_rgba(57,255,106,0.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="private-repo-title"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="text-accent-2" size={20} aria-hidden="true" />
            <h2 id="private-repo-title" className="font-mono text-lg font-semibold text-text">
              {t.project.privateRepository}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-text-muted transition-colors hover:text-accent"
            aria-label={t.accessibility.closeModal}
            title={t.accessibility.closeModal}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-4 leading-relaxed text-text-muted">
          {t.project.privateDescription(project.title)}
        </p>
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 font-mono text-sm text-text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {t.project.close}
          </button>
          <a
            href={project.official}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-mono text-sm font-semibold text-bg transition-shadow hover:shadow-[0_0_18px_rgba(57,255,106,0.45)]"
          >
            <ExternalLink size={15} aria-hidden="true" /> {t.project.officialSite}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects, t } = useLanguage();
  const [privateProject, setPrivateProject] = useState(null);

  return (
    <>
      <section id="proyectos" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-sm text-accent mb-3">// {t.projects}</p>
        <div className="grid gap-5">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <SpotlightCard
                as="article"
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent/60"
              >
                <div className="flex min-w-0 items-start justify-between gap-4">
                  <div className="w-full">
                    <h3 className="break-words font-mono text-lg font-semibold text-text">
                      {p.title}
                    </h3>
                    <p className="text-text-muted mt-2 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md text-xs font-mono text-accent-2 border border-accent-2/30 bg-accent-2/5"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <GithubStats repo={p.repo} />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3">
                  {p.private && p.official ? (
                    <button
                      type="button"
                      onClick={() => setPrivateProject(p)}
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-text-muted transition-colors hover:text-accent"
                    >
                      <GithubIcon size={15} /> {t.project.repository}
                    </button>
                  ) : (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-text-muted transition-colors hover:text-accent"
                    >
                      <GithubIcon size={15} /> {t.project.repository}
                    </a>
                  )}
                  {p.private && (
                    <span
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-accent-2"
                      title={t.project.privateRepository}
                      aria-label={t.project.privateRepository}
                    >
                      <Lock size={15} aria-hidden="true" /> {t.project.private}
                    </span>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={15} /> {t.project.demo}
                    </a>
                  )}
                  {p.official && (
                    <a
                      href={p.official}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-mono text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink size={15} /> {t.project.officialSite}
                    </a>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
        </div>
      </section>
      {privateProject && (
        <PrivateRepoModal
          project={privateProject}
          onClose={() => setPrivateProject(null)}
        />
      )}
    </>
  );
}

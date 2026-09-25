import { useState } from "react";
import { motion } from "framer-motion";
import {
  Braces,
  CheckCircle2,
  Coffee,
  Code2,
  Container,
  Database,
  GitBranch,
  Globe,
  Languages,
  Layers3,
  LockKeyhole,
  MessageCircle,
  Network,
  Server,
  ShieldCheck,
  Terminal,
  Users,
} from "lucide-react";
import { skillGroups } from "../data/profile";
import { GithubIcon } from "./icons";
import SpotlightCard from "./SpotlightCard";

const SKILL_ICONS = {
  Java: Coffee,
  Python: Code2,
  "Spring Boot": Server,
  "Kotlin (aprendiendo)": Braces,
  HTML5: Globe,
  CSS3: Layers3,
  "TypeScript (aprendiendo)": Braces,
  "Angular (aprendiendo)": Code2,
  "Jetpack Compose (aprendiendo)": Layers3,
  "Material 3 Design (aprendiendo)": Layers3,
  MongoDB: Database,
  Docker: Container,
  Firebase: Server,
  Microservicios: Network,
  "Rest APIs": Globe,
  SQL: Database,
  Git: GitBranch,
  GitHub: GithubIcon,
  Linux: Terminal,
  Ciberseguridad: ShieldCheck,
  Redes: Network,
  Infraestructura: Server,
  "Seguridad Informática": LockKeyhole,
  "Metodologías ágiles": CheckCircle2,
  "Inglés B1": Languages,
  "Trabajo en equipo": Users,
  "Resolución de problemas": Code2,
  "Comunicación efectiva": MessageCircle,
};

export default function Skills() {
  const [selectedGroup, setSelectedGroup] = useState(0);

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-sm text-accent mb-3">// skills</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.94, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              whileHover={{ y: -8, scale: 1.015 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 120, damping: 16, delay: gi * 0.08 }}
            >
              <SpotlightCard
                role="button"
                tabIndex={0}
                onClick={() => setSelectedGroup(selectedGroup === gi ? null : gi)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedGroup(selectedGroup === gi ? null : gi);
                  }
                }}
                className={`rounded-xl border bg-surface p-5 h-full cursor-pointer transition-colors ${
                  selectedGroup === gi
                    ? "border-accent/70 shadow-[0_0_24px_-12px_rgba(57,255,106,0.7)]"
                    : "border-border hover:border-accent/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-mono text-xs text-text-muted">
                    {group.label}:
                  </h3>
                </div>
                <motion.div layout className="flex flex-wrap gap-2 mt-3">
                  {group.items.map((item, itemIndex) => {
                    const Icon = SKILL_ICONS[item] || Code2;
                    return (
                      <motion.span
                        key={item}
                        layout
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: itemIndex * 0.035 }}
                        whileHover={{ scale: 1.06, y: -3 }}
                        className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-mono transition-colors ${
                          selectedGroup === gi
                            ? "border-accent/40 bg-accent/5 text-text"
                            : "border-border text-text-muted hover:border-accent hover:text-accent"
                        }`}
                      >
                        <Icon size={14} aria-hidden="true" />
                        {item}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

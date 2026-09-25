import { motion } from "framer-motion";
import { skillGroups } from "../data/profile";
import SpotlightCard from "./SpotlightCard";

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-sm text-accent mb-3">// skills</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: gi * 0.08 }}
            >
              <SpotlightCard className="rounded-xl border border-border bg-surface p-5 h-full">
                <h3 className="font-mono text-xs text-text-muted mb-3">
                  {group.label}:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="px-3 py-1 rounded-md text-xs font-mono border border-border text-text hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

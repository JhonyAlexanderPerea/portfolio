import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="sobre-mi" className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-accent mb-3"
        >
          // sobre-mi
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-border bg-surface overflow-hidden"
        >
          {profile.bio
            .split(". ")
            .filter(Boolean)
            .map((sentence, i) => (
              <div
                key={i}
                className="flex gap-4 px-5 py-3 border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
              >
                <span className="font-mono text-xs text-text-muted/60 select-none pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-text-muted leading-relaxed">
                  {sentence.trim()}
                  {!sentence.trim().endsWith(".") ? "." : ""}
                </p>
              </div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

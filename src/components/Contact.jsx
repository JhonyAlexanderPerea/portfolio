import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { links } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useLanguage } from "../i18n";

const CONTACT_ITEMS = [
  { key: "github", icon: GithubIcon, label: "Github", href: links.github },
  { key: "linkedin", icon: LinkedinIcon, label: "Linkedin", href: links.linkedin },
  { key: "email", icon: Mail, label: "Email", href: links.email ? `mailto:${links.email}` : "" },
].filter((item) => item.href);

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contacto" className="py-28 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-mono text-sm text-accent mb-3">// {t.contact}</p>
        <h2 className="text-2xl sm:text-3xl font-mono font-bold text-text mb-3">
          {t.letsTalk}
        </h2>
        <p className="text-text-muted max-w-md mx-auto mb-10">
          {t.contactDescription}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {CONTACT_ITEMS.map(({ key, icon: Icon, label, href }, i) => (
            <motion.a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border font-mono text-sm text-text hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-6px_rgba(57,255,106,0.5)] transition-colors"
            >
              <Icon size={16} /> {label}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

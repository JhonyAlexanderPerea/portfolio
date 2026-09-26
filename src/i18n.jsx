import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { profile, projects, skillGroups } from "./data/profile";

const translations = {
  es: {
    languageName: "Español",
    languageLabel: "Idioma",
    switchLanguage: "Cambiar idioma",
    nav: {
      about: "sobre-mi",
      skills: "skills",
      projects: "proyectos",
      contact: "contacto",
    },
    profile: {
      role: "Desarrollador",
      bio: profile.bio,
      status: profile.status,
    },
    about: "sobre-mi",
    skills: "skills",
    projects: "proyectos",
    contact: "Contacto",
    letsTalk: "¿Hablamos?",
    contactDescription: "Abierto a oportunidades, colaboraciones y proyectos. Escríbeme por cualquiera de estos canales.",
    footer: "construido con React + Tailwind + FramerMotion",
    hero: {
      viewProjects: "./ver-proyectos",
      contact: "./contactar",
      terminalTip: "tip: la terminal es interactiva — escribe",
      terminalPlaceholder: "escribe 'help'…",
      help: [
        "comandos disponibles:",
        "  about       — sobre mi",
        "  skills      — stack tecnico",
        "  projects    — proyectos destacados",
        "  contact     — como contactarme",
        "  github      — abrir mi github",
        "  clear       — limpiar terminal",
        "  help        — ver esta ayuda",
      ],
      commandNotFound: (command) => `comando no encontrado: ${command}`,
      helpHint: 'escribe "help" para ver los comandos disponibles',
      opening: (service) => `abriendo ${service}...`,
      permissionDenied: "nice try. permission denied.",
    },
    project: {
      privateRepository: "Repositorio privado",
      privateDescription: (title) => `No se puede acceder al repositorio de ${title} porque es privado, pero puedes visitar su sitio oficial.`,
      close: "cerrar",
      officialSite: "sitio oficial",
      repository: "repo",
      private: "repositorio privado",
      demo: "demo",
      stars: "estrellas",
      forks: "forks",
      lastActivity: "ultima actividad",
      today: "hoy",
      yesterday: "hace 1 dia",
      daysAgo: (days) => `hace ${days} dias`,
      monthAgo: "hace 1 mes",
      monthsAgo: (months) => `hace ${months} meses`,
      yearAgo: "hace 1 año",
      yearsAgo: (years) => `hace ${years} años`,
    },
    accessibility: {
      closeMenu: "Cerrar menu",
      openMenu: "Abrir menu",
      closeModal: "Cerrar modal",
      backToTop: "Volver arriba",
    },
  },
  en: {
    languageName: "English",
    languageLabel: "Language",
    switchLanguage: "Switch language",
    nav: {
      about: "about-me",
      skills: "skills",
      projects: "projects",
      contact: "contact",
    },
    profile: {
      role: "Developer",
      bio: "Ninth-semester Systems and Computer Engineering student at Universidad del Quindío. Passionate about building software, infrastructure, and data solutions. I enjoy learning and applying new technologies to solve real-world problems.",
      status: "Open to opportunities, collaborations, and projects.",
    },
    about: "about-me",
    skills: "skills",
    projects: "projects",
    contact: "Contact",
    letsTalk: "Let's talk?",
    contactDescription: "Open to opportunities, collaborations, and projects. Reach me through any of these channels.",
    footer: "built with React + Tailwind + FramerMotion",
    hero: {
      viewProjects: "./view-projects",
      contact: "./contact",
      terminalTip: "tip: this terminal is interactive — type",
      terminalPlaceholder: "type 'help'…",
      help: [
        "available commands:",
        "  about       — about me",
        "  skills      — tech stack",
        "  projects    — featured projects",
        "  contact     — how to reach me",
        "  github      — open my github",
        "  clear       — clear terminal",
        "  help        — show this help",
      ],
      commandNotFound: (command) => `command not found: ${command}`,
      helpHint: 'type "help" to see available commands',
      opening: (service) => `opening ${service}...`,
      permissionDenied: "nice try. permission denied.",
    },
    project: {
      privateRepository: "Private repository",
      privateDescription: (title) => `The repository for ${title} cannot be accessed because it is private, but you can visit its official website.`,
      close: "close",
      officialSite: "official site",
      repository: "repo",
      private: "private repository",
      demo: "demo",
      stars: "stars",
      forks: "forks",
      lastActivity: "last activity",
      today: "today",
      yesterday: "yesterday",
      daysAgo: (days) => `${days} days ago`,
      monthAgo: "1 month ago",
      monthsAgo: (months) => `${months} months ago`,
      yearAgo: "1 year ago",
      yearsAgo: (years) => `${years} years ago`,
    },
    accessibility: {
      closeMenu: "Close menu",
      openMenu: "Open menu",
      closeModal: "Close modal",
      backToTop: "Back to top",
    },
  },
};

const englishProjects = {
  "corteza-terrestre": "Redesign and improvement of the Corteza Terrestre foundation website, focused on improving user experience and information accessibility.",
  "viaje-app": "Hybrid web application and PWA supporting a 9-month journey with an E.P.A.R. journal, free notes, a resource library with real file uploads, and tracking for 22 sessions.",
  "stepup-ecommerce": "Online clothing store with interactive catalog and shopping cart features.",
  "elasticity-manager": "Platform for managing resource elasticity in cloud environments, optimizing system performance and efficiency. Built with Go.",
  proyectoTLF: "Search and validation of patterns in texts and interactive systems.",
};

const englishSkills = {
  datos_e_infra: "data_and_infra",
  herramientas: "tools",
  otros: "other",
  "Kotlin (aprendiendo)": "Kotlin (learning)",
  "TypeScript (aprendiendo)": "TypeScript (learning)",
  "Angular (aprendiendo)": "Angular (learning)",
  "Jetpack Compose (aprendiendo)": "Jetpack Compose (learning)",
  "Material 3 Design (aprendiendo)": "Material 3 Design (learning)",
  Ciberseguridad: "Cybersecurity",
  Redes: "Networking",
  Infraestructura: "Infrastructure",
  "Seguridad Informática": "Information Security",
  "Metodologías ágiles": "Agile methodologies",
  "Inglés B1": "English B1",
  "Trabajo en equipo": "Teamwork",
  "Resolución de problemas": "Problem solving",
  "Comunicación efectiva": "Effective communication",
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("portfolio-language") || "es");
  const value = useMemo(() => translations[language] ?? translations.es, [language]);

  useEffect(() => {
    localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const localizedProfile = useMemo(() => ({
    ...profile,
    role: value.profile.role,
    bio: value.profile.bio,
    status: value.profile.status,
  }), [value]);

  const localizedProjects = useMemo(() => projects.map((project) => ({
    ...project,
    description: language === "en" ? englishProjects[project.id] ?? project.description : project.description,
  })), [language]);

  const localizedSkillGroups = useMemo(() => skillGroups.map((group) => ({
    ...group,
    itemKeys: group.items,
    label: language === "en" ? englishSkills[group.label] ?? group.label : group.label,
    items: language === "en" ? group.items.map((item) => englishSkills[item] ?? item) : group.items,
  })), [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t: value,
      profile: localizedProfile,
      projects: localizedProjects,
      skillGroups: localizedSkillGroups,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

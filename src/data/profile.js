// Edita este archivo para actualizar tu información sin tocar el diseño.

export const profile = {
  name: "Jhony Alexander Perea",
  handle: "JhonyAlexanderPerea",
  role: "Desarrollador",
  bio: "Estudiante de noveno semestre del programa de Ingeniería de Sistemas y Computación de la Universidad del Quindío. Apasionado por construir software, infraestrutura y soluciones de datos. Me interesa aprender y aplicar nuevas tecnologías para resolver problemas del mundo real.",
  location: "Quindío, Colombia",
  status: "Abierto a oportunidades, colaboraciones y proyectos.",
};


export const links = {
  github: "https://github.com/JhonyAlexanderPerea",
  linkedin: "https://www.linkedin.com/in/jhony-alexander-perea-perea",
  email: "jhonyalexanderpereaperea@gmail.com",
  twitter: "",
};

export const skillGroups = [
  {
    label: "backend",
    items: ["Java", "Python", "Spring Boot","Kotlin (aprendiendo)"],
  },
  {
    label: "frontend",
    items: ["HTML5", "CSS3", "TypeScript (aprendiendo)", "Angular (aprendiendo)","Jetpack Compose (aprendiendo)", "Material 3 Design (aprendiendo)"],
  },
  {
    label: "datos_e_infra",
    items: ["MongoDB", "Docker", "Firebase", "Microservicios", "Rest APIs", "SQL"],
  },
  {
    label: "herramientas",
    items: ["Git", "GitHub"],
  },
  {
    label: "otros",
    items: ["Linux", "Ciberseguridad","Redes", "Infraestructura", "Seguridad Informática", "Metodologías ágiles", "Inglés B1", "Trabajo en equipo", "Resolución de problemas", "Comunicación efectiva"],
  }
];


export const projects = [
    {
    id: "corteza-terrestre",
    title: "Corteza Terrestre",
    description: "Rediseño y mejoramiento de la páǵina web de la fundación Corteza Terrestre, con el objetivo de mejorar la experiencia del usuario y la accesibilidad de la información.",
    stack: ["React 19","Tailwind CSS 4","Vite 8","Framer Motion","Lucide React", "React Hook Form + @hookform/resolvers"],
    repo: "https://github.com/Shuh3n/CortezaWeb.git",
    private: true,
    demo: "",
    official: "https://www.cortezaterrestre.org/",
  },
  {
    id: "elasticity-manager",
    title: "elasticity-manager (Proyecto académico)",
    description: "Plataforma para la gestión de la elasticidad de recursos en entornos de nube, optimizando el rendimiento y la eficiencia de los sistemas. Construida con Go, ",
    stack: ["Go"],
    repo: "https://github.com/JhonyAlexanderPerea/elasticity-manager",
    private: false,
    demo: "",
    official: "",
  },
  {
    id: "proyectoTLF",
    title: "proyectoTLF (Proyecto académico)",
    description: "Búsqueda y validación de patrones en textos y sistemas interactivos",
    stack: ["Python"],
    repo: "https://github.com/JhonyAlexanderPerea/proyectoTLF",
    demo: "",
    official: "",
  },
  {
    id: "stepup-ecommerce",
    title: "StepUp Ecommerce (Proyecto académico)",
    description: "Tienda de ropa en línea, con funcionalidades de catálogo interactivo, carrito de compras ",
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    repo: "https://github.com/Shuh3n/StepUp_ecommerce",
    demo: "https://stepupstore.vercel.app/",
    official: "",
  },
  {
    id: "viaje-app",
    title: "El Viaje a la Cámara Interna — App",
    description: "Aplicación web híbrida y PWA para acompañar durante 9 meses El Viaje a la Cámara Interna con diario E.P.A.R., notas libres, biblioteca de recursos con carga real de archivos y seguimiento de 22 sesiones.",
    stack: ["React con Next.js", "Supabase", "Tailwind CSS"],
    repo: "https://github.com/JhonyAlexanderPerea/viaje-app.git",
    private: true,
    demo: "",
    official: "https://viaje-app-phi.vercel.app",
  }

];

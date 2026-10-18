/**
 * Datos del sitio. Todo lo configurable vive acá: cambiar nombre, links o mail
 * es tocar este archivo, no perseguir strings por los componentes.
 */
export const site = {
  /**
   * URL base del sitio en producción. Se usa para los metadatos Open Graph y el
   * sitemap. Cambiarla cuando se sepa el dominio definitivo en Vercel.
   */
  url: "https://marianoquilindro.vercel.app",
  name: "Mariano Quilindro",
  initials: "MQ",
  role: "Desarrollador de software",
  location: "Argentina",
  tagline:
    "Construyo aplicaciones web completas: desde el esquema de la base hasta la última pantalla.",
  email: "marianoquilindro@gmail.com",
  github: "https://github.com/marianoquilindro",
  // Dejar vacío si todavía no hay perfil: el componente no renderiza el link.
  linkedin: "",
  studio: "https://studio74dev.github.io/",
} as const;

export type StackItem = {
  name: string;
  tag: string;
  description: string;
};

export type StackGroup = {
  label: string;
  items: StackItem[];
};

/**
 * Stack agrupado por capa. Se muestra en la sección 02 con cards interactivas.
 * Son tecnologías que uso de verdad — no conviene inflar la lista.
 */
export const stackGroups: StackGroup[] = [
  {
    label: "Frontend",
    items: [
      {
        name: "Next.js",
        tag: "Framework",
        description: "App Router, Server Components, SSR y optimización web avanzada.",
      },
      {
        name: "React",
        tag: "Librería UI",
        description: "Arquitectura basada en componentes, hooks e interfaces dinámicas.",
      },
      {
        name: "TypeScript",
        tag: "Lenguaje",
        description: "Tipado estricto de punta a punta, contratos y mantenibilidad del código.",
      },
      {
        name: "Tailwind CSS",
        tag: "Estilos",
        description: "Sistemas de diseño utility-first, animaciones sutiles y responsive total.",
      },
    ],
  },
  {
    label: "Backend y datos",
    items: [
      {
        name: "Node.js",
        tag: "Runtime",
        description: "Servicios backend escalables, middleware y APIs desacopladas.",
      },
      {
        name: "PostgreSQL",
        tag: "Base de datos",
        description: "Modelado relacional, consultas complejas, integridad y optimización.",
      },
      {
        name: "Supabase",
        tag: "BaaS & Auth",
        description: "Autenticación segura, base administrada y eventos en tiempo real.",
      },
      {
        name: "TypeORM",
        tag: "ORM",
        description: "Mapeo objeto-relacional, entidades y migraciones versionadas.",
      },
    ],
  },
  {
    label: "Plataforma y arquitectura",
    items: [
      {
        name: "Row Level Security",
        tag: "Seguridad",
        description: "Políticas de control de acceso a nivel de fila aplicadas en la base.",
      },
      {
        name: "Vercel",
        tag: "Despliegue",
        description: "CI/CD automatizado, edge caching y despliegues sin tiempo de inactividad.",
      },
      {
        name: "Git & GitHub",
        tag: "Control de versiones",
        description: "Flujos de ramas, trazabilidad de código y trabajo colaborativo.",
      },
      {
        name: "Arquitectura REST",
        tag: "Patrón",
        description: "Diseño Controller → Service → Repository desacoplado y testeable.",
      },
    ],
  },
];

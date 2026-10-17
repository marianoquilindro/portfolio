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

/**
 * Stack agrupado por capa. Se muestra en la sección 02.
 * Son tecnologías que uso de verdad — no conviene inflar la lista.
 */
export const stackGroups = [
  {
    label: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    label: "Backend y datos",
    items: ["Node.js", "PostgreSQL", "Supabase", "TypeORM"],
  },
  {
    label: "Plataforma",
    items: ["Row Level Security", "Vercel", "Git", "REST"],
  },
] as const;

export type Decision = {
  title: string;
  body: string;
};

export type Link = {
  label: string;
  href: string;
};

/** Una captura dentro del marco de navegador. */
export type MediaView = {
  src: string;
  alt: string;
  /** Rótulo del botón que la selecciona, cuando hay más de una. */
  label: string;
  /**
   * Cómo se enmarca: en un marco de navegador (escritorio) o en uno de
   * teléfono (móvil). Por defecto, navegador.
   */
  frame?: "browser" | "phone";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  status: "En producción" | "Completado";
  featured: boolean;
  /**
   * Captura del proyecto en public/projects/. Es opcional: hay proyectos sin
   * foto todavía, y en ese caso la fila se muestra a todo el ancho.
   */
  image?: string;
  imageAlt?: string;
  /**
   * Varias capturas del mismo proyecto. Si están, se muestra una fila de
   * botones para cambiarlas. Tiene prioridad sobre `image`.
   */
  views?: MediaView[];
  /**
   * Texto que muestra la barra del marco de la captura. Si el proyecto tiene
   * URL pública va la URL; si es interno, una etiqueta honesta.
   */
  frameLabel?: string;
  /** Breve. Lo que se lee en la card de la grilla. */
  summary: string;
  /** El problema concreto que resolvía. Va primero: el stack es lo de después. */
  problem: string;
  /** Lo construido, en puntos concretos y verificables. */
  highlights: string[];
  /** Decisiones de diseño/ingeniería. Es lo que separa un portfolio de un README. */
  decisions: Decision[];
  stack: string[];
  links: Link[];
  /**
   * Cuando no hay link público (app interna, repo todavía no publicado),
   * se explica en vez de dejar un href roto.
   */
  note?: string;
};

export const projects: Project[] = [
  {
    slug: "club-el-progreso",
    title: "Club El Progreso",
    tagline: "Gestión de socios, planes de membresía y sombrillas para un club de pileta.",
    role: "Diseño y desarrollo completo",
    year: "2026",
    status: "En producción",
    featured: true,
    views: [
      {
        src: "/projects/club-panel.webp",
        alt: "Pantalla principal del Club El Progreso, con el resumen del club y la ocupación de la pileta",
        label: "Principal",
      },
      {
        src: "/projects/club-sombrillas.webp",
        alt: "Mapa de sombrillas del Club El Progreso con las 60 posiciones y su estado: disponible, ocupada o reservada",
        label: "Sombrillas",
      },
      {
        src: "/projects/club-recaudacion.webp",
        alt: "Módulo de recaudación del Club El Progreso, con el estado de los cobros del período",
        label: "Recaudación",
      },
    ],
    frameLabel: "Club El Progreso — sistema de uso interno",
    summary:
      "Sistema de gestión para un club de pileta: socios, planes, asignación de sombrillas sobre un mapa interactivo, pagos por temporada y trazabilidad completa de cada operación.",
    problem:
      "El club manejaba socios, planes y la asignación de sombrillas en planillas. No había control de capacidad, ni registro de quién había cambiado qué, ni forma de saber cuánta gente había en la pileta un martes cualquiera. Además el club cierra de abril a octubre: cada temporada arrancaba de cero, sin un modelo que la representara.",
    highlights: [
      "Mapa interactivo de sombrillas en canvas: asignar, liberar y ver la ocupación real de la pileta de un vistazo.",
      "Autenticación con Supabase Auth y Row Level Security: cada consulta pasa por políticas en la base, no por confianza en el cliente.",
      "Grupos familiares: cada integrante es una fila propia con su propio DNI, enlazada al titular por group_primary_id.",
      "Auditoría: cada alta, edición y liberación queda registrada, con una fila por socio liberado al cerrar temporada.",
      "Modelo de temporadas 1/11 → 31/3: cerrar vacía el mapa sin borrar datos, y se puede reconstruir el estado anterior desde la auditoría.",
      "Dashboard con KPIs: cobrado del período, ocupación de la pileta y evolución de pagos por temporada.",
    ],
    decisions: [
      {
        title: "La capacidad se valida en el servidor",
        body: "El límite de capacidad de la sombrilla se valida en createMember(), del lado del servidor. Un alta que no pase por el formulario no puede exceder la capacidad: la regla vive donde no se puede saltear, no solo como límite de UI.",
      },
      {
        title: "Cerrar una temporada es atómico",
        body: "close_season() es una RPC con security definer: o se cierra la temporada y se liberan todas las sombrillas, o no pasa nada. No puede quedar un estado intermedio a medias con parte del mapa liberado.",
      },
      {
        title: "La fuente de verdad es una sola",
        body: "El estado de cada sombrilla se recalcula al leer, a partir de los socios asignados. No se guarda en dos lugares que puedan desincronizarse, así que el mapa nunca muestra ocupación vieja.",
      },
      {
        title: "Sigue funcionando sin conexión",
        body: "La capa de datos tiene fallback a localStorage. Si Supabase no responde, el club puede seguir operando y los datos quedan locales hasta que vuelva la conexión.",
      },
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Tailwind CSS",
      "React Hook Form",
      "Zod",
      "Vercel",
    ],
    links: [],
    note: "App interna para el club: sin despliegue público ni repositorio abierto, porque maneja datos personales de socios (Ley 25.673). Disponible para mostrar en una entrevista.",
  },
  {
    slug: "studio-74",
    title: "Studio 74",
    tagline:
      "El estudio de desarrollo que cofundé con tres amigos: web a medida, de punta a punta.",
    role: "Cofundador · desarrollo full-stack",
    year: "2026",
    status: "En producción",
    featured: true,
    views: [
      {
        src: "/projects/studio-74.webp",
        alt: "Landing de Studio 74 con el hero en lima y la grilla de proyectos del estudio",
        label: "Escritorio",
        frame: "browser",
      },
      {
        src: "/projects/studio-74-mobile.webp",
        alt: "El sitio de Studio 74 en versión móvil, con la barra de navegación arriba y el hero apilado",
        label: "Celular",
        frame: "phone",
      },
    ],
    frameLabel: "studio74dev.github.io",
    summary:
      "Somos cuatro desarrolladores y hacemos web a medida: landings, sitios institucionales y sistemas de gestión. El sitio del estudio lo armé sin frameworks ni paso de build, y es también donde mostramos el club que hicimos juntos.",
    problem:
      "Nos hacía falta una web propia que cualquiera de los cuatro pudiera editar y publicar sin instalar nada, y que no se perdiera ni una consulta de un cliente. Es la carta de presentación del estudio: un formulario que falla en silencio es un cliente que no vuelve.",
    highlights: [
      "Formulario con cadena de respaldo: contact.php → Web3Forms → mailto. Si los tres fallan, el visitante ve el error. Nunca un 'enviado' que no salió.",
      "Sin dependencias ni build: HTML, CSS y JS vanilla. Publicar es un git push a GitHub Pages.",
      "El Club El Progreso va como caso destacado, con capturas reales del sistema ya en producción: el sitio es también donde mostramos lo que hacemos.",
      "SEO de base: canonical, og:url, JSON-LD, sitemap.xml y robots.txt.",
      "404 propio con los estilos en línea, para que no dependa del CSS principal.",
      "Imágenes en WebP y cache-busting explícito del CSS y el JS.",
    ],
    decisions: [
      {
        title: "Un 'enviado' falso es peor que un error",
        body: "El formulario intenta tres rutas en orden y solo reporta éxito si alguna realmente funcionó. La key de Web3Forms es pública a propósito: sirve para enviar al mail del estudio, no para leer lo que llega.",
      },
      {
        title: "Sin build, a propósito",
        body: "No hay framework ni compilación. Es una decisión de mantenimiento: el sitio lo puede editar y publicar cualquier persona del estudio sin instalar una toolchain.",
      },
      {
        title: "El caché se maneja a mano",
        body: "GitHub Pages manda Cache-Control: max-age=600 también para el HTML. El CSS y el JS se piden con un ?v=N que hay que subir cada vez que se tocan, si no el visitante que ya estuvo ve la versión vieja.",
      },
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "PHP", "SEO técnico", "GitHub Pages"],
    links: [{ label: "Sitio en vivo", href: "https://studio74dev.github.io/" }],
  },
  {
    slug: "gestion-de-espacios",
    title: "Gestión de Espacios",
    tagline:
      "Sistema full-stack de espacios, vehículos, abonos y reportes de ocupación.",
    role: "Backend y frontend",
    year: "2026",
    status: "Completado",
    featured: true,
    summary:
      "Aplicación full-stack para administrar espacios de estacionamiento: registrar entradas y salidas, gestionar abonos y tarifas, y reportar la ocupación y lo cobrado.",
    problem:
      "Hacía falta registrar el ingreso y la salida de vehículos, administrar abonos y tarifas, y responder dos preguntas concretas: cuántos espacios están libres ahora y cuánto se cobró. Todo con una API que separara las reglas de negocio del dibujo de la interfaz.",
    highlights: [
      "Backend en Node + TypeScript con TypeORM: entidades, migraciones versionadas y repositorios por recurso.",
      "Patrón Controller → Service → Repository: las reglas de negocio viven en los servicios, no en las rutas ni en la interfaz.",
      "Reporte de ocupación y de lo cobrado, calculado en el backend a partir de sesiones y tarifas.",
      "Frontend en React + Vite, una página por recurso: sesiones, espacios, abonos, vehículos, tarifas y reportes.",
      "Seed de datos de prueba reproducible para levantar un entorno funcional en un comando.",
    ],
    decisions: [
      {
        title: "Migraciones versionadas, no sync",
        body: "El esquema no se sincroniza en cada arranque: TypeORM aplica migraciones con timestamp. Así se sabe exactamente en qué estado está cada entorno y se puede versionar el cambio junto con el código que lo necesita.",
      },
      {
        title: "La interfaz no calcula",
        body: "El frontend llama a la API y pinta; los cálculos de tarifa, duración y ocupación están en el backend. Agregar otro cliente —una app móvil, un script— no obliga a reimplementar las reglas.",
      },
    ],
    stack: ["Node.js", "TypeScript", "TypeORM", "Express", "React", "Vite", "PostgreSQL"],
    links: [
      {
        label: "Repositorio",
        href: "https://github.com/marianoquilindro/final-apps-interactivas",
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

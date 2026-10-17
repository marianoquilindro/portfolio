export type Decision = {
  title: string;
  body: string;
};

export type Link = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  year: string;
  status: "En producción" | "Completado";
  featured: boolean;
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
    tagline: "Landing de estudio en HTML, CSS y JavaScript, sin frameworks ni paso de build.",
    role: "Diseño y desarrollo",
    year: "2026",
    status: "En producción",
    featured: true,
    summary:
      "Sitio del estudio: hero, quiénes somos, proyectos, stack y contacto. Cero dependencias y cero compilación: se edita, se sube y está en línea.",
    problem:
      "El estudio necesitaba presencia online sin depender de un framework ni de un paso de build —que cualquiera del equipo pudiera editar el HTML y publicar— y, sobre todo, que ninguna consulta de contacto se perdiera.",
    highlights: [
      "Formulario con cadena de respaldo: contact.php → Web3Forms → mailto. Si los tres fallan, el visitante ve el error. Nunca un 'enviado' que no salió.",
      "Sin dependencias ni build: HTML, CSS y JS vanilla. Publicar es un git push a GitHub Pages.",
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
  {
    slug: "ayed1-tp",
    title: "Algoritmos y Estructuras de Datos",
    tagline: "Ejercicios en Python, de funciones básicas a recursividad.",
    role: "Trabajo práctico individual",
    year: "2026",
    status: "Completado",
    featured: false,
    summary:
      "Colección de ejercicios del trabajo práctico de Algoritmos y Estructuras de Datos 1: ocho bloques que cubren desde funciones y listas hasta recursividad y diccionarios.",
    problem:
      "Ocho bloques de ejercicios que progresan en dificultad —funciones, listas, matrices, cadenas, excepciones, archivos, recursividad, y tuplas/conjuntos/diccionarios— y hacían falta poder ejecutarlos y probarlos todos de la misma manera.",
    highlights: [
      "Ocho bloques temáticos, cada uno con sus ejercicios resueltos y documentados.",
      "Menú unificado por bloque: cada ejercicio se lanza y se prueba desde el mismo runner.",
      "generar_menus.py arma los menús a partir de los archivos de cada bloque, así que registrar un ejercicio nuevo no exige editar el menú a mano.",
      "Scripts de estructura para Windows (.bat) y Linux/Mac (.sh).",
    ],
    decisions: [
      {
        title: "Los menús se generan, no se escriben",
        body: "Los menu.py de los ocho bloques son idénticos y se producen con generar_menus.py. Registrar un ejercicio es agregar el archivo y regenerar: no hay menús que se desincronicen del contenido real.",
      },
      {
        title: "Documentar mientras se resuelve",
        body: "Cada bloque tiene su README explicando qué cubre y cómo probarlo, y el repo acumula un README largo con el detalle de los ejercicios. La documentación se escribió junto al código, no al final.",
      },
    ],
    stack: ["Python"],
    links: [
      { label: "Repositorio", href: "https://github.com/marianoquilindro/Quilindro-AyED1-TP" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

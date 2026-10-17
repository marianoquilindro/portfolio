# Mariano Quilindro — Portfolio

Sitio personal: proyectos, enfoque de trabajo y contacto.
[**Ver en vivo →**](https://marianoquilindro.vercel.app)

## Sobre el sitio

Portfolio hecho con Next.js (App Router), TypeScript estricto y Tailwind CSS.
Todas las páginas se generan estáticamente en build —no hay backend ni base de
datos— así que el sitio es rápido y se puede alojar en cualquier plan gratis.

### Estructura

| Ruta | Qué hay |
|---|---|
| `/` | Hero, franja de stack, proyectos destacados y los tres principios de trabajo. |
| `/proyectos` | Grilla con todos los proyectos. |
| `/proyectos/[slug]` | Ficha técnica: el problema, lo construido, las decisiones y el stack. |
| `/sobre-mi` | Quién soy, cómo llegué acá y qué puedo hacer. |
| `/contacto` | Canales de contacto y formulario. |
| `/sitemap.xml`, `/robots.txt` | Generados por Next.js. |

### Cómo está organizado el código

```
src/
├── app/                  # Páginas (App Router) + layout, 404, sitemap y robots
├── components/           # Header, Footer, ProjectCard, ContactForm
└── data/
    ├── projects.ts       # ← Todo el contenido de los proyectos vive acá
    └── site.ts           # ← Nombre, mail, links y URL del sitio
```

**Para agregar o editar un proyecto, se toca `src/data/projects.ts`.** No hay que
tocar ningún componente: la grilla, las fichas, el sitemap y los metadados se
generan a partir de ese array.

Cada proyecto tiene un campo `note` para cuando no hay link público. El club, por
ejemplo, no tiene repositorio abierto ni despliegue público porque maneja datos
personales de socios (Ley 25.673), y eso se explica en la ficha en vez de dejar un
link roto.

## Correrlo en local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm start        # sirve el build de producción
npm run lint     # ESLint
npx tsc --noEmit # chequeo de tipos sin emitir
```

## Publicar

1. Crear el repo en GitHub y subir el código.
2. Importar el repo en [Vercel](https://vercel.com/new). Detecta Next.js solo.
3. **Actualizar `site.url`** en `src/data/site.ts` con el dominio real de Vercel.
   Esa URL alimenta los metadatos Open Graph, el sitemap y el robots.txt.

## Notas de mantenimiento

- **Versiones.** Next.js 15.5.28 y React 19. Se eligió la rama 15.5.x porque es
  la última sin las dos vulnerabilidades críticas que afectan a toda la rama 14
  (RCE en servidores Windows auto-hospedados y RCE en el Image Optimizer con
  AVIF). Subir a Next 16 es opcional y no arregla nada pendiente.
- **`npm audit`.** Quedan avisos en `postcss`, `tailwindcss` y la cadena de
  ESLint. Son **dependencias de desarrollo**: no se envían a producción. Sacarlas
  exige Tailwind 4, que reescribe el formato de configuración.
- **Fuentes.** Geist se sirve con `next/font/local` desde `src/app/fonts/`. No
  usar `next/font/google`: en Windows rompe el build con
  `Cannot find module '.next/server/next-font-manifest.json'`.
- **`next lint`** está deprecado y se va a ir en Next 16. Cuando se suba de
  versión, migrar al CLI de ESLint con
  `npx @next/codemod@canary next-lint-to-eslint-cli`.

## Licencia

MIT. El contenido y los textos son de Mariano Quilindro.

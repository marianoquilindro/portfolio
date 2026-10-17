import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Quién es Mariano Quilindro, cómo trabaja y qué tecnologías usa.",
};

const capabilities = [
  {
    title: "Frontend",
    body: "Interfaces en React y Next.js con TypeScript estricto. Componentes accesibles, estados de carga y de error pensados, y CSS que no se rompe al agregar la pantalla siguiente.",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend y datos",
    body: "APIs en Node y PostgreSQL. Modelado del esquema, migraciones versionadas, y reglas de negocio puestas donde no se pueden saltear.",
    items: ["Node.js", "PostgreSQL", "TypeORM", "REST"],
  },
  {
    title: "Plataforma",
    body: "Autenticación, políticas de acceso a nivel de base, despliegue continuo y respaldos. La parte que no se ve pero decide si el sistema aguanta.",
    items: ["Supabase", "Row Level Security", "Vercel", "Git"],
  },
];

export default function SobreMiPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="font-mono text-sm text-accent">Sobre mí</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
          Mariano Quilindro
        </h1>
        <p className="mt-6 max-w-prose text-xl leading-relaxed text-muted text-pretty">
          Desarrollador de software en {site.location}. Me especializo en
          construir aplicaciones web completas —de la base a la interfaz— y en
          dejarlas documentadas para que otra persona pueda mantenerlas.
        </p>
      </header>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="max-w-prose space-y-7 text-[17px] leading-relaxed text-pretty">
          <p>
            Empecé con la programación resolviendo ejercicios en Python y seguí
            subiendo de capa: primero interfaces, después la API que las alimenta,
            después el modelo de datos y las políticas de acceso. Ese recorrido de
            punta a punta es el que me interesa mantener —entiendo el sistema
            entero, no solo la pantalla o solo la query.
          </p>

          <p>
            Trabajo con un proyecto real en producción:{" "}
            <Link
              href="/proyectos/club-el-progreso"
              className="link-underline font-medium text-foreground"
            >
              Club El Progreso
            </Link>
            , un sistema de gestión para un club de pileta con autenticación,
            control de acceso a nivel de base, mapa interactivo de sombrillas y
            trazabilidad de cada operación. Ahí aparecieron las decisiones que más
            me enseñaron: dónde poner una regla para que no se pueda saltear, y
            cómo modelar un ciclo estacional que arranca y cierra cada año.
          </p>

          <p>
            También hago sitio y frontend{" "}
            <Link
              href="/proyectos/studio-74"
              className="link-underline font-medium text-foreground"
            >
              para Studio 74
            </Link>
            , donde publiqué una landing sin frameworks ni paso de build: una
            decisión de mantenimiento, para que cualquiera del equipo pueda editar
            y publicar sin instalar nada.
          </p>

          <p>
            Me importa el detalle que recién se nota cuando el proyecto crece: la
            migración versionada en vez del sync automático, el estado que se
            recalcula en un solo lugar, el error que se muestra en vez de fingir un
            éxito. Y documentar el porqué de cada una de esas decisiones, porque el
            motivo se olvida en dos semanas.
          </p>

          {/* Reemplazar: acá conviene una línea personal real (estudio, trabajo
              actual, qué te interesa a futuro). Es lo que más humaniza el perfil. */}
          <p className="border-l-2 border-accent/40 pl-5 text-muted">
            Estudio{" "}
            <span className="font-mono text-[15px] text-foreground">
              Algoritmos y Estructuras de Datos
            </span>{" "}
            y sigo sumando proyectos propios. Si querés saber más de mi recorrido o
            de cómo trabajo,{" "}
            <Link href="/contacto" className="link-underline text-foreground">
              escribime
            </Link>
            .
          </p>
        </div>

        {/* ── Tarjeta lateral ──────────────────────────────────── */}
        <aside className="h-fit rounded-2xl border border-edge/10 bg-surface p-6">
          <h2 className="font-mono text-sm text-accent">En resumen</h2>
          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-faint">Rol</dt>
              <dd className="mt-1 text-foreground">Desarrollador full-stack</dd>
            </div>
            <div>
              <dt className="text-faint">Ubicación</dt>
              <dd className="mt-1 text-foreground">{site.location}</dd>
            </div>
            <div>
              <dt className="text-faint">Idiomas</dt>
              <dd className="mt-1 text-foreground">Español · Inglés técnico</dd>
            </div>
            <div>
              <dt className="text-faint">Disponibilidad</dt>
              <dd className="mt-1 text-foreground">Abierto a oportunidades</dd>
            </div>
          </dl>

          <a
            href={`mailto:${site.email}`}
            className="mt-6 block rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            Escribime
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block rounded-lg border border-edge/15 px-4 py-2.5 text-center text-sm font-medium text-foreground transition-colors hover:border-edge/30"
          >
            Ver GitHub
          </a>
        </aside>
      </div>

      {/* ── Qué puedo hacer ──────────────────────────────────────── */}
      <section className="mt-24 border-t border-edge/10 pt-16">
        <p className="font-mono text-sm text-accent">Capacidades</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          En qué puedo ayudar
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {capabilities.map((cap) => (
            <div key={cap.title} className="rounded-2xl border border-edge/10 bg-surface p-6">
              <h3 className="text-lg font-medium tracking-tight">{cap.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
                {cap.body}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {cap.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-edge/10 bg-raised px-2 py-1 font-mono text-[11px] text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { featuredProjects } from "@/data/projects";
import { marqueeStack, site } from "@/data/site";

const principles = [
  {
    n: "01",
    title: "Las reglas van donde no se pueden saltear",
    body: "Una validación que vive solo en el formulario es una invitación. Las reglas de negocio importantes las pongo en el servidor o en la base, donde cualquier camino —un script, otro cliente, un alta directa— las respeta.",
  },
  {
    n: "02",
    title: "Un solo lugar para la verdad",
    body: "Cuando el mismo dato se guarda en dos tablas que pueden desincronizarse, el sistema empieza a mentir. Prefiero calcular el estado al leer antes que mantener dos versiones que eventualmente divergen.",
  },
  {
    n: "03",
    title: "Documentar mientras se decide",
    body: "El porqué de una decisión se olvida en dos semanas. Dejo escrito qué alternativas había, por qué ganó una y qué conviene revisar después —incluso cuando la respuesta es 'esto es un parche y acá está el ticket'.",
  },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="glow -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 bg-accent/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-container px-6 pb-20 pt-20 sm:pt-28 md:pb-28 md:pt-36">
          <div className="max-w-3xl">
            <p className="animate-fade-up font-mono text-sm text-accent">
              {site.role} · {site.location}
            </p>

            <h1
              className="mt-5 animate-fade-up text-balance text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
              style={{ animationDelay: "60ms" }}
            >
              Hago aplicaciones que{" "}
              <span className="text-muted">resuelven problemas</span> de verdad.
            </h1>

            <p
              className="mt-7 max-w-prose animate-fade-up text-lg leading-relaxed text-muted text-pretty"
              style={{ animationDelay: "120ms" }}
            >
              Trabajo de punta a punta: modelar la base, escribir la API y
              construir la interfaz. Me interesa el detalle que se nota cuando el
              sistema crece —la regla que no se puede saltear, el estado que no se
              desincroniza, la decisión que quedó explicada.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <Link
                href="/proyectos"
                className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
              >
                Ver proyectos
              </Link>
              <Link
                href="/contacto"
                className="rounded-lg border border-edge/15 px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-edge/30 hover:bg-surface"
              >
                Hablemos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Franja de stack ─────────────────────────────────────── */}
      <section aria-label="Tecnologías con las que trabajo" className="border-y border-edge/10 py-5">
        {/* overflow-hidden + doble lista = marquee. La copia está duplicada a propósito. */}
        <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
            {[...marqueeStack, ...marqueeStack].map((tech, i) => (
              <span
                key={`${tech}-${i}`}
                className="flex shrink-0 items-center gap-3 font-mono text-sm text-faint"
              >
                <span className="h-1 w-1 rounded-full bg-accent/50" aria-hidden="true" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proyectos destacados ────────────────────────────────── */}
      <section className="mx-auto max-w-container px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-accent">01 — Trabajo seleccionado</p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              Proyectos destacados
            </h2>
          </div>
          <Link
            href="/proyectos"
            className="link-underline text-sm text-muted transition-colors hover:text-foreground"
          >
            Ver todos →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>
      </section>

      {/* ── Enfoque ─────────────────────────────────────────────── */}
      <section className="border-t border-edge/10 bg-surface/40">
        <div className="mx-auto max-w-container px-6 py-20 md:py-28">
          <p className="font-mono text-sm text-accent">02 — Cómo trabajo</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
            Tres cosas en las que insisto
          </h2>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-edge/10 bg-edge/10 md:grid-cols-3">
            {principles.map((p) => (
              <div key={p.n} className="bg-background p-7">
                <span className="font-mono text-sm text-faint">{p.n}</span>
                <h3 className="mt-4 text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-edge/10">
        <div
          className="glow -bottom-56 left-1/2 h-96 w-96 -translate-x-1/2 bg-accent/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-container px-6 py-24 text-center md:py-32">
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-medium tracking-tight sm:text-5xl">
            ¿Tenés algo en mente?
          </h2>
          <p className="mx-auto mt-5 max-w-prose text-lg leading-relaxed text-muted text-pretty">
            Estoy abierto a oportunidades y a proyectos. Escribime y charlamos:
            respondo siempre.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
            >
              Escribime
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-edge/15 px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-edge/30 hover:bg-surface"
            >
              Ver GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

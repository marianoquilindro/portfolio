import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { StatusBadge } from "@/components/ProjectCard";

// En Next.js 15 `params` es una Promesa en los Server Components.
type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Sin esto, una URL desconocida devolvería 200 en vez de 404.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-container px-6 py-16 md:py-24">
      <nav aria-label="Migas de pan" className="text-sm">
        <Link href="/proyectos" className="link-underline text-muted hover:text-foreground">
          Proyectos
        </Link>
        <span className="mx-2 text-faint" aria-hidden="true">
          /
        </span>
        <span className="text-foreground">{project.title}</span>
      </nav>

      {/* ── Encabezado ─────────────────────────────────────────── */}
      <header className="mt-8 max-w-3xl">
        <div className="flex flex-wrap items-center gap-4">
          <StatusBadge status={project.status} />
          <span className="font-mono text-xs text-faint">{project.year}</span>
          <span className="text-xs text-faint">·</span>
          <span className="text-xs text-muted">{project.role}</span>
        </div>

        <h1 className="mt-5 text-balance text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-prose text-xl leading-relaxed text-muted text-pretty">
          {project.tagline}
        </p>

        {/* Links reales, o la nota de por qué no hay link público. */}
        {project.links.length > 0 ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        ) : project.note ? (
          <p className="mt-8 max-w-prose rounded-xl border border-edge/10 bg-surface p-4 text-sm leading-relaxed text-muted text-pretty">
            <span className="font-medium text-foreground">Sin link público.</span>{" "}
            {project.note}
          </p>
        ) : null}
      </header>

      <hr className="mt-14 border-edge/10" />

      {/* ── El problema ────────────────────────────────────────── */}
      <section className="mt-14 grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <h2 className="font-mono text-sm text-accent">El problema</h2>
        <div>
          <p className="max-w-prose text-[17px] leading-relaxed text-pretty">
            {project.problem}
          </p>
        </div>
      </section>

      {/* ── Lo construido ──────────────────────────────────────── */}
      <section className="mt-14 grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <h2 className="font-mono text-sm text-accent">Lo construido</h2>
        <ul className="max-w-prose space-y-4">
          {project.highlights.map((item) => (
            <li key={item} className="flex gap-3.5">
              <span
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span className="text-[17px] leading-relaxed text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Decisiones ─────────────────────────────────────────── */}
      <section className="mt-14 grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <h2 className="font-mono text-sm text-accent">Decisiones</h2>
        <div className="max-w-prose space-y-5">
          {project.decisions.map((decision) => (
            <div
              key={decision.title}
              className="rounded-2xl border border-edge/10 bg-surface p-6"
            >
              <h3 className="text-lg font-medium tracking-tight">{decision.title}</h3>
              <p className="mt-2.5 text-[16px] leading-relaxed text-muted text-pretty">
                {decision.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stack ──────────────────────────────────────────────── */}
      <section className="mt-14 grid gap-6 md:grid-cols-[10rem_1fr] md:gap-12">
        <h2 className="font-mono text-sm text-accent">Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-edge/10 bg-raised px-3 py-1.5 font-mono text-[13px] text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-20 border-t border-edge/10 pt-8">
        <Link
          href="/proyectos"
          className="link-underline text-sm text-muted transition-colors hover:text-foreground"
        >
          ← Volver a proyectos
        </Link>
      </div>
    </article>
  );
}

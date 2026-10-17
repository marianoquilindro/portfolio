import type { MediaView, Project } from "@/data/projects";
import ProjectMedia from "@/components/ProjectMedia";
import StatusBadge from "@/components/StatusBadge";
import Reveal from "@/components/Reveal";

/**
 * Fila de proyecto: la imagen ocupa una columna y el texto la otra, y el orden
 * se invierte en cada fila para que la página no se lea como una lista.
 *
 * La foto es opcional. Cuando no hay, la fila deja de ser de dos columnas y el
 * texto va a todo el ancho, en vez de dejar un hueco vacío o un <img> sin src.
 */
export default function ProjectRow({
  project,
  index,
  flip = false,
}: {
  project: Project;
  index: number;
  flip?: boolean;
}) {
  const views: MediaView[] =
    project.views && project.views.length > 0
      ? project.views
      : project.image
        ? [
            {
              src: project.image,
              alt: project.imageAlt ?? project.title,
              label: project.title,
            },
          ]
        : [];
  const hasImage = views.length > 0;

  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className={
        hasImage
          ? "grid items-center gap-10 border-t border-edge/10 py-16 md:gap-16 lg:grid-cols-2 lg:py-24"
          : "border-t border-edge/10 py-16 lg:py-24"
      }
    >
      {hasImage ? (
        <Reveal className={flip ? "lg:order-2" : ""}>
          <ProjectMedia
            views={views}
            label={project.frameLabel ?? project.title}
            title={project.title}
            idBase={project.slug}
          />
        </Reveal>
      ) : null}

      <div className={hasImage ? (flip ? "lg:order-1" : "") : "max-w-3xl"}>
        <Reveal delay={1}>
          <p className="font-mono text-xs text-faint">
            <span aria-hidden="true">
              {String(index).padStart(2, "0")} ·{" "}
            </span>
            <StatusBadge status={project.status} />
            <span className="ml-3 text-faint">{project.year}</span>
          </p>
        </Reveal>

        <Reveal delay={2}>
          <h3
            id={`${project.slug}-title`}
            className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mt-3 max-w-prose text-lg leading-relaxed text-muted text-pretty">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={3}>
          <p className="mt-8 font-mono text-xs text-accent">Problema</p>
          <p className="mt-2 max-w-prose text-[16px] leading-relaxed text-pretty">
            {project.problem}
          </p>
        </Reveal>

        <Reveal delay={4}>
          <p className="mt-8 font-mono text-xs text-accent">Decisiones clave</p>
          <ul className="mt-3 max-w-prose space-y-2.5">
            {project.decisions.map((decision) => (
              <li key={decision.title} className="flex gap-3 text-[16px] leading-relaxed">
                <span
                  className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="text-pretty">
                  <span className="font-medium">{decision.title}.</span>{" "}
                  <span className="text-muted">{decision.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={5}>
          <ul
            className="mt-8 flex flex-wrap gap-1.5"
            aria-label={`Stack de ${project.title}`}
          >
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-edge/10 bg-raised px-2.5 py-1 font-mono text-[11px] text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.links.length > 0 ? (
            <div className="mt-7 flex flex-wrap gap-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link text-sm text-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                  <span className="arrow-shift ml-1 text-accent" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          ) : project.note ? (
            <p className="mt-7 max-w-prose rounded-xl border border-edge/10 bg-surface p-4 text-sm leading-relaxed text-muted text-pretty">
              <span className="font-medium text-foreground">Sin link público.</span>{" "}
              {project.note}
            </p>
          ) : null}
        </Reveal>
      </div>
    </article>
  );
}

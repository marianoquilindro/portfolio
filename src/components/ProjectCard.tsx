import Link from "next/link";
import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], { dot: string; text: string }> = {
  "En producción": { dot: "bg-emerald-400", text: "text-emerald-300" },
  Completado: { dot: "bg-sky-400", text: "text-sky-300" },
};

export function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = statusStyles[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${styles.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}

export default function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const shownStack = featured ? project.stack.slice(0, 4) : project.stack.slice(0, 3);
  const extra = project.stack.length - shownStack.length;

  return (
    <Link
      href={`/proyectos/${project.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-edge/10 bg-surface p-6 transition-colors duration-300 hover:border-accent/30 hover:bg-raised"
    >
      <div className="flex items-center justify-between gap-4">
        <StatusBadge status={project.status} />
        <span className="font-mono text-xs text-faint">{project.year}</span>
      </div>

      <h3
        className={`mt-5 font-medium tracking-tight ${
          featured ? "text-2xl" : "text-xl"
        }`}
      >
        <span className="link-underline">{project.title}</span>
      </h3>

      <p className="mt-2.5 text-[15px] leading-relaxed text-muted text-pretty">
        {project.tagline}
      </p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {shownStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-edge/10 bg-raised px-2 py-1 font-mono text-[11px] text-muted"
          >
            {tech}
          </span>
        ))}
        {extra > 0 ? (
          <span className="rounded-md border border-edge/10 px-2 py-1 font-mono text-[11px] text-faint">
            +{extra}
          </span>
        ) : null}
      </div>

      <div className="mt-auto flex items-center gap-1.5 pt-6 text-sm text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
        Ver detalle
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <path d="M2.5 7h9" />
          <path d="M8 3.5L11.5 7 8 10.5" />
        </svg>
      </div>
    </Link>
  );
}

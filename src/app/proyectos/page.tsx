import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Trabajo seleccionado: sistemas de gestión, aplicaciones full-stack y sitios en producción.",
};

export default function ProyectosPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="font-mono text-sm text-accent">Trabajo seleccionado</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
          Proyectos
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
          Cada ficha cuenta el problema concreto, lo que se construyó y las
          decisiones de diseño que hubo que tomar. El stack está al final: es lo
          menos interesante.
        </p>
      </header>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

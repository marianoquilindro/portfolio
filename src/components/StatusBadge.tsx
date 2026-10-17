import type { Project } from "@/data/projects";

const statusStyles: Record<Project["status"], { dot: string; text: string }> = {
  "En producción": { dot: "bg-emerald-400", text: "text-emerald-300" },
  Completado: { dot: "bg-sky-400", text: "text-sky-300" },
};

export default function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = statusStyles[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${styles.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />
      {status}
    </span>
  );
}

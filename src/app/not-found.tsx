import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-container flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        No hay nada acá
      </h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-muted text-pretty">
        La página que buscás no existe o se movió.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
        >
          Ir al inicio
        </Link>
        <Link
          href="/proyectos"
          className="rounded-lg border border-edge/15 px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-edge/30 hover:bg-surface"
        >
          Ver proyectos
        </Link>
      </div>
    </div>
  );
}

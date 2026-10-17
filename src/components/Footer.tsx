import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge/10">
      <div className="mx-auto max-w-container px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-[15px] font-medium tracking-tight">{site.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {site.role} · {site.location}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-3 inline-block text-sm text-muted transition-colors hover:text-foreground"
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Pie de página">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
              <li>
                <Link href="/proyectos" className="text-muted transition-colors hover:text-foreground">
                  Proyectos
                </Link>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/sobre-mi" className="text-muted transition-colors hover:text-foreground">
                  Sobre mí
                </Link>
              </li>
              <li>
                <a
                  href={site.studio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-foreground"
                >
                  Studio 74
                </a>
              </li>
              <li>
                <Link href="/contacto" className="text-muted transition-colors hover:text-foreground">
                  Contacto
                </Link>
              </li>
              {site.linkedin ? (
                <li>
                  <a
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    LinkedIn
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-edge/10 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. Todos los derechos reservados.</p>
          <p className="font-mono">
            Hecho con Next.js, TypeScript y Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}

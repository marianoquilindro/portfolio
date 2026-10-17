import { site } from "@/data/site";

const navLinks = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#stack", label: "Stack" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

const externalLinks = [
  { href: site.github, label: "GitHub" },
  { href: site.studio, label: "Studio 74" },
];

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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {externalLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-edge/10 pt-6 text-xs text-faint">
          <p>
            © {year} {site.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

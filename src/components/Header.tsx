"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/sobre-mi", label: "Sobre mí" },
];

export default function Header() {
  const pathname = usePathname();
  // Arranca cerrado en el cliente para no flashear el menú abierto en el SSR.
  const [open, setOpen] = useState(false);

  // Cerrar el menú al navegar y al volver a desktop.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-edge/10 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} — inicio`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-edge/10 bg-surface font-mono text-[13px] font-medium text-accent transition-colors group-hover:border-accent/40">
            {site.initials}
          </span>
          <span className="hidden text-[15px] font-medium tracking-tight sm:block">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground md:block"
          >
            GitHub
          </a>

          <Link
            href="/contacto"
            className="ml-1 hidden rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 md:block"
          >
            Contacto
          </Link>

          {/* Botón hamburguesa — solo mobile. */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid h-9 w-9 place-items-center rounded-lg border border-edge/10 text-muted transition-colors hover:text-foreground md:hidden"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M4 4l8 8" />
                  <path d="M12 4l-8 8" />
                </>
              ) : (
                <>
                  <path d="M2.5 5h11" />
                  <path d="M2.5 11h11" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </div>

      {/* Menú mobile */}
      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-edge/10 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <nav className="mx-auto max-w-container px-6 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                    isActive(link.href)
                      ? "bg-surface text-foreground"
                      : "text-muted hover:text-foreground"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                className="block rounded-lg bg-accent px-3 py-2.5 text-center text-[15px] font-medium text-background"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

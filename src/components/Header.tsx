"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";

const sections = [
  { id: "sobre-mi", n: "01", label: "Sobre mí" },
  { id: "stack", n: "02", label: "Stack" },
  { id: "proyectos", n: "03", label: "Proyectos" },
  { id: "contacto", n: "04", label: "Contacto" },
];

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Resalta la sección que se está leyendo.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Quedarse con la entrada más visible del viewport.
        const mostVisible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActive(mostVisible.target.id);
      },
      // Margen que define "estoy leyendo esta sección": banda central de la pantalla.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Cerrar el menú mobile al navegar.
  useEffect(() => {
    setOpen(false);
  }, [active]);

  return (
    <header className="sticky top-0 z-50 border-b border-edge/10 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-container items-center justify-between px-6">
        <Link
          href="#top"
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

        <nav aria-label="Secciones">
          <ul className="mr-2 hidden items-center gap-1 md:flex">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-baseline gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive ? "text-foreground" : "text-muted hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] transition-colors ${
                        isActive ? "text-accent" : "text-faint"
                      }`}
                      aria-hidden="true"
                    >
                      {section.n}
                    </span>
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground md:block"
          >
            GitHub
          </a>

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

      <div
        id="menu-movil"
        hidden={!open}
        className="border-t border-edge/10 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <nav aria-label="Secciones" className="mx-auto max-w-container px-6 py-4">
          <ul className="flex flex-col gap-1">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`flex items-baseline gap-2 rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                      isActive ? "bg-surface text-foreground" : "text-muted"
                    }`}
                  >
                    <span className="font-mono text-[11px] text-faint" aria-hidden="true">
                      {section.n}
                    </span>
                    {section.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

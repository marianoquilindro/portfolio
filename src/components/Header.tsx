"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { site } from "@/data/site";

const sections = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "stack", label: "Stack" },
  { id: "proyectos", label: "Proyectos" },
  { id: "contacto", label: "Contacto" },
];

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Resalta la sección activa con scroll-spy preciso (no se saltea proyectos por ser extenso)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Si llegó al fondo de la página, activa Contacto
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80;
      if (isBottom) {
        setActive("contacto");
        return;
      }

      // Umbral visual de detección (un tercio superior de la pantalla)
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      let currentSection = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentSection = section.id;
          }
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar el menú mobile al navegar
  useEffect(() => {
    setOpen(false);
  }, [active]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto flex h-14 max-w-4xl items-center justify-between rounded-full border px-3 sm:px-4 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-edge/20 bg-background/90 shadow-xl shadow-black/40"
            : "border-edge/10 bg-background/70 shadow-lg shadow-black/20"
        }`}
      >
        {/* Identidad / Logo */}
        <Link
          href="#top"
          className="group flex items-center gap-2.5 pl-1"
          aria-label={`${site.name} — inicio`}
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full border border-edge/15 bg-surface font-mono text-[13px] font-semibold text-accent transition-transform duration-300 group-hover:scale-105 group-hover:border-accent/40">
            {site.initials}
            {/* Punto verde de disponibilidad */}
            <span
              className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5"
              title="Disponible para proyectos"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-foreground">
            {site.name}
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav aria-label="Secciones" className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1 rounded-full border border-edge/10 bg-surface/40 p-1">
            {sections.map((section) => {
              const isActive = active === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-surface text-foreground shadow-sm border border-edge/15"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {/* Cada letra se anima con escalón propio (ver .nav-chars).
                        El label real va oculto para lectores de pantalla. */}
                    <span className="nav-chars" aria-hidden="true">
                      {[...section.label].map((ch, ci) => (
                        <span key={ci} style={{ "--i": ci } as React.CSSProperties}>
                          {ch === " " ? "\u00A0" : ch}
                        </span>
                      ))}
                    </span>
                    <span className="sr-only">{section.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Acciones derecha */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub de Mariano Quilindro"
            className="hidden sm:grid h-8 w-8 place-items-center rounded-full border border-edge/10 bg-surface/50 text-muted transition-all hover:border-edge/25 hover:text-foreground"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>

          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-medium text-background transition-all hover:opacity-90 active:scale-95"
          >
            <span>Hablemos</span>
            <span className="text-xs" aria-hidden="true">→</span>
          </a>

          {/* Botón menú mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid h-9 w-9 place-items-center rounded-full border border-edge/15 bg-surface text-muted transition-colors hover:text-foreground md:hidden"
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
        </div>
      </div>

      {/* Menú desplegable Mobile estilo flotante */}
      {open && (
        <div
          id="menu-movil"
          className="pointer-events-auto mx-auto mt-2 max-w-sm rounded-2xl border border-edge/15 bg-background/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden animate-fade-in"
        >
          <nav aria-label="Secciones mobile">
            <ul className="flex flex-col gap-1.5">
              {sections.map((section) => {
                const isActive = active === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-surface text-accent border border-edge/10"
                          : "text-muted hover:bg-surface/50 hover:text-foreground"
                      }`}
                    >
                      <span>{section.label}</span>
                      <span className="text-xs text-faint" aria-hidden="true">→</span>
                    </a>
                  </li>
                );
              })}
              <li className="mt-2 border-t border-edge/10 pt-2">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-muted hover:bg-surface/50 hover:text-foreground"
                >
                  <span>GitHub</span>
                  <span className="text-xs" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

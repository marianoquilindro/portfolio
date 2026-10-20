"use client";

import { useState } from "react";

/**
 * Grupo de stack (Frontend / Backend / Plataforma) con acordeón en mobile.
 *
 * Cómo funciona:
 * - El estado arranca cerrado, así el HTML del servidor ya sirve la versión
 *   mobile plegada, sin flash de contenido que se colapsa al hidratar.
 * - En desktop el CSS ignora el estado y deja el panel siempre abierto
 *   (ver `.stack-panel` en globals.css), así escritorio no cambia nada.
 * - Se renderizan dos títulos: el plano (heading, visible desde md) y el
 *   botón (visible solo en mobile). Como uno de los dos siempre está en
 *   `display: none`, los lectores de pantalla ven un solo título.
 */
export default function StackGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `stack-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <section className="space-y-4">
      {/* Título en desktop: heading plano con la línea decorativa. */}
      <div className="hidden items-center gap-3 md:flex">
        <h3 className="font-mono text-xs uppercase tracking-wider text-accent">
          {label}
        </h3>
        <span className="h-px flex-1 bg-edge/10" aria-hidden="true" />
      </div>

      {/* Título en mobile: botón que abre/cierra el panel. */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-3 text-left md:hidden"
      >
        <span className="font-mono text-xs uppercase tracking-wider text-accent">
          {label}
        </span>
        <span className="h-px flex-1 bg-edge/10" aria-hidden="true" />
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`shrink-0 text-muted transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Panel: plegable en mobile, siempre visible en desktop. */}
      <div id={panelId} className="stack-panel" data-collapsed={open ? "false" : "true"}>
        <div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

/**
 * Marco de teléfono para la captura móvil de un proyecto.
 *
 * Es solo el bisel: el contenido lo pasa quien lo usa. El ancho está acotado a
 * propósito —un teléfono ocupando toda la columna quedaría absurdamente alto—
 * y se centra, para que la fila siga alineada con las de los demás proyectos.
 */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="group/frame relative mx-auto w-full max-w-[286px]">
      {/* Halo que se enciende al pasar el mouse. Decorativo. */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-accent/[0.08] opacity-0 blur-3xl transition-opacity duration-500 group-hover/frame:opacity-100"
        aria-hidden="true"
      />

      <div className="relative rounded-[2.5rem] border border-edge/15 bg-gradient-to-b from-raised to-surface p-2 shadow-[0_24px_70px_-24px_rgba(0,0,0,0.85)] transition-all duration-500 group-hover/frame:-translate-y-1 group-hover/frame:border-edge/25">
        {/* Isla superior. Decorativa. */}
        <div
          className="absolute left-1/2 top-3 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/70"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-[2rem] bg-background">
          {children}
        </div>
      </div>
    </div>
  );
}

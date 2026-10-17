import type { ReactNode } from "react";

type Props = {
  /**
   * Texto de la barra superior: la URL si el proyecto es público, o una
   * etiqueta honesta si es interno. No inventamos dominios.
   */
  label: string;
  /** El área de la captura. Lo que va dentro del marco. */
  children: ReactNode;
};

/**
 * Marco de navegador para las capturas de proyecto.
 *
 * La barra con los tres puntos y la píldora hacen que la captura se lea como
 * producto funcionando, en vez de una imagen suelta flotando en la página.
 */
export default function BrowserFrame({ label, children }: Props) {
  return (
    <div className="group/frame relative">
      {/* Halo que se enciende al pasar el mouse. Decorativo. */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-accent/[0.08] opacity-0 blur-3xl transition-opacity duration-500 group-hover/frame:opacity-100"
        aria-hidden="true"
      />

      <div className="relative overflow-hidden rounded-xl border border-edge/10 bg-surface shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] transition-all duration-500 group-hover/frame:-translate-y-1 group-hover/frame:border-edge/20">
        {/* Barra del navegador. */}
        <div className="flex items-center gap-3 border-b border-edge/10 bg-raised/70 px-3.5 py-2.5">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-background/60 px-3 py-1 text-center font-mono text-[11px] leading-4 text-faint">
            {label}
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}

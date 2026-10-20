"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Preloader con contador y cortina que revela el hero.
 *
 * Reglas de producción:
 * - Solo aparece en la primera visita de la sesión (`sessionStorage`): recargar
 *   o volver atrás no vuelve a castigar al usuario.
 * - Con `prefers-reduced-motion` no se muestra.
 * - Mientras está, pausa la animación de líneas del hero (`intro-pending` en
 *   <html>) para que no se termine de animar tapado.
 * - Se renderiza null en el servidor: cero impacto en el HTML inicial.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("portfolio-intro") === "1";
    if (reduced || seen) return;

    setShow(true);
    document.documentElement.classList.add("intro-pending");
    document.body.style.overflow = "hidden";

    const DURATION = 1100;
    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(eased * 100);
      if (countRef.current) countRef.current.textContent = String(value).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (p < 1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        sessionStorage.setItem("portfolio-intro", "1");
        document.documentElement.classList.remove("intro-pending");
        document.body.style.overflow = "";
        window.setTimeout(() => setShow(false), 900);
      }
    };
    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.documentElement.classList.remove("intro-pending");
      document.body.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`preloader${leaving ? " is-done" : ""}`} aria-hidden="true">
      <div className="flex flex-col items-center gap-4">
        <p className="preloader-name" aria-label="Mariano Quilindro">
          {"MARIANO QUILINDRO".split("").map((ch, i) => (
            <span
              key={i}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden="true"
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </p>
        <span ref={countRef} className="font-mono text-xs tracking-[0.3em] text-faint">
          000
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-edge/10">
        <div
          ref={barRef}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}

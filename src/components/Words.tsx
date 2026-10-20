"use client";

import { Fragment, useEffect, useRef, useState } from "react";

/**
 * Revela un párrafo palabra por palabra.
 *
 * Dos modos:
 * - `reveal` (por defecto): las palabras aparecen de golpe, escalonadas, la
 *   primera vez que el párrafo entra en pantalla.
 * - `scroll`: las palabras se encienden de a una según la posición del
 *   párrafo en la ventana — nace de la versión "prueba" del portfolio.
 *
 * En ambos el texto sigue siendo una sola oración para el lector de pantalla:
 * el contenedor lleva `aria-label` y los spans quedan `aria-hidden`.
 */
export default function Words({
  text,
  className = "",
  as: Tag = "p",
  mode = "reveal",
}: {
  text: string;
  className?: string;
  as?: "p" | "span";
  mode?: "reveal" | "scroll";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (mode === "scroll") {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        wordRefs.current.forEach((w) => w?.classList.add("is-lit"));
        return;
      }

      let frame = 0;
      const update = () => {
        frame = 0;
        const rect = el!.getBoundingClientRect();
        const words = wordRefs.current;
        // Progreso del párrafo contra la ventana: entra por abajo, sale por arriba
        const total = rect.height + window.innerHeight * 0.55;
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - rect.top) / total));
        const head = p * (words.length + 8);
        words.forEach((w, i) => w?.classList.toggle("is-lit", i < head));
      };
      const schedule = () => {
        if (frame === 0) frame = window.requestAnimationFrame(update);
      };

      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      update();

      return () => {
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        if (frame !== 0) window.cancelAnimationFrame(frame);
      };
    }

    // Modo reveal
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mode]);

  const words = text.split(" ");
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-words={mode}
      aria-label={text}
      className={`${className} ${mode === "reveal" && visible ? "is-visible" : ""}`.trim()}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          // El espacio va como nodo hermano, no dentro del inline-block:
          // adentro se colgaría y las palabras quedarían pegadas.
          <Fragment key={`${word}-${i}`}>
            <span
              ref={(node) => {
                wordRefs.current[i] = node;
              }}
              style={{ "--w": i } as React.CSSProperties}
            >
              {word}
            </span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}

"use client";

import { Fragment, useEffect, useRef, useState } from "react";

/**
 * Revela un párrafo palabra por palabra.
 *
 * El texto se parte en spans, pero para el lector de pantalla sigue siendo una
 * sola oración: el párrafo lleva `aria-label` con el texto completo y los spans
 * quedan `aria-hidden`. Se lee igual que sin animación.
 */
export default function Words({
  text,
  className = "",
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "span";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
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
  }, []);

  const words = text.split(" ");
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-words=""
      aria-label={text}
      className={`${className} ${visible ? "is-visible" : ""}`.trim()}
    >
      <span aria-hidden="true">
        {words.map((word, i) => (
          // El espacio va como nodo hermano, no dentro del inline-block:
          // adentro se colgaría y las palabras quedarían pegadas.
          <Fragment key={`${word}-${i}`}>
            <span style={{ "--w": i } as React.CSSProperties}>{word}</span>
            {i < words.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </span>
    </Component>
  );
}

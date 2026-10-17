"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** Retardo escalonado. Se multiplica por 70ms en el CSS. */
  delay?: number;
  className?: string;
  /** Etiqueta HTML a renderizar. */
  as?: "div" | "section" | "article" | "li" | "header" | "p";
};

/**
 * Aparece cuando el elemento entra en pantalla.
 *
 * La clase `.js` en <html> es la que habilita el estado oculto en el CSS:
 * sin JavaScript el contenido nunca queda invisible, simplemente se ve.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el navegador no sabe observar, mostramos todo directamente.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            // Una vez que apareció, deja de observar: no hay que repetirlo.
            observer.disconnect();
          }
        }
      },
      // Dispara un poco antes del borde inferior para que no se sienta atrasado.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // `React.ElementType` evita que TypeScript infiera un ref distinto por cada
  // etiqueta posible del unión `as`, que es lo que rompe el tipado acá.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-reveal=""
      // La clase es la que el CSS usa para sacar el estado oculto.
      className={`${className} ${visible ? "is-visible" : ""}`.trim()}
      // `--i` lo lee el CSS para calcular el retardo del escalonado.
      style={{ "--i": delay } as React.CSSProperties}
    >
      {children}
    </Component>
  );
}

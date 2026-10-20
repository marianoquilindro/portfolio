"use client";

import { useEffect, useRef } from "react";

/**
 * Efecto scramble al pasar el mouse: el texto se mezcla y vuelve a su valor
 * original. El ancho se congela antes de mezclar para que el layout no se
 * mueva ni un pixel (sin esto, cambiar el texto por frame dispara scroll
 * anchoring y la página tiembla).
 */
export default function Scramble({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = "abcdefghijklmnopqrstuvwxyz@._-";
    let busy = false;

    const freezeWidth = () => {
      el.style.width = "";
      el.style.width = `${el.getBoundingClientRect().width}px`;
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(freezeWidth);
    } else {
      freezeWidth();
    }
    window.addEventListener("resize", freezeWidth, { passive: true });

    const onEnter = () => {
      if (busy) return;
      busy = true;
      let frame = 0;
      const total = 22;
      const id = window.setInterval(() => {
        el.textContent = [...text]
          .map((ch, i) => {
            if (ch === " " || frame > i * 1.1 + 6) return ch;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (++frame >= total) {
          window.clearInterval(id);
          el.textContent = text;
          busy = false;
        }
      }, 34);
    };

    el.addEventListener("pointerenter", onEnter);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("resize", freezeWidth);
    };
  }, [text]);

  return (
    <span ref={ref} className="scramble">
      {text}
    </span>
  );
}

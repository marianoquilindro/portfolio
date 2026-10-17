"use client";

import { useEffect } from "react";

/**
 * Barra de progreso de scroll, arriba de todo.
 *
 * Va por requestAnimationFrame y con listener pasivo, para que no pelee con el
 * scroll del navegador: si se recalculara en cada evento, el scroll se traba.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    let frame = 0;

    const render = () => {
      frame = 0;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      bar?.style.setProperty("--progress", String(Math.min(1, Math.max(0, ratio))));
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(render);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    render();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // aria-hidden: es decoración. El progreso real lo da la barra de scroll.
  return <div className="progress" data-progress="" aria-hidden="true" />;
}

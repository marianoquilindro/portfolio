"use client";

import { useEffect } from "react";

/**
 * Efectos que dependen del scroll de la página, en un solo listener:
 *
 * 1. La barra de progreso de arriba.
 * 2. El parallax de las imágenes de proyecto ([data-parallax]).
 *
 * Va todo por requestAnimationFrame y con listeners pasivos, para que no
 * pelee con el scroll del navegador.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    // HTMLElement, no Element: se le va a escribir style.
    const parallax = new Set<HTMLElement>();
    const observed = new WeakSet<Element>();
    let frame = 0;
    let pendingScan = false;

    const render = () => {
      frame = 0;

      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? window.scrollY / max : 0;
      bar?.style.setProperty("--progress", String(Math.min(1, Math.max(0, ratio))));

      // -1 cuando el elemento está abajo del viewport, +1 cuando está arriba.
      // Ese rango es el que mueve la imagen dentro de su marco.
      const mid = window.innerHeight / 2;
      for (const el of parallax) {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        el.style.setProperty("--parallax", String((center - mid) / mid).slice(0, 8));
      }
    };

    const schedule = () => {
      if (frame === 0) frame = window.requestAnimationFrame(render);
    };

    // Solo las imágenes que se están viendo se actualizan.
    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                const el = entry.target as HTMLElement;
                if (entry.isIntersecting) parallax.add(el);
                else parallax.delete(el);
              }
              schedule();
            },
            { rootMargin: "200px 0px" },
          )
        : null;

    /**
     * Engancha los marcos que todavía no estaban.
     *
     * No alcanza con mirar el DOM una sola vez: al cambiar de solapa en una
     * ficha de proyecto la captura se vuelve a montar, así que siempre puede
     * aparecer un marco nuevo para observar.
     */
    const observeAll = () => {
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        if (observed.has(el)) return;
        observed.add(el);
        observer?.observe(el);
      });
      schedule();
    };

    const mutationObserver =
      typeof MutationObserver !== "undefined"
        ? new MutationObserver(() => {
            // Agrupamos las mutaciones de un mismo frame en una sola pasada.
            if (pendingScan) return;
            pendingScan = true;
            window.requestAnimationFrame(() => {
              pendingScan = false;
              observeAll();
            });
          })
        : null;
    mutationObserver?.observe(document.body, { childList: true, subtree: true });

    observeAll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    render();

    return () => {
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer?.disconnect();
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // aria-hidden: es decoración. El progreso real lo da la barra de scroll.
  return <div className="progress" data-progress="" aria-hidden="true" />;
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import BrowserFrame from "@/components/BrowserFrame";
import PhoneFrame from "@/components/PhoneFrame";
import type { MediaView } from "@/data/projects";

type Props = {
  views: MediaView[];
  /** Texto de la barra del marco de navegador. */
  label: string;
  /** Nombre del proyecto, para las etiquetas accesibles. */
  title: string;
  /** `slug` del proyecto: da ids únicos si hay más de una galería. */
  idBase: string;
};

/**
 * Captura del proyecto, enmarcada según cómo se vea: navegador en escritorio,
 * teléfono en móvil.
 *
 * Con una sola captura es estática. Con varias, se agrega una fila de botones
 * para cambiarla. El marco (navegador o teléfono) sale del `frame` de cada
 * vista, así que se puede mostrar el mismo producto en las dos pantallas.
 */
export default function ProjectMedia({ views, label, title, idBase }: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const multi = views.length > 1;
  const view = views[active];
  const isPhone = view.frame === "phone";

  const focusTab = (index: number) => {
    const next = (index + views.length) % views.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!multi) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(active + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(views.length - 1);
    }
  };

  const panelId = `${idBase}-vista`;
  const tabId = (index: number) => `${idBase}-vista-${index}`;

  // La captura entra entera dentro del marco: ver `.media-frame` en globals.css.
  const screen = (
    <div
      id={panelId}
      role={multi ? "tabpanel" : undefined}
      aria-labelledby={multi ? tabId(active) : undefined}
      className={`media-frame relative w-full overflow-hidden bg-background ${
        isPhone ? "aspect-[390/844]" : "aspect-[2/1]"
      }`}
    >
      {/* key por src: la animación de entrada corre en cada cambio de vista. */}
      <Image
        key={view.src}
        src={view.src}
        alt={view.alt}
        fill
        sizes={isPhone ? "288px" : "(min-width: 1024px) 50vw, 100vw"}
        className="media-in object-cover object-left-top"
      />
    </div>
  );

  return (
    <div className="w-full min-w-0">
      {isPhone ? (
        <PhoneFrame>{screen}</PhoneFrame>
      ) : (
        <BrowserFrame label={label}>{screen}</BrowserFrame>
      )}

      {multi ? (
        <div
          role="tablist"
          aria-label={`Vistas de ${title}`}
          onKeyDown={onKeyDown}
          className={`mt-3 sm:mt-4 flex flex-wrap gap-1.5 sm:gap-2 ${isPhone ? "justify-center" : ""}`}
        >
          {views.map((item, index) => (
            <button
              key={item.src}
              ref={(el) => {
                tabs.current[index] = el;
              }}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={panelId}
              tabIndex={index === active ? 0 : -1}
              onClick={() => setActive(index)}
              className={`rounded-lg border px-2.5 py-1 sm:px-3 sm:py-1.5 font-mono text-[10px] sm:text-[11px] transition-colors ${
                index === active
                  ? "border-accent/40 bg-accent/10 text-foreground"
                  : "border-edge/10 bg-raised text-muted hover:border-edge/20 hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

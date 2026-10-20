import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Imagen para previews sociales (Open Graph y Twitter), generada en runtime
 * con el mismo lenguaje visual del sitio: fondo oscuro, teal de acento y la
 * tipografía por defecto de next/og.
 *
 * Next la sirve en /opengraph-image y /twitter-image y la referencia sola en
 * los metadatos; no hay que tocar layout.tsx para que aparezca.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0d12",
          color: "#e8eef4",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 30,
            color: "#2dd4bf",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 9999,
              backgroundColor: "#2dd4bf",
              display: "flex",
            }}
          />
          <span>{"// portfolio"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>
            {site.name}
          </span>
          <span style={{ fontSize: 40, color: "#93a1b0" }}>
            {site.role} · {site.location}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
          }}
        >
          <div
            style={{
              width: 220,
              height: 4,
              borderRadius: 9999,
              backgroundColor: "#2dd4bf",
              display: "flex",
            }}
          />
          <span style={{ fontSize: 32, color: "#93a1b0" }}>{site.tagline}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

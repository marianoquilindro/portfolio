import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Cómo contactar a Mariano Quilindro.",
};

const channels = [
  {
    label: "Mail",
    value: site.email,
    href: `mailto:${site.email}`,
    external: false,
  },
  {
    label: "GitHub",
    value: "@marianoquilindro",
    href: site.github,
    external: true,
  },
  {
    label: "Studio 74",
    value: "studio74dev.github.io",
    href: site.studio,
    external: true,
  },
];

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-container px-6 py-16 md:py-24">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
        <div>
          <p className="font-mono text-sm text-accent">Contacto</p>
          <h1 className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            Escribime
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted text-pretty">
            Si tenés un proyecto, una vacante o una duda, mandame un mensaje.
            Respondo siempre, aunque lleve unos días.
          </p>

          <ul className="mt-12 space-y-1">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-transparent px-4 py-3.5 transition-colors hover:border-edge/10 hover:bg-surface"
                >
                  <span>
                    <span className="block text-xs text-faint">{channel.label}</span>
                    <span className="mt-0.5 block text-[15px] text-foreground">
                      {channel.value}
                    </span>
                  </span>
                  <span
                    className="text-faint transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-edge/10 bg-surface/50 p-6 sm:p-8">
          <h2 className="text-lg font-medium tracking-tight">Mandame un mensaje</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Este formulario no usa servidor: prepara el mail y lo abre en tu
            aplicación de correo, con el mensaje ya escrito.
          </p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

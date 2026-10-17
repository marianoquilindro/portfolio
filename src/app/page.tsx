import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import Words from "@/components/Words";
import ContactForm from "@/components/ContactForm";
import { projects } from "@/data/projects";
import { site, stackGroups } from "@/data/site";

const heroLines = ["Mariano", "Quilindro"];

const pillars = [
  "APIs y bases de datos",
  "Autenticación y control de acceso",
  "Interfaces web",
  "Modelado de datos",
];

const contactChannels = [
  { label: "Mail", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", value: "@marianoquilindro", href: site.github, external: true },
  { label: "Studio 74", value: "studio74dev.github.io", href: site.studio, external: true },
];

export default function Home() {
  return (
    <>
      {/* ── 00 · Hero ──────────────────────────────────────────── */}
      <section id="top" className="relative overflow-hidden">
        <div
          className="glow -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 bg-accent/10"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-container px-6 pb-24 pt-24 sm:pt-32 md:pb-32 md:pt-40">
          <p className="font-mono text-sm text-accent">{"// portfolio"}</p>

          <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
            {heroLines.map((line, i) => (
              <span key={line} data-line="" className="overflow-hidden">
                <span style={{ "--i": i + 1 } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>

          <Reveal delay={3}>
            <p className="mt-8 text-lg text-muted">
              {site.role} · {site.location}
            </p>
          </Reveal>

          <Reveal delay={4}>
            <p className="mt-3 max-w-prose text-balance text-2xl leading-snug tracking-tight sm:text-3xl">
              Construyo aplicaciones completas: de la base de datos a la interfaz.
            </p>
          </Reveal>

          <Reveal delay={5}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#proyectos"
                className="rounded-lg bg-accent px-5 py-2.5 text-[15px] font-medium text-background transition-opacity hover:opacity-90"
              >
                Ver proyectos
              </a>
              <a
                href="#contacto"
                className="rounded-lg border border-edge/15 px-5 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:border-edge/30 hover:bg-surface"
              >
                Hablemos
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 01 · Sobre mí ──────────────────────────────────────── */}
      <section id="sobre-mi" className="mx-auto max-w-container px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <p className="font-mono text-sm text-accent">01 — Sobre mí</p>

          <div className="max-w-prose space-y-7">
            <Words
              text="Trabajo de punta a punta: modelo los datos, escribo la API y construyo la interfaz, y cuando hace falta dejo resueltos también el despliegue y las políticas de acceso. Poder pensar el sistema completo —en vez de una capa aislada— es lo que me permite encontrar los problemas antes de que lleguen a producción."
              className="text-xl leading-relaxed tracking-tight text-pretty sm:text-2xl"
            />

            <Reveal delay={2}>
              <p className="text-[17px] leading-relaxed text-muted text-pretty">
                Lo más concreto de lo que hago está en{" "}
                <Link
                  href="#proyectos"
                  className="link-underline font-medium text-foreground"
                >
                  Club El Progreso
                </Link>
                , un sistema de gestión para un club de pileta con autenticación,
                control de acceso a nivel de base, mapa interactivo de sombrillas y
                trazabilidad de cada operación. Ahí aparecieron las decisiones que
                más me enseñaron: dónde poner una regla para que no se pueda
                saltear, y cómo modelar un ciclo estacional que arranca y cierra
                cada año.
              </p>
            </Reveal>

            <Reveal delay={3}>
              <p className="text-[17px] leading-relaxed text-muted text-pretty">
                También cofundé{" "}
                <Link
                  href="#proyectos"
                  className="link-underline font-medium text-foreground"
                >
                  Studio 74
                </Link>
                , el estudio de desarrollo que armamos con tres amigos, donde
                hacemos web a medida: landings, sitios institucionales y sistemas
                de gestión.
              </p>
            </Reveal>

            <Reveal delay={4}>
              <ul className="grid gap-x-8 gap-y-2 pt-3 font-mono text-sm text-muted sm:grid-cols-2">
                {pillars.map((pillar, i) => (
                  <li key={pillar} className="flex gap-3">
                    <span className="text-faint" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 · Stack ─────────────────────────────────────────── */}
      <section id="stack" className="border-y border-edge/10 bg-surface/40">
        <div className="mx-auto max-w-container px-6 py-20 md:py-28">
          <p className="font-mono text-sm text-accent">02 — Stack</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Con qué trabajo
          </h2>

          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {stackGroups.map((group, i) => (
              <Reveal key={group.label} delay={i}>
                <h3 className="font-mono text-sm text-faint">{group.label}</h3>
                <ul className="mt-4 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-lg tracking-tight">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · Proyectos ─────────────────────────────────────── */}
      <section id="proyectos" className="mx-auto max-w-container px-6 pt-20 md:pt-28">
        <div className="max-w-2xl">
          <p className="font-mono text-sm text-accent">03 — Proyectos</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Trabajo seleccionado
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
            El problema concreto, las decisiones de diseño que hubo que tomar y el
            stack al final. Es lo menos interesante.
          </p>
        </div>

        <div className="mt-12">
          {projects.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={i + 1}
              flip={i % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* ── 04 · Contacto ──────────────────────────────────────── */}
      <section id="contacto" className="border-t border-edge/10">
        <div className="mx-auto max-w-container px-6 py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="font-mono text-sm text-accent">04 — Contacto</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                Escribime
              </h2>
              <p className="mt-5 max-w-prose text-lg leading-relaxed text-muted text-pretty">
                Si tenés un proyecto, una vacante o una duda, mandame un mensaje.
                Respondo siempre, aunque lleve unos días.
              </p>

              <ul className="mt-10">
                {contactChannels.map((channel) => (
                  <li key={channel.label} className="border-t border-edge/10 last:border-b">
                    <a
                      href={channel.href}
                      {...(channel.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-faint">
                          {channel.label}
                        </span>
                        <span className="text-lg tracking-tight">{channel.value}</span>
                      </span>
                      <span className="arrow-shift text-accent" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal className="h-fit rounded-2xl border border-edge/10 bg-surface/50 p-6 sm:p-8">
              <h3 className="text-lg font-medium tracking-tight">Mandame un mensaje</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Este formulario no usa servidor: prepara el mail y lo abre en tu
                aplicación de correo, con el mensaje ya escrito.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

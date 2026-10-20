import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import Reveal from "@/components/Reveal";
import Words from "@/components/Words";
import ContactForm from "@/components/ContactForm";
import HeroShader from "@/components/HeroShader";
import Scramble from "@/components/Scramble";
import StackGroup from "@/components/StackGroup";
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
        {/* Fondo WebGL (ruido fbm). El glow CSS de abajo se superpone y el
            velo degradado funde el shader con el fondo de la página. */}
        <HeroShader className="absolute inset-0 h-full w-full" />
        <div
          className="glow -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 bg-accent/10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-container px-4 sm:px-6 pb-20 pt-28 sm:pt-36 md:pb-32 md:pt-44">
          <p className="flex items-center gap-2.5 font-mono text-sm text-accent">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {"// disponible para proyectos"}
          </p>

          <h1 className="mt-6 text-4xl xs:text-5xl font-medium leading-[0.95] tracking-tight sm:text-7xl md:text-8xl break-words">
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
      <section id="sobre-mi" className="scroll-mt-24 mx-auto max-w-container px-4 sm:px-6 py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[10rem_1fr] lg:gap-16">
          <p className="font-mono text-sm text-accent">01 — Sobre mí</p>

          <div className="max-w-prose space-y-7">
            <Words
              text="Trabajo de punta a punta: modelo los datos, escribo la API y construyo la interfaz, y cuando hace falta dejo resueltos también el despliegue y las políticas de acceso. Poder pensar el sistema completo —en vez de una capa aislada— es lo que me permite encontrar los problemas antes de que lleguen a producción."
              className="text-xl leading-relaxed tracking-tight text-pretty sm:text-2xl"
              mode="scroll"
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
      <section id="stack" className="scroll-mt-24 border-y border-edge/10 bg-surface/40">
        <div className="mx-auto max-w-container px-4 sm:px-6 py-20 md:py-28">
          <p className="font-mono text-sm text-accent">02 — Stack</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Con qué trabajo
          </h2>

          <div className="mt-12 space-y-10">
            {stackGroups.map((group) => (
              <StackGroup key={group.label} label={group.label}>
                {group.items.map((tech, i) => (
                  <Reveal key={tech.name} delay={i + 1}>
                    <div className="group relative flex flex-col justify-between h-full rounded-xl border border-edge/10 bg-surface/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface hover:shadow-xl hover:shadow-accent/5">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-[15px] font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                            {tech.name}
                          </h4>
                          <span className="rounded-md border border-edge/10 bg-raised px-2 py-0.5 font-mono text-[10px] text-faint transition-colors group-hover:border-accent/30 group-hover:text-accent-soft">
                            {tech.tag}
                          </span>
                        </div>
                        <p className="mt-2.5 text-xs leading-relaxed text-muted transition-colors group-hover:text-foreground/90">
                          {tech.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 pt-2.5 border-t border-edge/5 font-mono text-[11px] text-faint group-hover:text-accent transition-colors">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:scale-125 transition-transform" />
                        <span>Stack activo</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </StackGroup>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 · Proyectos ─────────────────────────────────────── */}
      <section id="proyectos" className="scroll-mt-24 mx-auto max-w-container px-4 sm:px-6 pt-24 md:pt-28">
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
      <section id="contacto" className="scroll-mt-24 border-t border-edge/10">
        <div className="mx-auto max-w-container px-4 sm:px-6 py-20 md:py-28">
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
                      <span className="flex items-baseline gap-4 min-w-0">
                        <span className="font-mono text-xs text-faint shrink-0">
                          {channel.label}
                        </span>
                        <span className="text-base sm:text-lg tracking-tight truncate">
                          {channel.label === "Mail" ? (
                            <Scramble text={channel.value} />
                          ) : (
                            channel.value
                          )}
                        </span>
                      </span>
                      <span className="arrow-shift text-accent shrink-0" aria-hidden="true">
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
                Escribime tu consulta y podés enviarla directo, abrirla en Gmail o copiar mi correo al portapapeles.
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

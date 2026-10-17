"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Errors = { nombre?: string; email?: string; mensaje?: string };

const inputClasses =
  "w-full rounded-lg border border-edge/15 bg-surface px-4 py-2.5 text-[15px] text-foreground placeholder:text-faint transition-colors focus:border-accent/50 focus:outline-none";

/**
 * Formulario sin backend. Compone un mailto y abre el cliente de correo del
 * visitante con el mensaje ya escrito.
 *
 * A propósito NO hay un "¡Mensaje enviado!" acá: no hay servidor que envíe
 * nada, así que reportar un éxito sería mentir. Es la misma regla que aplicamos
 * en el formulario de Studio 74.
 */
export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const form = new FormData(event.currentTarget);
    const nombre = String(form.get("nombre") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const mensaje = String(form.get("mensaje") ?? "").trim();

    const nextErrors: Errors = {};
    if (!nombre) nextErrors.nombre = "Poné tu nombre así sé a quién le respondo.";
    if (!email) {
      nextErrors.email = "Necesito un mail para poder responderte.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Ese mail no parece válido. Revisalo.";
    }
    if (!mensaje) nextErrors.mensaje = "Contame qué necesitás, aunque sea en una línea.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = `Consulta desde el portfolio — ${nombre}`;
    const body = `${mensaje}\n\n—\n${nombre}\n${email}`;
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    // Primero el aviso, después la navegación: asignar window.location.href a un
    // mailto interrumpe la ejecución, y así el mensaje ya está en el DOM.
    setStatus(
      "Se abrió tu aplicación de correo con el mensaje listo para enviar. Si no pasó nada, escribime directo a " +
        site.email +
        ".",
    );

    // Abre el cliente de correo. Si el visitante no tiene uno configurado,
    // no hay nada más que podamos hacer desde el navegador.
    window.setTimeout(() => {
      window.location.href = href;
    }, 100);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-sm text-muted">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder="Cómo te llamás"
          aria-invalid={Boolean(errors.nombre)}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          className={inputClasses}
        />
        {errors.nombre ? (
          <p id="error-nombre" role="alert" className="mt-1.5 text-sm text-rose-300">
            {errors.nombre}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-muted">
          Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="tu@correo.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "error-email" : undefined}
          className={inputClasses}
        />
        {errors.email ? (
          <p id="error-email" role="alert" className="mt-1.5 text-sm text-rose-300">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1.5 block text-sm text-muted">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={6}
          placeholder="Contame qué tenés en mente"
          aria-invalid={Boolean(errors.mensaje)}
          aria-describedby={errors.mensaje ? "error-mensaje" : undefined}
          className={`${inputClasses} resize-y`}
        />
        {errors.mensaje ? (
          <p id="error-mensaje" role="alert" className="mt-1.5 text-sm text-rose-300">
            {errors.mensaje}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-5 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
      >
        Preparar mensaje
      </button>

      {status ? (
        <p
          role="status"
          className="rounded-lg border border-edge/10 bg-surface p-4 text-sm leading-relaxed text-muted"
        >
          {status}
        </p>
      ) : null}
    </form>
  );
}

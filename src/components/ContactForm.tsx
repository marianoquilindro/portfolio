"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Errors = { nombre?: string; email?: string; mensaje?: string };

const inputClasses =
  "w-full rounded-lg border border-edge/15 bg-surface px-4 py-2.5 text-[15px] text-foreground placeholder:text-faint transition-colors focus:border-accent/50 focus:outline-none";

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Datos para los botones de acción directa
  const [preparedData, setPreparedData] = useState<{
    nombre: string;
    email: string;
    mensaje: string;
  } | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);
    setSentSuccess(false);

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

    setPreparedData({ nombre, email, mensaje });
    setIsSubmitting(true);

    const subject = `Consulta desde el portfolio — ${nombre}`;
    const body = `${mensaje}\n\n—\nDe: ${nombre} (${email})`;

    // Si hay una clave de Web3Forms configurada, enviamos directo
    const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    if (web3formsKey) {
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3formsKey,
            name: nombre,
            email: email,
            message: mensaje,
            subject: subject,
            botcheck: false,
          }),
        });

        const data = await response.json();
        if (data.success) {
          setSentSuccess(true);
          setStatusMessage("¡Mensaje enviado con éxito! Te voy a responder a la brevedad.");
          setIsSubmitting(false);
          return;
        }
      } catch (err) {
        console.error("Error al enviar con Web3Forms:", err);
      }
    }

    // Abre Gmail en una nueva pestaña (funciona en cualquier navegador de PC o celular)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      site.email
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abre Gmail web directamente (evita que mailto falle silenciosamente en localhost)
    window.open(gmailUrl, "_blank");

    setStatusMessage(
      "Se abrió una pestaña de Gmail con tu mensaje listo para enviar. También podés enviarlo con tu aplicación predeterminada o copiar el correo."
    );
    setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
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
            rows={5}
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

        {/* Honeypot anti-spam: Web3Forms lo ignora si está vacío, los bots lo llenan */}
        <input
          type="checkbox"
          name="botcheck"
          className="absolute -left-[9999px] opacity-0"
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-[15px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Enviando...</span>
            ) : (
              <>
                <span>Enviar mensaje</span>
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={copyEmail}
            className="rounded-lg border border-edge/15 bg-surface px-4 py-3 text-xs font-medium text-muted transition-colors hover:border-edge/30 hover:text-foreground"
          >
            {copied ? "✓ Mail copiado" : "Copiar mail directo"}
          </button>
        </div>

        {statusMessage ? (
          <div
            role="status"
            className="rounded-xl border border-edge/15 bg-surface/80 p-4 text-sm leading-relaxed text-muted space-y-3"
          >
            <p className={sentSuccess ? "text-emerald-400 font-medium" : "text-foreground"}>
              {statusMessage}
            </p>

            {preparedData && !sentSuccess && (
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                    site.email
                  )}&su=${encodeURIComponent(
                    `Consulta desde el portfolio — ${preparedData.nombre}`
                  )}&body=${encodeURIComponent(
                    `${preparedData.mensaje}\n\n—\n${preparedData.nombre}\n${preparedData.email}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 transition-colors"
                >
                  Abrir en Gmail Web ↗
                </a>

                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Consulta desde el portfolio — ${preparedData.nombre}`
                  )}&body=${encodeURIComponent(
                    `${preparedData.mensaje}\n\n—\n${preparedData.nombre}\n${preparedData.email}`
                  )}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-edge/15 bg-surface px-3 py-1.5 text-xs text-muted hover:text-foreground transition-colors"
                >
                  Abrir cliente de correo
                </a>
              </div>
            )}
          </div>
        ) : null}
      </form>
    </div>
  );
}

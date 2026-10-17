import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import { site } from "@/data/site";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "desarrollador de software",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Argentina",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable}`}
      // El script de abajo agrega la clase `js` a <html> antes de que React
      // hidrate, así que el className del cliente no coincide con el del HTML
      // del servidor. Es esperado y no hay nada que corregir: React no debe
      // quejarse por esta diferencia puntual.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marca el documento como "hay JavaScript" antes del primer pintado.
          Las animaciones de revelado solo ocultan contenido si esta clase está:
          sin JS, todo el texto se ve entero en lugar de quedar invisible.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body
        className="flex min-h-screen flex-col antialiased"
        // Las extensiones del navegador (Grammarly, lectores, etc.) inyectan
        // atributos en <body> antes de que React hidrate. Eso no es un error
        // nuestro ni algo que se pueda corregir, así que le pedimos a React que
        // no avise por diferencias de atributos en este elemento puntual.
        suppressHydrationWarning
      >
        <ScrollEffects />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

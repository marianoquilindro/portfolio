/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Las capturas ya vienen optimizadas (WebP, tamaño fijo), así que no hace
   * falta el Image Optimizer de Next: sirve el archivo tal cual. Además deja
   * afuera una superficie de ataque que no necesitamos en un sitio estático.
   */
  /**
   * Desactiva el indicador flotante de desarrollo de Next.js en localhost.
   */
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

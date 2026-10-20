"use client";

import { useEffect, useRef } from "react";

/**
 * Fondo del hero: shader WebGL escrito a mano (ruido fbm animado).
 *
 * Nace de la versión "prueba" y se porta acá con tres cuidados de producción:
 * - Los colores salen de las variables CSS del tema, así que cambia solo al
 *   alternar claro/oscuro (se relee en cada mutación de `data-theme`).
 * - Se pausa cuando el hero no está visible y capifica el devicePixelRatio.
 * - Sin WebGL o con `prefers-reduced-motion`, se oculta y listo: el hero
 *   conserva el glow CSS que ya existía.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform vec2  u_mouse;
uniform vec3  u_bg;
uniform vec3  u_mid;
uniform vec3  u_accent;
uniform float u_light;

// Ruido simplex 2D (Ashima / Stefan Gustavson)
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// fbm: ruido fractal, 5 octavas
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.06;

  // Dos capas de fbm distorsionadas: efecto humo/fluido
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(0.0, t)),
    fbm(p * 1.4 + vec2(5.2, -t * 0.8))
  );
  vec2 r = vec2(
    fbm(p * 1.4 + 2.6 * q + vec2(1.7, 9.2) + t * 0.35),
    fbm(p * 1.4 + 2.6 * q + vec2(8.3, 2.8) - t * 0.25)
  );
  float f = fbm(p * 1.4 + 2.4 * r);

  // Ondulación suave hacia el mouse
  vec2 m = u_mouse / u_res;
  m.x *= u_res.x / u_res.y;
  float md = distance(p, m);
  float ripple = sin(md * 18.0 - u_time * 1.6) * exp(-md * 4.5) * 0.5 + 0.5;
  f += (ripple - 0.5) * 0.2;

  // En tema oscuro la textura se arma con f² (sombras profundas sobre casi
  // negro). En claro los valores base son casi blancos: se usa |f| y un medio
  // teñido de acento para que la misma humuedad se lea sobre página clara.
  float shade = mix(f * f * 2.4, abs(f) * 1.7, u_light);
  vec3 col = mix(u_bg, u_mid, clamp(shade, 0.0, 1.0));
  col = mix(col, u_accent, clamp(pow(abs(r.x), 2.2), 0.0, 1.0) * mix(0.5, 0.55, u_light));

  // Viñeta suave
  float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
  col *= mix(0.75, 1.0, vig);

  gl_FragColor = vec4(col, mix(0.9, 0.85, u_light));
}
`;

/** Lee una variable CSS RGB (separada por espacios) y la pasa a 0..1. */
function readColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return [0, 0, 0];
  const parts = raw.split(/\s+/).map(Number);
  const [r, g, b] = [parts[0] || 0, parts[1] || 0, parts[2] || 0];
  return [r / 255, g / 255, b / 255];
}

export default function HeroShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    function compile(type: number, source: string) {
      const s = gl!.createShader(type);
      if (!s) return null;
      gl!.shaderSource(s, source);
      gl!.compileShader(s);
      if (!gl!.getShaderParameter(s, gl!.COMPILE_STATUS)) {
        console.warn("HeroShader:", gl!.getShaderInfoLog(s));
        gl!.deleteShader(s);
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = "none";
      return;
    }

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("HeroShader:", gl.getProgramInfoLog(prog));
      canvas.style.display = "none";
      return;
    }
    gl.useProgram(prog);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uBg = gl.getUniformLocation(prog, "u_bg");
    const uMid = gl.getUniformLocation(prog, "u_mid");
    const uAccent = gl.getUniformLocation(prog, "u_accent");
    const uLight = gl.getUniformLocation(prog, "u_light");

    // Paleta desde las variables del tema actual
    function applyPalette() {
      const theme = document.documentElement.getAttribute("data-theme");
      const isLight = theme === "light";
      const bg = readColor("--background");
      const accent = readColor("--accent");
      // En tema claro "surface" es casi blanco y la textura se pierde: el
      // medio se tiñe de acento (~30%) para darle cuerpo sobre la página.
      const base = readColor(isLight ? "--surface" : "--raised");
      const k = isLight ? 0.3 : 0;
      const mid: [number, number, number] = [
        base[0] * (1 - k) + accent[0] * k,
        base[1] * (1 - k) + accent[1] * k,
        base[2] * (1 - k) + accent[2] * k,
      ];
      gl!.uniform3f(uBg, bg[0], bg[1], bg[2]);
      gl!.uniform3f(uMid, mid[0], mid[1], mid[2]);
      gl!.uniform3f(uAccent, accent[0], accent[1], accent[2]);
      gl!.uniform1f(uLight, isLight ? 1 : 0);
    }
    applyPalette();

    // El tema puede cambiar en cualquier momento (botón del header)
    const themeObserver = new MutationObserver(applyPalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas!.clientWidth * dpr);
      const h = Math.floor(canvas!.clientHeight * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }
    window.addEventListener("resize", resize, { passive: true });
    resize();

    const mouse = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };
    const smooth = { x: mouse.x, y: mouse.y };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = canvas!.clientHeight - (e.clientY - rect.top);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Pausa cuando el hero no está en pantalla
    let visible = true;
    const visibility = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 },
    );
    visibility.observe(canvas);

    const start = performance.now();
    let frameId = 0;

    function frame(now: number) {
      frameId = window.requestAnimationFrame(frame);
      if (!visible) return;

      resize();
      smooth.x += (mouse.x - smooth.x) * 0.06;
      smooth.y += (mouse.y - smooth.y) * 0.06;

      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, (now - start) / 1000);
      gl!.uniform2f(uMouse, smooth.x * dpr, smooth.y * dpr);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }
    frameId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      themeObserver.disconnect();
      visibility.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

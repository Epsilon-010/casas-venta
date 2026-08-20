import { useEffect, useRef, useState, type MouseEvent } from "react";
import Img from "./Img";
import { casas } from "../data/casas";
import { IconArrow, IconPin } from "./Icons";

const HERO_IMAGE_PREVIEW =
  "https://res.cloudinary.com/dkpl0map1/image/upload/v1787156623/ralph-ravi-kayden-mR1CIDduGLc-unsplash_upscayl_2x_upscayl-standard-4x_nzg7fe.webp";
const HERO_IMAGE_MOBILE =
  "https://res.cloudinary.com/dkpl0map1/image/upload/v1787185095/c6512eeac9db74ea4c280c2c48717ea3_upscayl_3x_upscayl-standard-4x_u0ars8.webp";
const SLIDE_MS = 6500;

export default function Hero() {
  const [i, setI] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

  const casa = casas[i] || {};

  // Slideshow
  useEffect(() => {
    const t = setTimeout(() => setI((v) => (v + 1) % casas.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i]);

  // Parallax interactivo
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setM({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  const layer = (depth: number) => ({
    transform: `translate3d(${m.x * depth}px, ${m.y * depth}px, 0)`,
    transition: "transform 900ms cubic-bezier(.2,.7,.2,1)",
  });

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setM({ x: 0, y: 0 })}
      id="inicio"
      className="relative isolate min-h-svh w-full overflow-hidden bg-neutral-950 text-white flex flex-col justify-between [perspective:1200px]"
    >
      {/* ---------- Fondo Móvil: imagen estática ---------- */}
      <div className="absolute inset-0 -z-20 sm:hidden">
        <Img
          src={HERO_IMAGE_MOBILE}
          alt="Residencia"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ---------- Fondo Slideshow (solo escritorio/tablet) ---------- */}
      <div className="absolute inset-0 -z-20 hidden scale-105 sm:block" style={layer(-15)}>
        {casas.map((c, k) => (
          <div
            key={c.slug || k}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              k === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Img
              src={c.imagenes?.[0] || HERO_IMAGE_PREVIEW}
              alt={c.nombre || "Residencia"}
              fetchPriority={k === 0 ? "high" : undefined}
              loading={k === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* ---------- Sombreado Reforzado para Legibilidad ---------- */}
      {/* Móvil: velo vertical elegante (oscuro abajo para el texto, sutil arriba) */}
      <div className="absolute inset-0 -z-10 sm:hidden bg-linear-to-t from-black/90 via-black/40 via-45% to-black/30 pointer-events-none" />
      {/* Escritorio: gradiente lateral denso para oscurecer la zona del texto */}
      <div className="absolute inset-y-0 left-0 -z-10 hidden sm:block sm:w-3/4 lg:w-3/5 bg-linear-to-r from-black/90 via-black/65 via-60% to-transparent pointer-events-none" />
      {/* Sombra suave superior/inferior general */}
      <div className="absolute inset-0 -z-10 hidden sm:block bg-linear-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* ---------- Contenido Principal ---------- */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-between pt-28 pb-8 sm:pb-10">
        
        {/* Bloque de Texto con Eslogan más Grande */}
        <div className="my-auto max-sm:mb-6 max-w-2xl lg:max-w-3xl py-4" style={layer(12)}>
          <h1 className="font-display text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight text-white leading-[1.04] [text-shadow:_0_4px_24px_rgb(0_0_0_/_80%)]">
            Espacios que <br />
            inspiran tu <br />
            <span className="italic text-[#c8a97e]">forma de vivir.</span>
          </h1>

          <p className="mt-5 sm:mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-white/90 font-light [text-shadow:_0_2px_10px_rgb(0_0_0_/_80%)]">
            Cuatro casas en venta: tres en Puebla y una en Puerto Escondido. Trato directo con el propietario, sin comisiones ni intermediarios.
          </p>

          {/* Botones Glassmorphism / Transparentes */}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
            <a
              href="#propiedades"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/15 px-7 text-xs font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all hover:bg-white/25 hover:border-white/70 hover:scale-105 shadow-lg"
            >
              Ver propiedades <IconArrow className="h-4 w-4" />
            </a>

            <a
              href="#contacto"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 text-xs font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 shadow-lg"
            >
              Agendar visita
            </a>
          </div>
        </div>

        {/* ---------- Franja Inferior (solo escritorio/tablet, ligada al slideshow) ---------- */}
        <div style={layer(8)} className="hidden border-t border-white/20 pt-4 sm:flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <IconPin className="h-4 w-4 text-[#c8a97e]" />
            <span className="text-xs sm:text-sm font-medium text-white drop-shadow">
              {casa.nombre || "Propiedad"}
            </span>
            {casa.ciudad && (
              <span className="text-xs text-white/70 drop-shadow">
                · {casa.colonia ? `${casa.colonia}, ` : ""}{casa.ciudad}
              </span>
            )}
          </div>

          {/* Indicadores de Diapositiva */}
          <div className="flex items-center gap-2">
            {casas.map((c, k) => (
              <button
                key={c.slug || k}
                onClick={() => setI(k)}
                aria-label={c.nombre || `Casa ${k + 1}`}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  k === i ? "w-8 bg-[#c8a97e]" : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
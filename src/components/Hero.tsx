import { useRef, useState, type MouseEvent } from "react";
import Img from "./Img";
import { IconArrow } from "./Icons";

/** Casa recortada (sin fondo) — el titular vive entre el fondo crema y la casa */
const HERO_IMAGE =
  "https://res.cloudinary.com/dkpl0map1/image/upload/v1787251563/images_7_-Photoroom_upscayl_5x_upscayl-standard-4x_wvqevd.webp";

export default function Hero() {
  const [m, setM] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLElement>(null);

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
      className="relative isolate min-h-svh w-full overflow-hidden bg-[#101c36] text-white"
    >
      {/* ---------- Capa 1 · Fondo azul atardecer ---------- */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-[#0a1327] via-[#16294d] to-[#2c4a74]" />
      {/* Resplandor suave en el horizonte, detrás de la casa */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_58%,rgba(96,126,178,0.45),transparent_70%)]" />

      {/* ---------- Capa 2 · Titular gigante (detrás de la casa) ---------- */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[59svh] sm:bottom-[60svh] z-10 flex flex-col items-center px-4"
        style={layer(14)}
      >
        <p className="mb-3 whitespace-nowrap text-[8px] sm:text-[10px] font-semibold tracking-[0.35em] uppercase text-white/55">
          Puebla &amp; Puerto Escondido
        </p>
        <h1 className="font-display text-center uppercase leading-[0.95] tracking-[0.04em] text-[clamp(2rem,11vw,7rem)] sm:text-[clamp(2.5rem,7.5vw,5.5rem)] font-medium select-none filter-[drop-shadow(0_10px_24px_rgb(0_0_0/0.45))]">
          <span className="block whitespace-nowrap text-transparent bg-clip-text bg-linear-to-b from-white via-white/90 to-white/45">
            Espacios que
          </span>
          <span className="block italic text-transparent bg-clip-text bg-linear-to-b from-[#a8845a] to-[#c8a97e]/50">
            Inspiran
          </span>
        </h1>

        <p className="mt-3 font-display italic text-lg sm:text-2xl text-white/95 [text-shadow:0_2px_14px_rgb(0_0_0/60%)]">
          tu forma de vivir.
        </p>

        <div className="pointer-events-auto mt-5 flex flex-row flex-nowrap items-center justify-center gap-3">
          <a
            href="#propiedades"
            className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/40 bg-white/15 px-4 sm:px-6 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all hover:bg-white/25 hover:border-white/70 hover:scale-105 shadow-lg"
          >
            Ver propiedades <IconArrow className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </a>

          <a
            href="#contacto"
            className="inline-flex h-10 sm:h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-4 sm:px-6 text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-white backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/50 shadow-lg"
          >
            Agendar visita
          </a>
        </div>
      </div>

      {/* ---------- Capa 3 · Casa recortada en primer plano ---------- */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[62svh] sm:h-[58svh]"
        style={layer(-6)}
      >
        <Img
          src={HERO_IMAGE}
          alt="Residencia"
          fetchPriority="high"
          loading="eager"
          className="h-full w-full object-cover object-[50%_20%]"
        />
      </div>

    </section>
  );
}

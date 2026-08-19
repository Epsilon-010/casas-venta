import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import Img from "./Img";
import { casas } from "../data/casas";
import { IconArrow, IconPin } from "./Icons";

/**
 * VIDEO DE FONDO (opcional).
 * Si el cliente entrega un video (dron / recorrido), pon la URL aquí
 * (p.ej. "/hero.mp4" en public/). Si queda vacío se usa el slideshow de fotos.
 */
const HERO_VIDEO = "";
const SLIDE_MS = 6500;

/**
 * Hero cinematográfico a pantalla completa:
 * - Fondo: video (si hay) o slideshow de las 4 casas con crossfade + zoom lento (Ken Burns).
 * - Profundidad: parallax 3D con el mouse en 3 capas (fondo, halo de luz, texto) + haz de luz animado.
 * - Indicador de la casa que se está viendo (clic para cambiar) y flecha de scroll.
 */
export default function Hero() {
  const [i, setI] = useState(0);
  const [m, setM] = useState({ x: 0, y: 0 }); // -1..1
  const ref = useRef<HTMLElement>(null);
  const casa = casas[i];

  // Slideshow
  useEffect(() => {
    if (HERO_VIDEO) return;
    const t = setTimeout(() => setI((v) => (v + 1) % casas.length), SLIDE_MS);
    return () => clearTimeout(t);
  }, [i]);

  // Parallax con el mouse
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setM({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
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
      className="relative isolate min-h-svh overflow-hidden bg-ink text-white [perspective:1200px]"
    >
      {/* ---------- Capa 0: fondo (video o slideshow) ---------- */}
      <div className="absolute -inset-[6%]" style={layer(-22)}>
        {HERO_VIDEO ? (
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO}
            poster={casas[0].imagenes[0]}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          casas.map((c, k) => (
            <div key={c.slug} aria-hidden className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${k === i ? "opacity-100" : "opacity-0"}`}>
              <Img
                src={c.imagenes[0]}
                alt=""
                fetchPriority={k === 0 ? "high" : undefined}
                loading={k === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover ${k === i ? "animate-kenburns" : ""}`}
              />
            </div>
          ))
        )}
      </div>

      {/* ---------- Capa 1: sombras, halo y luz ---------- */}
      <div className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/25 to-ink/90" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/70 via-ink/20 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: `radial-gradient(700px circle at ${50 + m.x * 25}% ${50 + m.y * 25}%, rgb(200 169 126 / 0.55), transparent 60%)`, transition: "background 600ms ease-out" }}
      />
      {/* Haz de luz que barre la escena */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 rotate-12 bg-linear-to-r from-transparent via-white/10 to-transparent blur-2xl animate-sweep" />
      {/* Grano */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(rgb(255_255_255/.6)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

      {/* ---------- Capa 2: contenido ---------- */}
      <div className="container-x relative flex min-h-svh flex-col justify-end pb-10 pt-36 sm:pb-14">
        <div style={layer(14)}>
          <p className="eyebrow text-white/70! animate-fade-up">Puerto Vallarta · Puebla</p>
          <h1 className="animate-fade-up delay-100 mt-4 max-w-4xl font-display text-6xl font-medium leading-[0.92] tracking-tight sm:text-7xl lg:text-[7.5rem]">
            Tu visión de <br />
            <span className="italic text-sand">vivir bien</span>, hecha casa.
          </h1>
          <p className="animate-fade-up delay-200 mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
            Cuatro residencias contemporáneas, listas para ti. Concreto aparente, luz natural y ubicaciones que valen cada metro.
          </p>
          <div className="animate-fade-up delay-300 mt-8 flex flex-wrap items-center gap-3">
            <Link to="/casas" className="btn-light">Explorar propiedades <IconArrow className="h-4 w-4" /></Link>
            <Link to="/contacto" className="btn-ghost border-white/30! bg-white/10! text-white! hover:bg-white/20!">Agendar visita</Link>
          </div>
        </div>

        {/* Chips flotando un poco más "cerca" */}
        <div className="animate-fade-up delay-400 mt-10 flex flex-wrap gap-2" style={layer(26)}>
          {["Entrega inmediata", "Arquitectura contemporánea", "Créditos hipotecarios", "Zonas premium"].map((t) => (
            <span key={t} className="rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium backdrop-blur">{t}</span>
          ))}
        </div>

        {/* Franja inferior: casa en pantalla + stats + scroll */}
        <div className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
          {/* Indicador de la casa que se ve de fondo */}
          {!HERO_VIDEO && (
            <div key={casa.slug} className="animate-fade-up">
              <p className="eyebrow text-sand!">Ahora en pantalla</p>
              <Link to={`/casas/${casa.slug}`} className="group mt-1 inline-flex items-baseline gap-3">
                <span className="font-display text-3xl font-semibold leading-none group-hover:text-sand transition">{casa.nombre}</span>
                <span className="flex items-center gap-1 text-xs text-white/60"><IconPin className="h-3.5 w-3.5" /> {casa.colonia}, {casa.ciudad}</span>
              </Link>
              <div className="mt-3 flex gap-1.5">
                {casas.map((c, k) => (
                  <button
                    key={c.slug}
                    onClick={() => setI(k)}
                    aria-label={c.nombre}
                    className={`h-1 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-sand" : "w-4 bg-white/30 hover:bg-white/60"}`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:gap-10">
            {[
              ["4", "residencias"],
              ["2", "ciudades"],
              ["240–420", "m² construidos"],
            ].map(([n, t]) => (
              <div key={t}>
                <p className="font-display text-3xl font-semibold leading-none">{n}</p>
                <p className="mt-1 text-xs text-white/60">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flecha de scroll */}
      <a href="#propiedades" aria-label="Bajar" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-white/60 hover:text-white lg:block">
        <span className="block h-10 w-px animate-scrollhint bg-linear-to-b from-transparent via-white to-transparent" />
      </a>
    </section>
  );
}

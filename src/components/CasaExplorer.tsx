import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { casas } from "../data/casas";
import { mxn, waLink } from "../lib/format";
import Img from "./Img";
import {
  IconArea,
  IconArrowUpRight,
  IconBath,
  IconBed,
  IconCar,
  IconChevronLeft,
  IconChevronRight,
  IconPin,
  IconWhatsApp,
} from "./Icons";

const AUTOPLAY_MS = 8000;

/**
 * Explorador inmersivo: hero a pantalla completa que carga UNA casa (aleatoria al entrar)
 * y permite cambiar entre las 4 sin salir de la vista.
 * - Fondo full-bleed con crossfade + zoom lento (Ken Burns).
 * - Tarjeta 3D que sigue el mouse (perspective/rotate) con capas en translateZ.
 * - Selector inferior con las 4 casas, flechas, teclado (← →) y autoplay con barra de progreso.
 */
export default function CasaExplorer() {
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * casas.length));
  const [foto, setFoto] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // reinicia la barra de progreso
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const casa = casas[idx];
  const n = casas.length;

  const go = useCallback((i: number) => {
    setIdx(((i % n) + n) % n);
    setFoto(0);
    setTick((t) => t + 1);
  }, [n]);
  const next = useCallback(() => go(idx + 1), [go, idx]);
  const prev = useCallback(() => go(idx - 1), [go, idx]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [idx, tick, paused, next]);

  // Teclado
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  // Tilt 3D
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 9;
    setTilt({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, active: true });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  return (
    <section
      className="relative isolate min-h-svh overflow-hidden bg-ink text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ---------- Fondo: crossfade entre casas + Ken Burns ---------- */}
      {casas.map((c, i) => (
        <div
          key={c.slug}
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === idx ? "opacity-100" : "opacity-0"}`}
        >
          <Img
            src={c.imagenes[0]}
            alt=""
            loading={i === idx ? "eager" : "lazy"}
            className={`h-full w-full object-cover ${i === idx ? "animate-kenburns" : ""}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-ink/70 via-ink/30 to-ink/90" />
      <div className="absolute inset-0 bg-linear-to-r from-ink/80 via-ink/30 to-transparent" />
      {/* Grano sutil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:radial-gradient(rgb(255_255_255/.6)_0.5px,transparent_0.5px)] [background-size:3px_3px]" />

      {/* Número gigante de fondo */}
      <span
        key={casa.slug}
        aria-hidden
        className="pointer-events-none absolute -right-4 top-20 select-none font-display text-[26vw] leading-none text-white/[0.05] animate-fade-up lg:right-8"
      >
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* ---------- Contenido ---------- */}
      <div className="container-x relative flex min-h-svh flex-col pt-32 pb-8 sm:pt-36">
        <div className="grid flex-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Texto */}
          <div key={casa.slug} className="lg:col-span-6">
            <p className="eyebrow text-sand! animate-fade-up">
              Residencia {String(idx + 1).padStart(2, "0")} <span className="text-white/40">/ {String(n).padStart(2, "0")}</span>
              {casa.etiqueta && <span className="ml-3 rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur">{casa.etiqueta}</span>}
            </p>
            <h1 className="animate-fade-up delay-100 mt-4 font-display text-6xl font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              {casa.nombre.split(" ")[0]}<br />
              <span className="italic text-sand">{casa.nombre.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-4 flex items-center gap-2 text-sm text-white/75">
              <IconPin className="h-4 w-4" /> {casa.colonia}, {casa.ciudad}
            </p>
            <p className="animate-fade-up delay-200 mt-5 max-w-lg text-base leading-relaxed text-white/80 line-clamp-3">
              {casa.descripcion}
            </p>

            <ul className="animate-fade-up delay-300 mt-7 flex flex-wrap gap-2">
              {[
                { i: <IconBed className="h-4 w-4" />, v: `${casa.recamaras} rec` },
                { i: <IconBath className="h-4 w-4" />, v: `${casa.banos} baños` },
                { i: <IconCar className="h-4 w-4" />, v: `${casa.estacionamiento} autos` },
                { i: <IconArea className="h-4 w-4" />, v: `${casa.m2Construccion} m²` },
              ].map((s, k) => (
                <li key={k} className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">
                  <span className="text-sand">{s.i}</span> {s.v}
                </li>
              ))}
            </ul>

            <div className="animate-fade-up delay-400 mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/casas/${casa.slug}`} className="btn-light">
                Ver ficha completa <IconArrowUpRight className="h-4 w-4" />
              </Link>
              <a href={waLink(`Hola, me interesa ${casa.nombre} en ${casa.ciudad}.`)} target="_blank" rel="noreferrer" className="btn-ghost border-white/30! bg-white/10! text-white! hover:bg-white/20!">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp
              </a>
              <a href={`#${casa.slug}`} className="ml-1 text-sm text-white/70 underline-offset-4 hover:text-white hover:underline">
                Más detalles ↓
              </a>
            </div>
          </div>

          {/* Tarjeta 3D */}
          <div className="[perspective:1400px] lg:col-span-6" onMouseMove={onMove} onMouseLeave={onLeave}>
            <div
              ref={cardRef}
              style={{
                transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                transition: tilt.active ? "transform 80ms linear" : "transform 700ms cubic-bezier(.2,.7,.2,1)",
              }}
              className={`relative mx-auto aspect-4/3 w-full max-w-2xl will-change-transform [transform-style:preserve-3d] ${tilt.active ? "" : "animate-float"}`}
            >
              {/* Sombra */}
              <div aria-hidden className="absolute inset-x-10 -bottom-10 h-20 rounded-[100%] bg-black/50 blur-2xl" style={{ transform: "translateZ(-100px)" }} />
              {/* Marco */}
              <div className="absolute inset-0 overflow-hidden rounded-4xl bg-stone-100 shadow-card ring-1 ring-white/20">
                <Img key={`${casa.slug}-${foto}`} src={casa.imagenes[foto]} alt={casa.nombre} className="h-full w-full object-cover animate-fade-up" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-transparent to-transparent" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                  style={{ opacity: tilt.active ? 1 : 0, background: `radial-gradient(600px circle at ${tilt.gx}% ${tilt.gy}%, rgb(255 255 255 / 0.25), transparent 45%)` }}
                />
              </div>

              {/* Precio flotando */}
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 text-ink shadow-card backdrop-blur" style={{ transform: "translateZ(90px)" }}>
                <p className="eyebrow text-[10px]!">Desde</p>
                <p className="font-display text-2xl font-semibold leading-none sm:text-3xl">{mxn(casa.precio)}</p>
              </div>

              {/* Ciudad chip */}
              <span className="absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-medium text-white shadow-soft backdrop-blur" style={{ transform: "translateZ(60px)" }}>
                {casa.ciudad}
              </span>

              {/* Miniaturas (dentro de la tarjeta a partir de sm) */}
              <div className="absolute bottom-5 right-5 hidden gap-1.5 sm:flex" style={{ transform: "translateZ(70px)" }}>
                {casa.imagenes.slice(0, 4).map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setFoto(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`h-12 w-12 overflow-hidden rounded-xl ring-2 transition ${foto === i ? "ring-sand" : "ring-white/30 opacity-70 hover:opacity-100"}`}
                  >
                    <Img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Miniaturas en móvil: fila debajo de la tarjeta para no encimar el precio */}
            <div className="mt-4 flex justify-center gap-2 sm:hidden">
              {casa.imagenes.slice(0, 4).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setFoto(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`h-12 w-12 overflow-hidden rounded-xl ring-2 transition ${foto === i ? "ring-sand" : "ring-white/30 opacity-70"}`}
                >
                  <Img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Selector inferior ---------- */}
        <div className="mt-12 flex items-end gap-4">
          <div className="hidden gap-2 sm:flex">
            <button onClick={prev} aria-label="Anterior" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white hover:text-ink">
              <IconChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={next} aria-label="Siguiente" className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white hover:text-ink">
              <IconChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-3 md:grid-cols-4">
            {casas.map((c, i) => {
              const active = i === idx;
              return (
                <button
                  key={c.slug}
                  onClick={() => go(i)}
                  className={`group relative overflow-hidden rounded-2xl border p-2 text-left transition ${active ? "border-white/40 bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl">
                      <Img src={c.imagenes[0]} alt="" loading="lazy" className={`h-full w-full object-cover transition duration-700 ${active ? "scale-110" : "opacity-70 group-hover:opacity-100"}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-widest text-white/50">0{i + 1} · {c.ciudad}</p>
                      <p className="truncate font-display text-lg font-semibold leading-tight">{c.nombre}</p>
                    </div>
                  </div>
                  {/* Barra de progreso del autoplay */}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
                    {active && (
                      <span
                        key={tick}
                        className="block h-full bg-sand"
                        style={{
                          animation: `progress ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

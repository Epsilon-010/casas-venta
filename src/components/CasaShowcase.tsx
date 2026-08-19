import { useRef, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import type { Casa } from "../data/casas";
import { mxn, waLink } from "../lib/format";
import Img from "./Img";
import {
  IconArea,
  IconArrowUpRight,
  IconBath,
  IconBed,
  IconCar,
  IconCheck,
  IconPin,
  IconWhatsApp,
  IconX,
} from "./Icons";

/**
 * Sección "showcase": UNA casa por pantalla.
 * - Izquierda/derecha alternado: tarjeta con efecto 3D (perspectiva que sigue el mouse,
 *   capas flotantes con translateZ) y una animación de "flotar" cuando está quieta.
 * - Botón "Ver info" abre un panel con descripción, amenidades y specs completas
 *   sin salir de la página. "Ficha completa" lleva a /casas/:slug.
 *
 * Nota: el efecto 3D es CSS (perspective + rotateX/rotateY). Si en el futuro se
 * tienen renders/modelos .glb reales, este bloque se puede sustituir por un visor
 * <model-viewer> o Three.js sin tocar el resto de la sección.
 */
export default function CasaShowcase({ casa, index }: { casa: Casa; index: number }) {
  const [open, setOpen] = useState(false);
  const [foto, setFoto] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const invert = index % 2 === 1;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;   // 0..1
    const py = (e.clientY - r.top) / r.height;   // 0..1
    const max = 10; // grados máximos de inclinación
    setTilt({ rx: (0.5 - py) * max * 2, ry: (px - 0.5) * max * 2, gx: px * 100, gy: py * 100, active: true });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const style3d = {
    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
    transition: tilt.active ? "transform 80ms linear" : "transform 700ms cubic-bezier(.2,.7,.2,1)",
  } as const;

  return (
    <section
      id={casa.slug}
      className={`relative overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-mist"}`}
    >
      {/* Número gigante de fondo */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-10 select-none font-display text-[22rem] leading-none text-ink/[0.035] ${invert ? "left-6" : "right-6"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="container-x grid min-h-[80svh] items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Tarjeta 3D ---------- */}
        <div
          className={`[perspective:1400px] lg:col-span-7 ${invert ? "lg:order-2" : ""}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <div
            ref={cardRef}
            style={style3d}
            className={`relative aspect-4/3 will-change-transform [transform-style:preserve-3d] ${tilt.active ? "" : "animate-float"}`}
          >
            {/* Sombra proyectada */}
            <div
              aria-hidden
              className="absolute inset-x-8 -bottom-8 h-16 rounded-[100%] bg-ink/25 blur-2xl"
              style={{ transform: "translateZ(-80px)" }}
            />

            {/* Imagen principal */}
            <div className="absolute inset-0 overflow-hidden rounded-4xl bg-stone-100 shadow-card ring-1 ring-ink/5">
              <Img
                key={foto}
                src={casa.imagenes[foto]}
                alt={casa.nombre}
                loading={index === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover animate-fade-up"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
              {/* Brillo que sigue el mouse */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                  opacity: tilt.active ? 1 : 0,
                  background: `radial-gradient(600px circle at ${tilt.gx}% ${tilt.gy}%, rgb(255 255 255 / 0.22), transparent 45%)`,
                }}
              />
            </div>

            {/* Chips flotando en Z */}
            <div className="absolute left-5 top-5 flex gap-2" style={{ transform: "translateZ(60px)" }}>
              {casa.etiqueta && (
                <span className="glass rounded-full px-3 py-1.5 text-[11px] font-semibold text-ink shadow-soft">{casa.etiqueta}</span>
              )}
              <span className="rounded-full bg-ink/70 px-3 py-1.5 text-[11px] font-medium text-white shadow-soft backdrop-blur">{casa.ciudad}</span>
            </div>

            {/* Precio flotando */}
            <div
              className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 shadow-card backdrop-blur"
              style={{ transform: "translateZ(90px)" }}
            >
              <p className="eyebrow text-[10px]!">Desde</p>
              <p className="font-display text-2xl font-semibold leading-none">{mxn(casa.precio)}</p>
            </div>

            {/* Miniaturas (cambian la foto) */}
            <div className="absolute bottom-5 right-5 flex gap-1.5" style={{ transform: "translateZ(70px)" }}>
              {casa.imagenes.slice(0, 4).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setFoto(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`h-11 w-11 overflow-hidden rounded-xl ring-2 transition ${foto === i ? "ring-white" : "ring-white/30 opacity-70 hover:opacity-100"}`}
                >
                  <Img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- Texto ---------- */}
        <div className={`lg:col-span-5 ${invert ? "lg:order-1 lg:pr-8" : "lg:pl-8"}`}>
          <p className="eyebrow">Residencia {String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
            {casa.nombre.split(" ")[0]}{" "}
            <span className="italic text-sand-dark">{casa.nombre.split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="mt-3 flex items-center gap-1.5 text-sm text-ink-soft">
            <IconPin className="h-4 w-4" /> {casa.colonia}, {casa.ciudad}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            {[
              { i: <IconBed />, v: `${casa.recamaras} rec` },
              { i: <IconBath />, v: `${casa.banos} baños` },
              { i: <IconCar />, v: `${casa.estacionamiento} autos` },
              { i: <IconArea />, v: `${casa.m2Construccion} m²` },
            ].map((s, k) => (
              <li key={k} className="flex items-center gap-2 rounded-2xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink">
                <span className="text-ink-soft">{s.i}</span> {s.v}
              </li>
            ))}
          </ul>

          <p className="mt-6 line-clamp-3 text-ink-soft">{casa.descripcion}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setOpen((v) => !v)} className="btn-primary" aria-expanded={open}>
              {open ? "Cerrar info" : "Ver info"}
              <span className={`transition ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            <Link to={`/casas/${casa.slug}`} className="btn-ghost">
              Ficha completa <IconArrowUpRight />
            </Link>
          </div>

          {/* ---------- Panel de info (se despliega) ---------- */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-semibold">Detalles</h3>
                  <button onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded-full p-1 text-ink-soft hover:bg-stone-100 hover:text-ink">
                    <IconX />
                  </button>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3">
                  <Dato k="Terreno" v={`${casa.m2Terreno} m²`} />
                  <Dato k="Construcción" v={`${casa.m2Construccion} m²`} />
                  <Dato k="Niveles" v={String(casa.niveles)} />
                  <Dato k="Entrega" v={casa.entrega} />
                  <Dato k="Estado" v={casa.estado} />
                  <Dato k="Precio" v={mxn(casa.precio)} />
                </dl>

                <p className="mt-5 text-sm leading-relaxed text-ink-soft">{casa.descripcion}</p>

                <p className="eyebrow mt-5">Amenidades</p>
                <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                  {casa.amenidades.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-ink">
                      <IconCheck className="h-4 w-4 text-sand-dark" /> {a}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs text-ink-soft">{casa.direccion}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={waLink(`Hola, me interesa ${casa.nombre} en ${casa.ciudad}.`)} target="_blank" rel="noreferrer" className="btn-primary bg-[#25D366] hover:bg-[#1ebe5b]">
                    <IconWhatsApp /> WhatsApp
                  </a>
                  <Link to={`/casas/${casa.slug}`} className="btn-ghost">Ver galería y mapa</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dato({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-ink-soft">{k}</dt>
      <dd className="mt-0.5 font-medium text-ink">{v}</dd>
    </div>
  );
}

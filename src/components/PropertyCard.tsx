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

interface PropertyCardProps {
  casa: Casa;
  index?: number;
}

export default function PropertyCard({ casa, index = 0 }: PropertyCardProps) {
  const [open, setOpen] = useState(false);
  const [foto, setFoto] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const invert = index % 2 === 1;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const max = 10;
    setTilt({
      rx: (0.5 - py) * max * 2,
      ry: (px - 0.5) * max * 2,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const onLeave = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const style3d = {
    transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
    transition: tilt.active
      ? "transform 80ms linear"
      : "transform 700ms cubic-bezier(.2,.7,.2,1)",
  } as const;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-8">
      {/* ---------- Tarjeta de Texto (Crema Bento) ---------- */}
      <div
        className={`flex flex-col justify-between rounded-3xl bg-[#F4F2EB] p-8 sm:p-10 text-stone-800 border border-stone-200/80 shadow-xs lg:col-span-5 ${
          invert ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-stone-500 mb-2">
            Residencia {String(index + 1).padStart(2, "0")}
          </p>

          <h3 className="font-display text-3xl sm:text-4xl font-medium tracking-wide uppercase text-stone-900 leading-tight">
            {casa.nombre.split(" ")[0]}{" "}
            <span className="italic text-stone-600">
              {casa.nombre.split(" ").slice(1).join(" ")}
            </span>
          </h3>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-stone-500">
            <IconPin className="h-4 w-4" /> {casa.colonia}, {casa.ciudad}
          </p>

          {/* Specs en pills */}
          <ul className="mt-6 grid grid-cols-2 gap-3">
            {[
              { i: <IconBed />, v: `${casa.recamaras} rec` },
              { i: <IconBath />, v: `${casa.banos} baños` },
              { i: <IconCar />, v: `${casa.estacionamiento} autos` },
              { i: <IconArea />, v: `${casa.m2Construccion} m²` },
            ].map((s, k) => (
              <li
                key={k}
                className="flex items-center gap-2 rounded-2xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-700"
              >
                <span className="text-stone-400">{s.i}</span> {s.v}
              </li>
            ))}
          </ul>

          <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-stone-600">
            {casa.descripcion}
          </p>
        </div>

        <div className="mt-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-50 transition-all hover:bg-stone-800 shadow-sm"
              aria-expanded={open}
            >
              {open ? "Cerrar info" : "Ver info"}
              <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                +
              </span>
            </button>

            <Link
              to={`/casas/${casa.slug}`}
              className="group inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 transition-all hover:bg-stone-100 shadow-sm"
            >
              Ver redisidencia
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* ---------- Panel de info desplegable ---------- */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
              open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-3xl border border-stone-300 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-display text-xl font-semibold text-stone-900">Detalles</h4>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="rounded-full p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-800"
                  >
                    <IconX className="h-4 w-4" />
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

                <p className="mt-5 text-sm leading-relaxed text-stone-600">{casa.descripcion}</p>

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                  Amenidades
                </p>
                <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                  {casa.amenidades.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-stone-700">
                      <IconCheck className="h-4 w-4 text-stone-500" /> {a}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs text-stone-500">{casa.direccion}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={waLink(`Hola, me interesa ${casa.nombre} en ${casa.ciudad}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#1ebe5b] shadow-sm"
                  >
                    <IconWhatsApp className="h-4 w-4" /> WhatsApp
                  </a>
                  <Link
                    to={`/casas/${casa.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 transition-all hover:bg-stone-100 shadow-sm"
                  >
                    Ver galería y mapa
                  </Link>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>

      {/* ---------- Tarjeta de Imagen con Efecto 3D ---------- */}
      <div
        className={`[perspective:1400px] lg:col-span-7 ${
          invert ? "lg:order-1" : "lg:order-2"
        }`}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div
          ref={cardRef}
          style={style3d}
          className={`relative h-full min-h-[380px] sm:min-h-[460px] will-change-transform [transform-style:preserve-3d] ${
            tilt.active ? "" : "animate-float"
          }`}
        >
          {/* Sombra proyectada */}
          <div
            aria-hidden
            className="absolute inset-x-8 -bottom-8 h-16 rounded-[100%] bg-stone-900/20 blur-2xl"
            style={{ transform: "translateZ(-80px)" }}
          />

          {/* Imagen principal */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-stone-200 shadow-lg ring-1 ring-stone-900/5">
            <Img
              key={foto}
              src={casa.imagenes[foto]}
              alt={casa.nombre}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />

            {/* Brillo que sigue el mouse */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                opacity: tilt.active ? 1 : 0,
                background: `radial-gradient(600px circle at ${tilt.gx}% ${tilt.gy}%, rgb(255 255 255 / 0.18), transparent 45%)`,
              }}
            />
          </div>

          {/* Chips flotando en Z */}
          <div
            className="absolute left-5 top-5 flex gap-2"
            style={{ transform: "translateZ(60px)" }}
          >
            {casa.etiqueta && (
              <span className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-stone-800 shadow-sm backdrop-blur">
                {casa.etiqueta}
              </span>
            )}
            <span className="rounded-full bg-stone-900/70 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur">
              {casa.ciudad}
            </span>
          </div>

          {/* Precio flotante */}
          <div
            className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur"
            style={{ transform: "translateZ(90px)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
              Desde
            </p>
            <p className="font-display text-2xl font-semibold leading-none text-stone-900">
              {mxn(casa.precio)}
            </p>
          </div>

          {/* Miniaturas */}
          <div
            className="absolute bottom-5 right-5 flex gap-1.5"
            style={{ transform: "translateZ(70px)" }}
          >
            {casa.imagenes.slice(0, 4).map((src, i) => (
              <button
                key={src}
                onClick={() => setFoto(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-11 w-11 overflow-hidden rounded-xl ring-2 transition ${
                  foto === i
                    ? "ring-white"
                    : "ring-white/30 opacity-70 hover:opacity-100"
                }`}
              >
                <Img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dato({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-stone-500">{k}</dt>
      <dd className="mt-0.5 font-medium text-stone-900">{v}</dd>
    </div>
  );
}
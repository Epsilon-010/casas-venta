import { useState } from "react";
import type { Casa } from "../data/casas";
import { mxn, waLink } from "../lib/format";
import CasaDetalleModal from "./CasaDetalleModal";
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
  /** Índice global (para alternar el layout en escritorio y numerar) */
  index?: number;
}

export default function PropertyCard({ casa, index = 0 }: PropertyCardProps) {
  const [open, setOpen] = useState(false);
  const [detalle, setDetalle] = useState(false);
  const [foto, setFoto] = useState(0);

  const invert = index % 2 === 1;

  return (
    <article
      id={casa.slug}
      className="grid w-full scroll-mt-24 grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-12"
    >
      {/* ---------- Imagen (en móvil va PRIMERO) ---------- */}
      <div className={`order-1 lg:col-span-7 ${invert ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative aspect-4/3 w-full sm:aspect-3/2 lg:aspect-auto lg:h-full lg:min-h-[460px]">
          {/* Imagen principal */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl bg-stone-200 shadow-lg ring-1 ring-stone-900/5">
            <Img
              key={foto}
              src={casa.imagenes[foto]}
              alt={casa.nombre}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-900/60 via-transparent to-transparent" />
          </div>

          {/* Chips */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2 sm:left-5 sm:top-5">
            <span className="rounded-full bg-stone-900/70 px-3 py-1.5 text-[11px] font-medium text-white shadow-sm backdrop-blur">
              {casa.ciudad}
            </span>
            {casa.etiqueta && (
              <span className="rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-stone-800 shadow-sm backdrop-blur">
                {casa.etiqueta}
              </span>
            )}
          </div>

          {/* Precio */}
          <div className="absolute bottom-3 left-3 rounded-2xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:bottom-5 sm:left-5 sm:px-4 sm:py-3">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">Precio</p>
            <p className="font-display text-xl font-semibold leading-none text-stone-900 sm:text-2xl">
              {mxn(casa.precio)}
            </p>
          </div>

          {/* Miniaturas */}
          <div className="absolute bottom-3 right-3 flex gap-1.5 sm:bottom-5 sm:right-5">
            {casa.imagenes.slice(0, 4).map((src, i) => (
              <button
                key={src}
                onClick={() => setFoto(i)}
                aria-label={`Foto ${i + 1}`}
                className={`h-9 w-9 overflow-hidden rounded-lg ring-2 transition sm:h-11 sm:w-11 sm:rounded-xl ${
                  foto === i ? "ring-white" : "ring-white/30 opacity-70 hover:opacity-100"
                }`}
              >
                <Img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- Texto (en móvil va DESPUÉS de la imagen) ---------- */}
      <div
        className={`order-2 flex flex-col justify-between rounded-3xl border border-stone-200/80 bg-[#F4F2EB] p-6 text-stone-800 shadow-xs sm:p-8 lg:col-span-5 lg:p-10 ${
          invert ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-stone-500">
            Casa {String(index + 1).padStart(2, "0")} · {casa.ciudad}
          </p>

          <h3 className="font-display text-3xl font-medium uppercase leading-tight tracking-wide text-stone-900 sm:text-4xl">
            {casa.nombre.split(" ")[0]}{" "}
            <span className="italic text-stone-600">{casa.nombre.split(" ").slice(1).join(" ")}</span>
          </h3>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-stone-500">
            <IconPin className="h-4 w-4 shrink-0" /> {casa.colonia}, {casa.ciudad}
            {casa.estado !== casa.ciudad ? `, ${casa.estado}` : ""}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
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

          <p className="mt-5 line-clamp-3 text-sm leading-relaxed text-stone-600">{casa.descripcion}</p>
        </div>

        <div className="mt-6 sm:mt-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-50 shadow-sm transition-all hover:bg-stone-800"
              aria-expanded={open}
            >
              {open ? "Cerrar info" : "Ver info"}
              <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
            </button>

            <button
              onClick={() => setDetalle(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 shadow-sm transition-all hover:bg-stone-100"
            >
              Me interesa
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Panel de info desplegable */}
          <div
            className={`grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out ${
              open ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="rounded-3xl border border-stone-300 bg-white p-5 shadow-sm sm:p-6">
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

                <p className="mt-5 text-[10px] font-semibold uppercase tracking-widest text-stone-500">Amenidades</p>
                <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                  {casa.amenidades.map((a) => (
                    <li key={a} className="flex items-center gap-2 text-stone-700">
                      <IconCheck className="h-4 w-4 shrink-0 text-stone-500" /> {a}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-xs text-stone-500">{casa.direccion}</p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={waLink(`Hola, me interesa ${casa.nombre} en ${casa.ciudad}.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#1ebe5b]"
                  >
                    <IconWhatsApp className="h-4 w-4" /> WhatsApp
                  </a>
                  <button
                    onClick={() => setDetalle(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-800 shadow-sm transition-all hover:bg-stone-100"
                  >
                    Ver galería y mapa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal con el detalle completo (galería, mapa, amenidades, contacto) */}
      {detalle && <CasaDetalleModal casa={casa} onClose={() => setDetalle(false)} />}
    </article>
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

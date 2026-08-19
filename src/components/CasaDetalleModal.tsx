import { useEffect, useState } from "react";
import type { Casa } from "../data/casas";
import { mxn, waLink } from "../lib/format";
import { EVENTO_ELEGIR_CASA, irASeccion } from "../lib/secciones";
import Img from "./Img";
import {
  IconArea,
  IconArrow,
  IconBath,
  IconBed,
  IconCar,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconPin,
  IconWhatsApp,
  IconX,
} from "./Icons";

/**
 * Detalle completo de una casa en un modal a pantalla completa:
 * galería · specs · descripción · amenidades · mapa · contacto.
 * Se abre desde el botón "Me interesa" de cada PropertyCard.
 */
export default function CasaDetalleModal({ casa, onClose }: { casa: Casa; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  // Estado del iframe del mapa: si Google tarda o no responde, mostramos un fallback
  const [mapaEstado, setMapaEstado] = useState<"cargando" | "listo" | "error">("cargando");
  const [mapaIntento, setMapaIntento] = useState(0);

  const total = casa.imagenes.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const msgWa = `Hola, me interesa ${casa.nombre} en ${casa.colonia}, ${casa.ciudad}. ¿Podemos agendar una visita?`;
  const mapSrc = `https://maps.google.com/maps?q=${casa.mapa.lat},${casa.mapa.lng}&z=15&hl=es&output=embed`;
  const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${casa.mapa.lat},${casa.mapa.lng}`;

  // Si el mapa no termina de cargar en 8 s, lo damos por fallido
  useEffect(() => {
    if (mapaEstado !== "cargando") return;
    const t = setTimeout(() => setMapaEstado("error"), 8000);
    return () => clearTimeout(t);
  }, [mapaEstado, mapaIntento]);

  const reintentarMapa = () => {
    setMapaEstado("cargando");
    setMapaIntento((n) => n + 1);
  };

  // Bloquea el scroll del fondo y cierra con Escape
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const agendar = () => {
    onClose();
    window.dispatchEvent(new CustomEvent(EVENTO_ELEGIR_CASA, { detail: casa.slug }));
    // Espera a que se desbloquee el scroll del body
    setTimeout(() => irASeccion("contacto"), 50);
  };

  const specs = [
    { I: IconBed, v: `${casa.recamaras}`, l: "Recámaras" },
    { I: IconBath, v: `${casa.banos}`, l: "Baños" },
    { I: IconCar, v: `${casa.estacionamiento}`, l: "Autos" },
    { I: IconArea, v: `${casa.m2Construccion} m²`, l: "Construcción" },
    { I: IconArea, v: `${casa.m2Terreno} m²`, l: "Terreno" },
  ];

  return (
    <div
      className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={casa.nombre}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mx-auto my-0 min-h-full w-full max-w-5xl bg-white shadow-card sm:my-8 sm:min-h-0 sm:rounded-4xl">
        {/* Barra superior */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 rounded-none border-b border-stone-200 bg-white/95 px-5 py-3 backdrop-blur sm:rounded-t-4xl sm:px-8">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-stone-500">
              {casa.ciudad} · {casa.colonia}
            </p>
            <p className="truncate font-display text-lg font-semibold leading-tight text-ink">{casa.nombre}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pb-8 pt-5 sm:px-8 sm:pb-10">
          {/* Galería */}
          <div className="grid gap-3 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl bg-stone-100 lg:col-span-8">
              <Img
                key={idx}
                src={casa.imagenes[idx]}
                alt={`${casa.nombre} ${idx + 1}`}
                className="aspect-4/3 w-full object-cover sm:aspect-16/10"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-4">
                <span className="glass rounded-full px-3 py-1 text-xs font-medium text-ink">
                  {idx + 1} / {total}
                </span>
                <div className="flex gap-2">
                  <button onClick={prev} aria-label="Anterior" className="glass grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white">
                    <IconChevronLeft />
                  </button>
                  <button onClick={next} aria-label="Siguiente" className="glass grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white">
                    <IconChevronRight />
                  </button>
                </div>
              </div>
              {casa.etiqueta && (
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink">
                  {casa.etiqueta}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3 lg:col-span-4 lg:grid-cols-2">
              {casa.imagenes.slice(0, 4).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setIdx(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`overflow-hidden rounded-2xl bg-stone-100 transition ${
                    i === idx ? "ring-2 ring-ink ring-offset-2" : "opacity-80 hover:opacity-100"
                  }`}
                >
                  <Img src={src} alt="" loading="lazy" className="aspect-square h-full w-full object-cover lg:aspect-4/3" />
                </button>
              ))}
            </div>
          </div>

          {/* Encabezado + precio */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl">{casa.nombre}</h2>
              <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-soft">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0" /> {casa.direccion}
              </p>
            </div>
            <div className="shrink-0 sm:text-right">
              <p className="text-xs uppercase tracking-widest text-ink-soft">Precio</p>
              <p className="font-display text-3xl font-semibold sm:text-4xl">{mxn(casa.precio)}</p>
            </div>
          </div>

          {/* Specs */}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {specs.map(({ I, v, l }) => (
              <li key={l} className="rounded-2xl border border-stone-200 bg-white p-4">
                <I className="h-5 w-5 text-ink-soft" />
                <p className="mt-3 text-xl font-semibold">{v}</p>
                <p className="text-xs text-ink-soft">{l}</p>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-mist px-3 py-1.5">Entrega: <b>{casa.entrega}</b></span>
            <span className="rounded-full bg-mist px-3 py-1.5">Niveles: <b>{casa.niveles}</b></span>
            <span className="rounded-full bg-mist px-3 py-1.5">Estado: <b>{casa.estado}</b></span>
          </div>

          {/* Descripción */}
          <div className="mt-10">
            <h3 className="font-display text-2xl font-medium sm:text-3xl">Sobre la casa</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{casa.descripcion}</p>
          </div>

          {/* Amenidades */}
          <div className="mt-10">
            <h3 className="font-display text-2xl font-medium sm:text-3xl">Amenidades</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {casa.amenidades.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-forest text-white">
                    <IconCheck className="h-3.5 w-3.5" />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa */}
          <div className="mt-10">
            <h3 className="font-display text-2xl font-medium sm:text-3xl">Ubicación</h3>
            <p className="mt-2 text-sm text-ink-soft">{casa.colonia}, {casa.ciudad}{casa.estado !== casa.ciudad ? `, ${casa.estado}` : ""}</p>
            <div className="relative mt-4 overflow-hidden rounded-3xl border border-stone-200">
              {mapaEstado === "error" ? (
                <div className="grid aspect-16/9 w-full place-items-center bg-mist p-6 sm:aspect-21/9">
                  <div className="text-center">
                    <p className="text-sm text-ink-soft">El mapa tardó demasiado en responder.</p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                      <button onClick={reintentarMapa} className="btn-ghost">
                        Reintentar
                      </button>
                      <a href={mapaUrl} target="_blank" rel="noreferrer" className="btn-primary">
                        Abrir en Google Maps <IconArrow className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <iframe
                    key={mapaIntento}
                    title={`Mapa ${casa.nombre}`}
                    src={mapSrc}
                    className="aspect-16/9 w-full sm:aspect-21/9"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setMapaEstado("listo")}
                  />
                  {mapaEstado === "cargando" && (
                    <div className="pointer-events-none absolute inset-0 grid animate-pulse place-items-center bg-stone-100 text-sm text-ink-soft">
                      Cargando mapa…
                    </div>
                  )}
                </>
              )}
            </div>
            <a
              href={mapaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-forest hover:underline"
            >
              Ver en Google Maps <IconArrow className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Contacto */}
          <div className="mt-10 rounded-3xl bg-mist p-6 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold">¿Quieres recorrerla?</h3>
              <p className="mt-1 text-sm text-ink-soft">Presencial o por videollamada. Te respondo en menos de 24 h.</p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:mt-0 sm:shrink-0 sm:flex-row">
              <a href={waLink(msgWa)} target="_blank" rel="noreferrer" className="btn-primary">
                <IconWhatsApp className="h-4 w-4" /> WhatsApp directo
              </a>
              <button onClick={agendar} className="btn-ghost">
                Agendar visita <IconArrow className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

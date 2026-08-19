import Img from "../components/Img";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { casas, getCasa } from "../data/casas";
import { mxn, waLink, CONTACTO } from "../lib/format";
import ContactForm from "../components/ContactForm";
import PropertyCard from "../components/PropertyCard";
import WhatsAppButton from "../components/WhatsAppButton";
import {
  IconBed, IconBath, IconCar, IconArea, IconPin, IconCheck, IconWhatsApp,
  IconChevronLeft, IconChevronRight, IconArrow,
} from "../components/Icons";

/**
 * Ruta "/casas/:slug" — detalle de una propiedad.
 * Secciones: galería · encabezado + specs · descripción + amenidades · mapa · sidebar de contacto · similares.
 */
export default function CasaDetalle() {
  const { slug = "" } = useParams();
  const casa = getCasa(slug);
  const [idx, setIdx] = useState(0);

  if (!casa) return <Navigate to="/casas" replace />;

  const total = casa.imagenes.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  const similares = casas.filter((c) => c.slug !== casa.slug).slice(0, 3);
  const msgWa = `Hola, me interesa ${casa.nombre} en ${casa.colonia}, ${casa.ciudad}. ¿Podemos agendar una visita?`;

  const specs = [
    { I: IconBed, v: `${casa.recamaras}`, l: "Recámaras" },
    { I: IconBath, v: `${casa.banos}`, l: "Baños" },
    { I: IconCar, v: `${casa.estacionamiento}`, l: "Autos" },
    { I: IconArea, v: `${casa.m2Construccion} m²`, l: "Construcción" },
    { I: IconArea, v: `${casa.m2Terreno} m²`, l: "Terreno" },
  ];

  const mapSrc = `https://www.google.com/maps?q=${casa.mapa.lat},${casa.mapa.lng}&z=15&output=embed`;

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-x pt-28">
        <nav className="flex items-center gap-2 text-xs text-ink-soft">
          <Link to="/" className="hover:text-ink">Inicio</Link><span>/</span>
          <Link to="/casas" className="hover:text-ink">Propiedades</Link><span>/</span>
          <span className="text-ink">{casa.nombre}</span>
        </nav>
      </div>

      {/* Galería */}
      <section className="container-x mt-6">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-4xl bg-stone-100 lg:col-span-8">
            <Img key={idx} src={casa.imagenes[idx]} alt={`${casa.nombre} ${idx + 1}`} className="aspect-4/3 w-full object-cover animate-fade-up sm:aspect-16/10" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <span className="glass rounded-full px-3 py-1 text-xs font-medium text-ink">{idx + 1} / {total}</span>
              <div className="flex gap-2">
                <button onClick={prev} aria-label="Anterior" className="glass grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"><IconChevronLeft /></button>
                <button onClick={next} aria-label="Siguiente" className="glass grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-white"><IconChevronRight /></button>
              </div>
            </div>
            {casa.etiqueta && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink">{casa.etiqueta}</span>}
          </div>
          <div className="grid grid-cols-4 gap-3 lg:col-span-4 lg:grid-cols-2">
            {casa.imagenes.slice(0, 4).map((src, i) => (
              <button key={src} onClick={() => setIdx(i)} className={`overflow-hidden rounded-2xl bg-stone-100 transition ${i === idx ? "ring-2 ring-ink ring-offset-2" : "opacity-80 hover:opacity-100"}`}>
                <Img src={src} alt="" loading="lazy" className="aspect-square h-full w-full object-cover lg:aspect-4/3" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido */}
      <section className="container-x mt-12 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow">{casa.ciudad} · {casa.colonia}</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">{casa.nombre}</h1>
            <div className="sm:text-right">
              <p className="text-xs uppercase tracking-widest text-ink-soft">Precio</p>
              <p className="font-display text-3xl font-semibold sm:text-4xl">{mxn(casa.precio)}</p>
            </div>
          </div>
          <p className="mt-3 flex items-start gap-1.5 text-sm text-ink-soft"><IconPin className="mt-0.5 h-4 w-4 shrink-0" /> {casa.direccion}</p>

          {/* Specs */}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-5">
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
          <div className="mt-12">
            <h2 className="font-display text-3xl font-medium">Sobre la casa</h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink-soft">{casa.descripcion}</p>
          </div>

          {/* Amenidades */}
          <div className="mt-12">
            <h2 className="font-display text-3xl font-medium">Amenidades</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {casa.amenidades.map((a) => (
                <li key={a} className="flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-forest text-white"><IconCheck className="h-3.5 w-3.5" /></span>{a}
                </li>
              ))}
            </ul>
          </div>

          {/* Mapa */}
          <div className="mt-12">
            <h2 className="font-display text-3xl font-medium">Ubicación</h2>
            <p className="mt-2 text-sm text-ink-soft">{casa.colonia}, {casa.ciudad}, {casa.estado}</p>
            <div className="mt-5 overflow-hidden rounded-3xl border border-stone-200">
              <iframe title={`Mapa ${casa.nombre}`} src={mapSrc} className="aspect-16/9 w-full sm:aspect-21/9" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-widest text-ink-soft">Agendar visita</p>
              <h3 className="mt-1 font-display text-2xl font-semibold">Recorre {casa.nombre}</h3>
              <p className="mt-2 text-sm text-ink-soft">Presencial o por videollamada. Respondemos en menos de 24 h.</p>
              <a href={waLink(msgWa)} target="_blank" rel="noreferrer" className="btn-primary mt-5 w-full"><IconWhatsApp className="h-4 w-4" /> WhatsApp directo</a>
              <div className="my-5 flex items-center gap-3 text-xs text-ink-soft"><span className="h-px flex-1 bg-stone-200" />o déjanos tus datos<span className="h-px flex-1 bg-stone-200" /></div>
              <ContactForm casaSlug={casa.slug} compact />
            </div>
            <div className="rounded-3xl bg-mist p-6 text-sm">
              <p className="font-semibold">Asesor {CONTACTO.marca}</p>
              <p className="mt-1 text-ink-soft">{CONTACTO.telefono}</p>
              <p className="text-ink-soft">{CONTACTO.email}</p>
              <p className="mt-2 text-xs text-ink-soft">{CONTACTO.horario}</p>
            </div>
          </div>
        </aside>
      </section>

      {/* Similares */}
      <section className="container-x mt-24">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl font-medium tracking-tight">Otras propiedades</h2>
          <Link to="/casas" className="btn-ghost">Ver todas <IconArrow className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {similares.map((c) => <PropertyCard key={c.slug} casa={c} />)}
        </div>
      </section>

      <WhatsAppButton mensaje={msgWa} />
    </>
  );
}

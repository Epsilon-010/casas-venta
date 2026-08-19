import Img from "../components/Img";
import { Link } from "react-router-dom";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";
import { IconArrow } from "../components/Icons";
import { CONTACTO } from "../lib/format";

/** Ruta "/nosotros" — historia de la marca (texto placeholder). */
export default function Nosotros() {
  return (
    <>
      <section className="container-x pt-36">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">Nosotros</p>
            <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Construimos casas para <span className="italic text-sand-dark">quedarse.</span>
            </h1>
          </div>
          <p className="max-w-md text-ink-soft lg:col-span-5">
            {CONTACTO.marca} nació en Puebla con una idea simple: viviendas contemporáneas, bien construidas y sin letras chiquitas. Hoy desarrollamos también en la costa del Pacífico.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="" className="aspect-4/5 w-full rounded-4xl object-cover md:col-span-2 md:aspect-16/9" />
          <Img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80" alt="" className="aspect-4/5 w-full rounded-4xl object-cover" />
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Nuestra promesa</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-tight">Diseño honesto, proceso transparente.</h2>
          </div>
          <div className="grid gap-8 text-ink-soft sm:grid-cols-2 lg:col-span-8">
            <p>Cada residencia se proyecta con arquitectos locales y se construye con materiales que envejecen bien: concreto aparente, madera, piedra. Nada de fachadas que se caen a los 5 años.</p>
            <p>Precio publicado es precio final. Te acompañamos en el crédito, la notaría y la entrega. Y después de las llaves, seguimos aquí para la garantía.</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 border-y border-stone-200 py-10 sm:grid-cols-4">
          {[["12", "años desarrollando"], ["50+", "familias felices"], ["2", "ciudades"], ["4", "casas disponibles"]].map(([n, t]) => (
            <div key={t}>
              <p className="font-display text-4xl font-semibold sm:text-5xl">{n}</p>
              <p className="mt-1 text-sm text-ink-soft">{t}</p>
            </div>
          ))}
        </div>
      </section>

      <Benefits />

      <section className="container-x">
        <Link to="/casas" className="btn-primary">Ver propiedades <IconArrow className="h-4 w-4" /></Link>
      </section>

      <CTA />
    </>
  );
}

import Img from "./Img";
import { Link } from "react-router-dom";
import { IconArrow, IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";

/** Bloque CTA final: imagen de fondo + titular + 2 botones. */
export default function CTA() {
  return (
    <section className="container-x py-24">
      <div className="relative overflow-hidden rounded-4xl bg-ink text-white">
        <Img
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-transparent" />
        <div className="relative max-w-xl px-8 py-16 sm:px-14 sm:py-24">
          <p className="eyebrow text-white/60!">Agenda tu recorrido</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Conoce tu próxima casa <span className="italic text-sand">este fin de semana.</span>
          </h2>
          <p className="mt-5 text-white/75">Recorridos presenciales. Sin compromiso, con toda la información: precios, planos y opciones de crédito.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-light"><IconWhatsApp className="h-4 w-4" /> WhatsApp</a>
            <Link to="/contacto" className="btn-ghost border-white/30! bg-white/10! text-white! hover:bg-white/20!">Formulario <IconArrow className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

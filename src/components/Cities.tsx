import Img from "./Img";
import { Link } from "react-router-dom";
import { casas } from "../data/casas";
import { IconArrowUpRight } from "./Icons";

const ciudadesInfo = [
  {
    ciudad: "Puerto Vallarta",
    titulo: "Frente al Pacífico",
    texto: "Bahía de Banderas, gastronomía de nivel mundial y una plusvalía que no deja de crecer. Tres residencias entre Conchas Chinas, Marina y Amapas.",
    img: "https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1400&q=80",
  },
  {
    ciudad: "Puebla",
    titulo: "Angelópolis, la mejor zona",
    texto: "Cluster privado con casa club, a minutos de universidades, hospitales y Plaza Angelópolis. Vista a los volcanes desde el roof garden.",
    img: "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1400&q=80",
  },
] as const;

/** Sección de ciudades: dos bloques grandes con imagen, texto y CTA a /casas?ciudad=… */
export default function Cities() {
  return (
    <section className="bg-mist py-24">
      <div className="container-x">
        <p className="eyebrow">Ubicaciones</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
          Dos ciudades, <span className="italic text-sand-dark">un mismo estándar.</span>
        </h2>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {ciudadesInfo.map((c) => {
            const n = casas.filter((x) => x.ciudad === c.ciudad).length;
            return (
              <Link key={c.ciudad} to={`/casas?ciudad=${encodeURIComponent(c.ciudad)}`} className="group relative block overflow-hidden rounded-4xl bg-ink text-white">
                <Img src={c.img} alt={c.ciudad} loading="lazy" className="aspect-4/3 w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100 sm:aspect-16/10" />
                <div className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/70">{c.ciudad} · {n} {n === 1 ? "casa" : "casas"}</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{c.titulo}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{c.texto}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    Ver propiedades <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition group-hover:bg-sand"><IconArrowUpRight className="h-4 w-4" /></span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

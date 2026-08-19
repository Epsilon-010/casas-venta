import Img from "./Img";
import { Link } from "react-router-dom";
import type { Casa } from "../data/casas";
import { mxn } from "../lib/format";
import { IconBed, IconBath, IconCar, IconArea, IconPin, IconArrowUpRight } from "./Icons";

/**
 * Card de propiedad. Imagen grande con overlay, etiqueta, precio y specs.
 * `size="lg"` la hace más ancha/alta para grids destacadas.
 */
export default function PropertyCard({ casa, size = "md" }: { casa: Casa; size?: "md" | "lg" }) {
  return (
    <Link to={`/casas/${casa.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-4xl bg-stone-100 ${size === "lg" ? "aspect-4/5 sm:aspect-16/11" : "aspect-4/3"}`}>
        <Img
          src={casa.imagenes[0]}
          alt={casa.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />

        <div className="absolute left-4 top-4 flex gap-2">
          {casa.etiqueta && <span className="glass rounded-full px-3 py-1 text-[11px] font-semibold text-ink">{casa.etiqueta}</span>}
          <span className="rounded-full bg-ink/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">{casa.ciudad}</span>
        </div>

        <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink opacity-0 transition group-hover:opacity-100">
          <IconArrowUpRight />
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <p className="flex items-center gap-1 text-xs text-white/80"><IconPin className="h-3.5 w-3.5" /> {casa.colonia}</p>
          <div className="mt-1 flex items-end justify-between gap-3">
            <h3 className="font-display text-2xl font-semibold leading-tight">{casa.nombre}</h3>
            <p className="text-sm font-semibold sm:text-base">{mxn(casa.precio)}</p>
          </div>
        </div>
      </div>

      <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-sm text-ink-soft">
        <li className="flex items-center gap-1.5"><IconBed className="h-4 w-4" /> {casa.recamaras} rec</li>
        <li className="flex items-center gap-1.5"><IconBath className="h-4 w-4" /> {casa.banos} baños</li>
        <li className="flex items-center gap-1.5"><IconCar className="h-4 w-4" /> {casa.estacionamiento} autos</li>
        <li className="flex items-center gap-1.5"><IconArea className="h-4 w-4" /> {casa.m2Construccion} m²</li>
      </ul>
    </Link>
  );
}

import { Link } from "react-router-dom";
import type { Casa } from "../data/casas";
import Img from "./Img";
import { IconArrowUpRight, IconBed, IconArea, IconPin } from "./Icons";

interface PropertyCardCompactProps {
  casa: Casa;
}

export default function PropertyCardCompact({ casa }: PropertyCardCompactProps) {
  return (
    <article className="group relative flex flex-col h-full overflow-hidden rounded-[28px] bg-[#F4F2EB] border border-stone-200/80 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* ---------- Imagen con Badge ---------- */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-200">
        <Img
          src={casa.imagenes?.[0] || ""}
          alt={casa.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {casa.etiqueta && (
          <span className="absolute top-4 left-4 rounded-full bg-stone-900/80 px-3.5 py-1 text-[10px] font-semibold tracking-widest uppercase text-stone-100 backdrop-blur-md">
            {casa.etiqueta}
          </span>
        )}
      </div>

      {/* ---------- Información ---------- */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="font-display text-2xl font-medium tracking-wide uppercase text-stone-900 leading-snug">
            {casa.nombre}
          </h3>

          <ul className="mt-5 space-y-2.5 text-xs font-medium uppercase tracking-wider text-stone-600">
            {casa.recamaras && (
              <li className="flex items-center gap-2.5">
                <IconBed className="h-4 w-4 text-stone-400 shrink-0" />
                <span>Hasta {casa.recamaras * 2} pers. · {casa.recamaras} Rec.</span>
              </li>
            )}

            {(casa.m2Terreno || casa.m2Construccion) && (
              <li className="flex items-center gap-2.5">
                <IconArea className="h-4 w-4 text-stone-400 shrink-0" />
                <span>{casa.m2Terreno || casa.m2Construccion} m² de superficie</span>
              </li>
            )}

            <li className="flex items-center gap-2.5 text-stone-500">
              <IconPin className="h-4 w-4 text-stone-400 shrink-0" />
              <span className="truncate">
                {casa.colonia ? `${casa.colonia}, ` : ""}{casa.ciudad}
              </span>
            </li>
          </ul>
        </div>

        {/* ---------- Footer / Acción ---------- */}
        <div className="mt-6 pt-4 border-t border-stone-300/60 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
            Ver detalle
          </span>

          <Link
            to={`/casas/${casa.slug}`}
            aria-label={`Ver ${casa.nombre}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-stone-50 transition-all group-hover:bg-stone-800 group-hover:scale-110 shadow-xs"
          >
            <IconArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
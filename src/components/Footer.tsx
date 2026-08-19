import { casasPorCiudad } from "../data/casas";
import { CONTACTO, waLink } from "../lib/format";
import { IconArrowUpRight, IconWhatsApp } from "./Icons";
import { SECCIONES } from "../lib/secciones";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/80 bg-[#121110] text-stone-300">
      <div className="container-x py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Resumen */}
          <div className="flex flex-col justify-between sm:col-span-2 lg:col-span-5">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a97e]">
                Venta directa
              </span>
              <h3 className="mt-2 font-display text-2xl font-light uppercase tracking-tight text-stone-100 sm:text-3xl">
                Casas en Puebla y Puerto Escondido
              </h3>
              <p className="mt-4 max-w-sm text-xs font-light leading-relaxed text-stone-400 sm:text-sm">
                Cuatro casas en venta por su propietario. Sin inmobiliaria ni intermediarios: hablas directo conmigo.
              </p>
            </div>
            <div className="mt-8">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-stone-700/80 bg-stone-900/50 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-stone-200 transition-all hover:border-[#c8a97e] hover:bg-stone-800 hover:text-white"
              >
                <IconWhatsApp className="h-4 w-4 text-[#c8a97e]" />
                <span>{CONTACTO.telefono}</span>
              </a>
            </div>
          </div>

          {/* Casas por ciudad */}
          <div className="lg:col-span-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a97e]">Las casas</p>
            <ul className="mt-5 space-y-4 text-xs sm:text-sm">
              {casasPorCiudad.map((g) => (
                <li key={g.ciudad}>
                  <p className="mb-1.5 text-[11px] uppercase tracking-wider text-stone-500">{g.ciudad}</p>
                  <ul className="space-y-2">
                    {g.casas.map((c) => (
                      <li key={c.slug}>
                        <a
                          href={`#${c.slug}`}
                          className="group flex items-center justify-between text-stone-400 transition-colors hover:text-stone-100"
                        >
                          <span className="font-medium transition-transform group-hover:translate-x-1">{c.nombre}</span>
                          <IconArrowUpRight className="h-3.5 w-3.5 text-stone-600 opacity-0 transition-all group-hover:text-[#c8a97e] group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a97e]">Navegación</p>
            <ul className="mt-5 space-y-3 text-xs font-medium sm:text-sm">
              {SECCIONES.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-stone-400 transition-colors hover:text-stone-100">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#c8a97e]">Correo</p>
            <a href={`mailto:${CONTACTO.email}`} className="mt-3 block break-all text-xs text-stone-400 hover:text-stone-100 sm:text-sm">
              {CONTACTO.email}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-stone-800/60 pt-8 text-[11px] text-stone-500 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide">© {new Date().getFullYear()} · Venta directa de propietario.</p>
          <div className="flex items-center gap-4 font-medium text-stone-400">
            <span>Trato directo</span>
            <span className="h-1 w-1 rounded-full bg-[#c8a97e]" />
            <span>Puebla & Puerto Escondido</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link } from "react-router-dom";
import { casas } from "../data/casas";
import { CONTACTO } from "../lib/format";
import { IconArrowUpRight, IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/80 bg-[#121110] text-stone-300">
      <div className="container-x py-16 sm:py-24">
        {/* Grid Principal */}
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Identidad / Resumen (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#c8a97e]">
                Portafolio Privado
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-light text-stone-100 uppercase tracking-tight mt-2">
                Residencias Particulares
              </h3>
              <p className="mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-stone-400 font-light">
                Colección de arquitectura residencial contemporánea en Puebla y Puerto Escondido. Venta directa y personalizada sin intermediarios.
              </p>
            </div>

            {/* CTA Directo a WhatsApp */}
            <div className="mt-8">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-stone-700/80 bg-stone-900/50 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-stone-200 transition-all hover:border-[#c8a97e] hover:text-white hover:bg-stone-800"
              >
                <IconWhatsApp className="h-4 w-4 text-[#c8a97e]" />
                <span>Atención Personalizada</span>
              </a>
            </div>
          </div>

          {/* Catálogo de Casas (4 Cols) */}
          <div className="lg:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#c8a97e]">
              Colección
            </p>
            <ul className="mt-6 space-y-3.5 text-xs sm:text-sm">
              {casas.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={`/casas/${c.slug}`}
                    className="group flex items-center justify-between text-stone-400 hover:text-stone-100 transition-colors duration-200"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium">
                      {c.nombre}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-stone-500 font-mono tracking-tight">
                        {c.ciudad}
                      </span>
                      <IconArrowUpRight className="h-3.5 w-3.5 text-stone-600 opacity-0 group-hover:opacity-100 group-hover:text-[#c8a97e] transition-all" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación (2 Cols) */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#c8a97e]">
              Navegación
            </p>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm font-medium">
              <li>
                <Link
                  to="/"
                  className="text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="/casas"
                  className="text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Propiedades
                </Link>
              </li>
              <li>
                <Link
                  to="/nosotros"
                  className="text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  to="/contacto"
                  className="text-stone-400 hover:text-stone-100 transition-colors"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Ubicaciones (2 Cols) */}
          <div className="lg:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#c8a97e]">
              Ubicaciones
            </p>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm text-stone-400">
              <li className="flex flex-col">
                <span className="text-stone-200 font-medium">Puebla</span>
                <span className="text-[11px] text-stone-500">Puebla, México</span>
              </li>
              <li className="flex flex-col pt-1">
                <span className="text-stone-200 font-medium">Puerto Escondido</span>
                <span className="text-[11px] text-stone-500">Oaxaca, México</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Cierre / Derechos */}
        <div className="mt-16 sm:mt-20 border-t border-stone-800/60 pt-8 flex flex-col gap-4 text-[11px] text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-wide">
            © {new Date().getFullYear()} {CONTACTO.marca || "Residencias Particulares"}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-stone-400 font-medium">
            <span>Trato Directo</span>
            <span className="h-1 w-1 rounded-full bg-[#c8a97e]" />
            <span>Puebla & Puerto Escondido</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
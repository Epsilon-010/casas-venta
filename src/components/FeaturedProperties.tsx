import { casasPorCiudad } from "../data/casas";
import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";

/** id de ancla por ciudad */
const idCiudad = (c: string) => `ciudad-${c === "Puebla" ? "puebla" : "puerto-escondido"}`;

/** Sección #propiedades: las 4 casas agrupadas por ciudad (Puebla 3 · Puerto Escondido 1). */
export default function FeaturedProperties() {
  let indice = 0;
  return (
    <section id="propiedades" className="container-x scroll-mt-20 py-16 sm:py-24">
      <SectionHeader
        eyebrow="Propiedades"
        title={
          <>
            Cuatro casas, <span className="italic text-sand-dark">dos destinos.</span>
          </>
        }
        text="Tres casas en Puebla y una en Puerto Escondido, Oaxaca. Venta directa con el propietario, con toda la información a la mano."
        action={
          <nav className="flex flex-wrap gap-2">
            {casasPorCiudad.map((g) => (
              <a key={g.ciudad} href={`#${idCiudad(g.ciudad)}`} className="btn-ghost py-2! text-xs!">
                {g.ciudad} · {g.casas.length}
              </a>
            ))}
          </nav>
        }
      />

      <div className="mt-10 space-y-16 sm:mt-14 sm:space-y-24">
        {casasPorCiudad.map((g) => (
          <div key={g.ciudad} id={idCiudad(g.ciudad)} className="scroll-mt-20">
            {/* Cabecera de ciudad */}
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-stone-200 pb-4 sm:mb-8">
              <div>
                <p className="eyebrow">{g.casas[0]?.estado}</p>
                <h3 className="mt-1 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {g.ciudad}
                </h3>
              </div>
              <p className="shrink-0 text-sm text-ink-soft">
                {g.casas.length} {g.casas.length === 1 ? "casa" : "casas"}
              </p>
            </div>

            <div className="flex flex-col gap-10 sm:gap-14">
              {g.casas.map((casa) => (
                <PropertyCard key={casa.slug} casa={casa} index={indice++} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

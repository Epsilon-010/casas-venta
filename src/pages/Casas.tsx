import { casas } from "../data/casas";
import CasaExplorer from "../components/CasaExplorer";
import CasaShowcase from "../components/CasaShowcase";
import CTA from "../components/CTA";

/**
 * Ruta "/casas" — las 4 casas, sin filtros ni categorías.
 * 1) Hero explorador a pantalla completa (carga una casa al azar y permite cambiar entre las 4).
 * 2) Debajo, una sección inmersiva por casa (tarjeta 3D + panel de info).
 */
export default function Casas() {
  return (
    <>
      <CasaExplorer />

      <section className="container-x pt-24 pb-6">
        <p className="eyebrow">Colección</p>
        <h2 className="mt-3 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
          Las <span className="italic text-sand-dark">cuatro</span> residencias.
        </h2>
        <p className="mt-4 max-w-xl text-ink-soft">Recórrelas una por una. Mueve el cursor sobre cada casa para verla en 3D y abre "Ver info" para conocer todos los detalles.</p>
      </section>

      {casas.map((c, i) => <CasaShowcase key={c.slug} casa={c} index={i} />)}

      <CTA />
    </>
  );
}

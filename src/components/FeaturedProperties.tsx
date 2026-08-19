import { Link } from "react-router-dom";
import { casas } from "../data/casas";
import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";
import { IconArrow } from "./Icons";

export default function FeaturedProperties() {
  return (
    <section id="propiedades" className="container-x py-24">
      <SectionHeader
        eyebrow="Propiedades"
        title={
          <>
            Cuatro casas, <span className="italic text-sand-dark">cuatro formas</span> de habitar.
          </>
        }
        text="Tres residencias frente al Pacífico en Puerto Vallarta y una en la mejor zona de Puebla. Todas con acabados premium y listas para escriturar."
        action={
          <Link to="/casas" className="btn-ghost shrink-0">
            Ver todas <IconArrow className="h-4 w-4" />
          </Link>
        }
      />

      {/* Lista en columna completa (1 por fila) */}
      <div className="mt-12 flex flex-col space-y-10">
        {casas.map((casa, index) => (
          <PropertyCard key={casa.slug} casa={casa} index={index} />
        ))}
      </div>
    </section>
  );
}
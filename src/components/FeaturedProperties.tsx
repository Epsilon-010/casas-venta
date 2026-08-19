import { Link } from "react-router-dom";
import { casas } from "../data/casas";
import PropertyCard from "./PropertyCard";
import SectionHeader from "./SectionHeader";
import { IconArrow } from "./Icons";

/** Grid de las 4 casas en la Home: 2 grandes arriba, 2 medianas abajo. */
export default function FeaturedProperties() {
  const grandes = casas.filter((c) => c.destacado).slice(0, 2);
  const resto = casas.filter((c) => !grandes.includes(c));

  return (
    <section id="propiedades" className="container-x py-24">
      <SectionHeader
        eyebrow="Propiedades"
        title={<>Cuatro casas, <span className="italic text-sand-dark">cuatro formas</span> de habitar.</>}
        text="Tres residencias frente al Pacífico en Puerto Vallarta y una en la mejor zona de Puebla. Todas con acabados premium y listas para escriturar."
        action={<Link to="/casas" className="btn-ghost shrink-0">Ver todas <IconArrow className="h-4 w-4" /></Link>}
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {grandes.map((c) => <PropertyCard key={c.slug} casa={c} size="lg" />)}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {resto.map((c) => <PropertyCard key={c.slug} casa={c} />)}
      </div>
    </section>
  );
}

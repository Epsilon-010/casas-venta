import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Benefits from "../components/Benefits";
import Contacto from "../components/Contacto";

/** Única página del sitio. Orden de secciones editable aquí. */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Benefits />
      <Contacto />
    </>
  );
}

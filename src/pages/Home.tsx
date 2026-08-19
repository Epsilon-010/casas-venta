import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";

/** Ruta "/" — landing principal. Orden de secciones editable aquí. */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Benefits />
      
      <CTA />
    </>
  );
}

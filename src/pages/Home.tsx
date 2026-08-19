import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import Cities from "../components/Cities";
import Benefits from "../components/Benefits";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";

/** Ruta "/" — landing principal. Orden de secciones editable aquí. */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <Cities />
      <Benefits />
      <Testimonials />
      <CTA />
    </>
  );
}

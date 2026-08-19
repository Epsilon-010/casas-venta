import { Link } from "react-router-dom";
import { IconArrow } from "../components/Icons";

/** Ruta "*" — 404. */
export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70svh] flex-col items-start justify-center pt-28">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-3 font-display text-6xl font-medium tracking-tight">Esta página no existe.</h1>
      <p className="mt-4 text-ink-soft">Pero tenemos cuatro casas que sí.</p>
      <Link to="/casas" className="btn-primary mt-8">Ver propiedades <IconArrow className="h-4 w-4" /></Link>
    </section>
  );
}

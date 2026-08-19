import { Link } from "react-router-dom";
import Logo from "./Logo";
import { casas } from "../data/casas";
import { CONTACTO } from "../lib/format";

export default function Footer() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Residencias contemporáneas en Puerto Vallarta y Puebla. Diseño, materiales honestos y ubicaciones que valen cada metro.
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-white/50!">Propiedades</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {casas.map((c) => (
                <li key={c.slug}><Link to={`/casas/${c.slug}`} className="text-white/80 hover:text-white">{c.nombre} · {c.ciudad}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-white/50!">Sitio</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/casas" className="text-white/80 hover:text-white">Todas las casas</Link></li>
              <li><Link to="/nosotros" className="text-white/80 hover:text-white">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-white/80 hover:text-white">Contacto</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-white/50!">Contacto</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>{CONTACTO.telefono}</li>
              <li>{CONTACTO.email}</li>
              <li className="text-white/50">{CONTACTO.horario}</li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {CONTACTO.marca} {CONTACTO.marcaSub}. Todos los derechos reservados.</p>
          <p>Prototipo · Imágenes y datos ilustrativos.</p>
        </div>
      </div>
    </footer>
  );
}

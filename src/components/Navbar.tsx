import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { IconMenu, IconX, IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/casas", label: "Propiedades" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

/**
 * Navbar fija con efecto glass. En la Home (hero oscuro) arranca transparente
 * y se vuelve blanca al hacer scroll; en el resto de páginas siempre blanca.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHero = (pathname === "/" || pathname === "/casas") && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Cierra el menú móvil al navegar (patrón "derived state during render")
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) { setPrevPath(pathname); setOpen(false); }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${onHero ? "py-5" : "py-3"}`}>
      <div className="container-x">
        <nav className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${onHero ? "bg-transparent" : "glass shadow-soft"}`}>
          <Logo light={onHero} />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      onHero
                        ? isActive ? "bg-white/15 text-white" : "text-white/80 hover:text-white"
                        : isActive ? "bg-stone-100 text-ink" : "text-ink-soft hover:text-ink"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <a href={waLink()} target="_blank" rel="noreferrer" className={`whitespace-nowrap ${onHero ? "btn-light py-2.5!" : "btn-primary py-2.5!"}`}>
              <IconWhatsApp className="h-4 w-4" /> Agendar visita
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className={`grid h-10 w-10 place-items-center rounded-full lg:hidden ${onHero ? "text-white" : "text-ink"}`} aria-label="Menú">
            {open ? <IconX /> : <IconMenu />}
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-3xl p-3 shadow-card lg:hidden animate-fade-up">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-stone-100">
                {l.label}
              </Link>
            ))}
            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary mt-2 w-full">
              <IconWhatsApp className="h-4 w-4" /> Agendar visita
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

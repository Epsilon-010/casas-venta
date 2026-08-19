import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IconMenu, IconX, IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/casas", label: "Propiedades" },
  { to: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHero = (pathname === "/" || pathname === "/casas") && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fillColor = onHero ? "fill-white" : "fill-white/95";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="relative w-full max-w-4xl px-4 sm:px-0">
        <nav
          className={`relative flex items-center justify-between px-8 py-3 rounded-b-[32px] transition-all duration-300 ${
            onHero
              ? "bg-white text-stone-900 shadow-xl"
              : "bg-white/95 backdrop-blur-md text-stone-900 shadow-lg border-b border-x border-stone-200/50"
          }`}
        >
          {/* Curva cóncava superior izquierda (Corte exacto 1:1 sin ovalar) */}
          <div className="absolute -left-8 top-0 h-8 w-8 pointer-events-none">
            <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
              <path d="M0 0H32V32C32 14.327 17.673 0 0 0Z" className={`${fillColor} transition-colors duration-300`} />
            </svg>
          </div>

          {/* Curva cóncava superior derecha (Corte exacto 1:1 sin ovalar) */}
          <div className="absolute -right-8 top-0 h-8 w-8 pointer-events-none">
            <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
              <path d="M32 0H0V32C0 14.327 14.327 0 32 0Z" className={`${fillColor} transition-colors duration-300`} />
            </svg>
          </div>

          {/* Menú de navegación principal */}
          <ul className="hidden items-center gap-2 lg:flex mx-auto">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-stone-900 text-white shadow-sm"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Botón WhatsApp */}
          <div className="hidden items-center justify-end lg:flex">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold uppercase text-white transition-transform active:scale-95 hover:bg-stone-800"
            >
              <IconWhatsApp className="h-4 w-4" />
              <span>Agendar</span>
            </a>
          </div>

          {/* Versión móvil */}
          <div className="flex w-full items-center justify-between lg:hidden">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-900">Menú</span>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-9 w-9 place-items-center rounded-full text-stone-900 hover:bg-stone-100"
              aria-label="Menú"
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Desplegable móvil */}
        {open && (
          <div className="bg-white/95 backdrop-blur-md mt-2 rounded-3xl p-4 shadow-card lg:hidden border border-stone-200/50">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-medium text-stone-900 hover:bg-stone-100"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
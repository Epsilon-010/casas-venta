import { useEffect, useState } from "react";
import { IconMenu, IconX, IconWhatsApp } from "./Icons";
import { waLink } from "../lib/format";
import { SECCIONES, irASeccion } from "../lib/secciones";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activa, setActiva] = useState("inicio");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      // Scroll-spy: la sección activa es la última cuyo top pasó el tercio superior
      const y = window.scrollY + window.innerHeight / 3;
      let actual = SECCIONES[0].id;
      for (const s of SECCIONES) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) actual = s.id;
      }
      setActiva(actual);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const irA = (id: string) => {
    setOpen(false);
    irASeccion(id);
  };

  const fillColor = scrolled ? "fill-white/95" : "fill-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <div className="relative w-full max-w-4xl px-0 sm:px-8 lg:px-0">
        <nav
          className={`relative flex items-center justify-between px-5 sm:px-8 py-3 rounded-b-[28px] sm:rounded-b-[32px] transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md text-stone-900 shadow-lg border-b border-x border-stone-200/50"
              : "bg-white text-stone-900 shadow-xl"
          }`}
        >
          {/* Curvas cóncavas (solo cuando hay espacio a los lados) */}
          <div className="absolute -left-8 top-0 hidden h-8 w-8 pointer-events-none sm:block">
            <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
              <path d="M0 0H32V32C32 14.327 17.673 0 0 0Z" className={`${fillColor} transition-colors duration-300`} />
            </svg>
          </div>
          <div className="absolute -right-8 top-0 hidden h-8 w-8 pointer-events-none sm:block">
            <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
              <path d="M32 0H0V32C0 14.327 14.327 0 32 0Z" className={`${fillColor} transition-colors duration-300`} />
            </svg>
          </div>

          {/* Menú escritorio */}
          <ul className="hidden items-center gap-2 md:flex mx-auto">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); irA(s.id); }}
                  aria-current={activa === s.id ? "true" : undefined}
                  className={`block rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                    activa === s.id
                      ? "bg-stone-900 text-white shadow-sm"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* WhatsApp escritorio */}
          <div className="hidden items-center justify-end md:flex">
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold uppercase text-white transition-transform active:scale-95 hover:bg-stone-800"
            >
              <IconWhatsApp className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Móvil */}
          <div className="flex w-full items-center justify-between md:hidden">
            <button
              onClick={() => irA("inicio")}
              className="text-xs font-bold uppercase tracking-wider text-stone-900"
            >
              Casas en venta
            </button>
            <div className="flex items-center gap-1">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full text-stone-900 hover:bg-stone-100"
              >
                <IconWhatsApp className="h-5 w-5" />
              </a>
              <button
                onClick={() => setOpen(!open)}
                className="grid h-9 w-9 place-items-center rounded-full text-stone-900 hover:bg-stone-100"
                aria-label="Menú"
                aria-expanded={open}
              >
                {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Desplegable móvil */}
        {open && (
          <div className="mx-4 mt-2 rounded-3xl border border-stone-200/50 bg-white/95 p-3 shadow-card backdrop-blur-md md:hidden">
            <div className="flex flex-col gap-1">
              {SECCIONES.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); irA(s.id); }}
                  className={`rounded-2xl px-4 py-3 text-base font-medium ${
                    activa === s.id ? "bg-stone-900 text-white" : "text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

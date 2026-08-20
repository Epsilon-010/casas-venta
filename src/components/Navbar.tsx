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

  // Menú móvil abierto: bloquea el scroll del fondo y cierra con Escape
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const irA = (id: string) => {
    setOpen(false);
    irASeccion(id);
  };

  const fillColor = scrolled ? "fill-white/95" : "fill-white";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---------- Escritorio: píldora blanca centrada ---------- */}
      <div className="hidden justify-center md:flex">
        <div className="relative w-full max-w-3xl">
          <nav
            className={`relative flex items-center justify-between rounded-b-3xl px-8 py-3 transition-all duration-300 ${
              scrolled
                ? "border-x border-b border-stone-200/50 bg-white/95 text-stone-900 shadow-lg backdrop-blur-md"
                : "bg-white text-stone-900 shadow-xl"
            }`}
          >
            {/* Recorte cóncavo (radio 24px, igual al rounded-b-3xl para una línea continua) */}
            <div className="pointer-events-none absolute -left-6 top-0 h-6 w-6">
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                <path d="M0 0H24V24A24 24 0 0 0 0 0Z" className={`${fillColor} transition-colors duration-300`} />
              </svg>
            </div>
            <div className="pointer-events-none absolute -right-6 top-0 h-6 w-6">
              <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                <path d="M24 0H0V24A24 24 0 0 1 24 0Z" className={`${fillColor} transition-colors duration-300`} />
              </svg>
            </div>

            {/* Menú */}
            <ul className="mx-auto flex items-center gap-1.5">
              {SECCIONES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => { e.preventDefault(); irA(s.id); }}
                    aria-current={activa === s.id ? "true" : undefined}
                    className={`block rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
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

            {/* WhatsApp */}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-transform hover:bg-stone-800 active:scale-95"
            >
              <IconWhatsApp className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </nav>
        </div>
      </div>

      {/* ---------- Móvil: fondo difuminado al abrir el menú ---------- */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ---------- Móvil: solo botón hamburguesa flotante (glass) ---------- */}
      <div className="flex justify-end px-4 pt-4 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
          className={`grid h-12 w-12 place-items-center rounded-full border backdrop-blur-xl transition-all duration-300 active:scale-95 ${
            open || !scrolled
              ? "border-white/35 bg-white/15 text-white shadow-lg"
              : "border-white/60 bg-white/75 text-stone-900 shadow-card"
          }`}
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desplegable móvil: panel glass oscuro con acento dorado */}
      <div
        className={`mx-4 mt-2 origin-top-right overflow-hidden rounded-3xl border border-white/15 bg-ink/80 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-out md:hidden ${
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1">
          {SECCIONES.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => { e.preventDefault(); irA(s.id); }}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              } ${
                activa === s.id
                  ? "border border-sand/40 bg-white/10 text-sand"
                  : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              {s.label}
              {activa === s.id && <span className="h-1.5 w-1.5 rounded-full bg-sand" />}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${60 + SECCIONES.length * 40}ms` : "0ms" }}
            className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-sand px-4 py-3 text-sm font-semibold uppercase tracking-wider text-ink shadow-lg transition-all duration-300 active:scale-[0.98] ${
              open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <IconWhatsApp className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

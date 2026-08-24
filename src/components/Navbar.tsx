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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ---------- Escritorio: barra transparente (velo sutil solo al hacer scroll) ---------- */}
      <nav
        className={`relative hidden items-center justify-center px-8 py-4 transition-all duration-300 md:flex lg:px-12 ${
          scrolled ? "bg-white/70 shadow-sm backdrop-blur-md" : "bg-transparent"
        }`}
      >
        {/* Menú */}
        <ul className="flex items-center gap-2">
          {SECCIONES.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); irA(s.id); }}
                aria-current={activa === s.id ? "true" : undefined}
                className={`block px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                  activa === s.id
                    ? `underline decoration-sand decoration-2 underline-offset-8 ${scrolled ? "text-stone-900" : "text-white"}`
                    : scrolled
                      ? "text-stone-900/55 hover:text-stone-900"
                      : "text-white/60 hover:text-white"
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
          className={`absolute right-8 top-1/2 inline-flex -translate-y-1/2 items-center gap-2 rounded-full border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 lg:right-12 ${
            scrolled
              ? "border-stone-900/25 text-stone-900 hover:bg-stone-900 hover:text-white"
              : "border-white/40 text-white hover:bg-white hover:text-stone-900"
          }`}
        >
          <IconWhatsApp className="h-4 w-4" />
          <span>WhatsApp</span>
        </a>
      </nav>

      {/* ---------- Móvil: fondo difuminado al abrir el menú ---------- */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 -z-10 bg-stone-950/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ---------- Móvil: botón hamburguesa flotante con estilo claro/crema ---------- */}
      <div className="flex justify-end px-4 pt-4 md:hidden">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
          className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-300 active:scale-95 ${
            open
              ? "border-stone-300 bg-white text-stone-900 shadow-lg backdrop-blur-xl"
              : scrolled
                ? "border-stone-900/20 bg-white/75 text-stone-900 shadow-sm backdrop-blur-xl"
                : "border-white/40 bg-black/20 text-white backdrop-blur-md"
          }`}
        >
          {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desplegable móvil: panel claro/crema idéntico a la estética de laptop */}
      <div
        className={`mx-4 mt-2 origin-top-right overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 p-3 shadow-2xl backdrop-blur-2xl transition-all duration-300 ease-out md:hidden ${
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
                  ? "border border-stone-200 bg-stone-100 text-stone-900"
                  : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
              }`}
            >
              {s.label}
              {activa === s.id && <span className="h-1.5 w-1.5 rounded-full bg-stone-900" />}
            </a>
          ))}
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${60 + SECCIONES.length * 40}ms` : "0ms" }}
            className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-stone-900/25 bg-stone-900 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:bg-stone-800 active:scale-[0.98] ${
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
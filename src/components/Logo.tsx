import { Link } from "react-router-dom";
import { CONTACTO } from "../lib/format";

/** Logotipo: isotipo (casa minimal) + wordmark. Prop `light` para fondos oscuros. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Inicio">
      <span className={`grid h-9 w-9 place-items-center rounded-xl ${light ? "bg-white text-ink" : "bg-ink text-white"}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
          <path d="M5 13 12 6l7 7M8 12v6h8v-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>{CONTACTO.marca}</span>
        <span className={`block text-[10px] uppercase tracking-[0.25em] ${light ? "text-white/70" : "text-ink-soft"}`}>{CONTACTO.marcaSub}</span>
      </span>
    </Link>
  );
}

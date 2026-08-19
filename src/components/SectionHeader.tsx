import type { ReactNode } from "react";

/** Encabezado de sección: eyebrow + título display + texto opcional + acción a la derecha. */
export default function SectionHeader({
  eyebrow, title, text, action, light = false, align = "left",
}: { eyebrow?: string; title: ReactNode; text?: string; action?: ReactNode; light?: boolean; align?: "left" | "center" }) {
  return (
    <div className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className={`eyebrow ${light ? "text-white/60!" : ""}`}>{eyebrow}</p>}
        <h2 className={`mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        {text && <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-ink-soft"}`}>{text}</p>}
      </div>
      {action}
    </div>
  );
}

import { IconKey, IconShield, IconLeaf, IconStar } from "./Icons";

const items = [
  { icon: IconKey, t: "Entrega inmediata", d: "Escrituras listas: firmas, recibes llaves y te mudas." },
  { icon: IconShield, t: "Certeza jurídica", d: "Libres de gravamen y con acompañamiento notarial." },
  { icon: IconLeaf, t: "Diseño sustentable", d: "Paneles solares y materiales de baja huella." },
  { icon: IconStar, t: "Acabados premium", d: "Cocinas equipadas, mármol y madera natural." },
];

/** Franja compacta de beneficios: un solo bloque con 4 puntos. */
export default function Benefits() {
  return (
    <section className="container-x pb-16 sm:pb-24">
      <div className="overflow-hidden rounded-4xl border border-stone-200 bg-mist">
        <div className="grid gap-x-6 gap-y-0 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:gap-x-8">
          <div className="pb-6 sm:col-span-2 sm:pb-8 lg:col-span-4">
            <p className="eyebrow">Trato directo</p>
            <h2 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-tight text-ink sm:text-4xl">
              Comprar directo al dueño <span className="italic text-sand-dark">tiene ventajas.</span>
            </h2>
          </div>

          {items.map(({ icon: I, t, d }, k) => (
            <div
              key={t}
              className={`flex items-start gap-4 border-t border-stone-200 py-5 lg:border-t ${
                k % 2 === 1 ? "sm:pl-6 lg:pl-0" : ""
              } ${k > 0 ? "lg:pl-0" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-ink shadow-xs ring-1 ring-stone-200">
                <I className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-ink">{t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Img from "./Img";
import { IconStar } from "./Icons";

const testimonios = [
  { n: "Mariana & Luis", c: "Compraron en Puerto Vallarta", q: "Vimos la casa un sábado y en tres semanas ya teníamos escrituras. El acompañamiento fue impecable.", img: "https://i.pravatar.cc/96?img=47" },
  { n: "Rodrigo P.", c: "Compró en Puebla", q: "La calidad de acabados es la que prometieron. Y la vista a los volcanes desde el roof no tiene precio.", img: "https://i.pravatar.cc/96?img=12" },
  { n: "Fam. Herrera", c: "Inversión vacacional", q: "Casa Arena se renta sola. Nos ayudaron incluso con la administración de rentas.", img: "https://i.pravatar.cc/96?img=32" },
];

/** Testimonios (placeholder) sobre fondo verde bosque, estilo referencia "space". */
export default function Testimonials() {
  return (
    <section className="bg-forest py-24 text-white">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/60!">Clientes</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">Lo que dicen quienes <span className="italic text-sand">ya viven ahí.</span></h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              {testimonios.map((t) => <Img key={t.n} src={t.img} alt="" className="h-10 w-10 rounded-full border-2 border-forest object-cover" />)}
            </div>
            <div>
              <p className="font-display text-2xl font-semibold leading-none">50+</p>
              <p className="text-xs text-white/60">familias felices</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonios.map((t) => (
            <figure key={t.n} className="rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur">
              <div className="flex gap-0.5 text-sand">{Array.from({ length: 5 }).map((_, i) => <IconStar key={i} className="h-4 w-4" />)}</div>
              <blockquote className="mt-4 font-display text-xl leading-snug">“{t.q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Img src={t.img} alt="" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.n}</p>
                  <p className="text-xs text-white/60">{t.c}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

import { IconKey, IconShield, IconLeaf, IconStar } from "./Icons";
import SectionHeader from "./SectionHeader";

const items = [
  { icon: IconKey, t: "Entrega inmediata", d: "Escrituras listas. Firmas, recibes llaves y te mudas — sin esperas de obra." },
  { icon: IconShield, t: "Certeza jurídica", d: "Propiedades libres de gravamen, con notaría aliada y acompañamiento en todo el proceso." },
  { icon: IconLeaf, t: "Diseño sustentable", d: "Paneles solares, captación pluvial y materiales de baja huella en cada residencia." },
  { icon: IconStar, t: "Acabados premium", d: "Cocinas italianas, cancelería de aluminio negro, pisos de mármol y madera natural." },
];

/** Beneficios en 4 tarjetas blancas sobre fondo blanco con borde suave. */
export default function Benefits() {
  return (
    <section className="container-x py-24">
      <SectionHeader
        eyebrow="Por qué somos buena opcion"
        title={<>Comprar una casa debería ser <span className="italic text-sand-dark">así de fácil.</span></>}
        text="Nos encargamos de todo: desde el recorrido hasta la escritura. Tú solo eliges dónde poner el sofá."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: I, t, d }) => (
          <div key={t} className="group rounded-3xl border border-stone-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-card">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-ink transition group-hover:bg-ink group-hover:text-white">
              <I className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

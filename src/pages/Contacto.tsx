import ContactForm from "../components/ContactForm";
import { IconWhatsApp } from "../components/Icons";
import { CONTACTO, waLink } from "../lib/format";

/** Ruta "/contacto" — formulario + datos de contacto + oficinas. */
export default function Contacto() {
  return (
    <section className="container-x pt-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">Contacto</p>
          <h1 className="mt-3 font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
            Hablemos de tu <span className="italic text-sand-dark">próxima casa.</span>
          </h1>
          <p className="mt-5 max-w-md text-ink-soft">Cuéntanos qué buscas y te proponemos la residencia ideal. También puedes escribirnos directo por WhatsApp.</p>

          <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary mt-8"><IconWhatsApp className="h-4 w-4" /> Escribir por WhatsApp</a>

          <dl className="mt-12 grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Teléfono</dt>
              <dd className="mt-2 font-medium">{CONTACTO.telefono}</dd>
            </div>
            <div>
              <dt className="eyebrow">Correo</dt>
              <dd className="mt-2 font-medium">{CONTACTO.email}</dd>
            </div>
            <div>
              <dt className="eyebrow">Horario</dt>
              <dd className="mt-2 font-medium">{CONTACTO.horario}</dd>
            </div>
            <div>
              <dt className="eyebrow">Oficinas</dt>
              <dd className="mt-2 font-medium">Puebla · Puerto Vallarta</dd>
              <dd className="text-ink-soft">(direcciones placeholder)</dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-4xl border border-stone-200 bg-white p-6 shadow-soft sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

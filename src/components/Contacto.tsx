import ContactForm from "./ContactForm";
import { CONTACTO, waLink } from "../lib/format";
import { IconPin, IconWhatsApp } from "./Icons";

/** Sección #contacto: datos del propietario + formulario (en la misma página). */
export default function Contacto() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-mist">
      <div className="container-x py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Columna izquierda: texto + datos */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Contacto</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Agenda una visita <span className="italic text-sand-dark">o pregúntame lo que quieras.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Te respondo personalmente. Puedes escribirme por WhatsApp o dejar tus datos en el formulario y te contacto
              para coordinar el recorrido.
            </p>

            <a href={waLink()} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full sm:w-auto">
              <IconWhatsApp className="h-4 w-4" /> Escribir por WhatsApp
            </a>

            <dl className="mt-8 grid gap-5 text-sm sm:grid-cols-2">
              <div>
                <dt className="eyebrow">Teléfono / WhatsApp</dt>
                <dd className="mt-2 font-medium">
                  <a href={`tel:${CONTACTO.telefono.replace(/\s+/g, "")}`} className="hover:underline">
                    {CONTACTO.telefono}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Correo</dt>
                <dd className="mt-2 font-medium break-all">
                  <a href={`mailto:${CONTACTO.email}`} className="hover:underline">
                    {CONTACTO.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Horario</dt>
                <dd className="mt-2 font-medium">{CONTACTO.horario}</dd>
              </div>
              <div>
                <dt className="eyebrow">Ubicaciones</dt>
                <dd className="mt-2 flex items-center gap-1.5 font-medium">
                  <IconPin className="h-4 w-4 text-sand-dark" /> Puebla · Puerto Escondido
                </dd>
              </div>
            </dl>
          </div>

          {/* Columna derecha: formulario */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 shadow-soft sm:p-8 lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

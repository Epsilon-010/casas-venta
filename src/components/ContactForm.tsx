import { useEffect, useState, type FormEvent } from "react";
import { casas } from "../data/casas";
import { IconCheck, IconArrow } from "./Icons";
import { EVENTO_ELEGIR_CASA, abrirLegal } from "../lib/secciones";

/**
 * Formulario de contacto. Por ahora NO envía a ningún backend: muestra
 * confirmación local. Conectar después con Formspree / EmailJS / API propia
 * en `onSubmit`.
 *
 * `casaSlug` preselecciona la propiedad; además escucha el evento global
 * `elegir-casa` (botón "Me interesa" de cada tarjeta) para cambiar la selección.
 */
export default function ContactForm({ casaSlug, compact = false }: { casaSlug?: string; compact?: boolean }) {
  const [enviado, setEnviado] = useState(false);
  const [casa, setCasa] = useState(casaSlug ?? "");

  useEffect(() => {
    const onElegir = (e: Event) => setCasa((e as CustomEvent<string>).detail);
    window.addEventListener(EVENTO_ELEGIR_CASA, onElegir);
    return () => window.removeEventListener(EVENTO_ELEGIR_CASA, onElegir);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    console.log("[ContactForm] lead:", data); // TODO: enviar a backend
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="rounded-3xl border border-stone-200 bg-mist p-8 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-forest text-white"><IconCheck /></span>
        <h3 className="mt-4 font-display text-2xl font-semibold">¡Gracias! Te contactamos pronto.</h3>
        <p className="mt-2 text-sm text-ink-soft">Te escribo personalmente en menos de 24 h para agendar tu recorrido.</p>
      </div>
    );
  }

  const input = "w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-300 focus:border-ink focus:ring-4 focus:ring-ink/5";
  const label = "mb-1.5 block text-xs font-medium text-ink-soft";

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${compact ? "" : "sm:grid-cols-2"}`}>
      <div>
        <label className={label} htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" required placeholder="Tu nombre" className={input} />
      </div>
      <div>
        <label className={label} htmlFor="telefono">Teléfono / WhatsApp</label>
        <input id="telefono" name="telefono" required placeholder="+52 ..." className={input} />
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className={label} htmlFor="email">Correo</label>
        <input id="email" name="email" type="email" required placeholder="tu@correo.com" className={input} />
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className={label} htmlFor="casa">Propiedad de interés</label>
        <select id="casa" name="casa" value={casa} onChange={(e) => setCasa(e.target.value)} className={input}>
          <option value="">Cualquiera / aún no sé</option>
          {casas.map((c) => <option key={c.slug} value={c.slug}>{c.nombre} · {c.ciudad}</option>)}
        </select>
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <label className={label} htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows={compact ? 3 : 4} placeholder="Me gustaría agendar una visita el..." className={input} />
      </div>
      <div className={compact ? "" : "sm:col-span-2"}>
        <button type="submit" className="btn-primary w-full">Enviar solicitud <IconArrow className="h-4 w-4" /></button>
        <p className="mt-3 text-center text-[11px] text-ink-soft">
          Al enviar aceptas el{" "}
          <button type="button" onClick={() => abrirLegal("privacidad")} className="font-medium underline underline-offset-2 hover:text-ink">
            Aviso de Privacidad
          </button>
          . Tus datos solo se usan para contactarte sobre estas casas.
        </p>
      </div>
    </form>
  );
}

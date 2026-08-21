import { useEffect, useState } from "react";
import { CONTACTO } from "../lib/format";
import { EVENTO_ABRIR_LEGAL, type DocumentoLegal } from "../lib/secciones";
import { IconX } from "./Icons";

/**
 * Modal con los documentos legales del sitio: Aviso de Privacidad (LFPDPPP)
 * y Términos y Condiciones. Se abre desde el Footer o el ContactForm
 * disparando `abrirLegal("privacidad" | "terminos")`; se monta una sola vez
 * en App.tsx y escucha el evento global `abrir-legal`.
 *
 * ⚠️ Placeholder: revisar el texto con el propietario (nombre real del
 * responsable en `CONTACTO.nombre`) antes de publicar.
 */

const ACTUALIZADO = "21 de agosto de 2026";

export default function LegalModal() {
  const [doc, setDoc] = useState<DocumentoLegal | null>(null);

  useEffect(() => {
    const onAbrir = (e: Event) => setDoc((e as CustomEvent<DocumentoLegal>).detail);
    window.addEventListener(EVENTO_ABRIR_LEGAL, onAbrir);
    return () => window.removeEventListener(EVENTO_ABRIR_LEGAL, onAbrir);
  }, []);

  // Bloquea el scroll del fondo y cierra con Escape mientras está abierto
  useEffect(() => {
    if (!doc) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDoc(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [doc]);

  if (!doc) return null;

  const cerrar = () => setDoc(null);
  const titulo = doc === "privacidad" ? "Aviso de Privacidad" : "Términos y Condiciones";

  const tab = (d: DocumentoLegal, label: string) => (
    <button
      onClick={() => setDoc(d)}
      className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
        doc === d ? "bg-ink text-white" : "bg-stone-100 text-ink-soft hover:bg-stone-200"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
      onClick={(e) => e.target === e.currentTarget && cerrar()}
    >
      <div className="mx-auto my-0 min-h-full w-full max-w-3xl bg-white shadow-card sm:my-8 sm:min-h-0 sm:rounded-4xl">
        {/* Barra superior */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-stone-200 bg-white/95 px-5 py-3 backdrop-blur sm:rounded-t-4xl sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {tab("privacidad", "Privacidad")}
            {tab("terminos", "Términos")}
          </div>
          <button
            onClick={cerrar}
            aria-label="Cerrar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 hover:text-ink"
          >
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pb-10 pt-6 sm:px-8">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">{titulo}</h2>
          <p className="mt-1 text-xs text-ink-soft">Última actualización: {ACTUALIZADO}</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-ink-soft [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink [&_li]:mt-1 [&_ul]:list-disc [&_ul]:pl-5">
            {doc === "privacidad" ? <AvisoPrivacidad /> : <Terminos />}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvisoPrivacidad() {
  return (
    <>
      <section>
        <h3>1. Responsable del tratamiento</h3>
        <p className="mt-2">
          {CONTACTO.nombre}, persona física que vende directamente las propiedades anunciadas en este
          sitio (en adelante, "el Responsable"), es responsable del tratamiento de tus datos
          personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
          Particulares (LFPDPPP) y su Reglamento. Puedes contactarlo en{" "}
          <a href={`mailto:${CONTACTO.email}`} className="font-medium text-forest hover:underline">{CONTACTO.email}</a>{" "}
          o al teléfono {CONTACTO.telefono}.
        </p>
      </section>

      <section>
        <h3>2. Datos personales que recabamos</h3>
        <p className="mt-2">A través del formulario de contacto de este sitio se recaban únicamente:</p>
        <ul className="mt-2">
          <li>Nombre</li>
          <li>Teléfono / WhatsApp</li>
          <li>Correo electrónico</li>
          <li>Propiedad de tu interés y el mensaje que decidas escribir</li>
        </ul>
        <p className="mt-2">
          No se recaban datos personales sensibles ni datos financieros o patrimoniales a través de
          este sitio.
        </p>
      </section>

      <section>
        <h3>3. Finalidades del tratamiento</h3>
        <p className="mt-2">Tus datos se utilizan exclusivamente para las siguientes finalidades primarias:</p>
        <ul className="mt-2">
          <li>Contactarte para dar seguimiento a tu interés en alguna de las propiedades.</li>
          <li>Agendar y coordinar visitas presenciales o por videollamada.</li>
          <li>Responder tus dudas sobre las casas, precios y condiciones de venta.</li>
        </ul>
        <p className="mt-2">
          No utilizamos tus datos para fines publicitarios ni de prospección comercial distintos a la
          venta de estas propiedades.
        </p>
      </section>

      <section>
        <h3>4. Transferencias</h3>
        <p className="mt-2">
          Tus datos personales no se venden, ceden ni transfieren a terceros. Únicamente podrían
          compartirse cuando sea legalmente exigido por una autoridad competente, o con el notario
          público que intervenga si decides avanzar en la compraventa de una propiedad.
        </p>
      </section>

      <section>
        <h3>5. Derechos ARCO y revocación del consentimiento</h3>
        <p className="mt-2">
          Tienes derecho a Acceder, Rectificar y Cancelar tus datos personales, así como a Oponerte a
          su tratamiento o revocar el consentimiento que nos hayas otorgado. Para ejercer estos
          derechos, envía una solicitud a{" "}
          <a href={`mailto:${CONTACTO.email}`} className="font-medium text-forest hover:underline">{CONTACTO.email}</a>{" "}
          indicando tu nombre, el derecho que deseas ejercer y un medio para responderte. Tu
          solicitud será atendida en un plazo máximo de 20 días hábiles.
        </p>
      </section>

      <section>
        <h3>6. Servicios de terceros</h3>
        <p className="mt-2">Este sitio utiliza servicios de terceros que pueden tratar datos técnicos (como tu dirección IP) bajo sus propias políticas:</p>
        <ul className="mt-2">
          <li><b>Google Maps</b>: mapas embebidos para mostrar la ubicación aproximada de las propiedades.</li>
          <li><b>Google Fonts</b>: tipografías del sitio.</li>
          <li><b>WhatsApp (Meta)</b>: si eliges contactarnos por WhatsApp, la conversación se rige por las políticas de WhatsApp.</li>
          <li><b>Cloudinary / servicios de imágenes</b>: alojamiento de las fotografías del sitio.</li>
        </ul>
      </section>

      <section>
        <h3>7. Cookies</h3>
        <p className="mt-2">
          Este sitio no instala cookies propias ni utiliza herramientas de analítica o rastreo
          publicitario. La única fuente de cookies es de terceros: el mapa embebido de Google Maps,
          que puede instalarlas al mostrarse. Por eso el mapa <b>solo se carga si lo autorizas</b>,
          ya sea desde el banner de cookies o con el botón "Cargar mapa" en el detalle de cada casa.
        </p>
        <p className="mt-2">
          Tu elección se guarda únicamente en tu navegador (localStorage) y puedes cambiarla en
          cualquier momento borrando los datos de este sitio en tu navegador; el banner volverá a
          aparecer. Si rechazas las cookies, el sitio funciona con normalidad: solo el mapa queda
          sin cargar y puedes consultarlo abriendo Google Maps en una pestaña aparte.
        </p>
      </section>

      <section>
        <h3>8. Conservación y seguridad</h3>
        <p className="mt-2">
          Tus datos se conservan únicamente el tiempo necesario para atender tu solicitud y, en su
          caso, la operación de compraventa; después se eliminan. Se aplican medidas razonables de
          seguridad para evitar su pérdida, alteración o uso no autorizado.
        </p>
      </section>

      <section>
        <h3>9. Cambios a este aviso</h3>
        <p className="mt-2">
          Cualquier cambio a este Aviso de Privacidad se publicará en esta misma página, indicando la
          fecha de última actualización.
        </p>
      </section>
    </>
  );
}

function Terminos() {
  return (
    <>
      <section>
        <h3>1. Objeto del sitio</h3>
        <p className="mt-2">
          Este sitio tiene una finalidad exclusivamente informativa: dar a conocer casas en venta
          directa por su propietario, {CONTACTO.nombre}, ubicadas en Puebla y Puerto Escondido
          (Oaxaca), México. No es una inmobiliaria ni una plataforma de intermediación.
        </p>
      </section>

      <section>
        <h3>2. La información no constituye una oferta vinculante</h3>
        <p className="mt-2">
          Los precios, medidas, amenidades, fechas de entrega y demás características publicadas son
          informativos y pueden cambiar sin previo aviso. Ninguna parte de este sitio constituye una
          oferta vinculante, promesa de venta ni asesoría legal, fiscal o financiera. Las condiciones
          definitivas de cualquier operación se pactarán por escrito entre las partes y se
          formalizarán ante notario público conforme a la legislación mexicana.
        </p>
      </section>

      <section>
        <h3>3. Imágenes y ubicaciones</h3>
        <p className="mt-2">
          Las fotografías y renders son ilustrativos y pueden diferir del estado actual del inmueble.
          Los mapas muestran ubicaciones aproximadas. Te recomendamos verificar todo en una visita
          presencial antes de tomar cualquier decisión.
        </p>
      </section>

      <section>
        <h3>4. Uso del sitio</h3>
        <p className="mt-2">
          Te comprometes a usar este sitio de buena fe y a proporcionar información veraz en el
          formulario de contacto. Queda prohibido usar el sitio o los datos de contacto publicados
          para fines de spam, fraude o cualquier actividad ilícita.
        </p>
      </section>

      <section>
        <h3>5. Propiedad intelectual</h3>
        <p className="mt-2">
          Los textos, fotografías y diseño de este sitio pertenecen al propietario o se usan con
          autorización. No pueden reproducirse con fines comerciales sin permiso previo por escrito.
        </p>
      </section>

      <section>
        <h3>6. Enlaces y servicios de terceros</h3>
        <p className="mt-2">
          El sitio enlaza a servicios de terceros (WhatsApp, Google Maps). El propietario no es
          responsable del contenido ni de las políticas de esos servicios.
        </p>
      </section>

      <section>
        <h3>7. Limitación de responsabilidad</h3>
        <p className="mt-2">
          El propietario procura que la información publicada sea correcta y esté actualizada, pero
          no garantiza la ausencia de errores u omisiones, ni la disponibilidad ininterrumpida del
          sitio. El uso del sitio es bajo tu propia responsabilidad.
        </p>
      </section>

      <section>
        <h3>8. Ley aplicable</h3>
        <p className="mt-2">
          Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier
          controversia se someterá a los tribunales competentes conforme a la legislación aplicable.
        </p>
      </section>
    </>
  );
}
